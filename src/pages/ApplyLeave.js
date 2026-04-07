import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function ApplyLeave() {
  const { user, addLeaveRequest } = useContext(AppContext);
  const [form, setForm] = useState({ reason: '', from: '', to: '', fromTime: '09:00', toTime: '17:00', type: 'Medical' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const leaveTypes = ['Medical', 'Personal', 'Family Function', 'Sports', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.reason || !form.from || !form.to || !form.fromTime || !form.toTime) { setError('All fields are required.'); return; }
    if (new Date(form.to) < new Date(form.from)) { setError('End date must be after start date.'); return; }
    if (form.from === form.to && form.toTime <= form.fromTime) { setError('End time must be after start time on the same day.'); return; }
    addLeaveRequest({ ...form, studentId: user.regNo, studentName: user.name });
    setSubmitted(true);
    setForm({ reason: '', from: '', to: '', fromTime: '09:00', toTime: '17:00', type: 'Medical' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const days = form.from && form.to ? Math.max(0, Math.ceil((new Date(form.to) - new Date(form.from)) / (1000 * 60 * 60 * 24)) + 1) : 0;

  return (
    <div>
      <div className="page-header">
        <h1>📋 Apply for Leave</h1>
        <p>Submit a new leave request for faculty approval</p>
      </div>

      {submitted && (
        <div style={{ background: 'rgba(16,212,142,0.12)', border: '1px solid rgba(16,212,142,0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', gap: '10px', animation: 'slideIn 0.3s ease' }}>
          ✅ Leave request submitted successfully! Your faculty will review it shortly.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Form */}
        <div className="card">
          <h3 style={{ fontWeight: 700, marginBottom: '20px', fontSize: '16px' }}>Leave Application Form</h3>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', color: 'var(--accent-danger)', fontSize: '13px', marginBottom: '18px' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Leave Type</label>
              <select className="form-control" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {leaveTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label>From Date</label>
                <input className="form-control" type="date" value={form.from} min={new Date().toISOString().split('T')[0]} onChange={e => setForm({ ...form, from: e.target.value })} />
              </div>
              <div className="form-group">
                <label>From Time</label>
                <input className="form-control" type="time" value={form.fromTime} onChange={e => setForm({ ...form, fromTime: e.target.value })} />
              </div>
              <div className="form-group">
                <label>To Date</label>
                <input className="form-control" type="date" value={form.to} min={form.from || new Date().toISOString().split('T')[0]} onChange={e => setForm({ ...form, to: e.target.value })} />
              </div>
              <div className="form-group">
                <label>To Time</label>
                <input className="form-control" type="time" value={form.toTime} onChange={e => setForm({ ...form, toTime: e.target.value })} />
              </div>
            </div>

            <div className="form-group">
              <label>Reason for Leave</label>
              <textarea className="form-control" rows={4} placeholder="Describe the reason for your leave request in detail..." value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              🚀 Submit Leave Request
            </button>
          </form>
        </div>

        {/* Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(72,185,255,0.05))' }}>
            <h4 style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Summary</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'Applicant', value: user?.name },
                { label: 'Reg No', value: user?.regNo },
                { label: 'Leave Type', value: form.type || '—' },
                { label: 'Duration', value: days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '—' },
                { label: 'From', value: form.from ? `${form.from} ${form.fromTime}` : '—' },
                { label: 'To', value: form.to ? `${form.to} ${form.toTime}` : '—' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>📌 Guidelines</h4>
            <ul style={{ paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '12px', lineHeight: '1.9' }}>
              <li>Apply at least 2 days in advance</li>
              <li>Medical leaves require a certificate</li>
              <li>Max 5 days per request</li>
              <li>Approval is at faculty discretion</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
