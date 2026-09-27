import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../services/adminService';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { formatPrice, formatDate } from '../../utils/formatters';
import toast from 'react-hot-toast';
import {
  HiOutlinePlusCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlineMagnifyingGlass,
} from 'react-icons/hi2';

export const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockStatus, setStockStatus] = useState('All');
  const [deleteId, setDeleteId] = useState(null);

  const loadProducts = async () => {
    setLoading(true);
    const [prodRes, catRes] = await Promise.all([
      adminService.getProducts({
        search,
        category: selectedCategory,
        stockStatus: stockStatus === 'All' ? undefined : stockStatus,
      }),
      adminService.getCategories(),
    ]);
    setProducts(prodRes.products || []);
    setCategories(catRes.categories || []);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, stockStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const handleDeleteProduct = async () => {
    if (!deleteId) return;
    await adminService.deleteProduct(deleteId);
    toast.success('Product deleted from store catalog');
    setDeleteId(null);
    loadProducts();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Product Inventory Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Total {products.length} products listed in the physical store database
          </p>
        </div>

        <Link to="/admin/products/add">
          <Button variant="primary" className="flex items-center space-x-2 text-xs font-bold">
            <HiOutlinePlusCircle className="h-4 w-4" />
            <span>Add New Product</span>
          </Button>
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search by product name, SKU, brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <HiOutlineMagnifyingGlass className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        </form>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-48 bg-slate-50 border border-slate-200 text-xs rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-700"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Stock Filter */}
        <select
          value={stockStatus}
          onChange={(e) => setStockStatus(e.target.value)}
          className="w-full md:w-44 bg-slate-50 border border-slate-200 text-xs rounded-xl py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-700"
        >
          <option value="All">All Stock Levels</option>
          <option value="in_stock">In Stock (&gt;0)</option>
          <option value="low_stock">Low Stock (≤5)</option>
          <option value="out_of_stock">Out of Stock (0)</option>
        </select>

        <Button variant="secondary" size="sm" onClick={loadProducts} className="text-xs w-full md:w-auto">
          Filter
        </Button>
      </div>

      {/* Product Table */}
      {loading ? (
        <Loader text="Loading shop products..." />
      ) : products.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-500">No products found matching the criteria.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Shop Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date Added</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((prod) => {
                  const isOut = prod.stock <= 0;
                  const isLow = prod.stock > 0 && prod.stock <= 5;
                  const img = prod.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';

                  return (
                    <tr key={prod._id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Product Thumbnail & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3 max-w-xs">
                          <img
                            src={img}
                            alt={prod.name}
                            className="h-12 w-12 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">{prod.name}</p>
                            <p className="text-[10px] text-slate-400">SKU: {prod.sku || 'N/A'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-slate-700 font-medium">
                        {prod.category}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-900">
                            {formatPrice(prod.discountPrice || prod.price)}
                          </p>
                          {prod.discountPrice && (
                            <p className="text-[10px] text-slate-400 line-through">
                              {formatPrice(prod.price)}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            isOut
                              ? 'bg-rose-50 text-rose-700'
                              : isLow
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {prod.stock} units
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <Badge variant={prod.isActive ? 'success' : 'default'} size="sm">
                          {prod.isActive ? 'Active' : 'Draft'}
                        </Badge>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-slate-400">
                        {formatDate(prod.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <Link to={`/admin/products/edit/${prod._id}`}>
                            <button
                              className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                              title="Edit Product"
                            >
                              <HiOutlinePencilSquare className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => setDeleteId(prod._id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Product"
                          >
                            <HiOutlineTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteProduct}
        title="Delete Product from Shop"
        message="Are you sure you want to delete this product? It will be immediately removed from both online listings and admin inventory."
      />
    </div>
  );
};

export default AdminProductsPage;
