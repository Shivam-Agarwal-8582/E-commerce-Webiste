import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import productService from '../../services/productService';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ImageUploadPreview from '../../components/admin/ImageUploadPreview';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft } from 'react-icons/hi2';

export const AdminEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productService.getProductById(id),
          adminService.getCategories(),
        ]);

        if (catRes.success) setCategories(catRes.categories || []);

        if (prodRes.success && prodRes.product) {
          const p = prodRes.product;
          setFormData({
            name: p.name || '',
            description: p.description || '',
            price: p.price || '',
            discountPrice: p.discountPrice || '',
            category: p.category || '',
            stock: p.stock ?? '',
            sku: p.sku || '',
            brand: p.brand || '',
            images: p.images || [],
            isFeatured: !!p.isFeatured,
            isActive: p.isActive !== false,
          });
        }
      } catch (err) {
        toast.error('Failed to load product details');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) errs.price = 'Valid price is required';
    if (formData.discountPrice && Number(formData.discountPrice) >= Number(formData.price)) {
      errs.discountPrice = 'Discount price must be lower than original price';
    }
    if (formData.stock === '' || Number(formData.stock) < 0) errs.stock = 'Stock quantity is required';
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

    setSaving(true);
    try {
      const res = await adminService.updateProduct(id, formData);
      if (res.success) {
        toast.success('Product updated successfully!');
        navigate('/admin/products');
      }
    } catch {
      toast.error('Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (initialLoading) {
    return <Loader text="Loading product for editing..." />;
  }

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
          <h1 className="text-2xl font-black text-slate-900">Edit Shop Product</h1>
          <p className="text-xs text-slate-500">
            Update pricing, stock count, descriptions, or gallery for {formData.name}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="space-y-4">
          <Input
            label="Product Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
              className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600/20"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-rose-600 font-medium">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Input
            label="Price (₹) *"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
          />

          <Input
            label="Discount Price (₹)"
            name="discountPrice"
            type="number"
            value={formData.discountPrice}
            onChange={handleChange}
            error={errors.discountPrice}
          />

          <Input
            label="Stock Quantity *"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
          <Input
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>

        <div className="pt-2 border-t border-slate-100">
          <ImageUploadPreview
            images={formData.images}
            onChange={handleImagesChange}
            maxImages={6}
          />
        </div>

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
              Featured Product
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
              Active / Visible in Catalog
            </span>
          </label>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end space-x-3">
          <Link to="/admin/products">
            <Button variant="secondary" disabled={saving}>
              Cancel
            </Button>
          </Link>
          <Button variant="primary" type="submit" loading={saving} className="px-6 font-bold shadow-indigo-600/30">
            Save Modifications
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProductPage;
