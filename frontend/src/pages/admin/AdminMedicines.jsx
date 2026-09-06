import React, { useEffect, useState } from 'react';
import { medicineService } from '../../services/medicineService';
import Badge from '../../components/Badge';
import { Package, Search } from 'lucide-react';

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await medicineService.getAll();
      setMedicines(res.results || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Pharmacy Medicine Catalog</h1>
          <p className="page-subtitle">Master drug list, pricing, and stock levels</p>
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading medicines...</div>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Dosage Form</th>
                  <th>Unit Price</th>
                  <th>Stock</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
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
                      {med.is_low_stock ? <Badge status="PENDING" /> : <Badge status="CONFIRMED" />}
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
