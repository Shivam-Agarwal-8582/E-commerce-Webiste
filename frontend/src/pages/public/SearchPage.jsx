import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productSlice';
import ProductGrid from '../../components/product/ProductGrid';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (query) {
      dispatch(fetchProducts({ search: query }));
    }
  }, [query, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-slate-200">
        <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <HiOutlineMagnifyingGlass className="h-4 w-4" />
          <span>Search Results</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mt-1">
          Results for &ldquo;{query}&rdquo;
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Found {products.length} {products.length === 1 ? 'item' : 'items'} in our shop catalog
        </p>
      </div>

      <ProductGrid
        products={products}
        loading={loading}
        emptyTitle={`No products found for "${query}"`}
        emptyDescription="Please check the spelling or try searching for another product brand or department."
      />
    </div>
  );
};

export default SearchPage;
