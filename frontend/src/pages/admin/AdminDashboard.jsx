import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import Badge from '../../components/Badge';
import { CardSkeleton, TableSkeleton } from '../../components/common/Skeleton';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  DollarSign, 
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 420000, appointments: 85 },
  { month: 'Feb', revenue: 510000, appointments: 98 },
  { month: 'Mar', revenue: 490000, appointments: 92 },
  { month: 'Apr', revenue: 630000, appointments: 115 },
  { month: 'May', revenue: 720000, appointments: 130 },
  { month: 'Jun', revenue: 840000, appointments: 148 }
];

const statusData = [
  { status: 'Completed', count: 68, fill: '#059669' },
  { status: 'Confirmed', count: 42, fill: '#0284c7' },
  { status: 'Pending', count: 18, fill: '#d97706' },
  { status: 'Cancelled', count: 8, fill: '#e11d48' }
];

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await dashboardService.getSummary();
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="aegis-kpi-grid">
          {[1, 2, 3, 4].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <TableSkeleton rows={6} cols={6} />
      </div>
    );
  }

  const metrics = data?.metrics || {};
  const recentAppts = data?.recent_appointments || [];

  return (
    <div className="space-y-10">
      {/* Operations Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white p-8 sm:p-10 rounded-2xl shadow-lg border border-sky-800/40">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
            AegisCare Operations Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1.5 tracking-tight">
            Good morning, System Admin
          </h1>
          <p className="text-xs sm:text-sm text-sky-200 mt-1.5">
            Live clinical performance, bed occupancy, and revenue summary for AegisCare Hospitals.
          </p>
        </div>
        <Link
          to="/admin/reports"
          className="aegis-btn aegis-btn-crimson shrink-0"
        >
          <span>View Full Analytics</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* KPI Cards Grid (MANDATORY 4-COL DESKTOP) */}
      <div className="aegis-kpi-grid">
        {/* Card 1 */}
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Total Patients</span>
            <div className="aegis-kpi-icon-wrapper bg-sky-50 text-sky-700">
              <Users size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number">{metrics.total_patients || 1248}</span>
            <span className="aegis-kpi-trend positive">
              <TrendingUp size={14} /> +12% this month
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Active Consultants</span>
            <div className="aegis-kpi-icon-wrapper bg-indigo-50 text-indigo-700">
              <Stethoscope size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number">{metrics.total_doctors || 86}</span>
            <span className="aegis-kpi-trend positive">
              <CheckCircle2 size={14} /> 15 Specialties
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Consultations</span>
            <div className="aegis-kpi-icon-wrapper bg-purple-50 text-purple-700">
              <Calendar size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number">{metrics.total_appointments || 124}</span>
            <span className="aegis-kpi-trend positive">
              <TrendingUp size={14} /> +8% this week
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Monthly Revenue</span>
            <div className="aegis-kpi-icon-wrapper bg-emerald-50 text-emerald-700">
              <DollarSign size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-emerald-700">₹{(metrics.total_revenue || 840000).toLocaleString()}</span>
            <span className="aegis-kpi-trend positive">
              <TrendingUp size={14} /> +14% YoY
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Growth Trend */}
        <div className="lg:col-span-2 aegis-table-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="aegis-section-title">Hospital Revenue Growth (2026)</h3>
              <p className="aegis-page-subtitle">Monthly breakdown of billing income & consultation volume</p>
            </div>
            <span className="aegis-badge aegis-badge-active">
              Up 14% YoY
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f4c81" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0f4c81" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0f4c81" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Status Distribution */}
        <div className="aegis-table-card p-8 flex flex-col justify-between">
          <div>
            <h3 className="aegis-section-title">Appointment Breakdown</h3>
            <p className="aegis-page-subtitle mb-6">OPD consultation status distribution</p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="status" type="category" tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ borderRadius: '8px' }} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Logged Today: 136</span>
            <Link to="/admin/appointments" className="text-sky-700 font-bold hover:underline">
              View Appointments →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Appointments Activity Log */}
      <div className="aegis-table-card p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="aegis-section-title">Recent Appointments Activity Log</h3>
            <p className="aegis-page-subtitle">Live consultation check-ins across hospital OPD desks</p>
          </div>
          <Link to="/admin/appointments" className="text-xs text-sky-700 font-bold hover:underline">
            View All Log Entries →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="aegis-table">
            <thead>
              <tr>
                <th>Appointment #</th>
                <th>Patient Name</th>
                <th>Assigned Doctor</th>
                <th>Date</th>
                <th>Time Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppts.map((appt) => (
                <tr key={appt.id} className="hoverable">
                  <td className="font-extrabold text-sky-800">#{appt.id}</td>
                  <td className="font-bold text-slate-900">{appt.patient_name}</td>
                  <td className="text-slate-700">{appt.doctor_name}</td>
                  <td className="text-slate-600">{appt.date}</td>
                  <td className="text-slate-600">{appt.time}</td>
                  <td><Badge status={appt.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
