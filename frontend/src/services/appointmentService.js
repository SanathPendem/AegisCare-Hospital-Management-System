import api from './api';

export const appointmentService = {
  getAll: async (params) => {
    const res = await api.get('/appointments/', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/appointments/${id}/`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/appointments/', data);
    return res.data;
  },
  cancel: async (id) => {
    const res = await api.patch(`/appointments/${id}/cancel/`);
    return res.data;
  },
  confirm: async (id) => {
    const res = await api.patch(`/appointments/${id}/confirm/`);
    return res.data;
  }
};
