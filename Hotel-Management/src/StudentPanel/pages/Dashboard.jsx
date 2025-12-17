import React, { useState } from 'react';
import { Utensils, LayoutDashboard, CreditCard, QrCode, X, PlaneTakeoff } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const Dashboard = ({ setActivePage }) => {
  const [showQR, setShowQR] = useState(false);

  const stats = [
    { label: "Mess Status", value: "Open", icon: Utensils, color: "#fef3c7", iconColor: "#92400e" },
    { label: "Current Room", value: "B-402", icon: LayoutDashboard, color: "#e0e7ff", iconColor: "#3730a3" },
    { label: "Fees Pending", value: "₹3,500", icon: CreditCard, color: "#fee2e2", iconColor: "#991b1b" },
    { label: "Attendance", value: "Scan QR", icon: QrCode, color: "#dcfce7", iconColor: "#166534", action: () => setShowQR(true) },
  ];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayMenu = MOCK_DATA.messMenu.find(m => m.day === today);

  return (
    <div>
      <h3 style={{marginTop: 0}}>Welcome back, Aryan! 👋</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px'}}>
        {stats.map((s, i) => (
          <div 
            key={i} 
            className="card" 
            style={{ display:'flex', alignItems:'center', gap: '16px', marginBottom: 0, cursor: s.action ? 'pointer' : 'default' }}
            onClick={s.action}
          >
            <div style={{width: 48, height: 48, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.color, color: s.iconColor}}>
              <s.icon size={24} />
            </div>
            <div>
              <div style={{fontSize:'0.75rem', color: 'var(--text-muted)'}}>{s.label}</div>
              <div style={{fontWeight:700, fontSize:'1.1rem'}}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {showQR && (
        <div className="modal-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal" onClick={e => e.stopPropagation()}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom: '16px'}}>
                <h4 style={{margin:0}}>Scan for Attendance</h4>
                <button className="btn btn-ghost" onClick={() => setShowQR(false)}><X size={20}/></button>
            </div>
            <div style={{background: '#f8fafc', padding: '24px', borderRadius: '16px', marginBottom: '20px'}}>
              <svg viewBox="0 0 100 100" style={{width: '100%', maxWidth: '200px', margin: '0 auto'}}>
                  <rect width="100" height="100" fill="white"/>
                  <path d="M10,10 h30 v10 h-20 v20 h-10 Z M60,10 h30 v30 h-10 v-20 h-20 Z M10,60 h10 v20 h20 v10 h-30 Z M90,90 h-30 v-10 h20 v-20 h10 Z" fill="#1e293b"/>
                  <rect x="25" y="25" width="10" height="10" fill="#1e293b"/>
                  <rect x="45" y="25" width="10" height="10" fill="#1e293b"/>
                  <rect x="65" y="25" width="10" height="10" fill="#1e293b"/>
                  <rect x="25" y="45" width="10" height="10" fill="#1e293b"/>
                  <rect x="65" y="45" width="10" height="10" fill="#1e293b"/>
                  <rect x="25" y="65" width="10" height="10" fill="#1e293b"/>
                  <rect x="45" y="65" width="10" height="10" fill="#1e293b"/>
                  <rect x="65" y="65" width="10" height="10" fill="#1e293b"/>
                  <rect x="45" y="45" width="10" height="10" fill="#2563eb"/>
              </svg>
            </div>
            <div style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Show this QR to mark your presence.</div>
          </div>
        </div>
      )}

      <div style={{display:'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px'}}>
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '16px'}}>
            <h4 style={{margin:0}}>Today's Mess Menu</h4>
            <span className="badge badge-success">{today}</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px'}}>
            {['breakfast', 'lunch', 'dinner'].map(meal => (
              <div key={meal} style={{padding: '12px', background: '#f8fafc', borderRadius: '8px'}}>
                <div style={{fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase'}}>{meal}</div>
                <div style={{fontSize: '0.85rem', fontWeight: 500}}>{todayMenu[meal]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h4 style={{margin:0, marginBottom:'16px'}}>Quick Access</h4>
          <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            <button className="btn btn-ghost" onClick={() => setActivePage('departure')} style={{flexDirection: 'column', height: '100px', border: '1px solid var(--border)'}}>
              <PlaneTakeoff size={24} color="var(--primary)" />
              <span style={{fontSize:'0.8rem', marginTop: '8px'}}>Request Leave</span>
            </button>
            <button className="btn btn-ghost" onClick={() => setActivePage('fees')} style={{flexDirection: 'column', height: '100px', border: '1px solid var(--border)'}}>
              <CreditCard size={24} color="var(--success)" />
              <span style={{fontSize:'0.8rem', marginTop: '8px'}}>Fee History</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

