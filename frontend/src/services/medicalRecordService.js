import api from './api';

export const medicalRecordService = {
  getAll: async (params) => {
    const res = await api.get('/medical-records/', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/medical-records/${id}/`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/medical-records/', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.patch(`/medical-records/${id}/`, data);
    return res.data;
  }
};
