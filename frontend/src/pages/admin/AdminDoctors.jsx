import React, { useEffect, useState } from 'react';
import { doctorService } from '../../services/doctorService';
import Modal from '../../components/Modal';
import { Stethoscope, Plus, Search } from 'lucide-react';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
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
    specialization: 'Cardiology',
    qualification: 'MD, MBBS',
    department: 'Cardiovascular',
    license_number: 'DOC-NEW-101',
    experience_years: 5,
    consultation_fee: 100.00,
    bio: 'Specialist physician'
  });

  useEffect(() => {
    fetchDoctors();
  }, [search]);

  const fetchDoctors = async () => {
    try {
      const res = await doctorService.getAll({ search });
      setDoctors(res.results || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await doctorService.create(formData);
      setIsModalOpen(false);
      fetchDoctors();
    } catch (err) {
      alert('Failed to add doctor.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctor Profiles</h1>
          <p className="page-subtitle">Manage hospital physicians, qualifications, and consultation fees</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.5rem', width: '100%' }}
              placeholder="Search doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>Add Doctor</span>
          </button>
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading doctors...</div>
        ) : doctors.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No doctors registered.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Department</th>
                  <th>Qualifications</th>
                  <th>Experience</th>
                  <th>Fee ($)</th>
                  <th>License #</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td style={{ fontWeight: 600, color: '#f8fafc' }}>Dr. {doc.user?.full_name}</td>
                    <td style={{ color: '#3b82f6', fontWeight: 600 }}>{doc.specialization}</td>
                    <td>{doc.department}</td>
                    <td>{doc.qualification}</td>
                    <td>{doc.experience_years} Years</td>
                    <td style={{ fontWeight: 700, color: '#10b981' }}>${doc.consultation_fee}</td>
                    <td style={{ color: '#06b6d4' }}>{doc.license_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Physician Doctor Profile">
        <form onSubmit={handleCreate}>
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
              <label className="form-label">Specialization</label>
              <input type="text" required className="form-input" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <input type="text" required className="form-input" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Qualifications</label>
              <input type="text" required className="form-input" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">License Number</label>
              <input type="text" required className="form-input" value={formData.license_number} onChange={(e) => setFormData({ ...formData, license_number: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Fee ($)</label>
              <input type="number" required className="form-input" value={formData.consultation_fee} onChange={(e) => setFormData({ ...formData, consultation_fee: parseFloat(e.target.value) })} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Register Doctor Profile
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDoctors;
