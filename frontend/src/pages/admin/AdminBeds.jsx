import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import EmptyState from '../../components/common/EmptyState';
import { CardSkeleton, TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Bed, CheckCircle2, UserMinus, HeartPulse, ShieldCheck, Activity, Plus } from 'lucide-react';

const AdminBeds = () => {
  const [wards, setWards] = useState([]);
  const [beds, setBeds] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const wRes = await api.get('/beds/wards/');
      const bRes = await api.get('/beds/beds/');
      const aRes = await api.get('/beds/admissions/');
      setWards(wRes.data.results || wRes.data);
      setBeds(bRes.data.results || bRes.data);
      setAdmissions(aRes.data.results || aRes.data);
    } catch (err) {
      console.error(err);
      addToast('Failed to load bed occupancy data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDischarge = async (id) => {
    try {
      await api.post(`/beds/admissions/${id}/discharge/`);
      addToast('Patient discharged! Bed status reset to AVAILABLE.', 'success');
      fetchData();
    } catch (err) {
      addToast('Discharge processing failed.', 'error');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="aegis-page-title">Inpatient Wards & Bed Occupancy</h1>
          <p className="aegis-page-subtitle">Real-time ICU, General Ward, Deluxe Suite occupancy monitoring and discharge workflow.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => addToast('Admit patient dialog opened...', 'info')}
            className="aegis-btn aegis-btn-primary"
          >
            <Plus size={18} />
            <span>Admit Inpatient</span>
          </button>
        </div>
      </div>

      {/* Ward Occupancy Cards (4-Column Grid on Desktop) */}
      <div>
        <h2 className="aegis-section-title mb-4">Ward Capacity Summary</h2>
        {loading ? (
          <div className="aegis-kpi-grid">
            {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="aegis-kpi-grid">
            {wards.map((w) => {
              const occupied = w.total_beds - w.available_beds;
              const occupancyPct = Math.round((occupied / (w.total_beds || 1)) * 100);

              return (
                <div key={w.id} className="aegis-kpi-card space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-slate-900 text-base">{w.name}</h3>
                      <span className="aegis-badge aegis-badge-active">
                        ₹{w.daily_rate}/day
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">Location: {w.floor}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-600">Occupancy: {occupancyPct}%</span>
                      <span className="text-sky-800 font-extrabold">{w.available_beds} Available</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${occupancyPct > 85 ? 'bg-rose-600' : occupancyPct > 60 ? 'bg-amber-500' : 'bg-sky-600'}`}
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Capacity: {w.total_beds} Beds</span>
                    <span className="text-slate-800 font-bold">Occupied: {occupied} Beds</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Active Inpatient Admissions Table */}
      <div className="aegis-table-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="aegis-section-title">Active Inpatient Admissions</h3>
            <p className="aegis-page-subtitle">Live bed assignments and medical discharge queue</p>
          </div>
        </div>

        {loading ? (
          <TableSkeleton rows={5} cols={6} />
        ) : admissions.length === 0 ? (
          <EmptyState
            title="No active admissions"
            description="There are currently no patients admitted to hospital wards."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="aegis-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Ward & Bed #</th>
                  <th>Admitted Date</th>
                  <th>Clinical Reason</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map((adm) => (
                  <tr key={adm.id} className="hoverable">
                    <td className="font-bold text-slate-900">{adm.patient_detail?.user?.full_name || 'Admitted Patient'}</td>
                    <td>
                      <span className="inline-flex items-center text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                        <Bed size={14} className="mr-1.5 text-sky-600" />
                        {adm.bed_detail?.ward_name} ({adm.bed_detail?.bed_number})
                      </span>
                    </td>
                    <td className="text-xs text-slate-600 font-medium">{new Date(adm.admitted_at).toLocaleDateString()}</td>
                    <td className="text-xs text-slate-700 font-medium">{adm.reason || 'General Observation'}</td>
                    <td>
                      <span className={`aegis-badge ${adm.status === 'ADMITTED' ? 'aegis-badge-pending' : 'aegis-badge-active'}`}>
                        {adm.status}
                      </span>
                    </td>
                    <td className="text-right">
                      {adm.status === 'ADMITTED' ? (
                        <button
                          onClick={() => handleDischarge(adm.id)}
                          className="aegis-btn aegis-btn-crimson"
                          style={{ height: '36px', fontSize: '12px', padding: '0 12px' }}
                        >
                          <UserMinus size={14} />
                          <span>Discharge</span>
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 flex items-center justify-end">
                          <CheckCircle2 size={14} className="mr-1" /> Discharged
                        </span>
                      )}
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

export default AdminBeds;
