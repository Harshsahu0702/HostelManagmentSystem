import React, { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';

const Departure = () => {
  const [requests, setRequests] = useState([
    { id: 1, from: "2024-03-10", to: "2024-03-12", reason: "Family", status: "Approved" },
  ]);
  const [form, setForm] = useState({ fromDate: '', toDate: '', reason: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests([{ id: Date.now(), from: form.fromDate, to: form.toDate, reason: form.reason, status: "Pending" }, ...requests]);
    setForm({ fromDate: '', toDate: '', reason: '' });
  };

  const handleDelete = (id) => setRequests(requests.filter(req => req.id !== id));

  return (
    <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Departure</label><input type="date" className="form-control" value={form.fromDate} onChange={e => setForm({...form, fromDate: e.target.value})} required /></div>
          <div className="form-group"><label>Return</label><input type="date" className="form-control" value={form.toDate} onChange={e => setForm({...form, toDate: e.target.value})} required /></div>
          <div className="form-group"><label>Reason</label><textarea className="form-control" rows="3" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} required></textarea></div>
          <button className="btn btn-primary" style={{width:'100%'}}><Send size={18} /> Submit</button>
        </form>
      </div>
      <div>
        <h4 style={{marginTop:0}}>History</h4>
        {requests.map(req => (
          <div key={req.id} className="card">
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>{req.from} to {req.to}</div>
                <div style={{display:'flex', gap: 8}}><span className={`badge badge-${req.status.toLowerCase()}`}>{req.status}</span><button onClick={() => handleDelete(req.id)} className="btn btn-danger-ghost" style={{padding:4}}><Trash2 size={16}/></button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departure;

