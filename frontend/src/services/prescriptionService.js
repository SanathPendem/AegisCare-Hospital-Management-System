import api from './api';

export const prescriptionService = {
  getAll: async (params) => {
    const res = await api.get('/prescriptions/', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/prescriptions/${id}/`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/prescriptions/', data);
    return res.data;
  },
  dispense: async (id) => {
    const res = await api.post(`/prescriptions/${id}/dispense/`);
    return res.data;
  }
};
