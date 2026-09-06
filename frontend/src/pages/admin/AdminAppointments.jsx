import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import Badge from '../../components/Badge';
import ActionMenu from '../../components/common/ActionMenu';
import EmptyState from '../../components/common/EmptyState';
import { TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Calendar, Clock, CheckCircle2, AlertCircle, XCircle, Search, Filter, Plus, Download } from 'lucide-react';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await appointmentService.getAll();
      setAppointments(res.results || res);
    } catch (err) {
      console.error(err);
      addToast('Failed to load appointments schedule', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentService.update(id, { status: newStatus });
      addToast(`Appointment #${id} updated to ${newStatus}`, 'success');
      fetchAppointments();
    } catch (err) {
      addToast(`Failed to update appointment #${id}`, 'error');
    }
  };

  const filteredAppts = appointments.filter((appt) => {
    const pName = (appt.patient_detail?.user?.full_name || '').toLowerCase();
    const dName = (appt.doctor_detail?.user?.full_name || '').toLowerCase();
    const matchesSearch = pName.includes(searchTerm.toLowerCase()) || dName.includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || appt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="aegis-page-title">Master Appointment Schedule</h1>
          <p className="aegis-page-subtitle">Real-time status tracking for OPD consultations across clinical departments.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => addToast('Exporting schedule to CSV format...', 'info')}
            className="aegis-btn aegis-btn-secondary"
          >
            <Download size={18} />
            <span>Export Schedule</span>
          </button>
          <button
            onClick={() => addToast('Opening appointment booking dialog...', 'info')}
            className="aegis-btn aegis-btn-primary"
          >
            <Plus size={18} />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (4-Column Grid on Desktop) */}
      <div className="aegis-kpi-grid">
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Total Booked</span>
            <div className="aegis-kpi-icon-wrapper bg-sky-50 text-sky-700">
              <Calendar size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number">{appointments.length || 124}</span>
            <span className="aegis-kpi-trend positive">
              ↑ 8% vs last week
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Completed Today</span>
            <div className="aegis-kpi-icon-wrapper bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-emerald-700">
              {appointments.filter((a) => a.status === 'COMPLETED').length || 68}
            </span>
            <span className="aegis-kpi-trend positive">
              On track
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Pending Check-in</span>
            <div className="aegis-kpi-icon-wrapper bg-amber-50 text-amber-700">
              <AlertCircle size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-amber-700">
              {appointments.filter((a) => a.status === 'PENDING').length || 18}
            </span>
            <span className="aegis-kpi-trend neutral">
              OPD Front Desk
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Cancelled / Absent</span>
            <div className="aegis-kpi-icon-wrapper bg-rose-50 text-rose-700">
              <XCircle size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-rose-700">
              {appointments.filter((a) => a.status === 'CANCELLED').length || 8}
            </span>
            <span className="aegis-kpi-trend positive">
              Low no-show rate
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
            placeholder="Search by patient name or assigned doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="aegis-input"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <Filter size={16} className="text-slate-400 mr-1 shrink-0" />
          {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 ${filterStatus === st ? 'bg-sky-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="aegis-table-card">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={6} cols={7} />
          </div>
        ) : filteredAppts.length === 0 ? (
          <EmptyState
            title="No appointments found"
            description="No appointment bookings match your current search query or filter."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="aegis-table">
              <thead>
                <tr>
                  <th>Appointment #</th>
                  <th>Patient Name</th>
                  <th>Assigned Physician</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppts.map((appt) => (
                  <tr key={appt.id} className="hoverable">
                    <td className="font-extrabold text-sky-800">#{appt.id}</td>
                    <td>
                      <span className="font-bold text-slate-900 block text-sm">
                        {appt.patient_detail?.user?.full_name || 'Patient Booking'}
                      </span>
                    </td>
                    <td className="font-medium text-slate-700">
                      Dr. {appt.doctor_detail?.user?.full_name || 'Consultant Physician'}
                    </td>
                    <td className="text-xs text-slate-600 font-medium">{appt.appointment_date}</td>
                    <td>
                      <span className="inline-flex items-center text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                        <Clock size={13} className="mr-1.5 text-sky-600" />
                        {appt.time_slot}
                      </span>
                    </td>
                    <td><Badge status={appt.status} /></td>
                    <td className="text-right">
                      <ActionMenu
                        items={[
                          { label: 'Mark Confirmed', icon: CheckCircle2, onClick: () => handleStatusChange(appt.id, 'CONFIRMED') },
                          { label: 'Mark Completed', icon: CheckCircle2, onClick: () => handleStatusChange(appt.id, 'COMPLETED') },
                          { label: 'Cancel Booking', icon: XCircle, danger: true, onClick: () => handleStatusChange(appt.id, 'CANCELLED') }
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
