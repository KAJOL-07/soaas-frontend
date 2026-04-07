import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const studentNav = [
  { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { key: 'apply-leave', label: 'Apply Leave', icon: '📋' },
  { key: 'my-leaves', label: 'My Leaves', icon: '📅' },
  { key: 'submit-project', label: 'Submit Project', icon: '🚀' },
  { key: 'my-projects', label: 'My Projects', icon: '📁' },
  { key: 'marks', label: 'View Marks', icon: '📊' },
  { key: 'notifications', label: 'Notifications', icon: '🔔' },
];

const staffNav = [
  { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { key: 'leave-requests', label: 'Leave Requests', icon: '📋' },
  { key: 'project-reviews', label: 'Project Reviews', icon: '🔍' },
  { key: 'marks-manage', label: 'Manage Marks', icon: '📊' },
  { key: 'notifications', label: 'Notifications', icon: '🔔' },
];

export default function Sidebar({ activePage, setActivePage }) {
  const { user, logout, notifications } = useContext(AppContext);
  const [collapsed, setCollapsed] = useState(false);

  const nav = user?.role === 'staff' ? staffNav : studentNav;
  const unread = notifications.filter(n => n.userId === user?.regNo && !n.read).length;

  return (
    <aside style={{
      width: collapsed ? '72px' : '240px',
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      zIndex: 100,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: collapsed ? 'center' : 'space-between' }}>
        {!collapsed && (
          <div>
            <div style={{ fontWeight: 800, fontSize: '16px', background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SOAASystem</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Academic Portal</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', transition: 'var(--transition)', flexShrink: 0 }}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>
              {user?.name?.[0] || '?'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontWeight: 600, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role} • {user?.regNo}</div>
            </div>
          </div>
        </div>
      )}
      {collapsed && (
        <div style={{ padding: '12px', display: 'flex', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>
            {user?.name?.[0] || '?'}
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {nav.map(({ key, label, icon }) => {
          const isActive = activePage === key;
          const isNotif = key === 'notifications';
          return (
            <button key={key} onClick={() => setActivePage(key)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              padding: collapsed ? '12px' : '11px 14px',
              borderRadius: '10px', border: 'none', cursor: 'pointer',
              background: isActive ? 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(72,185,255,0.1))' : 'transparent',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: isActive ? 600 : 400,
              transition: 'var(--transition)', marginBottom: '4px',
              borderLeft: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
              justifyContent: collapsed ? 'center' : 'flex-start',
              position: 'relative',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}}
            >
              <span style={{ fontSize: '16px', flexShrink: 0 }}>{icon}</span>
              {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{label}</span>}
              {isNotif && unread > 0 && !collapsed && (
                <span style={{ marginLeft: 'auto', background: 'var(--accent-danger)', color: '#fff', borderRadius: '999px', fontSize: '10px', fontWeight: 700, padding: '2px 7px' }}>{unread}</span>
              )}
              {isNotif && unread > 0 && collapsed && (
                <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: 'var(--accent-danger)', borderRadius: '50%' }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border)' }}>
        <button onClick={logout} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
          padding: collapsed ? '12px' : '11px 14px',
          borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'transparent',
          color: 'var(--accent-danger)', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500,
          transition: 'var(--transition)', justifyContent: collapsed ? 'center' : 'flex-start',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <span style={{ fontSize: '16px' }}>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
