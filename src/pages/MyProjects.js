import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const statusColors = { Pending: 'badge-pending', Reviewed: 'badge-reviewed', Approved: 'badge-approved', Rejected: 'badge-rejected' };

export default function MyProjects() {
  const { user, projects } = useContext(AppContext);
  const myProjects = projects.filter(p => p.studentId === user?.regNo);

  return (
    <div>
      <div className="page-header">
        <h1>📁 My Projects</h1>
        <p>View your submitted projects and faculty feedback</p>
      </div>

      {myProjects.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📂</div>
            <h3>No projects submitted yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>Submit your first project for faculty review.</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {myProjects.map((p, i) => (
            <div key={p.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: p.status === 'Reviewed' ? 'var(--accent-secondary)' : p.status === 'Approved' ? 'var(--accent-success)' : p.status === 'Rejected' ? 'var(--accent-danger)' : 'var(--accent-warning)' }} />
              <div style={{ paddingLeft: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontWeight: 700, fontSize: '16px' }}>{p.title}</h3>
                      <span className={`badge ${statusColors[p.status] || 'badge-pending'}`}>{p.status}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{p.category} • Project #{i + 1}</div>
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">🔗 View Project</a>
                  )}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.7', marginBottom: '12px' }}>{p.description}</p>
                {p.feedback && (
                  <div style={{ background: 'rgba(72,185,255,0.08)', border: '1px solid rgba(72,185,255,0.2)', borderRadius: '10px', padding: '12px 16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>👨‍🏫 Faculty Feedback</div>
                    <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6' }}>{p.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
