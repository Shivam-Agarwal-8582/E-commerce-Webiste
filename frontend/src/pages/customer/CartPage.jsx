import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { HiOutlineShoppingBag, HiOutlineTrash, HiOutlineArrowLeft } from 'react-icons/hi2';

export const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalQuantity } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <EmptyState
          icon={HiOutlineShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added any items from our shop shelves yet."
          actionText="Start Shopping"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Your Shopping Cart</h1>
          <p className="text-sm text-slate-500 mt-1">
            {totalQuantity} {totalQuantity === 1 ? 'product' : 'products'} selected from store
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/products">
            <Button variant="secondary" size="sm" className="flex items-center space-x-1.5 text-xs">
              <HiOutlineArrowLeft className="h-4 w-4" />
              <span>Continue Shopping</span>
            </Button>
          </Link>
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center space-x-1 text-xs font-semibold text-rose-500 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50 transition-colors"
          >
            <HiOutlineTrash className="h-4 w-4" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4 sticky top-24">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
