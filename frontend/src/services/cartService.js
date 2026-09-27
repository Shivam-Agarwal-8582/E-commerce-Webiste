import api from '../api/axios';

export const cartService = {
  async getCart() {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch {
      // Local cart is maintained in redux / localstorage
      return { success: true, items: [] };
    }
  },

  async syncCart(items) {
    try {
      const response = await api.post('/cart/sync', { items });
      return response.data;
    } catch {
      return { success: true, items };
    }
  },

  async addToCart(productId, quantity) {
    try {
      const response = await api.post('/cart', { productId, quantity });
      return response.data;
    } catch {
      return { success: true };
    }
  },

  async updateQuantity(productId, quantity) {
    try {
      const response = await api.put(`/cart/${productId}`, { quantity });
      return response.data;
    } catch {
      return { success: true };
    }
  },

  async removeFromCart(productId) {
    try {
      const response = await api.delete(`/cart/${productId}`);
      return response.data;
    } catch {
      return { success: true };
    }
  },
};

export default cartService;
