import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Login() {
  const { login } = useContext(AppContext);
  const [role, setRole] = useState('student');
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!regNo || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const ok = login(regNo.trim(), password, role);
    if (!ok) setError('Invalid credentials. Check demo credentials below.');
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Animated BG blobs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)', top: '-100px', left: '-100px', animation: 'float 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(72,185,255,0.10) 0%, transparent 70%)', bottom: '-80px', right: '-80px', animation: 'float 10s ease-in-out infinite reverse' }} />

      <div style={{ width: '100%', maxWidth: '440px', padding: '0 20px', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', boxShadow: '0 8px 32px rgba(108,99,255,0.4)' }}>🎓</div>
          <h1 style={{ fontWeight: 800, fontSize: '28px', background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SOAASystem</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Secure Online Academic Approval System</p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '36px', boxShadow: 'var(--shadow)' }}>
          <h2 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '6px' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '28px' }}>Sign in to your academic portal</p>

          {/* Role Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '4px', marginBottom: '24px' }}>
            {['student', 'staff'].map(r => (
              <button key={r} onClick={() => { setRole(r); setError(''); }} style={{
                flex: 1, padding: '9px', border: 'none', borderRadius: '8px', cursor: 'pointer',
                background: role === r ? 'linear-gradient(135deg, #6c63ff, #48b9ff)' : 'transparent',
                color: role === r ? '#fff' : 'var(--text-secondary)',
                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px',
                transition: 'var(--transition)', textTransform: 'capitalize',
              }}>{r === 'student' ? '🎓 Student' : '👨‍🏫 Staff'}</button>
            ))}
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', color: 'var(--accent-danger)', fontSize: '13px', marginBottom: '18px' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Register Number / Staff ID</label>
              <input className="form-control" value={regNo} onChange={e => setRegNo(e.target.value)} placeholder={role === 'student' ? 'e.g. 22CS101' : 'e.g. STAFF01'} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <input className="form-control" type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" style={{ paddingRight: '44px' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '16px' }}>{showPass ? '🙈' : '👁'}</button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }} disabled={loading}>
              {loading ? '⏳ Signing in...' : '🔐 Sign In'}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={{ marginTop: '24px', padding: '14px', background: 'var(--bg-secondary)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>Demo Credentials</p>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              🎓 Student: <code style={{ color: 'var(--accent-primary)' }}>22CS101</code> / <code style={{ color: 'var(--accent-primary)' }}>student123</code><br/>
              👨‍🏫 Staff: <code style={{ color: 'var(--accent-secondary)' }}>STAFF01</code> / <code style={{ color: 'var(--accent-secondary)' }}>staff123</code>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
