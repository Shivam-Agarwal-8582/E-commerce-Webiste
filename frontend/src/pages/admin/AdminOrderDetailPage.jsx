import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import OrderStatusBadge, { PaymentStatusBadge } from '../../components/order/OrderStatusBadge';
import OrderTimeline from '../../components/order/OrderTimeline';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { formatPrice, formatDate } from '../../utils/formatters';
import { ORDER_STATUS } from '../../utils/constants';
import toast from 'react-hot-toast';
import {
  HiOutlineArrowLeft,
  HiOutlineMapPin,
  HiOutlineUser,
  HiOutlineCreditCard,
  HiOutlineCheckBadge,
} from 'react-icons/hi2';

export const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadOrder = async () => {
    setLoading(true);
    try {
      const res = await adminService.getOrderById(id);
      if (res.success && res.order) {
        setOrder(res.order);
        setNewStatus(res.order.orderStatus);
      }
    } catch {
      toast.error('Could not load order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!newStatus) return;

    setUpdating(true);
    try {
      const res = await adminService.updateOrderStatus(
        id,
        newStatus,
        statusNote || `Status updated to ${newStatus} by admin`
      );
      if (res.success) {
        toast.success(`Order status updated to ${newStatus}`);
        setStatusNote('');
        loadOrder();
      }
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !order) {
    return <Loader text="Loading order information..." />;
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
  } = order;

  const displayId = orderNumber || _id;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <Link
            to="/admin/orders"
            className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-2"
          >
            <HiOutlineArrowLeft className="h-4 w-4" />
            <span>Back to All Orders</span>
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              Order #{displayId}
            </h1>
            <OrderStatusBadge status={orderStatus} />
            <PaymentStatusBadge status={paymentStatus} />
          </div>
          <p className="text-xs text-slate-400">Received on {formatDate(createdAt)}</p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-400">Total Order Amount</p>
          <span className="text-2xl font-black text-slate-900">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Admin Status Updater Card */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
          <HiOutlineCheckBadge className="h-5 w-5" />
          <span>Fulfillment Controls</span>
        </div>
        <h3 className="text-lg font-bold">Update Order Dispatch & Status</h3>

        <form onSubmit={handleUpdateStatus} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-4">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {Object.values(ORDER_STATUS).map((st) => (
                <option key={st} value={st} className="text-slate-900">
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-5">
            <input
              type="text"
              placeholder="Fulfillment note (e.g. Dispatched with Rider #4, Bill #102)..."
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/20 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="sm:col-span-3">
            <Button
              type="submit"
              variant="primary"
              loading={updating}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold h-full"
            >
              Update Status
            </Button>
          </div>
        </form>
      </div>

      {/* Interactive Timeline */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">Order Progression</h3>
        <OrderTimeline orderStatus={orderStatus} timeline={timeline} />
      </div>

      {/* Grid: Items & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Products */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Ordered Products ({items.length})
          </h3>

          <div className="divide-y divide-slate-100">
            {items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'}
                    alt={item.name}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 max-w-sm truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-500">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className="font-semibold text-slate-800">{formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-black text-slate-900">
              <span>Total</span>
              <span className="text-indigo-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        {/* Customer & Address */}
        <div className="lg:col-span-4 space-y-6">
          {/* Customer */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <HiOutlineUser className="h-5 w-5 text-indigo-600" />
              <span>Customer Details</span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 text-sm">{customer?.name || 'Customer'}</p>
              <p>Email: {customer?.email || 'N/A'}</p>
              <p>Phone: {customer?.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Delivery Address */}
          {deliveryAddress && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <HiOutlineMapPin className="h-5 w-5 text-indigo-600" />
                <span>Shipping Address</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">{deliveryAddress.fullName}</p>
                <p>{deliveryAddress.houseNumber}, {deliveryAddress.street}</p>
                {deliveryAddress.landmark && <p>Near: {deliveryAddress.landmark}</p>}
                <p>{deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pinCode}</p>
                <p className="font-semibold text-slate-800">Phone: {deliveryAddress.phone}</p>
              </div>
            </div>
          )}

          {/* Payment */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
              <HiOutlineCreditCard className="h-5 w-5 text-indigo-600" />
              <span>Payment Details</span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <p>Method: <span className="font-bold text-slate-800">{paymentMethod}</span></p>
              <p>Status: <span className="font-bold text-slate-800">{paymentStatus}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailPage;
