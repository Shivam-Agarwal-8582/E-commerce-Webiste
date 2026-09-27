import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ImageUploadPreview from '../../components/admin/ImageUploadPreview';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft } from 'react-icons/hi2';

export const AdminAddProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    stock: '',
    sku: '',
    brand: '',
    images: [],
    isFeatured: false,
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCats = async () => {
      const res = await adminService.getCategories();
      if (res.success && res.categories.length > 0) {
        setCategories(res.categories);
        setFormData((prev) => ({ ...prev, category: res.categories[0].name }));
      }
    };
    fetchCats();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImagesChange = (imgs) => {
    setFormData((prev) => ({ ...prev, images: imgs }));
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Valid price is required';
    if (formData.discountPrice && Number(formData.discountPrice) >= Number(formData.price)) {
      errs.discountPrice = 'Discount price must be lower than original price';
    }
    if (!formData.stock || Number(formData.stock) < 0) errs.stock = 'Stock quantity is required';
    if (!formData.category) errs.category = 'Category is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await adminService.addProduct(formData);
      if (res.success) {
        toast.success('Product added to store catalog!');
        navigate('/admin/products');
      }
    } catch {
      toast.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
        <Link
          to="/admin/products"
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
        >
          <HiOutlineArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Add New Shop Product</h1>
          <p className="text-xs text-slate-500">
            Publish an item from your physical retail stock onto the online website
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        {/* Basic info */}
        <div className="space-y-4">
          <Input
            label="Product Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
            error={errors.name}
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Product Description *
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed specifications, features, warranty, in-box items..."
              className={`w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 ${
                errors.description ? 'border-rose-400' : ''
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            label="MRP / Price (₹) *"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="29990"
            error={errors.price}
          />

          <Input
            label="Discount Price (₹)"
            name="discountPrice"
            type="number"
            value={formData.discountPrice}
            onChange={handleChange}
            placeholder="24990"
            error={errors.discountPrice}
          />

          <Input
            label="Stock Quantity *"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            placeholder="15"
            error={errors.stock}
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            >
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Brand & SKU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand / Manufacturer"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Sony, Apple, Nike..."
          />
          <Input
            label="SKU (Shop Barcode / Code)"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="SONY-WH1000XM5-BLK"
          />
        </div>

        {/* Image Upload & Previews */}
        <div className="pt-2 border-t border-slate-100">
          <ImageUploadPreview
            images={formData.images}
            onChange={handleImagesChange}
            maxImages={6}
          />
          {errors.images && (
            <p className="mt-1 text-xs text-rose-600 font-medium">{errors.images}</p>
          )}
        </div>

        {/* Flags */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6">
          <label className="flex items-center space-x-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs font-bold text-slate-800">
              Feature on Homepage & Banners
            </span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs font-bold text-slate-800">
              Active for Customer Purchases
            </span>
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="pt-6 border-t border-slate-100 flex justify-end space-x-3">
          <Link to="/admin/products">
            <Button variant="secondary" disabled={loading}>
              Cancel
            </Button>
          </Link>
          <Button variant="primary" type="submit" loading={loading} className="px-6 font-bold shadow-indigo-600/30">
            Publish Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProductPage;
