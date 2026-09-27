import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import OrderStatusBadge, { PaymentStatusBadge } from '../../components/order/OrderStatusBadge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { formatPrice, formatDate } from '../../utils/formatters';
import { ORDER_STATUS } from '../../utils/constants';
import toast from 'react-hot-toast';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRight,
  HiOutlineClipboardDocumentList,
} from 'react-icons/hi2';

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const loadOrders = async () => {
    setLoading(true);
    const res = await adminService.getOrders({
      search,
      status: selectedStatus === 'All' ? undefined : selectedStatus,
    });
    setOrders(res.orders || []);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [selectedStatus]);

  const handleQuickStatusChange = async (orderId, newStatus) => {
    await adminService.updateOrderStatus(orderId, newStatus, `Status changed to ${newStatus} from orders list`);
    toast.success(`Order #${orderId} marked as ${newStatus}`);
    loadOrders();
  };

  const statuses = ['All', ...Object.values(ORDER_STATUS)];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Customer Orders Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track fulfillment, update shipping status, and view customer invoices
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-3">
        <form onSubmit={(e) => { e.preventDefault(); loadOrders(); }} className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by order ID, customer name, phone, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        </form>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full md:w-56 bg-slate-50 border border-slate-200 text-xs rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700"
        >
          {statuses.map((st) => (
            <option key={st} value={st}>
              {st === 'All' ? 'All Order Statuses' : st}
            </option>
          ))}
        </select>

        <Button variant="secondary" size="sm" onClick={loadOrders} className="text-xs w-full md:w-auto">
          Filter
        </Button>
      </div>

      {/* Orders Table */}
      {loading ? (
        <Loader text="Loading orders..." />
      ) : orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
          <HiOutlineClipboardDocumentList className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No orders found</p>
          <p className="text-xs text-slate-400">Try clearing filters or search terms</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Fulfillment Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => {
                  const displayId = ord.orderNumber || ord._id;

                  return (
                    <tr key={ord._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        #{displayId}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-800">{ord.customer?.name || 'Customer'}</p>
                        <p className="text-[10px] text-slate-400">{ord.customer?.phone || ord.customer?.email}</p>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {ord.items?.length || 0} items
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatPrice(ord.total)}
                      </td>

                      <td className="py-3.5 px-4">
                        <PaymentStatusBadge status={ord.paymentStatus} />
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleQuickStatusChange(displayId, e.target.value)}
                          className="text-[11px] font-bold rounded-lg border border-slate-200 bg-white py-1 px-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {Object.values(ORDER_STATUS).map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">
                        {formatDate(ord.createdAt)}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link to={`/admin/orders/${displayId}`}>
                          <Button variant="secondary" size="sm" className="text-xs">
                            Manage &rarr;
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
