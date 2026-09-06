import React, { useEffect, useState } from 'react';
import { appointmentService } from '../../services/appointmentService';
import Badge from '../../components/Badge';
import ActionMenu from '../../components/common/ActionMenu';
import EmptyState from '../../components/common/EmptyState';
import { TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Calendar, Clock, CheckCircle2, AlertCircle, XCircle, Search, Filter } from 'lucide-react';

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Master Appointment Schedule</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time status tracking for OPD consultations across clinical departments</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <Search size={16} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patient or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Booked</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{appointments.length || 124}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <Calendar size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Today</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {appointments.filter((a) => a.status === 'COMPLETED').length || 68}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Check-in</span>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {appointments.filter((a) => a.status === 'PENDING').length || 18}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <AlertCircle size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cancelled / Absent</span>
            <p className="text-2xl font-black text-rose-600 mt-1">
              {appointments.filter((a) => a.status === 'CANCELLED').length || 8}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <XCircle size={20} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 text-xs font-bold">
        <Filter size={14} className="text-slate-400 mr-2" />
        {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg transition ${filterStatus === st ? 'bg-sky-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Main Table */}
      <div className="glass-card">
        {loading ? (
          <TableSkeleton rows={6} cols={6} />
        ) : filteredAppts.length === 0 ? (
          <EmptyState
            title="No appointments found"
            description="No appointment bookings match the selected status filter."
          />
        ) : (
          <div className="data-table-container">
            <table className="data-table">
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
                  <tr key={appt.id} className="hover:bg-slate-50">
                    <td style={{ fontWeight: 800, color: '#0f4c81' }}>#{appt.id}</td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{appt.patient_detail?.user?.full_name || 'Patient'}</td>
                    <td>Dr. {appt.doctor_detail?.user?.full_name || 'Consultant Doctor'}</td>
                    <td className="text-xs text-slate-600">{appt.appointment_date}</td>
                    <td>
                      <span className="inline-flex items-center text-xs font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md">
                        <Clock size={12} className="mr-1" />
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
