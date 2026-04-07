import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const STUDENTS = [
  { regNo: '22CS101', name: 'John Doe' },
  { regNo: '22CS102', name: 'Jane Smith' },
  { regNo: '22CS103', name: 'Ravi Kumar' },
];
const SUBJECTS = ['Data Structures', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Mathematics'];

export default function MarksManage() {
  const { marks, addMark } = useContext(AppContext);
  const [form, setForm] = useState({ studentId: '22CS101', subject: SUBJECTS[0], score: '', max: '100' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    setError('');
    if (!form.score) { setError('Score is required.'); return; }
    const score = Number(form.score), max = Number(form.max);
    if (isNaN(score) || score < 0 || score > max) { setError(`Score must be between 0 and ${max}.`); return; }
    const student = STUDENTS.find(s => s.regNo === form.studentId);
    addMark({ studentId: form.studentId, studentName: student?.name, subject: form.subject, score, max });
    setSuccess(true);
    setForm({ ...form, score: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <h1>📊 Manage Marks</h1>
        <p>Add and manage student academic records</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
        {/* Add Form */}
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>➕ Add Marks</h3>
          {success && <div style={{ background: 'rgba(16,212,142,0.12)', border: '1px solid rgba(16,212,142,0.3)', borderRadius: '8px', padding: '10px 14px', color: 'var(--accent-success)', fontSize: '13px', marginBottom: '16px' }}>✅ Marks added!</div>}
          {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', color: 'var(--accent-danger)', fontSize: '13px', marginBottom: '16px' }}>⚠️ {error}</div>}
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <label>Student</label>
              <select className="form-control" value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })}>
                {STUDENTS.map(s => <option key={s.regNo} value={s.regNo}>{s.name} ({s.regNo})</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select className="form-control" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Score</label>
                <input className="form-control" type="number" placeholder="e.g. 85" value={form.score} onChange={e => setForm({ ...form, score: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Max Marks</label>
                <input className="form-control" type="number" value={form.max} onChange={e => setForm({ ...form, max: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>➕ Add Record</button>
          </form>
        </div>

        {/* All Marks Table */}
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px' }}>📋 All Records ({marks.length})</h3>
          {marks.length === 0 ? (
            <div className="empty-state"><div style={{ fontSize: '48px' }}>📭</div><p style={{ marginTop: '10px', color: 'var(--text-muted)' }}>No marks records yet</p></div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr><th>Student</th><th>ID</th><th>Subject</th><th>Score</th><th>%</th><th>Grade</th></tr>
                </thead>
                <tbody>
                  {marks.map(m => {
                    const pct = Math.round((m.score / m.max) * 100);
                    const grade = pct >= 90 ? 'O' : pct >= 80 ? 'A+' : pct >= 70 ? 'A' : pct >= 60 ? 'B+' : pct >= 50 ? 'B' : 'C';
                    const color = pct >= 75 ? 'var(--accent-success)' : pct >= 60 ? 'var(--accent-warning)' : 'var(--accent-danger)';
                    return (
                      <tr key={m.id}>
                        <td style={{ fontWeight: 600 }}>{m.studentName || m.studentId}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{m.studentId}</td>
                        <td>{m.subject}</td>
                        <td style={{ fontWeight: 700 }}>{m.score}/{m.max}</td>
                        <td style={{ color, fontWeight: 600 }}>{pct}%</td>
                        <td><span style={{ fontWeight: 800, color, fontSize: '15px' }}>{grade}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
