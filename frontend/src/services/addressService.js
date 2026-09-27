import api, { getMockDb } from '../api/axios';

export const addressService = {
  async getAddresses() {
    try {
      const response = await api.get('/addresses');
      return response.data;
    } catch {
      const db = getMockDb();
      return { success: true, addresses: db.addresses };
    }
  },

  async addAddress(addressData) {
    try {
      const response = await api.post('/addresses', addressData);
      return response.data;
    } catch {
      const db = getMockDb();
      const newAddress = {
        ...addressData,
        _id: 'addr-' + Date.now(),
      };
      if (newAddress.isDefault) {
        db.addresses = db.addresses.map((a) => ({ ...a, isDefault: false }));
      }
      db.addresses.push(newAddress);
      db.saveAddresses(db.addresses);
      return { success: true, address: newAddress };
    }
  },

  async updateAddress(id, addressData) {
    try {
      const response = await api.put(`/addresses/${id}`, addressData);
      return response.data;
    } catch {
      const db = getMockDb();
      if (addressData.isDefault) {
        db.addresses = db.addresses.map((a) => ({ ...a, isDefault: false }));
      }
      db.addresses = db.addresses.map((a) => (a._id === id ? { ...a, ...addressData } : a));
      db.saveAddresses(db.addresses);
      const updated = db.addresses.find((a) => a._id === id);
      return { success: true, address: updated };
    }
  },

  async deleteAddress(id) {
    try {
      const response = await api.delete(`/addresses/${id}`);
      return response.data;
    } catch {
      const db = getMockDb();
      db.addresses = db.addresses.filter((a) => a._id !== id);
      db.saveAddresses(db.addresses);
      return { success: true };
    }
  },

  async setDefaultAddress(id) {
    return this.updateAddress(id, { isDefault: true });
  },
};

export default addressService;
