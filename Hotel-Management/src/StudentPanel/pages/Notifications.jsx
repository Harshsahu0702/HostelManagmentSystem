import React, { useState } from 'react';

const Notifications = () => {
  const [notifs, setNotifs] = useState([
    { id: 1, type: 'IMPORTANT', title: 'Holiday Declaration', date: 'Just now', body: 'The hostel will remain closed from March 25th to March 30th for Holi break.', read: false },
    { id: 2, type: 'MESS', title: 'Special Dinner Tonight', date: '2 hours ago', body: 'Please note there is a special biryani dinner planned for all residents tonight.', read: false },
    { id: 3, type: 'ALERT', title: 'Water Tank Maintenance', date: 'Yesterday', body: 'Water supply will be unavailable in Block B from 10 AM to 12 PM for cleaning.', read: true },
  ]);

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '20px'}}>
        <h3 style={{margin:0}}>Recent Notices</h3>
        <button className="btn btn-ghost" style={{fontSize:'0.85rem'}} onClick={() => setNotifs(notifs.map(n => ({...n, read: true})))}>Mark all as read</button>
      </div>
      {notifs.map(n => (
        <div key={n.id} className="card" style={{opacity: n.read ? 0.7 : 1, borderLeft: n.type === 'IMPORTANT' ? '4px solid var(--danger)' : '1px solid var(--border)'}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom: '8px'}}>
            <span className={`badge ${n.type === 'IMPORTANT' ? 'badge-danger' : 'badge-pending'}`}>{n.type}</span>
            <span style={{fontSize:'0.75rem', color: 'var(--text-muted)'}}>{n.date}</span>
          </div>
          <h4 style={{margin: '0 0 8px 0'}}>{n.title}</h4>
          <p style={{margin:0, fontSize:'0.9rem', color: 'var(--text-muted)', lineHeight: 1.5}}>{n.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;

