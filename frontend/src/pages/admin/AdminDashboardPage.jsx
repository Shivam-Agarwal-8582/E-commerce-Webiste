import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import StatCard from '../../components/admin/StatCard';
import OrderStatusBadge, { PaymentStatusBadge } from '../../components/order/OrderStatusBadge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { formatPrice, formatDate } from '../../utils/formatters';
import {
  HiOutlineCube,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineCurrencyRupee,
  HiOutlineClock,
  HiOutlinePlusCircle,
  HiOutlineArrowRight,
  HiOutlineBuildingStorefront,
} from 'react-icons/hi2';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      const res = await adminService.getDashboardStats();
      if (res.success) {
        setStats(res.stats);
        setRecentOrders(res.recentOrders || []);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader text="Loading store metrics and analytics..." />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <HiOutlineBuildingStorefront className="h-4 w-4" />
            <span>Store Operations Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">Physical Store Dashboard</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time synchronization of products, customer orders, and shop inventory.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/admin/products/add">
            <Button variant="primary" size="sm" className="flex items-center space-x-1.5 font-bold shadow-indigo-600/40">
              <HiOutlinePlusCircle className="h-4 w-4" />
              <span>Add Product</span>
            </Button>
          </Link>
          <Link to="/admin/orders">
            <Button variant="secondary" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <span>View Orders</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Products"
          value={stats?.totalProducts || 0}
          subtitle="In shop catalog"
          icon={HiOutlineCube}
          color="indigo"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          subtitle="Lifetime orders"
          icon={HiOutlineClipboardDocumentList}
          color="sky"
        />
        <StatCard
          title="Total Customers"
          value={stats?.totalCustomers || 0}
          subtitle="Registered users"
          icon={HiOutlineUsers}
          color="emerald"
        />
        <StatCard
          title="Total Sales"
          value={formatPrice(stats?.totalSales || 0)}
          subtitle="Verified revenue"
          icon={HiOutlineCurrencyRupee}
          color="amber"
        />
        <StatCard
          title="Pending Orders"
          value={stats?.pendingOrders || 0}
          subtitle="Needs counter action"
          icon={HiOutlineClock}
          color="rose"
        />
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Customer Orders</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest transactions placed online for doorstep delivery or store pickup
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>View All Orders</span>
            <HiOutlineArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((ord) => (
                <tr key={ord._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                    #{ord.orderNumber || ord._id}
                  </td>
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-slate-800">{ord.customer?.name || 'Customer'}</p>
                    <p className="text-[10px] text-slate-400">{ord.customer?.phone || ord.customer?.email}</p>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">{formatDate(ord.createdAt)}</td>
                  <td className="py-3.5 px-3 font-bold text-slate-900">{formatPrice(ord.total)}</td>
                  <td className="py-3.5 px-3">
                    <PaymentStatusBadge status={ord.paymentStatus} />
                  </td>
                  <td className="py-3.5 px-3">
                    <OrderStatusBadge status={ord.orderStatus} />
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link to={`/admin/orders/${ord.orderNumber || ord._id}`}>
                      <Button variant="secondary" size="sm" className="text-xs">
                        Manage
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
