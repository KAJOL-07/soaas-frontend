import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const statusColors = { Pending: 'badge-pending', Approved: 'badge-approved', Rejected: 'badge-rejected' };

export default function LeaveRequests() {
  const { leaveRequests, updateLeaveStatus } = useContext(AppContext);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? leaveRequests : leaveRequests.filter(l => l.status === filter);

  return (
    <div>
      <div className="page-header">
        <h1>📋 Leave Requests</h1>
        <p>Review and manage student leave applications</p>
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 18px', borderRadius: '999px', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
            background: filter === f ? 'linear-gradient(135deg,#6c63ff,#48b9ff)' : 'var(--bg-card)',
            color: filter === f ? '#fff' : 'var(--text-secondary)',
            border: '1px solid',
            borderColor: filter === f ? 'transparent' : 'var(--border)',
            transition: 'var(--transition)',
          }}>
            {f} {f !== 'All' && <span style={{ opacity: 0.7 }}>({leaveRequests.filter(l => l.status === f).length})</span>}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card"><div className="empty-state"><div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div><h3>No {filter === 'All' ? '' : filter} requests</h3></div></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(l => {
            const days = Math.ceil((new Date(l.to) - new Date(l.from)) / (1000 * 60 * 60 * 24)) + 1;
            return (
              <div key={l.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#6c63ff,#48b9ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                      {l.studentName?.[0] || 'S'}
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '14px' }}>{l.studentName}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '8px' }}>{l.studentId}</span>
                    </div>
                    <span className={`badge ${statusColors[l.status] || 'badge-pending'}`}>{l.status}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}><strong>{l.type || 'General'}</strong>: {l.reason}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                    <span>📅 {l.from} → {l.to}</span>
                    <span>⏱ {isNaN(days) ? 1 : days} day{days > 1 ? 's' : ''}</span>
                  </div>
                </div>
                {l.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button className="btn btn-success btn-sm" onClick={() => updateLeaveStatus(l.id, 'Approved')}>✅ Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => updateLeaveStatus(l.id, 'Rejected')}>❌ Reject</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
