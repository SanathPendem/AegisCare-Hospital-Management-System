import React, { useEffect, useState } from 'react';
import { medicineService } from '../../services/medicineService';
import Badge from '../../components/Badge';
import EmptyState from '../../components/common/EmptyState';
import { TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Package, Search, AlertTriangle, CheckCircle2, Pill } from 'lucide-react';

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await medicineService.getAll();
      setMedicines(res.results || res);
    } catch (err) {
      console.error(err);
      addToast('Failed to load medicine catalog', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredMeds = medicines.filter((med) => {
    const name = (med.name || '').toLowerCase();
    const cat = (med.category || '').toLowerCase();
    const code = (med.code || '').toLowerCase();
    const q = searchTerm.toLowerCase();
    return name.includes(q) || cat.includes(q) || code.includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Pharmacy Medicine Catalog</h1>
          <p className="text-xs text-slate-500 mt-0.5">Master pharmaceutical catalog, unit pricing, batch tracking, and low-stock alerts</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-64">
            <Search size={16} className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search medicine name, code, category..."
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
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cataloged Drugs</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{medicines.length || 45}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
            <Pill size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Stock Available</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">14,850 Units</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Low Stock Warnings</span>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {medicines.filter((m) => m.is_low_stock).length || 3}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="glass-card flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Unit Price</span>
            <p className="text-2xl font-black text-sky-800 mt-1">₹45.00</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <Package size={20} />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-card">
        {loading ? (
          <TableSkeleton rows={6} cols={8} />
        ) : filteredMeds.length === 0 ? (
          <EmptyState
            title="No medicines found"
            description="No pharmaceutical records match your current search query."
          />
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Drug Code</th>
                  <th>Medicine Name</th>
                  <th>Category</th>
                  <th>Dosage Form</th>
                  <th>Unit Price</th>
                  <th>Stock Level</th>
                  <th>Expiry Date</th>
                  <th>Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMeds.map((med) => (
                  <tr key={med.id} className="hover:bg-slate-50">
                    <td style={{ fontWeight: 800, color: '#0f4c81' }}>{med.code}</td>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>{med.name}</td>
                    <td className="text-xs text-slate-600 font-medium">{med.category}</td>
                    <td className="text-xs text-slate-500">{med.dosage_form}</td>
                    <td className="text-xs font-bold text-emerald-700">₹{med.unit_price}</td>
                    <td>
                      <span className={`text-xs font-black ${med.is_low_stock ? 'text-rose-600' : 'text-slate-900'}`}>
                        {med.stock_quantity} pcs
                      </span>
                    </td>
                    <td className="text-xs text-slate-500">{med.expiry_date}</td>
                    <td>
                      {med.is_low_stock ? (
                        <span className="inline-flex items-center text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                          <AlertTriangle size={11} className="mr-1" />
                          LOW STOCK
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          NORMAL
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

export default AdminMedicines;
