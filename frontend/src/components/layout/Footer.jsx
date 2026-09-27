import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineBuildingStorefront,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineArrowPath,
  HiOutlineLockClosed,
} from 'react-icons/hi2';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-slate-800 text-indigo-400">
              <HiOutlineBuildingStorefront className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct From Shop</h4>
              <p className="text-xs text-slate-400">100% Genuine in-store inventory</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-slate-800 text-emerald-400">
              <HiOutlineTruck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Express Delivery</h4>
              <p className="text-xs text-slate-400">Free delivery on orders ₹999+</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-slate-800 text-amber-400">
              <HiOutlineArrowPath className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">7 Days Return</h4>
              <p className="text-xs text-slate-400">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-slate-800 text-sky-400">
              <HiOutlineLockClosed className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Payments</h4>
              <p className="text-xs text-slate-400">Razorpay & Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Physical Shop info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                <HiOutlineBuildingStorefront className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Aura<span className="text-indigo-400">Store</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your favorite neighborhood physical shop now accessible 24/7 online. Experience real store quality, fair prices, and direct customer care with same-day local dispatch.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <HiOutlineMapPin className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>104 MG Road, Opposite Central Park, Civil Lines, Jaipur 302001</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <HiOutlinePhone className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span>+91 98765 43210 (Shop Counter)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <HiOutlineEnvelope className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                <span>contact@aurastore.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
              <li><Link to="/my-orders" className="hover:text-white transition-colors">Track Orders</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Customer Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Categories</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/Electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/category/Fashion%20%26%20Apparel" className="hover:text-white transition-colors">Fashion & Apparel</Link></li>
              <li><Link to="/category/Home%20%26%20Kitchen" className="hover:text-white transition-colors">Home & Kitchen</Link></li>
              <li><Link to="/category/Footwear" className="hover:text-white transition-colors">Footwear</Link></li>
              <li><Link to="/category/Grocery%20%26%20Essentials" className="hover:text-white transition-colors">Grocery & Essentials</Link></li>
            </ul>
          </div>

          {/* Store Hours */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Store Timings</h5>
            <div className="text-xs space-y-2 text-slate-400">
              <p className="flex justify-between">
                <span>Mon – Fri:</span>
                <span className="text-white font-medium">10:00 AM – 9:30 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-medium">10:00 AM – 10:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white font-medium">11:00 AM – 9:00 PM</span>
              </p>
            </div>
            <div className="mt-6 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <p className="text-xs text-indigo-300 font-semibold mb-1">Store Owner / Admin?</p>
              <Link to="/login" className="text-[11px] text-white underline hover:text-indigo-200">
                Log in to Store Manager &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} AuraStore Physical Shop. All rights reserved. MERN Stack E-Commerce Platform.</p>
      </div>
    </footer>
  );
};

export default Footer;
