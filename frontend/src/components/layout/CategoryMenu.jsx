import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../features/products/productSlice';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';

export const CategoryMenu = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <div className="bg-white border-b border-slate-200/80 shadow-sm hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-2.5 scrollbar-none text-xs font-semibold uppercase tracking-wider text-slate-600">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <HiOutlineSquares2X2 className="h-4 w-4" />
            <span>All Products</span>
          </NavLink>

          {categories.map((cat) => (
            <NavLink
              key={cat._id || cat.name}
              to={`/category/${encodeURIComponent(cat.name)}`}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {cat.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
