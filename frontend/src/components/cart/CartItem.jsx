import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../features/cart/cartSlice';
import { formatPrice } from '../../utils/formatters';
import QuantitySelector from '../product/QuantitySelector';
import { HiOutlineTrash } from 'react-icons/hi2';

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  if (!item) return null;

  const { _id, name, price, discountPrice, image, quantity, stock } = item;
  const currentPrice = discountPrice || price;
  const itemTotal = currentPrice * quantity;

  const handleQuantityChange = (newQty) => {
    dispatch(updateQuantity({ productId: _id, quantity: newQty }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(_id));
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm gap-4">
      {/* Product Image & Info */}
      <div className="flex items-center space-x-4 flex-1">
        <div className="h-20 w-20 flex-shrink-0 rounded-xl bg-slate-100 overflow-hidden border border-slate-200/60">
          <img
            src={image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'}
            alt={name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 max-w-sm">
            {name}
          </h4>
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-bold text-slate-800">{formatPrice(currentPrice)}</span>
            {discountPrice && discountPrice < price && (
              <span className="text-slate-400 line-through">{formatPrice(price)}</span>
            )}
            <span className="text-slate-400">each</span>
          </div>
          {stock && stock <= 5 && (
            <p className="text-[11px] text-amber-600 font-semibold">Only {stock} available in shop</p>
          )}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6">
        <QuantitySelector
          quantity={quantity}
          max={stock || 99}
          onChange={handleQuantityChange}
          size="sm"
        />

        <div className="text-right min-w-[90px]">
          <p className="text-sm font-extrabold text-slate-900">{formatPrice(itemTotal)}</p>
          <span className="text-[10px] text-slate-400 font-medium">Subtotal</span>
        </div>

        <button
          onClick={handleRemove}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Remove item"
        >
          <HiOutlineTrash className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
