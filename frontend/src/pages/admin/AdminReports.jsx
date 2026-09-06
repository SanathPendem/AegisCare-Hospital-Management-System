import React, { useEffect, useState } from 'react';
import { dashboardService } from '../../services/dashboardService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon } from 'lucide-react';

const AdminReports = () => {
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

  const revenueData = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: 7100 },
    { month: 'Apr', revenue: 6400 },
    { month: 'May', revenue: 8900 },
    { month: 'Jun', revenue: 10400 },
    { month: 'Current', revenue: data?.metrics?.total_revenue || 1200 },
  ];

  const appointmentPieData = [
    { name: 'Confirmed', value: 45, color: '#10b981' },
    { name: 'Pending', value: 20, color: '#f59e0b' },
    { name: 'Completed', value: 30, color: '#3b82f6' },
    { name: 'Cancelled', value: 5, color: '#ef4444' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Hospital Analytics & Financial Reports</h1>
          <p className="page-subtitle">Revenue stats, appointment status breakdown, and performance insights</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Monthly Financial Revenue ($)</h3>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }} />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <PieIcon size={20} color="#06b6d4" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Appointment Status Distribution</h3>
          </div>
          <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={appointmentPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {appointmentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
