import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Badge from '../../components/Badge';
import EmptyState from '../../components/common/EmptyState';
import { CardSkeleton, TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Bed, CheckCircle2, UserMinus, HeartPulse, ShieldCheck, Activity } from 'lucide-react';

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
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inpatient Wards & Bed Occupancy</h1>
        <p className="text-xs text-slate-500 mt-0.5">Real-time ICU, General Ward, Deluxe Suite occupancy monitoring and discharge workflow</p>
      </div>

      {/* Ward Occupancy Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wards.map((w) => {
            const occupied = w.total_beds - w.available_beds;
            const occupancyPct = Math.round((occupied / (w.total_beds || 1)) * 100);

            return (
              <div key={w.id} className="glass-card flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">{w.name}</h3>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ₹{w.daily_rate}/day
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Location: {w.floor}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">Occupancy: {occupancyPct}%</span>
                    <span className="text-sky-800">{w.available_beds} Available</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${occupancyPct > 85 ? 'bg-rose-600' : occupancyPct > 60 ? 'bg-amber-500' : 'bg-sky-600'}`}
                      style={{ width: `${occupancyPct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span>Capacity: {w.total_beds} Beds</span>
                  <span>Occupied: {occupied} Beds</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Inpatient Admissions */}
      <div className="glass-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Patient Inpatient Admissions</h3>
            <p className="text-xs text-slate-500">Live bed assignments and medical discharge queue</p>
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
          <div className="data-table-container">
            <table className="data-table">
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
                  <tr key={adm.id} className="hover:bg-slate-50">
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{adm.patient_detail?.user?.full_name || 'Admitted Patient'}</td>
                    <td>
                      <span className="inline-flex items-center text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                        <Bed size={12} className="mr-1" />
                        {adm.bed_detail?.ward_name} ({adm.bed_detail?.bed_number})
                      </span>
                    </td>
                    <td className="text-xs text-slate-600">{new Date(adm.admitted_at).toLocaleDateString()}</td>
                    <td className="text-xs text-slate-700">{adm.reason || 'General Observation'}</td>
                    <td>
                      <span className={`inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full ${adm.status === 'ADMITTED' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>
                        {adm.status}
                      </span>
                    </td>
                    <td className="text-right">
                      {adm.status === 'ADMITTED' ? (
                        <button
                          onClick={() => handleDischarge(adm.id)}
                          className="inline-flex items-center px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                        >
                          <UserMinus size={13} className="mr-1" />
                          Discharge Patient
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 flex items-center justify-end">
                          <CheckCircle2 size={13} className="mr-1" /> Discharged
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
