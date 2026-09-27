import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../features/orders/orderSlice';
import OrderStatusBadge, { PaymentStatusBadge } from '../../components/order/OrderStatusBadge';
import OrderTimeline from '../../components/order/OrderTimeline';
import Loader from '../../components/common/Loader';
import { formatPrice, formatDate } from '../../utils/formatters';
import {
  HiOutlineArrowLeft,
  HiOutlineMapPin,
  HiOutlineCreditCard,
  HiOutlineBuildingStorefront,
} from 'react-icons/hi2';

export const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchOrderById(id));
  }, [id, dispatch]);

  if (loading || !currentOrder) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader text="Loading order details..." />
      </div>
    );
  }

  const {
    _id,
    orderNumber,
    createdAt,
    orderStatus,
    paymentStatus,
    paymentMethod,
    subtotal = 0,
    shippingFee = 0,
    total = 0,
    items = [],
    deliveryAddress,
    customer,
    timeline = [],
  } = currentOrder;

  const displayId = orderNumber || _id;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <Link
          to="/my-orders"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          <span>Back to All Orders</span>
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                #{displayId}
              </h1>
              <OrderStatusBadge status={orderStatus} />
              <PaymentStatusBadge status={paymentStatus} />
            </div>
            <p className="text-xs text-slate-400 mt-1">Placed on {formatDate(createdAt)}</p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-indigo-600">{formatPrice(total)}</span>
            <p className="text-xs text-slate-400">Total Order Amount</p>
          </div>
        </div>
      </div>

      {/* Interactive Order Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Order Progression</h3>
        <OrderTimeline orderStatus={orderStatus} timeline={timeline} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Ordered Products */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Ordered Items ({items.length})
          </h3>

          <div className="divide-y divide-slate-100">
            {items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                    <img
                      src={item.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-400">
                      Quantity: <span className="font-semibold text-slate-700">{item.quantity}</span>
                    </p>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping & Handling</span>
              <span className="font-semibold text-slate-800">
                {shippingFee === 0 ? <span className="text-emerald-600">FREE</span> : formatPrice(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-100 text-sm font-black text-slate-900">
              <span>Grand Total</span>
              <span className="text-lg text-indigo-600 font-black">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Address & Payment Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Delivery Address */}
          {deliveryAddress && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <HiOutlineMapPin className="h-5 w-5 text-indigo-600" />
                <span>Delivery Address</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800 text-sm">{deliveryAddress.fullName}</p>
                <p>
                  {deliveryAddress.houseNumber}, {deliveryAddress.street}
                </p>
                {deliveryAddress.landmark && <p>Near: {deliveryAddress.landmark}</p>}
                <p>
                  {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pinCode}
                </p>
                <p className="text-slate-800 font-semibold pt-1">Phone: {deliveryAddress.phone}</p>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <HiOutlineCreditCard className="h-5 w-5 text-indigo-600" />
              <span>Payment Details</span>
            </div>
            <div className="text-xs text-slate-600 space-y-2">
              <p>
                <span className="text-slate-400">Method: </span>
                <span className="font-semibold text-slate-800">{paymentMethod}</span>
              </p>
              <p>
                <span className="text-slate-400">Status: </span>
                <span className="font-semibold text-slate-800">{paymentStatus}</span>
              </p>
            </div>
          </div>

          {/* Physical shop support */}
          <div className="bg-indigo-50/70 rounded-3xl border border-indigo-100 p-5 text-xs text-indigo-950 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-indigo-900">
              <HiOutlineBuildingStorefront className="h-5 w-5 text-indigo-600" />
              <span>Physical Shop Inquiries</span>
            </div>
            <p className="text-indigo-800 leading-relaxed">
              Have questions regarding this order? Call our store counter directly at{' '}
              <span className="font-bold text-indigo-900">+91 98765 43210</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
