import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Notifications() {
  const { user, notifications, markNotificationRead } = useContext(AppContext);
  const myNotifs = notifications.filter(n => n.userId === user?.regNo).sort((a, b) => new Date(b.time) - new Date(a.time));
  const unread = myNotifs.filter(n => !n.read).length;

  const timeAgo = (iso) => {
    const diff = Date.now() - new Date(iso);
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1>🔔 Notifications</h1>
          <p>{unread > 0 ? `${unread} unread notification${unread > 1 ? 's' : ''}` : 'All caught up!'}</p>
        </div>
        {unread > 0 && (
          <button className="btn btn-ghost btn-sm" onClick={() => myNotifs.filter(n => !n.read).forEach(n => markNotificationRead(n.id))}>
            ✅ Mark all as read
          </button>
        )}
      </div>

      {myNotifs.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div style={{ fontSize: '56px', marginBottom: '12px' }}>🔔</div>
            <h3>No Notifications</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '6px', fontSize: '14px' }}>You're all caught up. Notifications will appear here.</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {myNotifs.map(n => (
            <div key={n.id} onClick={() => markNotificationRead(n.id)} className="card" style={{
              display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer',
              background: n.read ? 'var(--bg-card)' : 'rgba(108,99,255,0.08)',
              borderColor: n.read ? 'var(--border)' : 'rgba(108,99,255,0.3)',
              transition: 'var(--transition)',
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: n.read ? 'var(--text-muted)' : 'var(--accent-primary)', flexShrink: 0, boxShadow: n.read ? 'none' : '0 0 8px rgba(108,99,255,0.5)' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '14px', fontWeight: n.read ? 400 : 600, color: n.read ? 'var(--text-secondary)' : 'var(--text-primary)', lineHeight: 1.5 }}>{n.message}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px' }}>{timeAgo(n.time)}</p>
              </div>
              {!n.read && <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 600, background: 'rgba(108,99,255,0.1)', padding: '3px 10px', borderRadius: '6px', flexShrink: 0 }}>NEW</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
