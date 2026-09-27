import React from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineBars3, HiOutlineBell } from 'react-icons/hi2';

export const AdminHeader = ({ onMenuClick, title = 'Store Management' }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <HiOutlineBars3 className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center space-x-2 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-bold border border-emerald-200/60">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Shop Counter Online</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white flex items-center justify-center font-bold text-xs shadow-sm">
            A
          </div>
          <div className="hidden sm:block text-left text-xs">
            <p className="font-bold text-slate-800 leading-none">{user?.name || 'Administrator'}</p>
            <span className="text-[10px] text-indigo-600 font-semibold">Store Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
