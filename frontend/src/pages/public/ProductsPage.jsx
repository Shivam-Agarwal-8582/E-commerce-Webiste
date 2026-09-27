import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, resetFilters } from '../../features/products/productSlice';
import ProductGrid from '../../components/product/ProductGrid';
import ProductFilters from '../../components/product/ProductFilters';
import Pagination from '../../components/common/Pagination';
import Button from '../../components/common/Button';
import { HiOutlineAdjustmentsHorizontal, HiOutlineXMark } from 'react-icons/hi2';

export const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, total, page, pages, filters } = useSelector(
    (state) => state.products
  );

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchProducts({
        search: filters.search,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        inStock: filters.inStock,
        sort: filters.sort,
        page: 1,
        limit: 12,
      })
    );
  }, [dispatch, filters.category, filters.minPrice, filters.maxPrice, filters.inStock, filters.sort]);

  const handlePageChange = (newPage) => {
    dispatch(
      fetchProducts({
        ...filters,
        page: newPage,
        limit: 12,
      })
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            {filters.category && filters.category !== 'All' ? filters.category : 'All Shop Products'}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing {products.length} of {total} items available in physical shop inventory
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Button
            variant="secondary"
            onClick={() => setMobileFilterOpen(true)}
            className="w-full flex items-center justify-center space-x-2"
          >
            <HiOutlineAdjustmentsHorizontal className="h-5 w-5 text-indigo-600" />
            <span>Filters & Sorting</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <ProductFilters />
        </div>

        {/* Products Grid + Pagination */}
        <div className="lg:col-span-3 space-y-6">
          <ProductGrid
            products={products}
            loading={loading}
            onResetFilters={() => dispatch(resetFilters())}
          />

          <Pagination
            currentPage={page}
            totalPages={pages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative min-h-screen flex items-end sm:items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">Filter & Sort</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <HiOutlineXMark className="h-6 w-6" />
                </button>
              </div>
              <ProductFilters onApplyMobile={() => setMobileFilterOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
