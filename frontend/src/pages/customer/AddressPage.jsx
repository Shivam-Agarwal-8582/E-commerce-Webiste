import React, { useEffect, useState } from 'react';
import addressService from '../../services/addressService';
import AddressCard from '../../components/address/AddressCard';
import AddressModal from '../../components/address/AddressModal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import toast from 'react-hot-toast';
import { HiOutlinePlus, HiOutlineMapPin } from 'react-icons/hi2';

export const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const loadAddresses = async () => {
    setLoading(true);
    const res = await addressService.getAddresses();
    setAddresses(res.addresses || []);
    setLoading(false);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleSave = async (formData) => {
    if (addressToEdit) {
      await addressService.updateAddress(addressToEdit._id, formData);
      toast.success('Address updated successfully');
    } else {
      await addressService.addAddress(formData);
      toast.success('Address added successfully');
    }
    setIsModalOpen(false);
    setAddressToEdit(null);
    loadAddresses();
  };

  const handleEdit = (addr) => {
    setAddressToEdit(addr);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteTargetId) {
      await addressService.deleteAddress(deleteTargetId);
      toast.success('Address removed');
      setDeleteTargetId(null);
      loadAddresses();
    }
  };

  const handleSetDefault = async (id) => {
    await addressService.setDefaultAddress(id);
    toast.success('Default address updated');
    loadAddresses();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Delivery Addresses</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your saved addresses for one-click checkout and local shop delivery
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setAddressToEdit(null);
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 text-xs font-bold"
        >
          <HiOutlinePlus className="h-4 w-4" />
          <span>Add New Address</span>
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading your addresses..." />
      ) : addresses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <HiOutlineMapPin className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No saved addresses</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Add your residential or office address to enable swift deliveries directly from our shop.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              setAddressToEdit(null);
              setIsModalOpen(true);
            }}
          >
            Add First Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <AddressCard
              key={addr._id}
              address={addr}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteTargetId(id)}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}

      {/* Address Form Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setAddressToEdit(null);
        }}
        onSave={handleSave}
        addressToEdit={addressToEdit}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDelete}
        title="Delete Address"
        message="Are you sure you want to remove this delivery address? You will need to re-enter it for future orders."
      />
    </div>
  );
};

export default AddressPage;
