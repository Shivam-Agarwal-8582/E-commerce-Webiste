import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import Modal from '../../components/common/Modal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';
import {
  HiOutlineTag,
  HiOutlinePlusCircle,
  HiOutlineTrash,
  HiOutlineShoppingBag,
} from 'react-icons/hi2';

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadCategories = async () => {
    setLoading(true);
    const res = await adminService.getCategories();
    setCategories(res.categories || []);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      toast.error('Category name is required');
      return;
    }

    setSaving(true);
    try {
      await adminService.addCategory({ name: newCatName.trim() });
      toast.success('Category added successfully');
      setNewCatName('');
      setIsModalOpen(false);
      loadCategories();
    } catch {
      toast.error('Failed to add category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteId) return;
    await adminService.deleteCategory(deleteId);
    toast.success('Category deleted');
    setDeleteId(null);
    loadCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Category Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize products into distinct physical store departments
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 text-xs font-bold"
        >
          <HiOutlinePlusCircle className="h-4 w-4" />
          <span>Add New Category</span>
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading store categories..." />
      ) : categories.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-sm text-slate-500">No categories created yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div
              key={c._id || c.name}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between hover:border-indigo-300 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <HiOutlineTag className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                  <p className="text-xs text-slate-400">
                    {c.productCount || 0} Products
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDeleteId(c._id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Delete Category"
              >
                <HiOutlineTrash className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Store Category"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddCategory} className="space-y-4">
          <Input
            label="Category Name *"
            placeholder="e.g. Health & Fitness, Toys, Groceries"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />

          <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={saving}>
              Save Category
            </Button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteCategory}
        title="Delete Category"
        message="Are you sure you want to delete this category? Associated products may need recategorization."
      />
    </div>
  );
};

export default AdminCategoriesPage;
