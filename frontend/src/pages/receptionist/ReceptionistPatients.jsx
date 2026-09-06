import React, { useEffect, useState } from 'react';
import { patientService } from '../../services/patientService';
import Modal from '../../components/Modal';
import { Users, Plus, Search } from 'lucide-react';

const ReceptionistPatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    user_data: {
      email: '',
      password: 'password123',
      password_confirm: 'password123',
      first_name: '',
      last_name: '',
      phone: ''
    },
    gender: 'MALE',
    blood_group: 'O+',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    address: ''
  });

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const fetchPatients = async () => {
    try {
      const res = await patientService.getAll({ search });
      setPatients(res.results || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await patientService.create(formData);
      setIsModalOpen(false);
      fetchPatients();
    } catch (err) {
      alert('Failed to register patient.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Management</h1>
          <p className="page-subtitle">Register new patients and view directory</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.5rem', width: '100%' }}
              placeholder="Search patient name, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>Register New Patient</span>
          </button>
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading patients...</div>
        ) : patients.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No patients found.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>Registered Date</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((pat) => (
                  <tr key={pat.id}>
                    <td style={{ fontWeight: 600 }}>{pat.user?.full_name || 'Patient'}</td>
                    <td style={{ color: '#94a3b8' }}>{pat.user?.email}</td>
                    <td>{pat.user?.phone || '-'}</td>
                    <td>{pat.gender}</td>
                    <td><span className="badge badge-completed">{pat.blood_group}</span></td>
                    <td>{new Date(pat.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Walk-in Patient">
        <form onSubmit={handleRegister}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input type="text" required className="form-input" value={formData.user_data.first_name} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, first_name: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input type="text" required className="form-input" value={formData.user_data.last_name} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, last_name: e.target.value } })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" required className="form-input" value={formData.user_data.email} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, email: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="text" className="form-input" value={formData.user_data.phone} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, phone: e.target.value } })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-select" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-select" value={formData.blood_group} onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}>
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Register Patient Profile
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ReceptionistPatients;
