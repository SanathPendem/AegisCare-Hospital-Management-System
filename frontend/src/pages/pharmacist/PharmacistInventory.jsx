import React, { useEffect, useState } from 'react';
import { medicineService } from '../../services/medicineService';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { Package, Plus, Search, AlertTriangle } from 'lucide-react';

const PharmacistInventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: 'Antibiotic',
    dosage_form: 'Tablet',
    unit_price: '10.00',
    stock_quantity: 100,
    reorder_level: 15,
    manufacturer: 'Global Meds',
    batch_number: 'BCH-2026-N1',
    expiry_date: new Date(Date.now() + 365*86400000).toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchMedicines();
  }, [search]);

  const fetchMedicines = async () => {
    try {
      const res = await medicineService.getAll({ search });
      setMedicines(res.results || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await medicineService.create(formData);
      setIsModalOpen(false);
      fetchMedicines();
    } catch (err) {
      alert('Failed to add medicine item.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Medicine Stock Inventory</h1>
          <p className="page-subtitle">Track stock quantities, batch numbers, reorder thresholds, and expiries</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '250px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.5rem', width: '100%' }}
              placeholder="Search medicine name, code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
            <Plus size={18} />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading inventory...</div>
        ) : medicines.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No medicines found.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Medicine Name</th>
                  <th>Category</th>
                  <th>Dosage Form</th>
                  <th>Unit Price</th>
                  <th>Stock Quantity</th>
                  <th>Expiry Date</th>
                  <th>Alerts</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr key={med.id}>
                    <td style={{ fontWeight: 700, color: '#06b6d4' }}>{med.code}</td>
                    <td style={{ fontWeight: 600 }}>{med.name}</td>
                    <td>{med.category}</td>
                    <td>{med.dosage_form}</td>
                    <td>${med.unit_price}</td>
                    <td style={{ fontWeight: 700, color: med.is_low_stock ? '#f87171' : '#6ee7b7' }}>
                      {med.stock_quantity} pcs
                    </td>
                    <td>{med.expiry_date}</td>
                    <td>
                      {med.is_low_stock && <Badge status="PENDING" />}
                      {med.is_expired && <Badge status="EXPIRED" />}
                      {!med.is_low_stock && !med.is_expired && <Badge status="CONFIRMED" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Medicine to Inventory">
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Medicine Name</label>
              <input type="text" required className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Item Code (Unique)</label>
              <input type="text" required className="form-input" placeholder="MED-xxx-00" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input type="text" required className="form-input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Dosage Form</label>
              <select className="form-select" value={formData.dosage_form} onChange={(e) => setFormData({ ...formData, dosage_form: e.target.value })}>
                <option value="Tablet">Tablet</option>
                <option value="Capsule">Capsule</option>
                <option value="Syrup">Syrup</option>
                <option value="Injection">Injection</option>
                <option value="Ointment">Ointment</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Unit Price ($)</label>
              <input type="number" step="0.01" required className="form-input" value={formData.unit_price} onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Stock Quantity</label>
              <input type="number" required className="form-input" value={formData.stock_quantity} onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })} />
            </div>
            <div className="form-group">
              <label className="form-label">Reorder Threshold</label>
              <input type="number" required className="form-input" value={formData.reorder_level} onChange={(e) => setFormData({ ...formData, reorder_level: parseInt(e.target.value) })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Batch Number</label>
              <input type="text" className="form-input" value={formData.batch_number} onChange={(e) => setFormData({ ...formData, batch_number: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input type="date" required className="form-input" value={formData.expiry_date} onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
            Add Medicine Item
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PharmacistInventory;
