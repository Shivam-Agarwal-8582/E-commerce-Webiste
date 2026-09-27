import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, demoLogin, clearError } from '../../features/auth/authSlice';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import toast from 'react-hot-toast';
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineBuildingStorefront,
  HiOutlineSparkles,
} from 'react-icons/hi2';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, role, loading, error } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || (role === 'admin' ? '/admin' : '/');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === 'admin' ? '/admin' : from, { replace: true });
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, role, navigate, from, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name]) {
      setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      toast.success('Welcome back!');
    } else {
      toast.error(result.payload || 'Login failed');
    }
  };

  const handleQuickDemo = (type) => {
    dispatch(demoLogin(type));
    toast.success(`Signed in as ${type === 'admin' ? 'Store Admin' : 'Customer'}!`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-indigo-600 text-white items-center justify-center shadow-lg shadow-indigo-600/30">
            <HiOutlineBuildingStorefront className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black text-slate-900">Sign in to AuraStore</h1>
          <p className="text-xs text-slate-500">
            Access your order history, delivery addresses, or store management
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        {/* Quick Demo Logins Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
            <HiOutlineSparkles className="h-4 w-4 text-amber-500" />
            <span>Instant Demo Logins (1-Click)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleQuickDemo('customer')}
              className="text-xs font-semibold"
            >
              Customer Demo
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleQuickDemo('admin')}
              className="text-xs font-semibold text-indigo-600 border-indigo-200 hover:bg-indigo-50"
            >
              Admin Demo
            </Button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            icon={HiOutlineEnvelope}
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            autoComplete="email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            icon={HiOutlineLockClosed}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full text-sm font-bold shadow-indigo-600/30 mt-2"
            loading={loading}
          >
            Sign In
          </Button>
        </form>

        {/* Register link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Don&apos;t have an account yet? </span>
          <Link to="/register" className="font-bold text-indigo-600 hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
