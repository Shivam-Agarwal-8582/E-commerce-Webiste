import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import toast from 'react-hot-toast';
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineShoppingBag,
  HiOutlineMapPin,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('Signed out');
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <h1 className="text-3xl font-black text-slate-900">My Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal information, contact credentials, and shop preferences
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user?.name || 'Valued Customer'}</h2>
              <p className="text-xs text-slate-400">{user?.email}</p>
              <div className="mt-1">
                <Badge variant={role === 'admin' ? 'primary' : 'success'} size="sm">
                  {role === 'admin' ? 'Shop Administrator' : 'Verified Store Customer'}
                </Badge>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-rose-600 hover:bg-rose-50 flex items-center space-x-1.5"
          >
            <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <HiOutlineEnvelope className="h-4 w-4 text-indigo-500" />
              Email Address
            </span>
            <p className="font-bold text-slate-800 text-sm">{user?.email || 'N/A'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <HiOutlinePhone className="h-4 w-4 text-emerald-500" />
              Phone Number
            </span>
            <p className="font-bold text-slate-800 text-sm">{user?.phone || '+91 98765 43210'}</p>
          </div>
        </div>

        {/* Navigation Quick Cards */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/my-orders"
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <HiOutlineShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">My Orders</p>
                <p className="text-xs text-slate-400">View past store purchases & invoices</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600">&rarr;</span>
          </Link>

          <Link
            to="/address"
            className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/20 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <HiOutlineMapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Saved Addresses</p>
                <p className="text-xs text-slate-400">Manage delivery locations</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600">&rarr;</span>
          </Link>

          {role === 'admin' && (
            <Link
              to="/admin"
              className="sm:col-span-2 flex items-center justify-between p-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                  <HiOutlineCog6Tooth className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-indigo-950">Store Admin Dashboard</p>
                  <p className="text-xs text-indigo-700">Manage inventory, orders, prices, and users</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600">Open Dashboard &rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
