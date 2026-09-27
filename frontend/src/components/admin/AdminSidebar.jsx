import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';
import {
  HiOutlineChartBarSquare,
  HiOutlineCube,
  HiOutlinePlusCircle,
  HiOutlineTag,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineArrowRightOnRectangle,
  HiOutlineBuildingStorefront,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineXMark,
} from 'react-icons/hi2';

export const AdminSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    toast.success('Logged out from admin panel');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: HiOutlineChartBarSquare, end: true },
    { name: 'Products', path: '/admin/products', icon: HiOutlineCube, end: true },
    { name: 'Add Product', path: '/admin/products/add', icon: HiOutlinePlusCircle },
    { name: 'Categories', path: '/admin/categories', icon: HiOutlineTag },
    { name: 'Orders', path: '/admin/orders', icon: HiOutlineClipboardDocumentList },
    { name: 'Users', path: '/admin/users', icon: HiOutlineUsers },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <Link to="/admin" className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <HiOutlineBuildingStorefront className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-black text-white block leading-none">
                Aura<span className="text-indigo-400">Store</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <HiOutlineXMark className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-6 pb-2">
            <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Customer Store
            </p>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
          >
            <div className="flex items-center space-x-3">
              <HiOutlineBuildingStorefront className="h-5 w-5 text-indigo-400" />
              <span>Live Web Shop</span>
            </div>
            <HiOutlineArrowTopRightOnSquare className="h-4 w-4" />
          </Link>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
          >
            <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
