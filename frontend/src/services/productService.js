import api, { getMockDb } from '../api/axios';

export const productService = {
  async getProducts(params = {}) {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (err) {
      // Offline fallback
      const db = getMockDb();
      let list = [...db.products];

      if (params.search) {
        const query = params.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            (p.brand && p.brand.toLowerCase().includes(query)) ||
            p.category.toLowerCase().includes(query)
        );
      }

      if (params.category && params.category !== 'All') {
        list = list.filter(
          (p) => p.category.toLowerCase() === params.category.toLowerCase()
        );
      }

      if (params.minPrice) {
        list = list.filter((p) => (p.discountPrice || p.price) >= Number(params.minPrice));
      }

      if (params.maxPrice) {
        list = list.filter((p) => (p.discountPrice || p.price) <= Number(params.maxPrice));
      }

      if (params.inStock === 'true' || params.inStock === true) {
        list = list.filter((p) => p.stock > 0);
      }

      if (params.sort) {
        switch (params.sort) {
          case 'price_asc':
            list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
            break;
          case 'price_desc':
            list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
            break;
          case 'newest':
            list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'rating':
            list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
          default:
            break;
        }
      }

      const total = list.length;
      const page = Number(params.page) || 1;
      const limit = Number(params.limit) || 12;
      const startIndex = (page - 1) * limit;
      const paginatedProducts = list.slice(startIndex, startIndex + limit);

      return {
        success: true,
        products: paginatedProducts,
        total,
        page,
        pages: Math.ceil(total / limit) || 1,
      };
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (err) {
      const db = getMockDb();
      const product = db.products.find((p) => p._id === id);
      if (!product) throw new Error('Product not found');
      return { success: true, product };
    }
  },

  async getCategories() {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (err) {
      const db = getMockDb();
      return { success: true, categories: db.categories };
    }
  },

  async getFeaturedProducts() {
    try {
      const response = await api.get('/products/featured');
      return response.data;
    } catch (err) {
      const db = getMockDb();
      const featured = db.products.filter((p) => p.isFeatured && p.isActive);
      return { success: true, products: featured };
    }
  },
};

export default productService;
