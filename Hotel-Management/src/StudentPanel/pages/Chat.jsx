import React, { useState } from 'react';
import { Send } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([{ from: 'warden', text: 'Aryan, please visit office.', time: '10:30 AM' }]);
  const [input, setInput] = useState("");

  const send = (e) => {
    e.preventDefault();
    if(!input) return;
    setMessages([...messages, { from: 'student', text: input, time: 'Now' }]);
    setInput("");
  };

  return (
    <div className="card" style={{height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column', padding: 0}}>
      <div style={{padding: '16px', borderBottom: '1px solid var(--border)', fontWeight: 700}}>Warden Office</div>
      <div style={{flex:1, padding: '20px', background: '#f8fafc', overflowY: 'auto'}}>
        {messages.map((m, i) => (<div key={i} style={{display:'flex', justifyContent: m.from === 'student' ? 'flex-end' : 'flex-start', marginBottom: '16px'}}><div style={{padding: '12px', background: m.from === 'student' ? 'var(--primary)' : '#fff', color: m.from === 'student' ? '#fff' : '#000', borderRadius: '12px', fontSize: '0.9rem'}}>{m.text}</div></div>))}
      </div>
      <form onSubmit={send} style={{padding: '16px', borderTop: '1px solid var(--border)', display:'flex', gap: '10px'}}>
        <input className="form-control" placeholder="Type..." value={input} onChange={e => setInput(e.target.value)} />
        <button className="btn btn-primary"><Send size={18}/></button>
      </form>
    </div>
  );
};

export default Chat;

