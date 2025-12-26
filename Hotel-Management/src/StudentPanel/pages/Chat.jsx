import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { useStudent } from '../../contexts/StudentContext';
import { getChat, postChatMessage } from '../../services/api';

const Chat = () => {
  const { student } = useStudent() || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!student?._id) return;
    setLoading(true);
    try {
      const res = await getChat(student._id);
      setMessages(res.data || []);
    } catch (err) {
      setMessages([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [student]);

  const send = async (e) => {
    e.preventDefault();
    if(!input || !student?._id) return;
    // optimistic update
    const temp = { _id: `temp-${Date.now()}`, fromStudent: student._id, to: 'warden', text: input, createdAt: new Date().toISOString() };
    setMessages(prev => [...prev, temp]);
    setInput('');
    try {
      await postChatMessage({ fromStudent: student._id, to: student._id, text: input });
      await load();
    } catch (err) {
      // on error remove temp and show minimal feedback
      setMessages(prev => prev.filter(m => m._id !== temp._id));
      console.error('Failed to send message', err);
      alert('Failed to send message');
    }
  };

  return (
    <div className="card" style={{height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column', padding: 0}}>
      <div style={{padding: '16px', borderBottom: '1px solid var(--border)', fontWeight: 700}}>Warden Office</div>
      <div style={{flex:1, padding: '20px', background: '#f8fafc', overflowY: 'auto'}}>
        {loading && <div>Loading chat...</div>}
        {messages.map((m, i) => (
          <div key={m._id || i} style={{display:'flex', justifyContent: (String(m.fromStudent) === String(student?._id)) ? 'flex-end' : 'flex-start', marginBottom: '16px'}}>
            <div style={{padding: '12px', background: (String(m.fromStudent) === String(student?._id)) ? 'var(--primary)' : '#fff', color: (String(m.fromStudent) === String(student?._id)) ? '#fff' : '#000', borderRadius: '12px', fontSize: '0.9rem'}}>
              <div style={{fontSize:'0.85rem', marginBottom:6}}>{m.text}</div>
              <div style={{fontSize:'0.7rem', color:'var(--text-muted)', marginTop:6}}>{m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={send} style={{padding: '16px', borderTop: '1px solid var(--border)', display:'flex', gap: '10px'}}>
        <input className="form-control" placeholder="Type..." value={input} onChange={e => setInput(e.target.value)} />
        <button className="btn btn-primary"><Send size={18}/></button>
      </form>
    </div>
  );
};

export default Chat;

