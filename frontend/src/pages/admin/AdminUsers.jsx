import React, { useEffect, useState } from 'react';
import { authService } from '../../services/authService';
import Badge from '../../components/Badge';
import { Users, Search, Shield } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const fetchUsers = async () => {
    try {
      const res = await authService.getAdminUsers({ search });
      setUsers(res.results || res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const roleColors = {
    ADMIN: 'badge-cancelled',
    DOCTOR: 'badge-completed',
    PATIENT: 'badge-confirmed',
    RECEPTIONIST: 'badge-pending',
    PHARMACIST: 'badge-pending',
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">View and manage all registered user accounts and RBAC roles</p>
        </div>
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem', width: '100%' }}
            placeholder="Search email, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card">
        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading users...</div>
        ) : (
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 600 }}>{u.full_name || 'User'}</td>
                    <td style={{ color: '#06b6d4' }}>{u.email}</td>
                    <td>
                      <span className={`badge ${roleColors[u.role] || 'badge-pending'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.phone || '-'}</td>
                    <td>
                      <span className={`badge ${u.is_active ? 'badge-confirmed' : 'badge-cancelled'}`}>
                        {u.is_active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td>{new Date(u.created_at).toLocaleDateString()}</td>
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

export default AdminUsers;
