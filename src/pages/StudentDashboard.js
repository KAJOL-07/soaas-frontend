import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function StudentDashboard() {
  const { user, leaveRequests, projects, marks, notifications } = useContext(AppContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const myLeaves = leaveRequests.filter(l => l.studentId === user?.regNo);
  const myProjects = projects.filter(p => p.studentId === user?.regNo);
  const myMarks = marks.filter(m => m.studentId === user?.regNo);
  const myNotifs = notifications.filter(n => n.userId === user?.regNo && !n.read);
  const avg = myMarks.length ? Math.round(myMarks.reduce((s, m) => s + (m.score / m.max) * 100, 0) / myMarks.length) : 0;

  const stats = [
    { label: 'Pending Leaves', value: myLeaves.filter(l => l.status === 'Pending').length, icon: '📋', gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a24)', glow: 'rgba(238,90,36,0.35)' },
    { label: 'My Projects', value: myProjects.length, icon: '🚀', gradient: 'linear-gradient(135deg, #6c63ff, #a855f7)', glow: 'rgba(108,99,255,0.35)' },
    { label: 'Avg Score', value: `${avg}%`, icon: '📊', gradient: 'linear-gradient(135deg, #48b9ff, #0ea5e9)', glow: 'rgba(72,185,255,0.35)' },
    { label: 'Notifications', value: myNotifs.length, icon: '🔔', gradient: 'linear-gradient(135deg, #10d48e, #059669)', glow: 'rgba(16,212,142,0.35)' },
  ];

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Animated floating orbs */}
      <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)', animation: 'orbFloat 12s ease-in-out infinite', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '30%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(72,185,255,0.06) 0%, transparent 70%)', animation: 'orbFloat 15s ease-in-out infinite reverse', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', right: '20%', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,212,142,0.05) 0%, transparent 70%)', animation: 'orbFloat 10s ease-in-out infinite 2s', pointerEvents: 'none', zIndex: 0 }} />

      {/* Hero Welcome Banner */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(72,185,255,0.08), rgba(16,212,142,0.05))',
        border: '1px solid rgba(108,99,255,0.2)',
        borderRadius: '20px', padding: '32px 36px', marginBottom: '28px',
        overflow: 'hidden',
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Shimmer line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #6c63ff, #48b9ff, #10d48e, transparent)', animation: 'shimmer 3s ease-in-out infinite' }} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '13px', color: 'var(--accent-secondary)', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px', animation: 'fadeSlideRight 0.6s ease 0.2s backwards' }}>{getGreeting()} 👋</p>
            <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '6px', animation: 'fadeSlideRight 0.6s ease 0.3s backwards' }}>
              Welcome back, <span style={{ background: 'linear-gradient(135deg, #6c63ff, #48b9ff, #10d48e)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 4s ease infinite' }}>{user?.name}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', animation: 'fadeSlideRight 0.6s ease 0.4s backwards' }}>Here's your academic activity at a glance</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', animation: 'fadeSlideLeft 0.6s ease 0.5s backwards' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #6c63ff, #48b9ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '22px', color: '#fff',
              boxShadow: '0 8px 24px rgba(108,99,255,0.4)',
              animation: 'pulse 2s ease-in-out infinite',
            }}>{user?.name?.[0]}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>{user?.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>🎓 {user?.regNo} • Student</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px', position: 'relative', zIndex: 1 }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            position: 'relative', borderRadius: '16px', padding: '24px 20px', overflow: 'hidden',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            cursor: 'pointer',
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.15 * (i + 1)}s`,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'; e.currentTarget.style.boxShadow = `0 12px 32px ${s.glow}`; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            {/* Accent bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: s.gradient }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ fontSize: '28px', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${s.glow.replace('0.35', '0.12')}` }}>{s.icon}</div>
              <div style={{ width: '44px', height: '24px', display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                {[40, 70, 50, 90, 60].map((h, j) => (
                  <div key={j} style={{ flex: 1, height: `${h}%`, background: s.gradient, borderRadius: '2px', opacity: 0.4, animation: `barGrow 1s ease ${0.1 * j}s backwards` }} />
                ))}
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, marginBottom: '2px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.3px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'flex', gap: '10px', marginBottom: '24px', position: 'relative', zIndex: 1,
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
      }}>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', marginRight: '6px' }}>Quick Actions</div>
        {[
          { label: '📝 New Leave', color: '#f59e0b' },
          { label: '📤 Submit Project', color: '#6c63ff' },
          { label: '📊 View Marks', color: '#48b9ff' },
        ].map(a => (
          <span key={a.label} style={{
            padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 600,
            background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)',
            cursor: 'pointer', transition: 'var(--transition)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.color = a.color; e.currentTarget.style.background = `${a.color}15`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
          >{a.label}</span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', position: 'relative', zIndex: 1 }}>
        {/* Recent Leaves */}
        <div className="card" style={{
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(245,158,11,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📅</span>
              Recent Leaves
            </h3>
            <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontWeight: 600 }}>{myLeaves.length} total</span>
          </div>
          {myLeaves.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '20px' }}>No leave requests yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myLeaves.slice(0, 3).map((l, i) => (
                <div key={l.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 14px', background: 'var(--bg-secondary)', borderRadius: '10px',
                  fontSize: '13px', border: '1px solid transparent', transition: 'var(--transition)',
                  animation: `fadeSlideUp 0.4s ease ${0.1 * i}s backwards`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{l.type || l.reason}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>📅 {l.from} → {l.to}</div>
                  </div>
                  <span className={`badge badge-${l.status.toLowerCase()}`}>{l.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="card" style={{
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(108,99,255,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🚀</span>
              Recent Projects
            </h3>
            <span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontWeight: 600 }}>{myProjects.length} total</span>
          </div>
          {myProjects.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '20px' }}>No projects submitted yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myProjects.slice(0, 3).map((p, i) => (
                <div key={p.id} style={{
                  padding: '12px 14px', background: 'var(--bg-secondary)', borderRadius: '10px',
                  fontSize: '13px', border: '1px solid transparent', transition: 'var(--transition)',
                  animation: `fadeSlideUp 0.4s ease ${0.1 * i}s backwards`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>{p.title}</span>
                    <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span>
                  </div>
                  {p.feedback && <div style={{ fontSize: '11px', color: 'var(--accent-secondary)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>💬 {p.feedback}</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Marks Progress */}
        <div className="card" style={{
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.0s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(72,185,255,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>📊</span>
              Academic Performance
            </h3>
            {avg > 0 && <span style={{ fontSize: '13px', fontWeight: 800, background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{avg}% avg</span>}
          </div>
          {myMarks.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '20px' }}>No marks recorded yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {myMarks.slice(0, 4).map((m, i) => {
                const pct = Math.round((m.score / m.max) * 100);
                const color = pct >= 80 ? 'var(--accent-success)' : pct >= 60 ? 'var(--accent-warning)' : 'var(--accent-danger)';
                const grade = pct >= 90 ? 'O' : pct >= 80 ? 'A+' : pct >= 70 ? 'A' : pct >= 60 ? 'B+' : 'B';
                return (
                  <div key={m.id} style={{ animation: `fadeSlideUp 0.4s ease ${0.1 * i}s backwards` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600 }}>{m.subject}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, color, padding: '1px 8px', background: `${color}18`, borderRadius: '4px' }}>{grade}</span>
                        <span style={{ fontWeight: 700, color, fontSize: '12px' }}>{pct}%</span>
                      </div>
                    </div>
                    <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: mounted ? `${pct}%` : '0%', background: `linear-gradient(90deg, ${color}, ${color}88)`, borderRadius: '3px', transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + 0.15 * i}s`, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)', animation: 'barShine 2s ease-in-out infinite' }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="card" style={{
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.1s',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(16,212,142,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🔔</span>
              Notifications
            </h3>
            {myNotifs.length > 0 && <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', background: 'rgba(239,68,68,0.15)', color: 'var(--accent-danger)', fontWeight: 700, animation: 'pulse 2s ease-in-out infinite' }}>{myNotifs.length} new</span>}
          </div>
          {myNotifs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px', animation: 'bounce 2s ease-in-out infinite' }}>✅</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>All caught up! No new notifications.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {myNotifs.slice(0, 4).map((n, i) => (
                <div key={n.id} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', background: 'rgba(108,99,255,0.06)', borderRadius: '10px',
                  fontSize: '13px', border: '1px solid rgba(108,99,255,0.1)', transition: 'var(--transition)',
                  animation: `fadeSlideUp 0.4s ease ${0.1 * i}s backwards`,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,99,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(108,99,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(108,99,255,0.1)'; }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', flexShrink: 0, boxShadow: '0 0 8px rgba(108,99,255,0.5)', animation: 'glow 1.5s ease-in-out infinite alternate' }} />
                  <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{n.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="card" style={{
        marginTop: '20px', position: 'relative', zIndex: 1,
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 1.2s',
      }}>
        <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(168,85,247,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>⏰</span>
          Recent Activity Timeline
        </h3>
        <div style={{ display: 'flex', gap: '0', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '15px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), var(--accent-success))', borderRadius: '1px', opacity: 0.3 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingLeft: '40px', width: '100%' }}>
            {[
              ...myLeaves.slice(0, 2).map(l => ({ type: 'leave', icon: '📋', title: `Leave: ${l.type || l.reason}`, sub: `${l.from} → ${l.to}`, status: l.status, color: l.status === 'Approved' ? '#10d48e' : l.status === 'Rejected' ? '#ef4444' : '#f59e0b' })),
              ...myProjects.slice(0, 1).map(p => ({ type: 'project', icon: '🚀', title: `Project: ${p.title}`, sub: p.category || 'General', status: p.status, color: '#6c63ff' })),
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', animation: `fadeSlideRight 0.5s ease ${0.15 * i}s backwards` }}>
                <div style={{ position: 'absolute', left: '-33px', width: '12px', height: '12px', borderRadius: '50%', background: item.color, border: '2px solid var(--bg-card)', boxShadow: `0 0 8px ${item.color}55` }} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border)', transition: 'var(--transition)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + '44'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{item.icon} {item.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.sub}</div>
                  </div>
                  <span className={`badge badge-${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.08); }
        }
        @keyframes shimmer {
          0% { opacity: 0.3; transform: translateX(-100%); }
          50% { opacity: 1; }
          100% { opacity: 0.3; transform: translateX(100%); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientShift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(30deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.85; }
        }
        @keyframes barGrow {
          from { height: 0%; }
        }
        @keyframes barShine {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
        @keyframes glow {
          from { box-shadow: 0 0 4px rgba(108,99,255,0.3); }
          to { box-shadow: 0 0 12px rgba(108,99,255,0.6); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
