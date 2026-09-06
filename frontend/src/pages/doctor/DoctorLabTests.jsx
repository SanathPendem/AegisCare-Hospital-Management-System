import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { patientService } from '../../services/patientService';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { FlaskConical, Plus, FileText, CheckCircle2 } from 'lucide-react';

const DoctorLabTests = () => {
  const [orders, setOrders] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    patient: '',
    test: ''
  });

  useEffect(() => {
    fetchOrders();
    fetchDropdowns();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/lab-tests/orders/');
      setOrders(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdowns = async () => {
    try {
      const cRes = await api.get('/lab-tests/catalog/');
      const pRes = await patientService.getAll();
      const cList = cRes.data.results || cRes.data;
      const pList = pRes.results || pRes;
      setCatalog(cList);
      setPatients(pList);
      if (cList.length > 0) setFormData(prev => ({ ...prev, test: cList[0].id }));
      if (pList.length > 0) setFormData(prev => ({ ...prev, patient: pList[0].id }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await api.post('/lab-tests/orders/', formData);
      setIsModalOpen(false);
      fetchOrders();
    } catch (err) {
      alert('Failed to order lab test.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Lab & Pathology Test Orders</h1>
          <p className="page-subtitle">Order diagnostic laboratory tests and inspect pathology test results</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          <Plus size={18} />
          <span>Order Lab Test</span>
        </button>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading lab orders...</div>
        ) : orders.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No lab tests ordered.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Patient</th>
                  <th>Diagnostic Test</th>
                  <th>Category</th>
                  <th>Ordered Date</th>
                  <th>Status</th>
                  <th>Result Notes & Range</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord) => (
                  <tr key={ord.id}>
                    <td style={{ fontWeight: 700, color: '#2563eb' }}>#{ord.id}</td>
                    <td style={{ fontWeight: 600 }}>{ord.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{ord.test_detail?.test_name}</td>
                    <td>{ord.test_detail?.category}</td>
                    <td>{new Date(ord.ordered_at).toLocaleDateString()}</td>
                    <td><Badge status={ord.status === 'COMPLETED' ? 'CONFIRMED' : 'PENDING'} /></td>
                    <td style={{ fontSize: '0.85rem', color: ord.status === 'COMPLETED' ? '#059669' : '#64748b' }}>
                      {ord.result_notes || 'Awaiting lab analysis'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Order Lab Test Investigation">
        <form onSubmit={handleOrder}>
          <div className="form-group">
            <label className="form-label">Select Patient</label>
            <select className="form-select" required value={formData.patient} onChange={(e) => setFormData({ ...formData, patient: e.target.value })}>
              {patients.map((pat) => (
                <option key={pat.id} value={pat.id}>{pat.user?.full_name} ({pat.user?.email})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Select Diagnostic Test</label>
            <select className="form-select" required value={formData.test} onChange={(e) => setFormData({ ...formData, test: e.target.value })}>
              {catalog.map((t) => (
                <option key={t.id} value={t.id}>{t.test_name} [{t.category}] - ${t.price}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Submit Lab Order
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorLabTests;
