import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, fetchFeaturedProducts } from '../../features/products/productSlice';
import ProductGrid from '../../components/product/ProductGrid';
import Button from '../../components/common/Button';
import {
  HiOutlineShoppingBag,
  HiOutlineBuildingStorefront,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineTag,
} from 'react-icons/hi2';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { products, featuredProducts, categories, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8, sort: 'newest' }));
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const popularProducts = [...products].sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0)).slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 shadow-2xl">
        {/* Glow background effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1.5 rounded-full text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <HiOutlineBuildingStorefront className="h-4 w-4 text-indigo-400" />
              <span>Official Physical Shop Online Storefront</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
              Shop Real In-Store Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-300">From Anywhere.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Every item you see is verified, stocked, and packed directly at our physical retail counter. Enjoy authentic warranties, instant local dispatch, and transparent pricing.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/products">
                <Button variant="primary" size="lg" className="shadow-lg shadow-indigo-600/40 text-base font-bold">
                  <span>Browse Shop Inventory</span>
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/category/Electronics">
                <Button variant="secondary" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20 text-base font-semibold">
                  <span>Explore Electronics</span>
                </Button>
              </Link>
            </div>

            {/* Micro stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-left">
              <div>
                <span className="text-2xl font-black text-white">500+</span>
                <p className="text-xs text-slate-400">Shop Items Listed</p>
              </div>
              <div>
                <span className="text-2xl font-black text-emerald-400">100%</span>
                <p className="text-xs text-slate-400">Genuine Inventory</p>
              </div>
              <div>
                <span className="text-2xl font-black text-indigo-400">&lt; 2 Hrs</span>
                <p className="text-xs text-slate-400">Dispatch Speed</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                alt="Featured In-Store Product"
                className="w-full h-80 object-cover"
              />
              <div className="p-5 bg-slate-900/90 backdrop-blur-md text-left">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Featured In-Store Arrival
                </span>
                <h3 className="text-base font-bold text-white mt-1 truncate">
                  Sony WH-1000XM5 Wireless Headphones
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-white">₹24,990</span>
                    <span className="text-xs text-slate-400 line-through ml-2">₹29,990</span>
                  </div>
                  <Link to="/products/prod-101">
                    <Button variant="primary" size="sm" className="text-xs">
                      View Item
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <HiOutlineSparkles className="h-4 w-4" />
              <span>Shop By Department</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Store Categories
            </h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1">
            <span>View All</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category._id || category.name}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-16 w-16 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors mb-4 shadow-sm">
                <HiOutlineShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>
              <span className="text-xs text-slate-400 mt-1">
                {category.productCount || 4}+ Items
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-amber-600 text-xs font-bold uppercase tracking-wider">
              <HiOutlineSparkles className="h-4 w-4" />
              <span>Handpicked For You</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Products
            </h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1">
            <span>Explore All</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ProductGrid products={featuredProducts.slice(0, 4)} loading={loading} />
      </section>

      {/* Offers & Promotion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-block bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Special Shop Festival Offer
            </span>
            <h3 className="text-3xl sm:text-4xl font-black leading-tight">
              Up to 30% OFF on Selected Store Electronics & Apparel
            </h3>
            <p className="text-sm text-indigo-100 leading-relaxed">
              Visit our store counter or order online for direct doorstep dispatch. Free home delivery on orders over ₹999.
            </p>
            <div className="pt-2">
              <Link to="/products">
                <Button variant="secondary" size="md" className="font-bold text-slate-900">
                  Claim Discount Deals &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New In-Store Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <HiOutlineTag className="h-4 w-4" />
              <span>Just Added To Store Shelves</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              New Arrivals
            </h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1">
            <span>See More</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ProductGrid products={products.slice(0, 4)} loading={loading} />
      </section>

      {/* Popular In-Store Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold uppercase tracking-wider">
              <HiOutlineFire className="h-4 w-4" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Popular Products
            </h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1">
            <span>View All</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ProductGrid products={popularProducts} loading={loading} />
      </section>
    </div>
  );
};

export default HomePage;
