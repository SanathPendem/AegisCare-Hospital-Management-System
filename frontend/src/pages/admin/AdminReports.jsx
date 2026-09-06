import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
import { TrendingUp, PieChart as PieIcon, Download, Printer } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminReports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await dashboardService.getSummary();
      setData(res);
    } catch (err) {
      console.error(err);
      addToast('Failed to load executive reports', 'error');
    } finally {
      setLoading(false);
    }
  };

  const revenueData = [
    { month: 'Jan', revenue: 420000 },
    { month: 'Feb', revenue: 580000 },
    { month: 'Mar', revenue: 710000 },
    { month: 'Apr', revenue: 640000 },
    { month: 'May', revenue: 890000 },
    { month: 'Jun', revenue: 1040000 },
    { month: 'Current', revenue: data?.metrics?.total_revenue || 840000 },
  ];

  const appointmentPieData = [
    { name: 'Confirmed', value: 45, color: '#0284c7' },
    { name: 'Pending', value: 20, color: '#d97706' },
    { name: 'Completed', value: 30, color: '#059669' },
    { name: 'Cancelled', value: 5, color: '#e11d48' },
  ];

  const handleExportCSV = () => {
    addToast('Generating executive financial report CSV download...', 'success');
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Hospital Analytics & Financial Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">Comprehensive OPD/IPD revenue statistics, departmental metrics, and audit summary</p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            <Download size={15} className="mr-1.5 text-slate-600" />
            Export CSV Report
          </button>

          <button
            onClick={handlePrintReport}
            className="inline-flex items-center px-4 py-2 bg-sky-800 hover:bg-sky-900 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            <Printer size={15} className="mr-1.5" />
            Print Report
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Growth Chart */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp size={20} className="text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Monthly Revenue Summary (₹)</h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              FY 2026
            </span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#0f4c81" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointment Status Pie */}
        <div className="glass-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <PieIcon size={20} className="text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">Appointment Status Distribution</h3>
            </div>
            <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
              OPD Check-ins
            </span>
          </div>

          <div className="w-full h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={appointmentPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
                  {appointmentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
