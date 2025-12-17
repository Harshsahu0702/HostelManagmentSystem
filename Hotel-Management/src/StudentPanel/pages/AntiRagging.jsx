import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

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

export default AntiRagging;

