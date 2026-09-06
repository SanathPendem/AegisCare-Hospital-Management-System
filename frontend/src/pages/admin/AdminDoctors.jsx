import React, { useEffect, useState } from 'react';
import { doctorService } from '../../services/doctorService';
import Modal from '../../components/Modal';
import ActionMenu from '../../components/common/ActionMenu';
import EmptyState from '../../components/common/EmptyState';
import { TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Stethoscope, Plus, Search, Eye, Edit3, Award, Calendar, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();

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
    qualification: 'MD, DM (Cardiology)',
    department: 'Cardiovascular Institute',
    license_number: 'DOC-2026-88',
    experience_years: 12,
    consultation_fee: 1500.00,
    bio: 'Senior Consultant Physician'
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
      addToast('Failed to load doctor directory', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await doctorService.create(formData);
      setIsModalOpen(false);
      addToast('Doctor profile registered successfully!', 'success');
      setFormData({
        user_data: { email: '', password: 'password123', password_confirm: 'password123', first_name: '', last_name: '', phone: '' },
        specialization: 'Cardiology',
        qualification: 'MD, DM (Cardiology)',
        department: 'Cardiovascular Institute',
        license_number: 'DOC-2026-88',
        experience_years: 12,
        consultation_fee: 1500.00,
        bio: 'Senior Consultant Physician'
      });
      fetchDoctors();
    } catch (err) {
      addToast('Failed to add doctor: ' + (err.response?.data?.detail || 'Check inputs'), 'error');
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="aegis-page-title">Doctor Profiles</h1>
          <p className="aegis-page-subtitle">Manage hospital consultants, specialization credentials, and consultation fees.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => addToast('Exporting doctors list to CSV...', 'info')}
            className="aegis-btn aegis-btn-secondary"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="aegis-btn aegis-btn-primary"
          >
            <Plus size={18} />
            <span>Add Doctor</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (4-Column Grid on Desktop) */}
      <div className="aegis-kpi-grid">
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Total Consultants</span>
            <div className="aegis-kpi-icon-wrapper bg-sky-50 text-sky-700">
              <Stethoscope size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number">{doctors.length || 86}</span>
            <span className="aegis-kpi-trend positive">
              Active Faculty
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Specialty Depts</span>
            <div className="aegis-kpi-icon-wrapper bg-indigo-50 text-indigo-700">
              <Award size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-indigo-700">15</span>
            <span className="aegis-kpi-trend positive">
              Excellence Centers
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Avg Experience</span>
            <div className="aegis-kpi-icon-wrapper bg-emerald-50 text-emerald-700">
              <ShieldCheck size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-emerald-700">14.8 Yrs</span>
            <span className="aegis-kpi-trend positive">
              Senior Medical Board
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Consultation Desks</span>
            <div className="aegis-kpi-icon-wrapper bg-amber-50 text-amber-700">
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-amber-700">24 OPD</span>
            <span className="aegis-kpi-trend neutral">
              Active Desks
            </span>
          </div>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="aegis-toolbar">
        <div className="aegis-search-input-group">
          <Search size={18} className="aegis-search-icon" />
          <input
            type="text"
            placeholder="Search doctor by name, specialty, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="aegis-input"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="aegis-table-card">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={6} cols={8} />
          </div>
        ) : doctors.length === 0 ? (
          <EmptyState
            title="No doctors found"
            description="No doctor records match your current search query."
            actionText="Register Doctor"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="aegis-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Department</th>
                  <th>Qualifications</th>
                  <th>Experience</th>
                  <th>Fee (₹)</th>
                  <th>License #</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => {
                  const fullName = doc.user ? `Dr. ${doc.user.first_name || ''} ${doc.user.last_name || ''}`.trim() : 'Dr. Senior Consultant';
                  const initial = (fullName[4] || 'D').toUpperCase();

                  return (
                    <tr key={doc.id} className="hoverable">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-sm flex items-center justify-center shrink-0 border border-indigo-200 shadow-sm">
                            {initial}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block text-sm">{fullName}</span>
                            <span className="text-xs text-slate-400">{doc.user?.email || 'doctor@aegiscare.com'}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="inline-block px-2.5 py-0.5 text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 rounded-full">
                          {doc.specialization}
                        </span>
                      </td>
                      <td className="text-xs text-slate-700 font-medium">{doc.department}</td>
                      <td className="text-xs text-slate-600 font-medium">{doc.qualification}</td>
                      <td className="text-xs font-bold text-slate-900">{doc.experience_years} Yrs</td>
                      <td className="text-xs font-black text-emerald-700">₹{doc.consultation_fee}</td>
                      <td className="text-xs font-mono text-slate-500">{doc.license_number}</td>
                      <td className="text-right">
                        <ActionMenu
                          items={[
                            { label: 'View Profile', icon: Eye, onClick: () => addToast(`Viewing ${fullName}`, 'info') },
                            { label: 'Edit Schedule', icon: Edit3, onClick: () => addToast('Schedule editor opened', 'info') },
                            { label: 'View Patient Queue', icon: Calendar, onClick: () => addToast('Queue details', 'info') }
                          ]}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Doctor Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Physician Doctor Profile">
        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">First Name *</label>
              <input type="text" required className="aegis-input" value={formData.user_data.first_name} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, first_name: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">Last Name *</label>
              <input type="text" required className="aegis-input" value={formData.user_data.last_name} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, last_name: e.target.value } })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">Email Address *</label>
              <input type="email" required className="aegis-input" value={formData.user_data.email} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, email: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">Phone Number</label>
              <input type="text" className="aegis-input" value={formData.user_data.phone} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, phone: e.target.value } })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">Specialization *</label>
              <input type="text" required className="aegis-input" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">Department *</label>
              <input type="text" required className="aegis-input" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">Qualifications</label>
              <input type="text" required className="aegis-input" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">License #</label>
              <input type="text" required className="aegis-input" value={formData.license_number} onChange={(e) => setFormData({ ...formData, license_number: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label block mb-1.5 font-bold text-xs uppercase tracking-wider text-slate-600">Fee (₹)</label>
              <input type="number" required className="aegis-input" value={formData.consultation_fee} onChange={(e) => setFormData({ ...formData, consultation_fee: parseFloat(e.target.value) })} />
            </div>
          </div>

          <button type="submit" className="aegis-btn aegis-btn-primary w-full justify-center mt-2">
            Register Doctor Profile
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDoctors;
