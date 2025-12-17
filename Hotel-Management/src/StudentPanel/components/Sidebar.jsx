import React from 'react';
import { 
  LayoutDashboard, Bell, MessageSquareWarning, ShieldAlert, Utensils, 
  PlaneTakeoff, CreditCard, MessageCircle, Star, LogOut, X 
} from 'lucide-react';

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
      <div className="sidebar-header">
        HOSTEL PORTAL
        <button className="mobile-toggle btn btn-ghost" onClick={toggle} style={{float:'right'}}><X size={20}/></button>
      </div>
      <nav className="nav-links">
        {menuItems.map(item => (
          <div 
            key={item.id} 
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => { setActivePage(item.id); if(window.innerWidth < 768) toggle(); }}
          >
            <item.icon size={18} />
            {item.label}
          </div>
        ))}
      </nav>
      <div className="nav-links" style={{flex: 'initial', borderTop: '1px solid var(--border)'}}>
        <div className="nav-item" style={{color: 'var(--danger)'}} onClick={() => alert("Logout")}>
          <LogOut size={18} /> Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

