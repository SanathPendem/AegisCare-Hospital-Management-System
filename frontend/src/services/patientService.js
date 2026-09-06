import api from './api';

export const patientService = {
  getAll: async (params) => {
    const res = await api.get('/patients/', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/patients/${id}/`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/patients/', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.patch(`/patients/${id}/`, data);
    return res.data;
  },
  getMyProfile: async () => {
    const res = await api.get('/patients/me/');
    return res.data;
  },
  updateMyProfile: async (data) => {
    const res = await api.patch('/patients/me/', data);
    return res.data;
  }
};
