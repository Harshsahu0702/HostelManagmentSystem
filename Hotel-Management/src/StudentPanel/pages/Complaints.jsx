import React, { useState } from 'react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, cat: 'Electricity', desc: 'Fan regulator broken in room B-402', date: '2024-03-22', status: 'Pending' },
    { id: 2, cat: 'Plumbing', desc: 'Water leakage in common washroom', date: '2024-03-20', status: 'Resolved' },
  ]);
  const [form, setForm] = useState({ cat: 'Electricity', desc: '' });

  const submit = (e) => {
    e.preventDefault();
    if(!form.desc) return;
    setComplaints([{ id: Date.now(), ...form, date: new Date().toISOString().split('T')[0], status: 'Pending' }, ...complaints]);
    setForm({ cat: 'Electricity', desc: '' });
  };

  return (
    <div style={{display:'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px'}}>
      <div className="card">
        <h4 style={{marginTop:0}}>Submit New Complaint</h4>
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={form.cat} onChange={e => setForm({...form, cat: e.target.value})}>
              <option>Electricity</option><option>Plumbing</option><option>Internet/WiFi</option><option>Furniture</option><option>Cleaning</option>
            </select>
          </div>
          <div className="form-group">
            <label>Detailed Description</label>
            <textarea className="form-control" rows="4" placeholder="Describe issue..." value={form.desc} onChange={e => setForm({...form, desc: e.target.value})}></textarea>
          </div>
          <button className="btn btn-primary" style={{width:'100%'}}>File Complaint</button>
        </form>
      </div>
      <div>
        <h4 style={{marginTop:0}}>History</h4>
        {complaints.map(c => (
          <div key={c.id} className="card" style={{padding: '16px', marginBottom: '12px'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
              <span style={{fontWeight:600}}>{c.cat}</span>
              <span className={`badge ${c.status === 'Resolved' ? 'badge-success' : 'badge-pending'}`}>{c.status}</span>
            </div>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;

