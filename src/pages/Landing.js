import { useState, useEffect } from 'react';

export default function Landing({ onGetStarted }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top left, #0f172a, #020617)',
      color: 'var(--text-primary)',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', top: '-150px', left: '-150px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)', animation: 'orbFloat 20s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '-200px', right: '-200px', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(72,185,255,0.08) 0%, transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite reverse' }} />

      {/* Navigation */}
      <nav style={{
        width: '100%', maxWidth: '1200px', padding: '24px 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        zIndex: 10, animation: 'fadeDown 0.8s ease backwards'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', boxShadow: '0 8px 24px rgba(108,99,255,0.3)' }}>🎓</div>
          <span style={{ fontWeight: 800, fontSize: '24px', letterSpacing: '-1px' }}>SOAASystem</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <button onClick={onGetStarted} className="btn btn-ghost">Login</button>
          <button onClick={onGetStarted} className="btn btn-primary">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px', textAlign: 'center', zIndex: 10, maxWidth: '900px'
      }}>
        <div style={{
          padding: '8px 20px', borderRadius: '999px', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)',
          color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
          marginBottom: '24px', animation: 'fadeUp 0.8s ease 0.2s backwards'
        }}>
          ✨ Next-Gen Academic Management
        </div>
        
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '24px',
          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'fadeUp 0.8s ease 0.4s backwards'
        }}>
          Secure Online <br/> 
          <span style={{ background: 'linear-gradient(135deg, #6c63ff, #48b9ff, #10d48e)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradientShift 6s ease infinite' }}>
            Academic Approval
          </span>
        </h1>

        <p style={{
          fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '40px', lineHeight: 1.6,
          animation: 'fadeUp 0.8s ease 0.6s backwards'
        }}>
          A unified, high-security platform for students and faculty to manage leave requests, 
          project submissions, and academic performance with real-time tracking.
        </p>

        <div style={{ display: 'flex', gap: '16px', animation: 'fadeUp 0.8s ease 0.8s backwards' }}>
          <button onClick={onGetStarted} className="btn btn-primary btn-lg" style={{ minWidth: '180px', justifyContent: 'center' }}>
            Explore Portal
          </button>
          <button className="btn btn-ghost btn-lg" style={{ minWidth: '180px', justifyContent: 'center' }}>
            Learn More
          </button>
        </div>

        {/* Floating Features */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '80px', width: '100%',
          animation: 'fadeUp 1.2s ease 1s backwards'
        }}>
          {[
            { icon: '🔒', title: 'Secure Access', desc: 'Enterprise-grade authentication and data encryption.' },
            { icon: '⚡', title: 'Real-time Sync', desc: 'Instant notifications for all approval status changes.' },
            { icon: '📊', title: 'Performance', desc: 'Track your academic growth with advanced analytics.' }
          ].map((f, i) => (
            <div key={i} className="card" style={{ background: 'rgba(30,41,59,0.3)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', textAlign: 'left' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        @keyframes gradientShift {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(30deg); }
        }
      `}</style>
    </div>
  );
}
