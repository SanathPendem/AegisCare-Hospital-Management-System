import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import Badge from '../../components/Badge';
import { CardSkeleton, TableSkeleton } from '../../components/common/Skeleton';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  ArrowRight,
  TrendingUp,
  Activity,
  Bed,
  CheckCircle2
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
  PieChart, 
  Pie, 
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

const COLORS = ['#0f4c81', '#0284c7', '#059669', '#e11d48', '#d97706'];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    <div className="space-y-8">
      {/* Page Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-sky-900 via-sky-800 to-slate-900 text-white p-6 rounded-2xl shadow-md">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
            AegisCare Operations Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Good morning, System Admin 👋
          </h1>
          <p className="text-xs sm:text-sm text-sky-200 mt-1">
            Here's the live clinical performance, bed occupancy, and revenue summary for today.
          </p>
        </div>
        <Link
          to="/admin/reports"
          className="inline-flex items-center px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-lg transition self-start sm:self-auto shrink-0"
        >
          View Full Analytics <ArrowRight size={16} className="ml-1.5" />
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Patients */}
        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Total Patients</span>
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-slate-900">{metrics.total_patients || 1248}</p>
            <div className="flex items-center mt-2 text-xs font-bold text-emerald-600">
              <TrendingUp size={14} className="mr-1" />
              <span>+12% this month</span>
            </div>
          </div>
        </div>

        {/* Active Doctors */}
        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Active Consultants</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              <Stethoscope size={20} />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-slate-900">{metrics.total_doctors || 86}</p>
            <div className="flex items-center mt-2 text-xs font-bold text-sky-600">
              <CheckCircle2 size={14} className="mr-1" />
              <span>15 Centers of Excellence</span>
            </div>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Total Consultations</span>
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Calendar size={20} />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-slate-900">{metrics.total_appointments || 124}</p>
            <div className="flex items-center mt-2 text-xs font-bold text-emerald-600">
              <TrendingUp size={14} className="mr-1" />
              <span>+8% this week</span>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="glass-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Monthly Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-slate-900">₹{(metrics.total_revenue || 840000).toLocaleString()}</p>
            <div className="flex items-center mt-2 text-xs font-bold text-emerald-600">
              <TrendingUp size={14} className="mr-1" />
              <span>+14% vs last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Trend */}
        <div className="lg:col-span-2 glass-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hospital Revenue Growth (2026)</h3>
              <p className="text-xs text-slate-500">Monthly breakdown of billing income & consultation volume</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Up 14% YoY
            </span>
          </div>
          <div className="h-64 w-full">
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
        <div className="glass-card flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Appointment Status Distribution</h3>
            <p className="text-xs text-slate-500 mb-6">OPD consultation status breakdown</p>
            <div className="h-52 w-full">
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
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Logged Today: 136</span>
            <Link to="/admin/appointments" className="text-sky-700 font-bold hover:underline">
              View Appointments →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent System Activity Table */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Appointments Activity Log</h3>
            <p className="text-xs text-slate-500">Live consultation check-ins across hospital OPD desks</p>
          </div>
          <Link to="/admin/appointments" className="text-xs text-sky-700 font-bold hover:underline">
            View All Log Entries →
          </Link>
        </div>

        <div className="data-table-container">
          <table className="data-table">
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
                <tr key={appt.id}>
                  <td style={{ fontWeight: 800, color: '#0f4c81' }}>#{appt.id}</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{appt.patient_name}</td>
                  <td>{appt.doctor_name}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
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
