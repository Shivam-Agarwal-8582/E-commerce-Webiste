import axios from 'axios';
import { initialProducts, initialCategories, initialAddresses, initialOrders, initialUsers } from './mockData';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

// Request interceptor: Attach JWT Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Graceful token handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // If we are not on login or register, notify or redirect
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.dispatchEvent(new Event('auth:unauthorized'));
      }
    }
    return Promise.reject(error);
  }
);

// Local Storage-backed mock database for offline & instant demonstration
const MOCK_STORAGE_KEYS = {
  PRODUCTS: 'mock_products_db',
  CATEGORIES: 'mock_categories_db',
  ORDERS: 'mock_orders_db',
  ADDRESSES: 'mock_addresses_db',
  USERS: 'mock_users_db',
};

const getStored = (key, fallback) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

const setStored = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getMockDb = () => {
  return {
    products: getStored(MOCK_STORAGE_KEYS.PRODUCTS, initialProducts),
    categories: getStored(MOCK_STORAGE_KEYS.CATEGORIES, initialCategories),
    orders: getStored(MOCK_STORAGE_KEYS.ORDERS, initialOrders),
    addresses: getStored(MOCK_STORAGE_KEYS.ADDRESSES, initialAddresses),
    users: getStored(MOCK_STORAGE_KEYS.USERS, initialUsers),
    saveProducts: (p) => setStored(MOCK_STORAGE_KEYS.PRODUCTS, p),
    saveCategories: (c) => setStored(MOCK_STORAGE_KEYS.CATEGORIES, c),
    saveOrders: (o) => setStored(MOCK_STORAGE_KEYS.ORDERS, o),
    saveAddresses: (a) => setStored(MOCK_STORAGE_KEYS.ADDRESSES, a),
    saveUsers: (u) => setStored(MOCK_STORAGE_KEYS.USERS, u),
  };
};

export default api;
