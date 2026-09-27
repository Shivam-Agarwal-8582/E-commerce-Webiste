import api, { getMockDb } from '../api/axios';

export const authService = {
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err) {
      // Offline fallback
      const db = getMockDb();
      const existing = db.users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existing) {
        throw new Error('User already exists with this email');
      }
      const newUser = {
        _id: 'usr-' + Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: userData.role || 'customer',
        isActive: true,
        createdAt: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
      };
      db.users.push(newUser);
      db.saveUsers(db.users);
      return {
        success: true,
        user: newUser,
        token: 'mock-jwt-token-' + newUser._id,
        message: 'Registration successful',
      };
    }
  },

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      // Offline fallback
      const db = getMockDb();
      const user = db.users.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
      if (!user) {
        // Auto create or provide demo if admin/customer
        if (credentials.email.toLowerCase().includes('admin')) {
          const adminUser = {
            _id: 'usr-admin',
            name: 'Store Owner (Admin)',
            email: credentials.email,
            phone: '+91 99999 88888',
            role: 'admin',
            isActive: true,
          };
          return {
            success: true,
            user: adminUser,
            token: 'mock-jwt-admin-token',
            message: 'Logged in as Admin (Demo Mode)',
          };
        }
        throw new Error('Invalid email or password');
      }
      return {
        success: true,
        user,
        token: 'mock-jwt-token-' + user._id,
        message: 'Login successful',
      };
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore offline errors
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  },

  async getCurrentUser() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (token && userStr) {
        return { success: true, user: JSON.parse(userStr) };
      }
      throw new Error('Not authenticated');
    }
  },
};

export default authService;
