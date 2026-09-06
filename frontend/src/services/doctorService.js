import api from './api';

export const doctorService = {
  getAll: async (params) => {
    const res = await api.get('/doctors/', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/doctors/${id}/`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/doctors/', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.patch(`/doctors/${id}/`, data);
    return res.data;
  },
  getMyProfile: async () => {
    const res = await api.get('/doctors/me/');
    return res.data;
  },
  updateMyProfile: async (data) => {
    const res = await api.patch('/doctors/me/', data);
    return res.data;
  }
};
