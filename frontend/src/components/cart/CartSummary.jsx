import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';
import { FREE_DELIVERY_THRESHOLD } from '../../utils/constants';
import Button from '../common/Button';
import { HiOutlineShieldCheck, HiOutlineTruck } from 'react-icons/hi2';

export const CartSummary = ({ showCheckoutButton = true, onProceed }) => {
  const navigate = useNavigate();
  const { subtotal, deliveryCharge, grandTotal, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const handleCheckout = () => {
    if (onProceed) {
      onProceed();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
        Order Summary ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
      </h3>

      {/* Free Delivery Bar */}
      <div className="bg-indigo-50/60 rounded-xl p-3 border border-indigo-100/60">
        <div className="flex items-center space-x-2 text-xs font-bold text-indigo-900 mb-2">
          <HiOutlineTruck className="h-4 w-4 text-indigo-600 flex-shrink-0" />
          <span>
            {amountNeededForFreeDelivery === 0
              ? '🎉 You unlocked FREE Express Delivery!'
              : `Add ${formatPrice(amountNeededForFreeDelivery)} more for FREE Delivery`}
          </span>
        </div>
        <div className="w-full bg-indigo-200/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${freeDeliveryProgress}%` }}
          />
        </div>
      </div>

      {/* Line Items */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Items Subtotal</span>
          <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Estimated Delivery</span>
          <span className="font-semibold text-slate-800">
            {deliveryCharge === 0 ? (
              <span className="text-emerald-600 font-bold">FREE</span>
            ) : (
              formatPrice(deliveryCharge)
            )}
          </span>
        </div>
        <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
          <div>
            <span className="text-base font-black text-slate-900">Total Amount</span>
            <p className="text-[11px] text-slate-400">Inclusive of all local shop taxes</p>
          </div>
          <span className="text-xl font-black text-indigo-600">
            {formatPrice(grandTotal)}
          </span>
        </div>
      </div>

      {showCheckoutButton && (
        <Button
          variant="primary"
          size="lg"
          className="w-full text-base font-bold shadow-indigo-600/30"
          onClick={handleCheckout}
          disabled={totalQuantity === 0}
        >
          Proceed to Checkout
        </Button>
      )}

      <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 pt-2">
        <HiOutlineShieldCheck className="h-4 w-4 text-emerald-500" />
        <span>Safe & Secure 256-bit Encrypted Checkout</span>
      </div>
    </div>
  );
};

export default CartSummary;
