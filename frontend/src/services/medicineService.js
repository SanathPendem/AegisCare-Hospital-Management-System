import api from './api';

export const medicineService = {
  getAll: async (params) => {
    const res = await api.get('/medicines/', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/medicines/${id}/`);
    return res.data;
  },
  getLowStock: async () => {
    const res = await api.get('/medicines/low_stock/');
    return res.data;
  },
  getExpired: async () => {
    const res = await api.get('/medicines/expired/');
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/medicines/', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.patch(`/medicines/${id}/`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/medicines/${id}/`);
    return res.data;
  }
};
