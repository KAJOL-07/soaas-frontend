import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function StaffDashboard() {
  const { user, leaveRequests, projects, marks, notifications } = useContext(AppContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending').length;
  const pendingProjects = projects.filter(p => p.status === 'Pending').length;
  const totalApproved = leaveRequests.filter(l => l.status === 'Approved').length + projects.filter(p => p.status === 'Approved').length;
  const myNotifs = notifications.filter(n => n.userId === user?.regNo && !n.read);

  const stats = [
    { label: 'Pending Leaves', value: pendingLeaves, icon: '📋', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', glow: 'rgba(245,158,11,0.35)' },
    { label: 'Pending Reviews', value: pendingProjects, icon: '🔍', gradient: 'linear-gradient(135deg, #6c63ff, #a855f7)', glow: 'rgba(108,99,255,0.35)' },
    { label: 'Total Approved', value: totalApproved, icon: '🏆', gradient: 'linear-gradient(135deg, #10d48e, #059669)', glow: 'rgba(16,212,142,0.35)' },
    { label: 'Notifications', value: myNotifs.length, icon: '🔔', gradient: 'linear-gradient(135deg, #48b9ff, #0ea5e9)', glow: 'rgba(72,185,255,0.35)' },
  ];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 70%)', animation: 'orbFloat 15s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(72,185,255,0.05) 0%, transparent 70%)', animation: 'orbFloat 12s ease-in-out infinite reverse', pointerEvents: 'none' }} />

      <div style={{
        position: 'relative', zIndex: 1,
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8))',
        border: '1px solid var(--border)',
        borderRadius: '24px', padding: '40px', marginBottom: '32px',
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>
              Facultary Portal: <span style={{ background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Manage academic approvals and student performance metrics</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>System Status</div>
              <div style={{ fontSize: '12px', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 1.5s infinite' }} />
                Operational
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {stats.map((s, i) => (
          <div key={s.label} className="card" style={{
            background: 'var(--bg-card)', padding: '24px', border: '1px solid var(--border)',
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * i}s`,
            position: 'relative', overflow: 'hidden'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: s.gradient, opacity: 0.05, borderRadius: '0 0 0 100%' }} />
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{s.icon}</div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        {/* Main Approval Queue */}
        <div className="card" style={{
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
        }}>
          <h3 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <span style={{ fontSize: '20px' }}>⏳</span> Approval Queue
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[...leaveRequests, ...projects].filter(item => item.status === 'Pending').slice(0, 5).map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px',
                border: '1px solid var(--border)', transition: 'var(--transition)'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-secondary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {item.title ? '🚀' : '📅'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{item.title || item.reason}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      From: <span style={{ color: 'var(--text-secondary)' }}>{item.studentName}</span> • Type: {item.title ? 'Project' : (item.type || 'Leave')}
                    </div>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm">Process</button>
              </div>
            ))}
            {pendingLeaves + pendingProjects === 0 && <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>Inbox is clean! All approvals handled.</p>}
          </div>
        </div>

        {/* Notifications & Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
          }}>
            <h3 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '20px' }}>🔔 Notifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {myNotifs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '32px' }}>📬</div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No new notifications</p>
                </div>
              ) : (
                myNotifs.slice(0, 4).map(n => (
                  <div key={n.id} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'rgba(108,99,255,0.05)', borderRadius: '10px', border: '1px solid rgba(108,99,255,0.1)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', marginTop: '5px', flexShrink: 0 }} />
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{n.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card" style={{
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
            background: 'linear-gradient(135deg, rgba(72,185,255,0.05), rgba(108,99,255,0.05))'
          }}>
            <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '12px' }}>📌 Quick Links</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}>Leave Policy</button>
              <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}>Grading Guide</button>
              <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}>Calendar</button>
              <button className="btn btn-ghost btn-sm" style={{ justifyContent: 'center' }}>Staff Help</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
