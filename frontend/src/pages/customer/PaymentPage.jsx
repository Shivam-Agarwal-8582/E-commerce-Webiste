import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { HiOutlineCreditCard, HiOutlineArrowLeft } from 'react-icons/hi2';

export const PaymentPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="h-16 w-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <HiOutlineCreditCard className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-black text-slate-900">Secure Payment Portal</h1>
      <p className="text-sm text-slate-500 max-w-md mx-auto">
        Payments on AuraStore are processed seamlessly at checkout with Razorpay and Cash on Delivery options.
      </p>
      <div className="pt-4 flex justify-center space-x-4">
        <Link to="/checkout">
          <Button variant="primary">Go to Checkout</Button>
        </Link>
        <Link to="/cart">
          <Button variant="secondary" className="flex items-center space-x-1.5">
            <HiOutlineArrowLeft className="h-4 w-4" />
            <span>Return to Cart</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;
