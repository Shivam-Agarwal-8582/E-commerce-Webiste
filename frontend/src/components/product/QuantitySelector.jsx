import React from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi2';

export const QuantitySelector = ({
  quantity = 1,
  max = 99,
  min = 1,
  onChange,
  size = 'md',
  disabled = false,
}) => {
  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      onChange(quantity + 1);
    }
  };

  const sizes = {
    sm: 'h-8 px-2 text-xs',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
  };

  return (
    <div
      className={`inline-flex items-center rounded-xl border border-slate-200 bg-white shadow-sm ${sizes[size]}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min || disabled}
        className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <HiMinus className="h-3.5 w-3.5" />
      </button>

      <span className="w-10 text-center font-bold text-slate-800 select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max || disabled}
        className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <HiPlus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default QuantitySelector;
