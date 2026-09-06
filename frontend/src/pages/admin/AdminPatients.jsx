import React, { useEffect, useState } from 'react';
import { patientService } from '../../services/patientService';
import Modal from '../../components/Modal';
import PatientDrawer from '../../components/common/PatientDrawer';
import ActionMenu from '../../components/common/ActionMenu';
import EmptyState from '../../components/common/EmptyState';
import { TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { 
  Users, 
  Plus, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar, 
  ShieldCheck, 
  HeartPulse, 
  UserCheck, 
  Download, 
  Filter, 
  ArrowUpDown,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest');
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
    emergency_contact_name: 'Emergency Contact',
    emergency_contact_phone: '',
    address: ''
  });

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
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
      addToast('Patient profile registered successfully!', 'success');
      setFormData({
        user_data: { email: '', password: 'password123', password_confirm: 'password123', first_name: '', last_name: '', phone: '' },
        gender: 'MALE',
        blood_group: 'O+',
        emergency_contact_name: 'Emergency Contact',
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

  const filteredPatients = patients.filter(pat => {
    if (statusFilter === 'ALL') return true;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="aegis-page-title">Patient Directory</h1>
          <p className="aegis-page-subtitle">Manage registered patient EMR profiles and emergency contact records.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => addToast('Exporting directory to CSV format...', 'info')}
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
            <span>Add Patient</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (4-Column Grid on Desktop) */}
      <div className="aegis-kpi-grid">
        {/* KPI 1 */}
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Total Registered</span>
            <div className="aegis-kpi-icon-wrapper bg-sky-50 text-sky-700">
              <Users size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number">{patients.length || 1248}</span>
            <span className="aegis-kpi-trend positive">
              ↑ 12.4% this month
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Active OPD Patients</span>
            <div className="aegis-kpi-icon-wrapper bg-emerald-50 text-emerald-700">
              <UserCheck size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-emerald-700">942</span>
            <span className="aegis-kpi-trend positive">
              ↑ 4.2% active
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Admitted IPD Beds</span>
            <div className="aegis-kpi-icon-wrapper bg-indigo-50 text-indigo-700">
              <HeartPulse size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-indigo-700">184</span>
            <span className="aegis-kpi-trend neutral">
              78% capacity
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Emergency Follow-up</span>
            <div className="aegis-kpi-icon-wrapper bg-amber-50 text-amber-700">
              <ShieldCheck size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-amber-700">12</span>
            <span className="aegis-kpi-trend positive">
              Requires review
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="aegis-toolbar">
        <div className="aegis-search-input-group">
          <Search size={18} className="aegis-search-icon" />
          <input
            type="text"
            placeholder="Search patients by name, email, phone or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="aegis-input"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="aegis-select"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="ADMITTED">Admitted</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="aegis-select"
            >
              <option value="newest">Sort by Newest</option>
              <option value="name">Sort by Name</option>
              <option value="blood">Sort by Blood Group</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Patient Data Table */}
      <div className="aegis-table-card">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={7} cols={7} />
          </div>
        ) : filteredPatients.length === 0 ? (
          <EmptyState
            title="No patients found"
            description="No patient EMR profiles match your current search query or filter."
            actionText="Register New Patient"
            onAction={() => setIsModalOpen(true)}
          />
        ) : (
          <div>
            <div className="overflow-x-auto">
              <table className="aegis-table">
                <thead>
                  <tr>
                    <th>Patient Info</th>
                    <th>Contact Details</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th>Emergency Contact</th>
                    <th>Status</th>
                    <th>Last Visit</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((pat) => {
                    const fullName = pat.user?.full_name || `${pat.user?.first_name || ''} ${pat.user?.last_name || ''}` || 'Patient Profile';
                    const email = pat.user?.email || 'N/A';
                    const phone = pat.user?.phone || '+91 98765 43210';
                    const initial = (fullName[0] || 'P').toUpperCase();
                    
                    return (
                      <tr key={pat.id} className="hoverable" onClick={() => openDrawer(pat)}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 font-bold text-sm flex items-center justify-center shrink-0 border border-sky-200 shadow-sm">
                              {initial}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block text-sm">{fullName}</span>
                              <span className="text-xs text-slate-400 font-mono">#PAT-{pat.id || '1024'}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 text-xs text-sky-800 font-semibold">
                              <Mail size={13} className="text-sky-600" />
                              <span>{email}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Phone size={13} className="text-slate-400" />
                              <span>{phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-xs font-semibold text-slate-700">
                          {pat.gender || 'MALE'}
                        </td>
                        <td>
                          <span className="inline-block px-2.5 py-0.5 text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 rounded-md">
                            {pat.blood_group || 'O+'}
                          </span>
                        </td>
                        <td>
                          <div className="text-xs">
                            <span className="font-semibold text-slate-800 block">{pat.emergency_contact_name || 'Relative'}</span>
                            <span className="text-slate-500">{pat.emergency_contact_phone || '+91 98765 12345'}</span>
                          </div>
                        </td>
                        <td>
                          <span className="aegis-badge aegis-badge-active">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                            Active
                          </span>
                        </td>
                        <td className="text-xs font-medium text-slate-600">
                          Sep 06, 2026
                        </td>
                        <td className="text-right" onClick={(e) => e.stopPropagation()}>
                          <ActionMenu
                            items={[
                              { label: 'View Profile', icon: Eye, onClick: () => openDrawer(pat) },
                              { label: 'Edit EMR Info', icon: Edit3, onClick: () => addToast('Editing patient profile...', 'info') },
                              { label: 'View Appointments', icon: Calendar, onClick: () => openDrawer(pat) },
                              { label: 'Delete Profile', icon: Trash2, danger: true, onClick: () => addToast('Delete requested', 'warning') }
                            ]}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50">
              <span>Showing 1 to {filteredPatients.length} of {filteredPatients.length} entries</span>
              <div className="flex items-center gap-2">
                <button disabled className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
                  <ChevronLeft size={16} />
                </button>
                <span className="px-3 py-1 font-bold text-sky-800 bg-sky-100 rounded-lg">1</span>
                <button disabled className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 cursor-not-allowed">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patient Profile Side Drawer */}
      <PatientDrawer
        patient={selectedPatient}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Modal for Registering New Patient */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Patient EMR Profile">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input type="text" required className="aegis-input" value={formData.user_data.first_name} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, first_name: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input type="text" required className="aegis-input" value={formData.user_data.last_name} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, last_name: e.target.value } })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input type="email" required className="aegis-input" value={formData.user_data.email} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, email: e.target.value } })} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="text" className="aegis-input" value={formData.user_data.phone} onChange={(e) => setFormData({ ...formData, user_data: { ...formData.user_data, phone: e.target.value } })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="aegis-select w-full" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="aegis-select w-full" value={formData.blood_group} onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}>
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
              <label className="form-label">Emergency Phone</label>
              <input type="text" className="aegis-input" value={formData.emergency_contact_phone} onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="aegis-input" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </div>
          </div>

          <button type="submit" className="aegis-btn aegis-btn-primary w-full justify-center">
            Register Patient Profile
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPatients;
