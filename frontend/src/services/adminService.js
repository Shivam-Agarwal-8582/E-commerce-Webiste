import api, { getMockDb } from '../api/axios';

export const adminService = {
  async getDashboardStats() {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch {
      const db = getMockDb();
      const totalProducts = db.products.length;
      const totalOrders = db.orders.length;
      const totalCustomers = db.users.filter((u) => u.role === 'customer').length;
      const totalSales = db.orders
        .filter((o) => o.paymentStatus === 'Paid' || o.orderStatus === 'Delivered')
        .reduce((sum, o) => sum + (o.total || 0), 0);
      const pendingOrders = db.orders.filter(
        (o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing'
      ).length;

      return {
        success: true,
        stats: {
          totalProducts,
          totalOrders,
          totalCustomers,
          totalSales,
          pendingOrders,
        },
        recentOrders: db.orders.slice(0, 5),
      };
    }
  },

  async getProducts(params = {}) {
    try {
      const response = await api.get('/admin/products', { params });
      return response.data;
    } catch {
      const db = getMockDb();
      let list = [...db.products];
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.brand && p.brand.toLowerCase().includes(q)) ||
            (p.sku && p.sku.toLowerCase().includes(q))
        );
      }
      if (params.category && params.category !== 'All') {
        list = list.filter((p) => p.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params.stockStatus) {
        if (params.stockStatus === 'in_stock') list = list.filter((p) => p.stock > 0);
        if (params.stockStatus === 'out_of_stock') list = list.filter((p) => p.stock === 0);
        if (params.stockStatus === 'low_stock') list = list.filter((p) => p.stock > 0 && p.stock <= 5);
      }
      return { success: true, products: list, total: list.length };
    }
  },

  async addProduct(productData) {
    try {
      const response = await api.post('/admin/products', productData);
      return response.data;
    } catch {
      const db = getMockDb();
      const newProduct = {
        _id: 'prod-' + Date.now(),
        ...productData,
        price: Number(productData.price),
        discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
        stock: Number(productData.stock || 0),
        images: productData.images && productData.images.length > 0
          ? productData.images
          : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'],
        createdAt: new Date().toISOString(),
        rating: 5.0,
        numReviews: 0,
      };
      db.products.unshift(newProduct);
      db.saveProducts(db.products);
      return { success: true, product: newProduct };
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/admin/products/${id}`, productData);
      return response.data;
    } catch {
      const db = getMockDb();
      db.products = db.products.map((p) =>
        p._id === id
          ? {
              ...p,
              ...productData,
              price: Number(productData.price),
              discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
              stock: Number(productData.stock || 0),
            }
          : p
      );
      db.saveProducts(db.products);
      const updated = db.products.find((p) => p._id === id);
      return { success: true, product: updated };
    }
  },

  async deleteProduct(id) {
    try {
      const response = await api.delete(`/admin/products/${id}`);
      return response.data;
    } catch {
      const db = getMockDb();
      db.products = db.products.filter((p) => p._id !== id);
      db.saveProducts(db.products);
      return { success: true };
    }
  },

  async getOrders(params = {}) {
    try {
      const response = await api.get('/admin/orders', { params });
      return response.data;
    } catch {
      const db = getMockDb();
      let list = [...db.orders];
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(q) ||
            (o.customer?.name && o.customer.name.toLowerCase().includes(q)) ||
            (o.customer?.email && o.customer.email.toLowerCase().includes(q))
        );
      }
      if (params.status && params.status !== 'All') {
        list = list.filter((o) => o.orderStatus === params.status);
      }
      return { success: true, orders: list, total: list.length };
    }
  },

  async getOrderById(id) {
    try {
      const response = await api.get(`/admin/orders/${id}`);
      return response.data;
    } catch {
      const db = getMockDb();
      const order = db.orders.find((o) => o._id === id || o.orderNumber === id);
      if (!order) throw new Error('Order not found');
      return { success: true, order };
    }
  },

  async updateOrderStatus(id, status, note = '') {
    try {
      const response = await api.put(`/admin/orders/${id}/status`, { status, note });
      return response.data;
    } catch {
      const db = getMockDb();
      db.orders = db.orders.map((o) => {
        if (o._id === id || o.orderNumber === id) {
          const updatedTimeline = [...(o.timeline || [])];
          updatedTimeline.push({
            status,
            timestamp: new Date().toISOString(),
            note: note || `Status updated to ${status} by admin`,
          });
          return {
            ...o,
            orderStatus: status,
            timeline: updatedTimeline,
            ...(status === 'Delivered' ? { paymentStatus: 'Paid' } : {}),
          };
        }
        return o;
      });
      db.saveOrders(db.orders);
      const updated = db.orders.find((o) => o._id === id || o.orderNumber === id);
      return { success: true, order: updated };
    }
  },

  async getUsers() {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch {
      const db = getMockDb();
      return { success: true, users: db.users };
    }
  },

  async getCategories() {
    try {
      const response = await api.get('/admin/categories');
      return response.data;
    } catch {
      const db = getMockDb();
      return { success: true, categories: db.categories };
    }
  },

  async addCategory(categoryData) {
    try {
      const response = await api.post('/admin/categories', categoryData);
      return response.data;
    } catch {
      const db = getMockDb();
      const newCategory = {
        _id: 'cat-' + Date.now(),
        name: categoryData.name,
        slug: categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        icon: categoryData.icon || 'HiOutlineShoppingBag',
        productCount: 0,
      };
      db.categories.push(newCategory);
      db.saveCategories(db.categories);
      return { success: true, category: newCategory };
    }
  },

  async deleteCategory(id) {
    try {
      const response = await api.delete(`/admin/categories/${id}`);
      return response.data;
    } catch {
      const db = getMockDb();
      db.categories = db.categories.filter((c) => c._id !== id);
      db.saveCategories(db.categories);
      return { success: true };
    }
  },
};

export default adminService;
