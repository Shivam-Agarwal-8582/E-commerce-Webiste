import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineMapPin,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiChevronDown,
} from 'react-icons/hi2';

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    await dispatch(logout());
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
      >
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-bold text-sm shadow-sm">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-xs font-bold text-slate-800 leading-none truncate max-w-[120px]">
            {user?.name || 'Account'}
          </p>
          <span className="text-[10px] text-slate-400 font-medium capitalize">
            {role === 'admin' ? 'Store Admin' : 'Customer'}
          </span>
        </div>
        <HiChevronDown className="h-4 w-4 text-slate-400 hidden lg:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-fade-in">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-xs text-slate-400 font-medium">Signed in as</p>
            <p className="text-sm font-bold text-slate-900 truncate">{user?.email}</p>
          </div>

          <div className="py-1">
            {role === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2.5 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <HiOutlineCog6Tooth className="h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}

            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <HiOutlineUser className="h-4 w-4 text-slate-400" />
              <span>My Profile</span>
            </Link>

            <Link
              to="/my-orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <HiOutlineShoppingBag className="h-4 w-4 text-slate-400" />
              <span>My Orders</span>
            </Link>

            <Link
              to="/address"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <HiOutlineMapPin className="h-4 w-4 text-slate-400" />
              <span>Delivery Addresses</span>
            </Link>
          </div>

          <div className="border-t border-slate-100 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
            >
              <HiOutlineArrowRightOnRectangle className="h-4 w-4 text-rose-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
