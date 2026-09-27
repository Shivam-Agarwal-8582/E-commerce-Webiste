import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { formatPrice, calculateDiscountPercentage } from '../../utils/formatters';
import Badge from '../common/Badge';
import Button from '../common/Button';
import toast from 'react-hot-toast';
import {
  HiOutlineShoppingBag,
  HiOutlineEye,
  HiStar,
} from 'react-icons/hi2';

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) return null;

  const {
    _id,
    name,
    price,
    discountPrice,
    category,
    images = [],
    stock = 0,
    rating = 4.5,
    numReviews = 0,
    isFeatured,
  } = product;

  const isOutOfStock = stock <= 0;
  const discountPercent = calculateDiscountPercentage(price, discountPrice);
  const mainImage = images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`${name.slice(0, 26)}... added to cart!`);
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Badges Top Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-1.5">
          {discountPercent > 0 && (
            <span className="bg-rose-500 text-white text-[11px] font-black px-2 py-0.5 rounded-lg shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {isFeatured && (
            <span className="bg-amber-400 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-lg shadow-sm uppercase tracking-wide">
              Featured
            </span>
          )}
        </div>

        <div>
          {isOutOfStock ? (
            <Badge variant="danger" size="sm">Out of Stock</Badge>
          ) : stock <= 5 ? (
            <Badge variant="warning" size="sm">Only {stock} left</Badge>
          ) : (
            <Badge variant="success" size="sm">In Stock</Badge>
          )}
        </div>
      </div>

      {/* Image with hover zoom */}
      <Link to={`/products/${_id}`} className="relative block aspect-square overflow-hidden bg-slate-100">
        <img
          src={mainImage}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center space-x-1.5 bg-white/95 text-slate-800 text-xs font-bold py-2 px-3.5 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <HiOutlineEye className="h-4 w-4" />
            <span>View Details</span>
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-600 bg-indigo-50/60 px-2 py-0.5 rounded-md">
            {category}
          </span>
          <div className="flex items-center space-x-1 text-amber-500">
            <HiStar className="h-3.5 w-3.5 fill-current" />
            <span className="font-bold text-slate-700 text-xs">{rating}</span>
            <span className="text-[10px] text-slate-400">({numReviews})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link to={`/products/${_id}`} className="block flex-1 group/title">
          <h3 className="text-sm font-bold text-slate-800 group-hover/title:text-indigo-600 line-clamp-2 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-lg font-black text-slate-900">
            {formatPrice(discountPrice || price)}
          </span>
          {discountPrice && discountPrice < price && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/products/${_id}`)}
            className="w-full text-xs font-semibold"
          >
            Details
          </Button>

          <Button
            variant="primary"
            size="sm"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="w-full text-xs font-semibold flex items-center space-x-1"
          >
            <HiOutlineShoppingBag className="h-3.5 w-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
