import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Bell, 
  MessageSquareWarning, 
  ShieldAlert, 
  Utensils, 
  PlaneTakeoff, 
  CreditCard, 
  MessageCircle, 
  Star, 
  LogOut, 
  Menu, 
  X, 
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  History,
  Download,
  Check,
  User,
  UserX,
  ThumbsUp,
  Trash2,
  QrCode
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_DATA = {
  student: {
    name: "Aryan Sharma",
    rollNo: "2024CS102",
    room: "B-402",
    hostel: "Vishweshwaraya Hall",
  },
  messMenu: [
    { day: "Monday", breakfast: "Poha, Tea", lunch: "Dal, Chawal, Mix Veg", dinner: "Paneer, Roti" },
    { day: "Tuesday", breakfast: "Aloo Paratha", lunch: "Rajma, Chawal", dinner: "Egg Curry / Malai Kofta" },
    { day: "Wednesday", breakfast: "Idli Sambhar", lunch: "Kadhi, Pakoda", dinner: "Chicken / Mushroom Masala" },
    { day: "Thursday", breakfast: "Oats, Milk", lunch: "Chole Bhature", dinner: "Veg Pulao, Raita" },
    { day: "Friday", breakfast: "Bread Butter", lunch: "Lauki Kofta, Dal", dinner: "Fish Curry / Soya Chaap" },
    { day: "Saturday", breakfast: "Puri Bhaji", lunch: "Khichdi, Papad", dinner: "Veg Manchurian, Fried Rice" },
    { day: "Sunday", breakfast: "Special Brunch", lunch: "Special Thali", dinner: "Biryani (Veg/Non-Veg)" },
  ],
  feeHistory: {
    hostel: [
      { id: 'H1', desc: 'Admission & Caution Deposit', date: '2024-01-05', amount: 15000, status: 'Paid', method: 'Online' },
      { id: 'H2', desc: 'Semester Accommodation Fee', date: '2024-01-05', amount: 30000, status: 'Paid', method: 'Online' },
      { id: 'H3', desc: 'Maintenance Charges', date: '2024-01-10', amount: 2000, status: 'Paid', method: 'Wallet' },
    ],
    mess: [
      { id: 'M1', desc: 'January Mess Bill', date: '2024-02-02', amount: 3500, status: 'Paid', method: 'UPI' },
      { id: 'M2', desc: 'February Mess Bill', date: '2024-03-02', amount: 3500, status: 'Paid', method: 'UPI' },
      { id: 'M3', desc: 'March Mess Bill (Partial)', date: '2024-04-01', amount: 3500, status: 'Due', method: '-' },
    ]
  }
};

// --- STYLES ---
const styles = `
:root {
  --primary: #2563eb;
  --primary-dark: #1e40af;
  --secondary: #64748b;
  --bg-app: #f8fafc;
  --bg-sidebar: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --radius: 12px;
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

* { box-sizing: border-box; font-family: 'Inter', system-ui, sans-serif; }
body { margin: 0; background: var(--bg-app); color: var(--text-main); }

.app-container { display: flex; min-height: 100vh; }

.sidebar {
  width: 260px;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  z-index: 100;
}
.sidebar-header { padding: 24px; font-weight: 800; font-size: 1.1rem; color: var(--primary); border-bottom: 1px solid var(--border); letter-spacing: 1px; }
.nav-links { flex: 1; padding: 12px; overflow-y: auto; }
.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-radius: var(--radius);
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 2px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 0.9rem;
  gap: 12px;
}
.nav-item:hover { background: #f1f5f9; color: var(--primary); }
.nav-item.active { background: #eff6ff; color: var(--primary); font-weight: 600; }

.main-content { flex: 1; display: flex; flex-direction: column; position: relative; width: 100%; }
.header {
  height: 64px;
  background: #fff;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 10;
}
.content-area { padding: 24px; max-width: 1200px; margin: 0 auto; width: 100%; }

.card { background: #fff; border-radius: var(--radius); border: 1px solid var(--border); padding: 20px; box-shadow: var(--shadow); margin-bottom: 20px; }
.btn { 
  padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.2s; 
  display: inline-flex; align-items: center; gap: 8px; justify-content: center;
}
.btn-primary { background: var(--primary); color: #fff; }
.btn-primary:hover { background: var(--primary-dark); }
.btn-ghost { background: transparent; color: var(--text-muted); }
.btn-ghost:hover { background: #f1f5f9; }
.btn-danger-ghost { background: transparent; color: var(--danger); border: 1px solid transparent; }
.btn-danger-ghost:hover { background: #fef2f2; border-color: #fee2e2; }

.form-group { margin-bottom: 16px; }
.form-group label { display: block; margin-bottom: 6px; font-weight: 500; font-size: 0.85rem; }
.form-control { width: 100%; padding: 10px; border: 1px solid var(--border); border-radius: 8px; font-size: 0.95rem; outline: none; transition: 0.2s; }
.form-control:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }

.badge { padding: 4px 10px; border-radius: 99px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
.badge-pending { background: #fef3c7; color: #92400e; }
.badge-success { background: #dcfce7; color: #166534; }
.badge-danger { background: #fee2e2; color: #b91c1c; }

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.qr-modal {
  background: white;
  padding: 32px;
  border-radius: 24px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Table Styles */
table { width: 100%; border-collapse: collapse; margin-top: 10px; }
th { text-align: left; padding: 12px; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid var(--border); }
td { padding: 14px 12px; font-size: 0.85rem; border-bottom: 1px solid #f1f5f9; }
tr:last-child td { border-bottom: none; }

.mobile-toggle { display: none; }
@media (max-width: 768px) {
  .sidebar { position: fixed; height: 100%; left: -260px; }
  .sidebar.open { left: 0; }
  .mobile-toggle { display: block; }
}
`;

// --- PAGE COMPONENTS ---

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
            style={{
                display:'flex', 
                alignItems:'center', 
                gap: '16px', 
                marginBottom: 0, 
                cursor: s.action ? 'pointer' : 'default',
                transition: 'transform 0.2s',
            }}
            onMouseEnter={e => s.action && (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={e => s.action && (e.currentTarget.style.transform = 'translateY(0)')}
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
                <button className="btn btn-ghost" style={{padding:4}} onClick={() => setShowQR(false)}><X size={20}/></button>
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
            <div style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>
                Please show this QR to the warden or scan at the entry kiosk to mark your presence.
            </div>
            <div style={{marginTop: '24px', padding: '12px', background: '#eff6ff', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600}}>
                Valid for: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
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

// --- RETAINED COMPONENTS ---

const Fees = () => {
  const hostelTotal = MOCK_DATA.feeHistory.hostel.reduce((acc, curr) => acc + curr.amount, 0);
  const messTotal = MOCK_DATA.feeHistory.mess.reduce((acc, curr) => acc + curr.amount, 0);
  const messPaid = MOCK_DATA.feeHistory.mess.filter(m => m.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{display:'flex', flexDirection:'column', gap: '24px'}}>
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '16px'}}>
          <div style={{display:'flex', alignItems:'center', gap: '10px'}}>
            <div style={{background: '#eff6ff', padding: '8px', borderRadius: '8px'}}><CreditCard size={20} color="var(--primary)"/></div>
            <h4 style={{margin:0}}>Hostel Fee History - Sem 1</h4>
          </div>
          <button className="btn btn-ghost" style={{fontSize: '0.8rem'}}><Download size={16}/> Receipt</button>
        </div>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead><tr><th>Description</th><th>Date</th><th>Payment Method</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {MOCK_DATA.feeHistory.hostel.map(item => (
                <tr key={item.id}>
                  <td style={{fontWeight: 500}}>{item.desc}</td>
                  <td style={{color: 'var(--text-muted)'}}>{item.date}</td>
                  <td>{item.method}</td>
                  <td style={{fontWeight: 700}}>₹{item.amount.toLocaleString()}</td>
                  <td><span className="badge badge-success">{item.status}</span></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" style={{textAlign: 'right', fontWeight: 600, padding: '20px 12px'}}>Total Paid (Sem 1)</td>
                <td style={{padding: '20px 12px', fontWeight: 800, fontSize: '1rem', color: 'var(--primary)'}}>₹{hostelTotal.toLocaleString()}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '16px'}}>
          <div style={{display:'flex', alignItems:'center', gap: '10px'}}>
            <div style={{background: '#fef3c7', padding: '8px', borderRadius: '8px'}}><Utensils size={20} color="var(--warning)"/></div>
            <h4 style={{margin:0}}>Mess Fee History - Monthly</h4>
          </div>
          <div style={{fontSize:'0.85rem', color:'var(--text-muted)'}}>Outstanding: <b style={{color:'var(--danger)'}}>₹{(messTotal - messPaid).toLocaleString()}</b></div>
        </div>
        <div style={{overflowX: 'auto'}}>
          <table>
            <thead><tr><th>Billing Month</th><th>Billing Date</th><th>Payment Method</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {MOCK_DATA.feeHistory.mess.map(item => (
                <tr key={item.id}>
                  <td style={{fontWeight: 500}}>{item.desc}</td>
                  <td style={{color: 'var(--text-muted)'}}>{item.date}</td>
                  <td>{item.method}</td>
                  <td style={{fontWeight: 700}}>₹{item.amount.toLocaleString()}</td>
                  <td><span className={`badge ${item.status === 'Paid' ? 'badge-success' : 'badge-pending'}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{marginTop: '20px', padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px dashed var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <div style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Current Due Amount</div>
            <div style={{fontSize: '1.25rem', fontWeight: 800}}>₹{(messTotal - messPaid).toLocaleString()}</div>
          </div>
          <button className="btn btn-primary">Pay Outstanding</button>
        </div>
      </div>
    </div>
  );
};

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [ratings, setRatings] = useState({
    infrastructure: 0, cleanliness: 0, wardenSupport: 0, wifiInternet: 0, messQuality: 0
  });
  const [comments, setComments] = useState("");

  const handleRating = (category, val) => {
    setRatings(prev => ({ ...prev, [category]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card" style={{textAlign: 'center', padding: '60px 20px', maxWidth: '600px', margin: '40px auto'}}>
        <div style={{width: 80, height: 80, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'}}>
          <ThumbsUp size={40} color="var(--success)" />
        </div>
        <h2 style={{margin: '0 0 12px 0'}}>Thank You!</h2>
        <p style={{color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px'}}>Your feedback has been submitted successfully.</p>
        <button className="btn btn-primary" onClick={() => {setSubmitted(false); setRatings({infrastructure: 0, cleanliness: 0, wardenSupport: 0, wifiInternet: 0, messQuality: 0}); setComments("");}}>Submit Another</button>
      </div>
    );
  }

  return (
    <div style={{maxWidth: '800px', margin: '0 auto'}}>
      <div className="card" style={{background: 'linear-gradient(to right, #eff6ff, #fff)', borderLeft: '4px solid var(--primary)'}}>
        <h3 style={{marginTop: 0}}>Hostel Experience Survey</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <h4 style={{marginTop: 0, marginBottom: '20px'}}>Rating Categories</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            {Object.keys(ratings).map((id) => (
              <div key={id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{textTransform: 'capitalize', fontWeight: 600}}>{id.replace(/([A-Z])/g, ' $1')}</span>
                <RatingStars rating={ratings[id]} setRating={(val) => handleRating(id, val)} interactive />
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <textarea className="form-control" rows="5" placeholder="Suggestions..." value={comments} onChange={(e) => setComments(e.target.value)}></textarea>
          <button className="btn btn-primary" style={{width: '100%', marginTop: '24px'}}>Submit Feedback</button>
        </div>
      </form>
    </div>
  );
};

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

const AntiRagging = () => {
  const [sent, setSent] = useState(false);
  return (
    <div style={{maxWidth: '800px', margin: '0 auto'}}>
      <div className="card" style={{background: '#fef2f2', borderLeft: '4px solid var(--danger)'}}>
        <ShieldAlert size={40} color="var(--danger)" />
        <p style={{marginTop: 8, color: '#b91c1c'}}>Ragging is a punishable offense. Confidentiality guaranteed.</p>
      </div>
      {!sent ? (
        <div className="card">
          <textarea className="form-control" rows="5" placeholder="Details..."></textarea>
          <button className="btn btn-primary" style={{width:'100%', background: 'var(--danger)', marginTop: 16}} onClick={() => setSent(true)}>Report</button>
        </div>
      ) : (
        <div className="card" style={{textAlign:'center', padding: '40px'}}><CheckCircle2 size={48} color="var(--success)" style={{margin: '0 auto 16px'}} /><h4>Logged!</h4><button className="btn btn-ghost" onClick={() => setSent(false)}>Back</button></div>
      )}
    </div>
  );
};

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

const Chat = () => {
  const [messages, setMessages] = useState([{ from: 'warden', text: 'Aryan, please visit office.', time: '10:30 AM' }]);
  return (
    <div className="card" style={{height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column', padding: 0}}>
      <div style={{padding: '16px', borderBottom: '1px solid var(--border)', fontWeight: 700}}>Warden Office</div>
      <div style={{flex:1, padding: '20px', background: '#f8fafc', overflowY: 'auto'}}>
        {messages.map((m, i) => (<div key={i} style={{display:'flex', justifyContent: m.from === 'student' ? 'flex-end' : 'flex-start', marginBottom: '16px'}}><div style={{padding: '12px', background: m.from === 'student' ? 'var(--primary)' : '#fff', color: m.from === 'student' ? '#fff' : '#000', borderRadius: '12px'}}>{m.text}</div></div>))}
      </div>
    </div>
  );
};

const Mess = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return (
    <div>
      <div className="card">
        <h4 style={{marginTop:0}}>Weekly Menu</h4>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead><tr style={{background: '#f8fafc'}}><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th></tr></thead>
            <tbody>
              {MOCK_DATA.messMenu.map(m => (
                <tr key={m.day} style={{background: m.day === today ? '#eff6ff' : 'transparent'}}>
                  <td style={{fontWeight: 700}}>{m.day}</td><td>{m.breakfast}</td><td>{m.lunch}</td><td>{m.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard setActivePage={setActivePage} />;
      case 'notifications': return <Notifications />;
      case 'complaints': return <Complaints />;
      case 'antiragging': return <AntiRagging />;
      case 'mess': return <Mess />;
      case 'departure': return <Departure />;
      case 'fees': return <Fees />;
      case 'chat': return <Chat />;
      case 'feedback': return <Feedback />;
      default: return <Dashboard setActivePage={setActivePage} />;
    }
  };

  const getPageTitle = () => activePage.charAt(0).toUpperCase() + activePage.slice(1).replace(/([A-Z])/g, ' $1');

  return (
    <div className="app-container">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className="main-content">
        <Header title={getPageTitle()} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content-area">{renderContent()}</div>
      </main>
    </div>
  );
}

const Sidebar = ({ activePage, setActivePage, isOpen, toggle }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning },
    { id: 'antiragging', label: 'Anti-Ragging', icon: ShieldAlert },
    { id: 'mess', label: 'Mess', icon: Utensils },
    { id: 'departure', label: 'Departure Request', icon: PlaneTakeoff },
    { id: 'fees', label: 'Fee Status', icon: CreditCard },
    { id: 'chat', label: 'Chat with Warden', icon: MessageCircle },
    { id: 'feedback', label: 'Feedback', icon: Star },
  ];
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">HOSTEL PORTAL<button className="mobile-toggle btn btn-ghost" onClick={toggle} style={{float:'right'}}><X size={20}/></button></div>
      <nav className="nav-links">
        {menuItems.map(item => (
          <div key={item.id} className={`nav-item ${activePage === item.id ? 'active' : ''}`} onClick={() => { setActivePage(item.id); if(window.innerWidth < 768) toggle(); }}><item.icon size={18} />{item.label}</div>
        ))}
      </nav>
      <div className="nav-links" style={{flex: 'initial', borderTop: '1px solid var(--border)'}}><div className="nav-item" style={{color: 'var(--danger)'}} onClick={() => alert("Logout")}><LogOut size={18} /> Logout</div></div>
    </div>
  );
};

const Header = ({ title, toggleSidebar }) => (
  <header className="header">
    <div style={{display:'flex', alignItems:'center', gap: '12px'}}><button className="mobile-toggle btn btn-ghost" onClick={toggleSidebar}><Menu size={24}/></button><h2 style={{margin:0, fontSize: '1.1rem', fontWeight: 700}}>{title}</h2></div>
    <div style={{display:'flex', alignItems:'center', gap: '12px'}}>
      <div style={{textAlign:'right'}}><div style={{fontWeight:700, fontSize:'0.85rem'}}>{MOCK_DATA.student.name}</div><div style={{fontSize:'0.7rem', color: 'var(--text-muted)'}}>Room: {MOCK_DATA.student.room}</div></div>
      <div style={{width:36, height:36, borderRadius: '50%', background: '#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, color: 'var(--primary)', fontSize:'0.8rem'}}>AS</div>
    </div>
  </header>
);