import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import CategoryMenu from './CategoryMenu';
import UserDropdown from './UserDropdown';
import Button from '../common/Button';
import {
  HiOutlineShoppingBag,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineBuildingStorefront,
  HiOutlineTag,
} from 'react-icons/hi2';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top micro-bar for physical shop announcement */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-white text-[11px] font-medium py-1.5 px-4 text-center tracking-wide">
        <span className="inline-flex items-center gap-2">
          <HiOutlineBuildingStorefront className="h-3.5 w-3.5 text-indigo-300" />
          <span>Physical Store: 104 MG Road, Civil Lines — Open Today: 10:00 AM - 9:30 PM | Free store pickup & delivery on orders above ₹999</span>
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group flex-shrink-0">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <HiOutlineBuildingStorefront className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 font-sans block leading-none">
                Aura<span className="text-indigo-600">Store</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mt-0.5">
                Physical Shop & Online
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6">
            <SearchBar className="w-full" />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Quick Link to Products on desktop */}
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `hidden sm:flex items-center space-x-1.5 text-sm font-semibold px-3 py-2 rounded-xl transition-colors ${
                  isActive ? 'text-indigo-600 bg-indigo-50' : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
                }`
              }
            >
              <HiOutlineTag className="h-4 w-4" />
              <span>All Shop Items</span>
            </NavLink>

            {/* Shopping Cart Icon with dynamic badge */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <HiOutlineShoppingBag className="h-6 w-6" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white ring-2 ring-white animate-fade-in shadow-sm">
                  {totalQuantity > 99 ? '99+' : totalQuantity}
                </span>
              )}
            </Link>

            {/* User Dropdown or Sign In */}
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Join
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineBars3 className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <SearchBar className="w-full" />
        </div>
      </div>

      {/* Categories Bar */}
      <CategoryMenu />

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              All Products
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Shopping Cart</span>
              <span className="bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full text-xs">
                {totalQuantity} items
              </span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/my-orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
                >
                  My Orders
                </Link>
                <Link
                  to="/address"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
                >
                  Saved Addresses
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
                >
                  My Profile
                </Link>
                {role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-bold text-indigo-600 rounded-lg bg-indigo-50"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
