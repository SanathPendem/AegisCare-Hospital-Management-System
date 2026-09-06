import React, { useEffect, useState } from 'react';
import { billingService } from '../../services/billingService';
import Badge from '../../components/Badge';
import Modal from '../../components/Modal';
import { CreditCard, CheckCircle2, DollarSign } from 'lucide-react';

const PatientBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await billingService.getAll();
      setBills(res.results || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();
    try {
      const res = await billingService.pay(selectedBill.id, paymentMethod);
      setPaymentSuccess(res);
      fetchBills();
    } catch (err) {
      alert('Payment processing failed.');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Bills & Payments</h1>
          <p className="page-subtitle">View medical invoices and process online payments</p>
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading bills...</div>
        ) : bills.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>No bills on record.</p>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Discount</th>
                  <th>Final Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id}>
                    <td style={{ fontWeight: 700, color: '#06b6d4' }}>{bill.invoice_number}</td>
                    <td>{new Date(bill.created_at).toLocaleDateString()}</td>
                    <td>${bill.total_amount}</td>
                    <td>-${bill.discount}</td>
                    <td style={{ fontWeight: 800, color: '#f8fafc', fontSize: '1rem' }}>${bill.final_amount}</td>
                    <td><Badge status={bill.status} /></td>
                    <td>
                      {bill.status !== 'PAID' ? (
                        <button
                          onClick={() => { setSelectedBill(bill); setPaymentSuccess(null); }}
                          className="btn btn-emerald"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        >
                          <CreditCard size={14} /> Pay Now
                        </button>
                      ) : (
                        <span style={{ color: '#6ee7b7', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <CheckCircle2 size={16} /> Paid on {new Date(bill.paid_at).toLocaleDateString()}
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

      {/* Payment Processing Modal */}
      <Modal isOpen={!!selectedBill} onClose={() => setSelectedBill(null)} title={`Pay Invoice #${selectedBill?.invoice_number}`}>
        {paymentSuccess ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Payment Successful!</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0.5rem 0 1.5rem 0' }}>
              ${paymentSuccess.paid_amount} paid via {paymentSuccess.payment_method}
            </p>
            <button onClick={() => setSelectedBill(null)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handlePay}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <span>Subtotal</span>
                <span>${selectedBill?.total_amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <span>Discount</span>
                <span>-${selectedBill?.discount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                <span>Tax</span>
                <span>+${selectedBill?.tax}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontWeight: 800, fontSize: '1.1rem' }}>
                <span>Total Due</span>
                <span style={{ color: '#10b981' }}>${selectedBill?.final_amount}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
                <option value="UPI">UPI / NetBanking</option>
                <option value="INSURANCE">Insurance Claim</option>
              </select>
            </div>

            <button type="submit" className="btn btn-emerald" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '0.85rem' }}>
              Process Payment (${selectedBill?.final_amount})
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default PatientBills;
