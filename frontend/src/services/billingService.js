import api from './api';

export const billingService = {
  getAll: async (params) => {
    const res = await api.get('/billing/', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/billing/${id}/`);
    return res.data;
  },
  create: async (data) => {
    const res = await api.post('/billing/', data);
    return res.data;
  },
  pay: async (id, paymentMethod) => {
    const res = await api.post(`/billing/${id}/pay/`, { payment_method: paymentMethod });
    return res.data;
  }
};
