import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const statusColors = { Pending: 'badge-pending', Approved: 'badge-approved', Rejected: 'badge-rejected' };

export default function MyLeaves() {
  const { user, leaveRequests } = useContext(AppContext);
  const myLeaves = leaveRequests.filter(l => l.studentId === user?.regNo);

  const stats = {
    total: myLeaves.length,
    approved: myLeaves.filter(l => l.status === 'Approved').length,
    pending: myLeaves.filter(l => l.status === 'Pending').length,
    rejected: myLeaves.filter(l => l.status === 'Rejected').length,
  };

  return (
    <div>
      <div className="page-header">
        <h1>📅 My Leave Requests</h1>
        <p>Track the status of all your leave applications</p>
      </div>

      {/* Stat Cards */}
      <div className="grid-3" style={{ marginBottom: '24px', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {[
          { label: 'Total', value: stats.total, color: '#6c63ff', bg: 'rgba(108,99,255,0.1)' },
          { label: 'Approved', value: stats.approved, color: 'var(--accent-success)', bg: 'rgba(16,212,142,0.1)' },
          { label: 'Pending', value: stats.pending, color: 'var(--accent-warning)', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Rejected', value: stats.rejected, color: 'var(--accent-danger)', bg: 'rgba(239,68,68,0.1)' },
        ].map(s => (
          <div key={s.label} className="card" style={{ background: s.bg, border: `1px solid ${s.color}33`, textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {myLeaves.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
            <h3 style={{ marginBottom: '6px' }}>No leave requests yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Your leave applications will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type / Reason</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Days</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myLeaves.map((l, i) => {
                  const days = Math.ceil((new Date(l.to) - new Date(l.from)) / (1000 * 60 * 60 * 24)) + 1;
                  return (
                    <tr key={l.id}>
                      <td style={{ color: 'var(--text-muted)', fontWeight: 600 }}>#{i + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{l.type || 'General'}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{l.reason}</div>
                      </td>
                      <td>{l.from}</td>
                      <td>{l.to}</td>
                      <td><span style={{ background: 'var(--bg-secondary)', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>{isNaN(days) ? 1 : days}d</span></td>
                      <td><span className={`badge ${statusColors[l.status] || 'badge-pending'}`}>{l.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
