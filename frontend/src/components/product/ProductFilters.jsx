import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, resetFilters } from '../../features/products/productSlice';
import Button from '../common/Button';
import { HiOutlineAdjustmentsHorizontal, HiOutlineArrowPath } from 'react-icons/hi2';

export const ProductFilters = ({ onApplyMobile }) => {
  const dispatch = useDispatch();
  const { filters, categories } = useSelector((state) => state.products);

  const handleCategoryChange = (catName) => {
    dispatch(setFilter({ category: catName }));
    if (onApplyMobile) onApplyMobile();
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ [name]: value }));
  };

  const handleStockToggle = (e) => {
    dispatch(setFilter({ inStock: e.target.checked }));
    if (onApplyMobile) onApplyMobile();
  };

  const handleSortChange = (e) => {
    dispatch(setFilter({ sort: e.target.value }));
    if (onApplyMobile) onApplyMobile();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    if (onApplyMobile) onApplyMobile();
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
          <HiOutlineAdjustmentsHorizontal className="h-5 w-5 text-indigo-600" />
          <span>Filter Products</span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors font-semibold"
        >
          <HiOutlineArrowPath className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Sort selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Sort By
        </label>
        <select
          value={filters.sort}
          onChange={handleSortChange}
          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Category
        </label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
              filters.category === 'All'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((c) => (
            <button
              key={c._id || c.name}
              onClick={() => handleCategoryChange(c.name)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                filters.category === c.name
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="truncate">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Price Range (₹)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={filters.minPrice || ''}
            onChange={handlePriceChange}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={filters.maxPrice || ''}
            onChange={handlePriceChange}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-2">
        <label className="flex items-center space-x-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={handleStockToggle}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-xs font-semibold text-slate-700">In Stock Items Only</span>
        </label>
      </div>

      {onApplyMobile && (
        <Button variant="primary" size="sm" className="w-full" onClick={onApplyMobile}>
          Apply Filters
        </Button>
      )}
    </div>
  );
};

export default ProductFilters;
