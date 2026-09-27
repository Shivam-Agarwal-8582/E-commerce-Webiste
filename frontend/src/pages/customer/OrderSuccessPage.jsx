import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearRecentOrder } from '../../features/orders/orderSlice';
import Button from '../../components/common/Button';
import { formatPrice, formatDate } from '../../utils/formatters';
import {
  HiCheckCircle,
  HiOutlineShoppingBag,
  HiOutlineClipboardDocumentList,
  HiOutlineTruck,
  HiOutlineBuildingStorefront,
} from 'react-icons/hi2';

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentOrder } = useSelector((state) => state.orders);

  // If page is refreshed and recentOrder is null, display fallback success
  const orderId = recentOrder?.orderNumber || recentOrder?._id || 'ORD-' + new Date().getFullYear() + '-RECENT';
  const total = recentOrder?.total || 0;
  const deliveryAddress = recentOrder?.deliveryAddress;

  const handleFinish = () => {
    dispatch(clearRecentOrder());
    navigate('/products');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8 animate-fade-in">
      {/* Success Icon */}
      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 shadow-xl shadow-emerald-500/20">
        <HiCheckCircle className="h-12 w-12 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Order Placed Successfully
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Thank you for your order!
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Our physical shop counter has received your order and packaging will begin shortly.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm text-left space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <p className="text-xs text-slate-400 font-medium">Order Number</p>
            <p className="text-lg font-black text-indigo-600 font-mono">#{orderId}</p>
          </div>
          {total > 0 && (
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Paid / Payable</p>
              <p className="text-lg font-black text-slate-900">{formatPrice(total)}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-slate-400 font-medium">Estimated Delivery</p>
            <p className="text-sm font-bold text-slate-800">Within 24 - 48 Hours</p>
          </div>
        </div>

        {deliveryAddress && (
          <div className="space-y-1 text-xs text-slate-600">
            <span className="font-bold uppercase tracking-wider text-slate-400">
              Shipping to:
            </span>
            <p className="font-bold text-slate-800 text-sm">{deliveryAddress.fullName}</p>
            <p>
              {deliveryAddress.houseNumber}, {deliveryAddress.street}, {deliveryAddress.city},{' '}
              {deliveryAddress.state} - {deliveryAddress.pinCode}
            </p>
            <p className="text-slate-500">Phone: {deliveryAddress.phone}</p>
          </div>
        )}

        {/* Physical shop note */}
        <div className="flex items-start space-x-3 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
          <HiOutlineBuildingStorefront className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-indigo-950 leading-relaxed">
            <p className="font-bold">In-Store Pickup or Query?</p>
            <p className="text-indigo-800 mt-0.5">
              You can also pick up this order directly from our store counter at 104 MG Road, Civil Lines by showing Order #{orderId}.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link to={`/my-orders/${orderId}`}>
          <Button variant="secondary" size="lg" className="flex items-center space-x-2 text-sm font-bold">
            <HiOutlineClipboardDocumentList className="h-5 w-5" />
            <span>Track Order Timeline</span>
          </Button>
        </Link>
        <Button
          variant="primary"
          size="lg"
          onClick={handleFinish}
          className="flex items-center space-x-2 text-sm font-bold shadow-indigo-600/30"
        >
          <HiOutlineShoppingBag className="h-5 w-5" />
          <span>Continue Shopping</span>
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
