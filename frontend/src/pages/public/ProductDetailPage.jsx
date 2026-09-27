import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchProducts } from '../../features/products/productSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { formatPrice, calculateDiscountPercentage } from '../../utils/formatters';
import ProductImageGallery from '../../components/product/ProductImageGallery';
import QuantitySelector from '../../components/product/QuantitySelector';
import ProductGrid from '../../components/product/ProductGrid';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';
import {
  HiOutlineShoppingBag,
  HiOutlineBolt,
  HiStar,
  HiOutlineBuildingStorefront,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineArrowLeft,
} from 'react-icons/hi2';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProduct, products, loading } = useSelector((state) => state.products);
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProductById(id));
    dispatch(fetchProducts({ limit: 4 }));
  }, [id, dispatch]);

  if (loading || !currentProduct) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader text="Loading product details from shop..." />
      </div>
    );
  }

  const {
    _id,
    name,
    description,
    price,
    discountPrice,
    category,
    brand,
    sku,
    stock = 0,
    images = [],
    rating = 4.8,
    numReviews = 32,
    isFeatured,
  } = currentProduct;

  const isOutOfStock = stock <= 0;
  const discountPercent = calculateDiscountPercentage(price, discountPrice);
  const activePrice = discountPrice || price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    dispatch(addToCart({ product: currentProduct, quantity: selectedQty }));
    toast.success(`${selectedQty} × ${name.slice(0, 25)}... added to cart!`);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    dispatch(addToCart({ product: currentProduct, quantity: selectedQty }));
    navigate('/checkout');
  };

  const relatedProducts = products.filter((p) => p._id !== _id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb / Back button */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 hover:text-indigo-600 font-semibold"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-600">
          Products
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{name}</span>
      </div>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Product Images */}
        <div className="lg:col-span-7">
          <ProductImageGallery images={images} productName={name} />
        </div>

        {/* Right: Product Details & Purchase */}
        <div className="lg:col-span-5 space-y-6">
          {/* Badges & Category */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {category}
            </span>
            {brand && (
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                Brand: {brand}
              </span>
            )}
            {isFeatured && (
              <Badge variant="warning" size="sm">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {name}
          </h1>

          {/* Rating & SKU */}
          <div className="flex items-center space-x-4 text-xs pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-1 text-amber-500">
              <HiStar className="h-4 w-4 fill-current" />
              <span className="font-bold text-slate-800 text-sm">{rating}</span>
              <span className="text-slate-400">({numReviews} store reviews)</span>
            </div>
            {sku && <span className="text-slate-400">SKU: {sku}</span>}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-black text-slate-900">
                {formatPrice(activePrice)}
              </span>
              {discountPrice && discountPrice < price && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(price)}
                  </span>
                  <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-400">Inclusive of all physical store taxes</p>
          </div>

          {/* Stock Status Banner */}
          <div className="p-3.5 rounded-2xl border bg-slate-50 border-slate-200">
            {isOutOfStock ? (
              <div className="flex items-center space-x-2 text-rose-600 font-bold text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-600" />
                <span>Currently Out of Stock at Shop Counter</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>In Stock & Available at Physical Shop</span>
                </div>
                <span className="text-slate-500">{stock} units in store</span>
              </div>
            )}
          </div>

          {/* Quantity and CTA Buttons */}
          <div className="space-y-4 pt-2">
            {!isOutOfStock && (
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Quantity
                </span>
                <QuantitySelector
                  quantity={selectedQty}
                  max={stock}
                  onChange={setSelectedQty}
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                variant="secondary"
                size="lg"
                disabled={isOutOfStock}
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2"
              >
                <HiOutlineShoppingBag className="h-5 w-5" />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </Button>

              <Button
                variant="primary"
                size="lg"
                disabled={isOutOfStock}
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center space-x-2 shadow-indigo-600/30"
              >
                <HiOutlineBolt className="h-5 w-5" />
                <span>Buy Now</span>
              </Button>
            </div>
          </div>

          {/* Store Guarantee Cards */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50">
              <HiOutlineBuildingStorefront className="h-5 w-5 text-indigo-600 flex-shrink-0" />
              <span>Direct shop counter pickup available</span>
            </div>
            <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50">
              <HiOutlineTruck className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>Same-day dispatch for local orders</span>
            </div>
          </div>

          {/* Product Description */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Description & Specifications
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              Related In-Store Products
            </h2>
            <Link
              to={`/category/${encodeURIComponent(category)}`}
              className="text-sm font-bold text-indigo-600 hover:underline"
            >
              View more in {category} &rarr;
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
