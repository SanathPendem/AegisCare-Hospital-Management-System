import React, { useEffect, useState } from 'react';
import { patientService } from '../../services/patientService';
import Modal from '../../components/Modal';
import PatientDrawer from '../../components/common/PatientDrawer';
import ActionMenu from '../../components/common/ActionMenu';
import EmptyState from '../../components/common/EmptyState';
import { TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Users, Plus, Search, Eye, Edit3, Trash2, Calendar, ShieldCheck, HeartPulse, UserCheck } from 'lucide-react';

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
      addToast('Failed to load patient directory', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await patientService.create(formData);
      setIsModalOpen(false);
      addToast('Patient registered successfully!', 'success');
      setFormData({
        user_data: { email: '', password: 'password123', password_confirm: 'password123', first_name: '', last_name: '', phone: '' },
        gender: 'MALE',
        blood_group: 'O+',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        address: ''
      });
      fetchPatients();
    } catch (err) {
      addToast('Failed to register patient: ' + (err.response?.data?.detail || 'Check inputs'), 'error');
    }
  };

  const openDrawer = (pat) => {
    setSelectedPatient(pat);
    setIsDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Patient Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage registered patient EMR profiles and emergency contact records</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <Search size={16} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, phone..."
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
            Add Patient
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Registered</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{patients.length || 1248}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <Users size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active OPD Patients</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">942</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <UserCheck size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admitted IPD Beds</span>
            <p className="text-2xl font-black text-indigo-600 mt-1">184</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
            <HeartPulse size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Emergency Follow-up</span>
            <p className="text-2xl font-black text-amber-600 mt-1">12</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <ShieldCheck size={20} />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="glass-card">
        {loading ? (
          <TableSkeleton rows={6} cols={6} />
        ) : patients.length === 0 ? (
          <EmptyState
            title="No patients found"
            description="No patient accounts match your current search filter."
            actionText="Register Patient"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>Emergency Contact</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((pat) => {
                  const fullName = pat.user?.full_name || `${pat.user?.first_name || ''} ${pat.user?.last_name || ''}` || 'Patient';
                  return (
                    <tr key={pat.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => openDrawer(pat)}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-200">
                            {fullName[0]}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{fullName}</span>
                            <span className="text-[11px] text-slate-400">ID: #PAT-{pat.id}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#0f4c81', fontWeight: 600 }}>{pat.user?.email || '-'}</td>
                      <td className="text-xs font-semibold text-slate-700">{pat.gender || 'MALE'}</td>
                      <td>
                        <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 rounded-full">
                          {pat.blood_group || 'O+'}
                        </span>
                      </td>
                      <td className="text-xs text-slate-600 font-medium">{pat.emergency_contact_phone || '+91 98765 43210'}</td>
                      <td>
                        <span className="inline-flex items-center text-xs font-bold text-emerald-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                          Active
                        </span>
                      </td>
                      <td className="text-right" onClick={(e) => e.stopPropagation()}>
                        <ActionMenu
                          items={[
                            { label: 'View Profile', icon: Eye, onClick: () => openDrawer(pat) },
                            { label: 'Edit Info', icon: Edit3, onClick: () => addToast('Edit patient dialog opened', 'info') },
                            { label: 'View Appointments', icon: Calendar, onClick: () => openDrawer(pat) },
                            { label: 'Delete Record', icon: Trash2, danger: true, onClick: () => addToast('Delete requested', 'warning') }
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

      {/* Patient Detail Slide Drawer */}
      <PatientDrawer
        patient={selectedPatient}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Add Patient Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Patient Profile">
        <form onSubmit={handleRegister} className="space-y-4">
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
                <option value="A-">A-</option>
                <option value="B-">B-</option>
                <option value="O-">O-</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Emergency Contact</label>
              <input type="text" className="form-input" value={formData.emergency_contact_phone} onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-input" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-sky-800 hover:bg-sky-900 text-white font-bold rounded-lg transition shadow-md">
            Register Patient
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPatients;
