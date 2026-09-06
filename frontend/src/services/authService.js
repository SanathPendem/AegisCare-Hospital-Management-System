import api from './api';

export const authService = {
  login: async (credentials) => {
    const res = await api.post('/auth/token/', credentials);
    if (res.data.access) {
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
    return res.data;
  },

  register: async (userData) => {
    const res = await api.post('/auth/register/', userData);
    return res.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      if (refreshToken) {
        await api.post('/auth/logout/', { refresh: refreshToken });
      }
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  getProfile: async () => {
    const res = await api.get('/auth/me/');
    return res.data;
  },

  updateProfile: async (data) => {
    const res = await api.patch('/auth/me/', data);
    return res.data;
  },

  getAdminUsers: async (params) => {
    const res = await api.get('/auth/users/', { params });
    return res.data;
  },

  updateUser: async (id, data) => {
    const res = await api.patch(`/auth/users/${id}/`, data);
    return res.data;
  }
};
