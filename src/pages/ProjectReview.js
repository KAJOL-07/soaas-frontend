import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function ProjectReviews() {
  const { projects, updateProjectStatus } = useContext(AppContext);
  const [feedbacks, setFeedbacks] = useState({});
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.status === filter);

  const handleReview = (id, status) => {
    updateProjectStatus(id, feedbacks[id] || 'No feedback provided.', status);
    setExpanded(null);
  };

  const statusColors = { Pending: 'badge-pending', Reviewed: 'badge-reviewed', Approved: 'badge-approved', Rejected: 'badge-rejected' };

  return (
    <div>
      <div className="page-header">
        <h1>🔍 Project Reviews</h1>
        <p>Review student project submissions and provide feedback</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['All', 'Pending', 'Reviewed', 'Approved', 'Rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 18px', borderRadius: '999px', border: '1px solid',
            borderColor: filter === f ? 'transparent' : 'var(--border)',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
            background: filter === f ? 'linear-gradient(135deg,#6c63ff,#48b9ff)' : 'var(--bg-card)',
            color: filter === f ? '#fff' : 'var(--text-secondary)', transition: 'var(--transition)',
          }}>{f} {f !== 'All' && `(${projects.filter(p => p.status === f).length})`}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card"><div className="empty-state"><div style={{ fontSize: '48px', marginBottom: '12px' }}>📂</div><h3>No projects to review</h3></div></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.map(p => (
            <div key={p.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg,#6c63ff,#48b9ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
                      {p.studentName?.[0] || 'S'}
                    </div>
                    <div>
                      <span style={{ fontWeight: 700 }}>{p.studentName}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '8px' }}>{p.studentId}</span>
                    </div>
                    <span className={`badge ${statusColors[p.status] || 'badge-pending'}`}>{p.status}</span>
                    {p.category && <span style={{ fontSize: '11px', background: 'var(--bg-secondary)', padding: '3px 10px', borderRadius: '6px', color: 'var(--text-muted)' }}>{p.category}</span>}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.6', marginBottom: '8px' }}>{p.description}</p>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-secondary)', fontSize: '12px' }}>🔗 {p.link}</a>}
                  {p.feedback && (
                    <div style={{ marginTop: '10px', background: 'rgba(16,212,142,0.08)', border: '1px solid rgba(16,212,142,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--accent-success)' }}>Feedback:</strong> {p.feedback}
                    </div>
                  )}
                </div>
                {p.status === 'Pending' && (
                  <button className="btn btn-ghost btn-sm" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                    {expanded === p.id ? '▲ Close' : '✏️ Review'}
                  </button>
                )}
              </div>

              {expanded === p.id && (
                <div style={{ marginTop: '16px', padding: '16px', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border)', animation: 'slideIn 0.2s ease' }}>
                  <div className="form-group">
                    <label>Feedback / Comments</label>
                    <textarea className="form-control" rows={3} placeholder="Write your feedback for the student..." value={feedbacks[p.id] || ''} onChange={e => setFeedbacks({ ...feedbacks, [p.id]: e.target.value })} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-success btn-sm" onClick={() => handleReview(p.id, 'Reviewed')}>✅ Mark Reviewed</button>
                    <button className="btn btn-primary btn-sm" onClick={() => handleReview(p.id, 'Approved')}>🏆 Approve</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleReview(p.id, 'Rejected')}>❌ Reject</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
