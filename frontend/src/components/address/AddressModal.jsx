import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

export const AddressModal = ({ isOpen, onClose, onSave, addressToEdit, loading = false }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    houseNumber: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pinCode: '',
    country: 'India',
    isDefault: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (addressToEdit) {
      setFormData(addressToEdit);
    } else {
      setFormData({
        fullName: '',
        phone: '',
        houseNumber: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        pinCode: '',
        country: 'India',
        isDefault: false,
      });
    }
    setErrors({});
  }, [addressToEdit, isOpen]);

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

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.houseNumber.trim()) newErrors.houseNumber = 'House/building is required';
    if (!formData.street.trim()) newErrors.street = 'Street/area is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pinCode.trim()) newErrors.pinCode = 'PIN code is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={addressToEdit ? 'Edit Delivery Address' : 'Add New Delivery Address'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name *"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Rahul Sharma"
            error={errors.fullName}
          />
          <Input
            label="Phone Number *"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            error={errors.phone}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Flat / House / Building *"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            placeholder="Flat 301, Tower B"
            error={errors.houseNumber}
          />
          <Input
            label="Street / Colony / Area *"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="MG Road, Civil Lines"
            error={errors.street}
          />
        </div>

        <Input
          label="Landmark (Optional)"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          placeholder="Near Metro Station or City Mall"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            label="City *"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Jaipur"
            error={errors.city}
          />
          <Input
            label="State *"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Rajasthan"
            error={errors.state}
          />
          <Input
            label="PIN Code *"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="302001"
            error={errors.pinCode}
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs font-semibold text-slate-700">
              Make this my default delivery address
            </span>
          </label>
        </div>

        <div className="mt-6 flex justify-end space-x-3 pt-3 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" loading={loading}>
            {addressToEdit ? 'Save Changes' : 'Add Address'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddressModal;
