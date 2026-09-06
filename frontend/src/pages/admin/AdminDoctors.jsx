import React, { useEffect, useState } from 'react';
import { doctorService } from '../../services/doctorService';
import Modal from '../../components/Modal';
import ActionMenu from '../../components/common/ActionMenu';
import EmptyState from '../../components/common/EmptyState';
import { TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Stethoscope, Plus, Search, Eye, Edit3, Award, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

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
      addToast('Doctor registered successfully!', 'success');
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Doctor Profiles</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage hospital consultants, specialization credentials, and consultation fees</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <Search size={16} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctor by name, specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-600 outline-none"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-sky-800 hover:bg-sky-900 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Plus size={16} className="mr-1.5" />
            Add Doctor
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Consultants</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{doctors.length || 86}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <Stethoscope size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Specialty Depts</span>
            <p className="text-2xl font-black text-indigo-600 mt-1">15</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
            <Award size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Experience</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">14.8 Yrs</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consultation Desks</span>
            <p className="text-2xl font-black text-amber-600 mt-1">24 OPD</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Main Doctors Table */}
      <div className="glass-card">
        {loading ? (
          <TableSkeleton rows={6} cols={7} />
        ) : doctors.length === 0 ? (
          <EmptyState
            title="No doctors found"
            description="No doctor records match your current search query."
            actionText="Register Doctor"
            onAction={() => setIsModalOpen(true)}
          />
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
                  <th>Fee (₹)</th>
                  <th>License #</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => {
                  const fullName = doc.user ? `Dr. ${doc.user.first_name || ''} ${doc.user.last_name || ''}`.trim() : 'Dr. Senior Consultant';
                  return (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0 border border-indigo-200">
                            {fullName[4] || 'D'}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{fullName}</span>
                            <span className="text-[11px] text-slate-400">{doc.user?.email || 'doctor@hospital.com'}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold text-sky-800 bg-sky-50 border border-sky-200 rounded-full">
                          {doc.specialization}
                        </span>
                      </td>
                      <td className="text-xs text-slate-700 font-medium">{doc.department}</td>
                      <td className="text-xs text-slate-600 font-medium">{doc.qualification}</td>
                      <td className="text-xs font-bold text-slate-900">{doc.experience_years} Yrs</td>
                      <td className="text-xs font-black text-emerald-600">₹{doc.consultation_fee}</td>
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
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input type="text" required className="form-input" value={formData.user_data.first_name} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, first_name: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input type="text" required className="form-input" value={formData.user_data.last_name} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, last_name: e.target.value } })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" required className="form-input" value={formData.user_data.email} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, email: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="text" className="form-input" value={formData.user_data.phone} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, phone: e.target.value } })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Specialization *</label>
              <input type="text" required className="form-input" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <input type="text" required className="form-input" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Qualifications</label>
              <input type="text" required className="form-input" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">License #</label>
              <input type="text" required className="form-input" value={formData.license_number} onChange={(e) => setFormData({ ...formData, license_number: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Fee (₹)</label>
              <input type="number" required className="form-input" value={formData.consultation_fee} onChange={(e) => setFormData({ ...formData, consultation_fee: parseFloat(e.target.value) })} />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-sky-800 hover:bg-sky-900 text-white font-bold rounded-lg transition shadow-md">
            Register Doctor Profile
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDoctors;
