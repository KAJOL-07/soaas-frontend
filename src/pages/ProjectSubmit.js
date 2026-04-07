import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function ProjectSubmit() {
  const { user, addProject } = useContext(AppContext);
  const [form, setForm] = useState({ title: '', description: '', link: '', category: 'Web Development' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Web Development', 'Mobile App', 'AI/ML', 'Data Science', 'IoT', 'Cybersecurity', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.description) { setError('Title and description are required.'); return; }
    addProject({ ...form, studentId: user.regNo, studentName: user.name });
    setSubmitted(true);
    setForm({ title: '', description: '', link: '', category: 'Web Development' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
      <div className="page-header">
        <h1>🚀 Submit Project</h1>
        <p>Submit your project for faculty review and approval</p>
      </div>

      {submitted && (
        <div style={{ background: 'rgba(16,212,142,0.12)', border: '1px solid rgba(16,212,142,0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', color: 'var(--accent-success)', animation: 'slideIn 0.3s ease' }}>
          ✅ Project submitted successfully! Your faculty will review it soon.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '16px' }}>Project Details</h3>
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', color: 'var(--accent-danger)', fontSize: '13px', marginBottom: '18px' }}>
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Category</label>
              <select className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Project Title</label>
              <input className="form-control" placeholder="e.g. AI-Powered Student Assistant" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" rows={5} placeholder="Describe your project, technologies used, and objectives..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Project Link <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(GitHub / Live URL)</span></label>
              <input className="form-control" placeholder="https://github.com/..." value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              🚀 Submit for Review
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(72,185,255,0.05))' }}>
            <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Preview</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Student:</span> <strong>{user?.name}</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>ID:</span> <strong>{user?.regNo}</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Category:</span> <strong>{form.category}</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Title:</span> <strong>{form.title || '—'}</strong></div>
            </div>
          </div>
          <div className="card">
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>📌 Guidelines</h4>
            <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '2' }}>
              <li>Ensure code is original</li>
              <li>Add a working demo link</li>
              <li>Include README in repo</li>
              <li>One submission at a time</li>
            </ul>
          </div>
        </div>
      </div>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
