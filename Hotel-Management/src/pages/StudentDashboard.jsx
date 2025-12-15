import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bell, 
  AlertCircle, 
  LogOut, 
  Utensils, 
  Wallet, 
  CalendarCheck, 
  User, 
  Menu, 
  X,
  Send,
  CheckCircle,
  Clock,
  FileText,
  Star,
  LogOut as LeaveIcon
} from 'lucide-react';

/* --- CSS STYLES --- 
   In a real project, this would be in App.css or separate module files.
   Here, it is injected to ensure the single-file requirement is met while 
   strictly using standard CSS syntax (No Tailwind).
*/
const appStyles = `
  :root {
    --primary: #4f46e5;
    --primary-hover: #4338ca;
    --secondary: #64748b;
    --bg-body: #f1f5f9;
    --bg-card: #ffffff;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --border: #e2e8f0;
    --success: #10b981;
    --warning: #f59e0b;
    --danger: #ef4444;
    --sidebar-width: 260px;
    --header-height: 64px;
    --radius: 12px;
    --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  body {
    background-color: var(--bg-body);
    color: var(--text-main);
  }

  /* Layout */
  .app-container {
    display: flex;
    min-height: 100vh;
  }

  /* Sidebar */
  .sidebar {
    width: var(--sidebar-width);
    background-color: var(--bg-card);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    transition: transform 0.3s ease;
    z-index: 50;
  }

  .sidebar-header {
    height: var(--header-height);
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid var(--border);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary);
  }

  .nav-links {
    padding: 24px 16px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    color: var(--secondary);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 500;
  }

  .nav-item:hover {
    background-color: #f8fafc;
    color: var(--primary);
  }

  .nav-item.active {
    background-color: #eef2ff;
    color: var(--primary);
  }

  .nav-item svg {
    margin-right: 12px;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    margin-left: var(--sidebar-width);
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .top-header {
    height: var(--header-height);
    background-color: var(--bg-card);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    position: sticky;
    top: 0;
    z-index: 40;
  }

  .header-left {
    display: flex;
    align-items: center;
  }

  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 16px;
    color: var(--text-main);
  }

  .header-profile {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .student-info {
    text-align: right;
  }

  .student-name {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .hostel-name {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .logout-btn {
    background-color: #fef2f2;
    color: var(--danger);
    border: 1px solid #fee2e2;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s;
  }

  .logout-btn:hover {
    background-color: #fee2e2;
  }

  /* Dashboard Views */
  .view-container {
    padding: 32px;
    animation: fadeIn 0.3s ease-in-out;
  }

  .page-title {
    margin-bottom: 24px;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-main);
  }

  /* Cards & Grid */
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }

  .card {
    background: var(--bg-card);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stat-label {
    color: var(--text-muted);
    font-size: 0.9rem;
    font-weight: 500;
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-main);
  }

  /* Notifications */
  .notification-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .notification-item {
    background: var(--bg-card);
    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .notification-item.unread {
    border-left: 4px solid var(--primary);
    background-color: #eef2ff;
  }

  .notif-content h4 {
    margin-bottom: 4px;
    font-size: 1rem;
  }

  .notif-content p {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .notif-date {
    font-size: 0.8rem;
    color: var(--text-muted);
    white-space: nowrap;
    margin-left: 16px;
  }

  /* Forms */
  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .form-control {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 0.95rem;
    transition: border-color 0.2s;
  }

  .form-control:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  .btn-primary {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-primary:hover {
    background-color: var(--primary-hover);
  }

  /* Badges */
  .badge {
    padding: 4px 12px;
    border-radius: 99px;
    font-size: 0.8rem;
    font-weight: 600;
    display: inline-block;
  }

  .badge-pending { background: #fff7ed; color: #c2410c; }
  .badge-approved { background: #ecfdf5; color: #047857; }
  .badge-rejected { background: #fef2f2; color: #b91c1c; }
  .badge-paid { background: #ecfdf5; color: #047857; }
  .badge-due { background: #fff1f2; color: #be123c; }

  /* Mess Table */
  .mess-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
  }

  .mess-table th, .mess-table td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }

  .mess-table th {
    background-color: #f8fafc;
    color: var(--text-muted);
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
  }

  /* Attendance Progress */
  .progress-container {
    height: 12px;
    background-color: #e2e8f0;
    border-radius: 99px;
    overflow: hidden;
    margin: 16px 0;
  }

  .progress-bar {
    height: 100%;
    background-color: var(--success);
    transition: width 1s ease-in-out;
  }

  /* Mess Feedback */
  .star-rating {
    display: flex;
    gap: 8px;
    margin: 12px 0;
  }

  .star-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #cbd5e1;
  }

  .star-btn.active {
    color: var(--warning);
    fill: var(--warning);
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .sidebar {
      transform: translateX(-100%);
    }
    
    .sidebar.open {
      transform: translateX(0);
    }

    .main-content {
      margin-left: 0;
    }

    .mobile-menu-btn {
      display: block;
    }

    .view-container {
      padding: 16px;
    }

    .header-profile span {
      display: none;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// --- MOCK DATA ---
const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Warden Notice', desc: 'Hostel gates will close at 9:30 PM strictly.', date: '2023-10-24', isRead: false },
  { id: 2, title: 'Mess Menu Update', desc: 'Sunday Lunch changed to Veg Biryani.', date: '2023-10-23', isRead: true },
  { id: 3, title: 'Fee Reminder', desc: 'Semester 2 hostel fees due by 30th Oct.', date: '2023-10-20', isRead: true },
];

const MOCK_MENU = [
  { day: 'Monday', breakfast: 'Aloo Paratha', lunch: 'Rice, Dal, Curd', dinner: 'Roti, Paneer' },
  { day: 'Tuesday', breakfast: 'Idli Sambar', lunch: 'Rajma Rice', dinner: 'Egg Curry' },
  { day: 'Wednesday', breakfast: 'Poha', lunch: 'Veg Biryani', dinner: 'Chicken / Mix Veg' },
  { day: 'Thursday', breakfast: 'Sandwich', lunch: 'Dal Makhani', dinner: 'Roti, Kofta' },
  { day: 'Friday', breakfast: 'Puri Sabzi', lunch: 'Fried Rice', dinner: 'Soyabean Curry' },
];

const MOCK_ATTENDANCE = {
  totalDays: 30,
  present: 26,
  absent: 4,
  percentage: 86.6
};

const MOCK_FEES = {
  total: 45000,
  paid: 30000,
  pending: 15000,
  status: 'Pending'
};

// --- COMPONENTS ---

const DashboardHome = ({ navigateTo }) => (
  <div className="view-container">
    <h2 className="page-title">Dashboard Overview</h2>
    <div className="dashboard-grid">
      <div className="card stat-card" onClick={() => navigateTo('fees')} style={{cursor: 'pointer'}}>
        <span className="stat-label">Fee Status</span>
        <span className="stat-value" style={{color: '#ef4444'}}>₹15,000 Pending</span>
        <span className="badge badge-due" style={{width: 'fit-content'}}>Action Required</span>
      </div>
      <div className="card stat-card" onClick={() => navigateTo('attendance')} style={{cursor: 'pointer'}}>
        <span className="stat-label">Attendance</span>
        <span className="stat-value">{MOCK_ATTENDANCE.percentage}%</span>
        <div className="progress-container" style={{margin: '8px 0 0 0', height: '6px'}}>
          <div className="progress-bar" style={{width: `${MOCK_ATTENDANCE.percentage}%`}}></div>
        </div>
      </div>
      <div className="card stat-card" onClick={() => navigateTo('mess')} style={{cursor: 'pointer'}}>
        <span className="stat-label">Today's Lunch</span>
        <span className="stat-value" style={{fontSize: '1.4rem'}}>Rajma Rice</span>
        <span className="stat-label">12:30 PM - 2:00 PM</span>
      </div>
    </div>

    <h3 style={{marginBottom: '16px'}}>Recent Notices</h3>
    <div className="notification-list">
      {MOCK_NOTIFICATIONS.slice(0, 2).map(note => (
        <div key={note.id} className={`notification-item ${!note.isRead ? 'unread' : ''}`}>
          <div className="notif-content">
            <h4>{note.title}</h4>
            <p>{note.desc}</p>
          </div>
          <span className="notif-date">{note.date}</span>
        </div>
      ))}
    </div>
  </div>
);

const Notifications = () => (
  <div className="view-container">
    <h2 className="page-title">Notifications</h2>
    <div className="notification-list">
      {MOCK_NOTIFICATIONS.map(note => (
        <div key={note.id} className={`notification-item ${!note.isRead ? 'unread' : ''}`}>
          <div className="notif-content">
            <h4>{note.title}</h4>
            <p>{note.desc}</p>
          </div>
          <span className="notif-date">{note.date}</span>
        </div>
      ))}
    </div>
  </div>
);

const Complaints = () => {
  const [activeTab, setActiveTab] = useState('new');
  const [complaints, setComplaints] = useState([
    { id: 101, category: 'Room', desc: 'Fan regulator not working', status: 'Pending', date: '2023-10-25' },
    { id: 102, category: 'Mess', desc: 'Water cooler leaking', status: 'Resolved', date: '2023-10-20' },
  ]);
  const [formData, setFormData] = useState({ category: 'Room', desc: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.desc) return;
    const newComplaint = {
      id: Math.floor(Math.random() * 1000),
      category: formData.category,
      desc: formData.desc,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setComplaints([newComplaint, ...complaints]);
    setFormData({ category: 'Room', desc: '' });
    setActiveTab('history');
    alert("Complaint lodged successfully!");
  };

  return (
    <div className="view-container">
      <h2 className="page-title">Complaints</h2>
      <div style={{marginBottom: '20px', display: 'flex', gap: '10px'}}>
        <button 
          className="btn-primary" 
          style={{background: activeTab === 'new' ? 'var(--primary)' : 'white', color: activeTab === 'new' ? 'white' : 'var(--text-main)', border: '1px solid var(--border)'}}
          onClick={() => setActiveTab('new')}
        >New Complaint</button>
        <button 
          className="btn-primary" 
          style={{background: activeTab === 'history' ? 'var(--primary)' : 'white', color: activeTab === 'history' ? 'white' : 'var(--text-main)', border: '1px solid var(--border)'}}
          onClick={() => setActiveTab('history')}
        >History</button>
      </div>

      {activeTab === 'new' ? (
        <div className="card" style={{maxWidth: '600px'}}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Category</label>
              <select 
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Room">Room Issue</option>
                <option value="Mess">Mess Food</option>
                <option value="Ragging">Ragging (Urgent)</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                className="form-control" 
                rows="4" 
                placeholder="Describe your issue..."
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
              ></textarea>
            </div>
            <button type="submit" className="btn-primary">Submit Complaint</button>
          </form>
        </div>
      ) : (
        <div className="notification-list">
          {complaints.map(c => (
            <div key={c.id} className="notification-item">
              <div className="notif-content">
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
                  <h4>{c.category} Issue</h4>
                  <span className={`badge ${c.status === 'Resolved' ? 'badge-approved' : 'badge-pending'}`}>{c.status}</span>
                </div>
                <p>{c.desc}</p>
                <small style={{color: 'var(--text-muted)'}}>ID: #{c.id} • {c.date}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DepartureRequest = () => {
  const [requests, setRequests] = useState([
    { id: 1, type: 'Night Out', date: '2023-10-15', reason: 'Family function', status: 'Approved' },
    { id: 2, type: 'Day Out', date: '2023-10-28', reason: 'Shopping', status: 'Pending' },
  ]);
  const [form, setForm] = useState({ type: 'Day Out', date: '', time: '', reason: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests([{
      id: Math.random(),
      type: form.type,
      date: form.date,
      reason: form.reason,
      status: 'Pending'
    }, ...requests]);
    setForm({ type: 'Day Out', date: '', time: '', reason: '' });
  };

  return (
    <div className="view-container">
      <h2 className="page-title">Departure Request</h2>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
        <div className="card">
          <h3 style={{marginBottom: '16px'}}>New Request</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Type</label>
              <select className="form-control" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option>Day Out</option>
                <option>Night Out</option>
                <option>Home Leave</option>
              </select>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
              <div className="form-group">
                <label>Date</label>
                <input type="date" className="form-control" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" className="form-control" required value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea className="form-control" rows="2" required value={form.reason} onChange={e => setForm({...form, reason: e.target.value})}></textarea>
            </div>
            <button className="btn-primary">Send Request</button>
          </form>
        </div>

        <div>
          <h3 style={{marginBottom: '16px'}}>Request History</h3>
          <div className="notification-list">
            {requests.map(req => (
              <div key={req.id} className="notification-item" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '8px'}}>
                  <strong>{req.type}</strong>
                  {req.status === 'Approved' ? (
                    <span className="badge badge-approved" style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      <CheckCircle size={12} /> Permission Granted
                    </span>
                  ) : (
                    <span className="badge badge-pending">{req.status}</span>
                  )}
                </div>
                <div style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>
                  Date: {req.date} <br/>
                  Reason: {req.reason}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Mess = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="view-container">
      <h2 className="page-title">Mess Hall</h2>
      
      <div className="card" style={{marginBottom: '32px'}}>
        <h3 style={{marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Utensils size={20}/> Weekly Menu
        </h3>
        <div style={{overflowX: 'auto'}}>
          <table className="mess-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MENU.map(m => (
                <tr key={m.day}>
                  <td style={{fontWeight: '600'}}>{m.day}</td>
                  <td>{m.breakfast}</td>
                  <td>{m.lunch}</td>
                  <td>{m.dinner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{maxWidth: '500px'}}>
        <h3>Mess Feedback</h3>
        <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px'}}>Rate today's food quality</p>
        <div className="star-rating">
          {[1,2,3,4,5].map(star => (
            <button 
              key={star} 
              type="button" 
              className={`star-btn ${rating >= star ? 'active' : ''}`}
              onClick={() => setRating(star)}
            >
              <Star size={28} fill={rating >= star ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
        <div className="form-group" style={{marginTop: '16px'}}>
          <textarea className="form-control" placeholder="Any specific suggestion?" rows="2"></textarea>
        </div>
        <button className="btn-primary" onClick={() => {setRating(0); alert("Feedback submitted!")}}>Submit Feedback</button>
      </div>
    </div>
  );
};

const Fees = () => (
  <div className="view-container">
    <h2 className="page-title">Fee Status</h2>
    <div className="dashboard-grid">
      <div className="card">
        <span className="stat-label">Total Fees</span>
        <span className="stat-value">₹{MOCK_FEES.total.toLocaleString()}</span>
      </div>
      <div className="card">
        <span className="stat-label">Paid Amount</span>
        <span className="stat-value" style={{color: 'var(--success)'}}>₹{MOCK_FEES.paid.toLocaleString()}</span>
      </div>
      <div className="card">
        <span className="stat-label">Pending Due</span>
        <span className="stat-value" style={{color: 'var(--danger)'}}>₹{MOCK_FEES.pending.toLocaleString()}</span>
        <div style={{marginTop: '12px'}}>
          <span className="badge badge-due">Payment Pending</span>
        </div>
      </div>
    </div>
    
    <div className="card">
      <h3>Payment History</h3>
      <table className="mess-table" style={{marginTop: '16px'}}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Mode</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2023-08-01</td>
            <td>Semester 1 Fee</td>
            <td>₹30,000</td>
            <td>UPI</td>
            <td><span className="badge badge-paid">Success</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Attendance = () => (
  <div className="view-container">
    <h2 className="page-title">Attendance Record</h2>
    <div className="card" style={{maxWidth: '600px', margin: '0 auto'}}>
      <div style={{textAlign: 'center', padding: '24px 0'}}>
        <div style={{fontSize: '3rem', fontWeight: '800', color: 'var(--primary)'}}>
          {MOCK_ATTENDANCE.percentage}%
        </div>
        <div style={{color: 'var(--text-muted)'}}>Current Month Attendance</div>
      </div>
      
      <div className="progress-container" style={{height: '24px'}}>
        <div className="progress-bar" style={{width: `${MOCK_ATTENDANCE.percentage}%`}}></div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '24px'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontWeight: '700', fontSize: '1.2rem'}}>{MOCK_ATTENDANCE.totalDays}</div>
          <div className="stat-label">Total Days</div>
        </div>
        <div style={{textAlign: 'center'}}>
          <div style={{fontWeight: '700', fontSize: '1.2rem', color: 'var(--success)'}}>{MOCK_ATTENDANCE.present}</div>
          <div className="stat-label">Present</div>
        </div>
        <div style={{textAlign: 'center'}}>
          <div style={{fontWeight: '700', fontSize: '1.2rem', color: 'var(--danger)'}}>{MOCK_ATTENDANCE.absent}</div>
          <div className="stat-label">Absent</div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN LAYOUT COMPONENT ---

const StudnetDashboard = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeView]);

  const renderContent = () => {
    switch(activeView) {
      case 'dashboard': return <DashboardHome navigateTo={setActiveView} />;
      case 'notifications': return <Notifications />;
      case 'complaints': return <Complaints />;
      case 'departure': return <DepartureRequest />;
      case 'mess': return <Mess />;
      case 'fees': return <Fees />;
      case 'attendance': return <Attendance />;
      default: return <DashboardHome navigateTo={setActiveView} />;
    }
  };

  const NavItem = ({ id, icon: Icon, label }) => (
    <div 
      className={`nav-item ${activeView === id ? 'active' : ''}`}
      onClick={() => setActiveView(id)}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );

  return (
    <>
      <style>{appStyles}</style>
      <div className="app-container">
        
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            HostelMate
          </div>
          <div className="nav-links">
            <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem id="notifications" icon={Bell} label="Notifications" />
            <NavItem id="complaints" icon={AlertCircle} label="Complaints" />
            <NavItem id="departure" icon={LeaveIcon} label="Departure Request" />
            <NavItem id="mess" icon={Utensils} label="Mess" />
            <NavItem id="fees" icon={Wallet} label="Fees Status" />
            <NavItem id="attendance" icon={CalendarCheck} label="Attendance" />
            <div style={{marginTop: 'auto'}}>
               <NavItem id="profile" icon={User} label="Profile" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          <header className="top-header">
            <div className="header-left">
              <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X /> : <Menu />}
              </button>
              <h2 style={{fontSize: '1.1rem', fontWeight: '600'}}>
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              </h2>
            </div>
            
            <div className="header-profile">
              <div className="student-info">
                <div className="student-name">Alex Johnson</div>
                <div className="hostel-name">Block A, Room 304</div>
              </div>
              <button className="logout-btn" onClick={() => alert('Logged out')}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </header>

          <main style={{flex: 1, overflowY: 'auto', background: '#f1f5f9'}}>
            {renderContent()}
          </main>
        </div>

      </div>
    </>
  );
};

export default StudnetDashboard;