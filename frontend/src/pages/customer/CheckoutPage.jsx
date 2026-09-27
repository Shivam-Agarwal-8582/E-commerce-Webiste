import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '../../features/orders/orderSlice';
import addressService from '../../services/addressService';
import paymentService from '../../services/paymentService';
import AddressCard from '../../components/address/AddressCard';
import AddressModal from '../../components/address/AddressModal';
import Button from '../../components/common/Button';
import { formatPrice } from '../../utils/formatters';
import { PAYMENT_METHODS } from '../../utils/constants';
import toast from 'react-hot-toast';
import {
  HiOutlineCreditCard,
  HiOutlineBanknotes,
  HiOutlinePlus,
  HiOutlineShieldCheck,
  HiOutlineCheck,
  HiOutlineBuildingStorefront,
} from 'react-icons/hi2';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, subtotal, deliveryCharge, grandTotal } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.ONLINE);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    const loadAddresses = async () => {
      const res = await addressService.getAddresses();
      setAddresses(res.addresses || []);
      const defaultAddr = res.addresses?.find((a) => a.isDefault) || res.addresses?.[0];
      if (defaultAddr) setSelectedAddress(defaultAddr);
    };

    loadAddresses();
  }, [items.length, navigate]);

  const handleSaveNewAddress = async (addrData) => {
    const res = await addressService.addAddress(addrData);
    if (res.success) {
      const updated = await addressService.getAddresses();
      setAddresses(updated.addresses || []);
      setSelectedAddress(res.address);
      setIsAddressModalOpen(false);
      toast.success('Address saved!');
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error('Please select or add a delivery address');
      return;
    }

    setIsProcessing(true);

    const orderPayload = {
      customer: {
        _id: user?._id || 'usr-guest',
        name: user?.name || selectedAddress.fullName,
        email: user?.email || 'customer@shop.com',
        phone: user?.phone || selectedAddress.phone,
      },
      items: items.map((i) => ({
        product: { _id: i._id, name: i.name, price: i.price, discountPrice: i.discountPrice, images: [i.image] },
        name: i.name,
        image: i.image,
        price: i.discountPrice || i.price,
        quantity: i.quantity,
      })),
      deliveryAddress: selectedAddress,
      subtotal,
      shippingFee: deliveryCharge,
      total: grandTotal,
      paymentMethod,
      paymentStatus: 'Pending',
    };

    if (paymentMethod === PAYMENT_METHODS.ONLINE) {
      // Razorpay Flow
      try {
        const orderRes = await paymentService.createRazorpayOrder(grandTotal);

        await paymentService.openRazorpayCheckout({
          orderId: orderRes.orderId,
          amount: orderRes.amount,
          currency: orderRes.currency || 'INR',
          key: orderRes.key,
          prefill: {
            name: selectedAddress.fullName,
            email: user?.email || '',
            phone: selectedAddress.phone,
          },
          onSuccess: async (paymentDetails) => {
            await paymentService.verifyPayment(paymentDetails);
            const finalPayload = {
              ...orderPayload,
              paymentStatus: 'Paid',
              razorpayPaymentId: paymentDetails.razorpay_payment_id,
              razorpayOrderId: paymentDetails.razorpay_order_id,
            };
            const result = await dispatch(placeOrder(finalPayload));
            setIsProcessing(false);
            if (placeOrder.fulfilled.match(result)) {
              toast.success('Payment verified & order confirmed!');
              navigate('/order-success');
            } else {
              toast.error('Failed to create order record');
            }
          },
          onDismiss: () => {
            setIsProcessing(false);
            toast.error('Payment cancelled');
          },
        });
      } catch (err) {
        setIsProcessing(false);
        toast.error('Could not initiate online payment. Please try COD or retry.');
      }
    } else {
      // Cash on Delivery Flow
      const result = await dispatch(placeOrder(orderPayload));
      setIsProcessing(false);
      if (placeOrder.fulfilled.match(result)) {
        toast.success('Order placed successfully via Cash on Delivery!');
        navigate('/order-success');
      } else {
        toast.error('Failed to place order');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Stepper indicator */}
      <div className="flex items-center justify-center space-x-3 text-xs font-bold text-slate-500 pb-2">
        <span className="text-slate-400">1. Cart</span>
        <span>&rarr;</span>
        <span className="text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">2. Checkout & Payment</span>
        <span>&rarr;</span>
        <span className="text-slate-400">3. Confirmation</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Address & Payment Selection */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section 1: Delivery Address */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">1. Delivery Address</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Where should our shop dispatch this order?
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsAddressModalOpen(true)}
                className="flex items-center space-x-1.5 text-xs font-bold"
              >
                <HiOutlinePlus className="h-4 w-4 text-indigo-600" />
                <span>Add Address</span>
              </Button>
            </div>

            {addresses.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl">
                <p className="text-xs text-slate-500 mb-3">No saved addresses found.</p>
                <Button variant="primary" size="sm" onClick={() => setIsAddressModalOpen(true)}>
                  Add New Delivery Address
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr._id}
                    address={addr}
                    selectable
                    selected={selectedAddress?._id === addr._id}
                    onSelect={(a) => setSelectedAddress(a)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Payment Method */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">2. Payment Method</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose how you want to pay for your physical shop order
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Online Payment */}
              <div
                onClick={() => setPaymentMethod(PAYMENT_METHODS.ONLINE)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === PAYMENT_METHODS.ONLINE
                    ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600">
                    <HiOutlineCreditCard className="h-6 w-6" />
                  </div>
                  {paymentMethod === PAYMENT_METHODS.ONLINE && (
                    <span className="text-indigo-600">
                      <HiOutlineCheck className="h-5 w-5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900">Online Payment</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Pay instantly via Razorpay Checkout (UPI, Google Pay, Cards, NetBanking).
                </p>
                <span className="inline-block mt-3 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  Recommended & Instant Confirmation
                </span>
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod(PAYMENT_METHODS.COD)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === PAYMENT_METHODS.COD
                    ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-600/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                    <HiOutlineBanknotes className="h-6 w-6" />
                  </div>
                  {paymentMethod === PAYMENT_METHODS.COD && (
                    <span className="text-indigo-600">
                      <HiOutlineCheck className="h-5 w-5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900">Cash on Delivery</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Pay by cash or UPI directly when rider delivers or during shop counter pickup.
                </p>
                <span className="inline-block mt-3 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Pay at Doorstep
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Place Order Button */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary ({items.length} items)
            </h3>

            {/* Selected items miniature */}
            <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
              {items.map((item) => (
                <div key={item._id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-lg object-cover border border-slate-200"
                    />
                    <div className="max-w-[150px]">
                      <p className="font-bold text-slate-800 truncate">{item.name}</p>
                      <p className="text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">
                    {formatPrice((item.discountPrice || item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="space-y-2.5 border-t border-slate-100 pt-4 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee</span>
                <span className="font-bold text-slate-800">
                  {deliveryCharge === 0 ? <span className="text-emerald-600">FREE</span> : formatPrice(deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 text-sm">
                <span className="font-black text-slate-900">Total Payable</span>
                <span className="text-xl font-black text-indigo-600">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <Button
              variant="primary"
              size="lg"
              className="w-full text-base font-bold shadow-indigo-600/30"
              onClick={handlePlaceOrder}
              loading={isProcessing}
              disabled={!selectedAddress}
            >
              {paymentMethod === PAYMENT_METHODS.ONLINE ? 'Pay Online & Confirm' : 'Place Cash on Delivery Order'}
            </Button>

            <div className="flex items-center justify-center space-x-1.5 text-slate-400 text-[11px] pt-1">
              <HiOutlineShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Official Shop Guarantee Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleSaveNewAddress}
      />
    </div>
  );
};

export default CheckoutPage;
