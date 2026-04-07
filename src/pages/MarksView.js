import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function MarksView() {
  const { user, marks } = useContext(AppContext);
  const myMarks = marks.filter(m => m.studentId === user?.regNo);
  const avg = myMarks.length ? Math.round(myMarks.reduce((s, m) => s + (m.score / m.max) * 100, 0) / myMarks.length) : 0;

  return (
    <div>
      <div className="page-header">
        <h1>📊 My Academic Marks</h1>
        <p>View your subject-wise performance and scores</p>
      </div>

      {/* GPA Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px', marginBottom: '24px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #6c63ff, #48b9ff)', border: 'none', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', fontWeight: 800, color: '#fff' }}>{avg}%</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Overall Average</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '6px' }}>
            {avg >= 90 ? '🏆 Outstanding' : avg >= 75 ? '⭐ Good Standing' : avg >= 60 ? '📚 Average' : '⚠️ Needs Improvement'}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>Performance Overview</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myMarks.map(m => {
              const pct = Math.round((m.score / m.max) * 100);
              const color = pct >= 90 ? 'var(--accent-success)' : pct >= 75 ? 'var(--accent-secondary)' : pct >= 60 ? 'var(--accent-warning)' : 'var(--accent-danger)';
              return (
                <div key={m.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '13px' }}>
                    <span style={{ fontWeight: 600 }}>{m.subject}</span>
                    <span style={{ color, fontWeight: 700 }}>{m.score}/{m.max} ({pct}%)</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '3px', transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              );
            })}
            {myMarks.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No marks recorded yet.</p>}
          </div>
        </div>
      </div>

      {/* Table */}
      {myMarks.length > 0 && (
        <div className="card">
          <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px' }}>📋 Detailed Marks</h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Max</th>
                  <th>Percentage</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {myMarks.map((m, i) => {
                  const pct = Math.round((m.score / m.max) * 100);
                  const grade = pct >= 90 ? 'O' : pct >= 80 ? 'A+' : pct >= 70 ? 'A' : pct >= 60 ? 'B+' : pct >= 50 ? 'B' : 'C';
                  const color = pct >= 80 ? 'var(--accent-success)' : pct >= 60 ? 'var(--accent-warning)' : 'var(--accent-danger)';
                  return (
                    <tr key={m.id}>
                      <td style={{ color: 'var(--text-muted)' }}>{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{m.subject}</td>
                      <td>{m.score}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{m.max}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ flex: 1, height: '4px', background: 'var(--bg-secondary)', borderRadius: '2px', minWidth: '60px' }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '2px' }} />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, color }}>{pct}%</span>
                        </div>
                      </td>
                      <td><span style={{ fontWeight: 800, color, fontSize: '15px' }}>{grade}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
