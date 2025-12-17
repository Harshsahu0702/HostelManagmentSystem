import React from 'react';
import { Menu } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const Header = ({ title, toggleSidebar }) => (
  <header className="header">
    <div style={{display:'flex', alignItems:'center', gap: '12px'}}>
      <button className="mobile-toggle btn btn-ghost" onClick={toggleSidebar}><Menu size={24}/></button>
      <h2 style={{margin:0, fontSize: '1.1rem', fontWeight: 700}}>{title}</h2>
    </div>
    <div style={{display:'flex', alignItems:'center', gap: '12px'}}>
      <div style={{textAlign:'right'}}>
        <div style={{fontWeight:700, fontSize:'0.85rem'}}>{MOCK_DATA.student.name}</div>
        <div style={{fontSize:'0.7rem', color: 'var(--text-muted)'}}>Room: {MOCK_DATA.student.room}</div>
      </div>
      <div style={{width:36, height:36, borderRadius: '50%', background: '#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, color: 'var(--primary)', fontSize:'0.8rem'}}>
        AS
      </div>
    </div>
  </header>
);

export default Header;

