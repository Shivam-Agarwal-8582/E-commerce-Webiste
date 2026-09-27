import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productSlice';
import ProductGrid from '../../components/product/ProductGrid';
import { HiOutlineTag, HiOutlineArrowLeft } from 'react-icons/hi2';

export const CategoryPage = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category || '');
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (decodedCategory) {
      dispatch(fetchProducts({ category: decodedCategory }));
    }
  }, [decodedCategory, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Title */}
      <div className="space-y-3 pb-6 border-b border-slate-200">
        <Link
          to="/products"
          className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-indigo-600"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          <span>Back to All Products</span>
        </Link>
        <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
          <HiOutlineTag className="h-4 w-4" />
          <span>Category</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">{decodedCategory}</h1>
        <p className="text-sm text-slate-500">
          Explore all authentic products in {decodedCategory} from our physical store shelves.
        </p>
      </div>

      <ProductGrid
        products={products}
        loading={loading}
        emptyTitle={`No products currently in ${decodedCategory}`}
        emptyDescription="We are restocking this section at our store counter soon. Check back shortly!"
      />
    </div>
  );
};

export default CategoryPage;
