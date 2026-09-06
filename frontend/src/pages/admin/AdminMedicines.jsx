import React, { useEffect, useState } from 'react';
import { medicineService } from '../../services/medicineService';
import Badge from '../../components/Badge';
import EmptyState from '../../components/common/EmptyState';
import { TableSkeleton } from '../../components/common/Skeleton';
import { useToast } from '../../context/ToastContext';
import { Package, Search, AlertTriangle, CheckCircle2, Pill, Plus, Download } from 'lucide-react';

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
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="aegis-page-title">Pharmacy Medicine Catalog</h1>
          <p className="aegis-page-subtitle">Master pharmaceutical catalog, unit pricing, batch tracking, and low-stock alerts.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => addToast('Exporting drug inventory to CSV...', 'info')}
            className="aegis-btn aegis-btn-secondary"
          >
            <Download size={18} />
            <span>Export Catalog</span>
          </button>
          <button
            onClick={() => addToast('Add medicine dialog opened...', 'info')}
            className="aegis-btn aegis-btn-primary"
          >
            <Plus size={18} />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (4-Column Grid on Desktop) */}
      <div className="aegis-kpi-grid">
        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Cataloged Drugs</span>
            <div className="aegis-kpi-icon-wrapper bg-purple-50 text-purple-700">
              <Pill size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number">{medicines.length || 45}</span>
            <span className="aegis-kpi-trend positive">
              15 Categories
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Stock Available</span>
            <div className="aegis-kpi-icon-wrapper bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-emerald-700">14,850</span>
            <span className="aegis-kpi-trend positive">
              In Stock Units
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Low Stock Warnings</span>
            <div className="aegis-kpi-icon-wrapper bg-amber-50 text-amber-700">
              <AlertTriangle size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-amber-700">
              {medicines.filter((m) => m.is_low_stock).length || 3}
            </span>
            <span className="aegis-kpi-trend positive">
              Reorder needed
            </span>
          </div>
        </div>

        <div className="aegis-kpi-card">
          <div className="aegis-kpi-header">
            <span className="aegis-kpi-label">Avg Unit Price</span>
            <div className="aegis-kpi-icon-wrapper bg-sky-50 text-sky-700">
              <Package size={22} />
            </div>
          </div>
          <div className="aegis-kpi-footer">
            <span className="aegis-card-number text-sky-800">₹45.00</span>
            <span className="aegis-kpi-trend neutral">
              Standard Rates
            </span>
          </div>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="aegis-toolbar">
        <div className="aegis-search-input-group">
          <Search size={18} className="aegis-search-icon" />
          <input
            type="text"
            placeholder="Search medicine name, code, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="aegis-input"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="aegis-table-card">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={6} cols={8} />
          </div>
        ) : filteredMeds.length === 0 ? (
          <EmptyState
            title="No medicines found"
            description="No pharmaceutical records match your current search query."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="aegis-table">
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
                  <tr key={med.id} className="hoverable">
                    <td className="font-extrabold text-sky-800 font-mono">{med.code}</td>
                    <td className="font-bold text-slate-900">{med.name}</td>
                    <td className="text-xs text-slate-600 font-medium">{med.category}</td>
                    <td className="text-xs text-slate-500">{med.dosage_form}</td>
                    <td className="text-xs font-bold text-emerald-700">₹{med.unit_price}</td>
                    <td>
                      <span className={`text-xs font-extrabold ${med.is_low_stock ? 'text-rose-600' : 'text-slate-900'}`}>
                        {med.stock_quantity} pcs
                      </span>
                    </td>
                    <td className="text-xs text-slate-500 font-medium">{med.expiry_date}</td>
                    <td>
                      {med.is_low_stock ? (
                        <span className="aegis-badge aegis-badge-danger">
                          <AlertTriangle size={12} />
                          LOW STOCK
                        </span>
                      ) : (
                        <span className="aegis-badge aegis-badge-active">
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
