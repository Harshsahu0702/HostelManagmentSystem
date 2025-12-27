import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { useStudent } from '../../contexts/StudentContext';
import { getChat, postChatMessage } from '../../services/api';

const Chat = () => {
  const { student } = useStudent() || {};
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!student) return;

    setLoading(true);
    try {
      const res = await getChat(); // ✅ no studentId
      setMessages(res.data || []);
    } catch (err) {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [student]);

  const send = async (e) => {
    e.preventDefault();
    if (!input) return;

    const temp = {
      _id: `temp-${Date.now()}`,
      fromStudent: student?._id,
      text: input,
      createdAt: new Date().toISOString(),
    };

    // optimistic update
    setMessages(prev => [...prev, temp]);
    setInput('');

    try {
      await postChatMessage({ text: temp.text }); // ✅ only text
      await load();
    } catch (err) {
      // rollback optimistic update
      setMessages(prev => prev.filter(m => m._id !== temp._id));
      alert('Failed to send message');
    }
  };

  return (
    <div
      className="card"
      style={{
        height: 'calc(100vh - 180px)',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
      }}
    >
      <div
        style={{
          padding: '16px',
          borderBottom: '1px solid var(--border)',
          fontWeight: 700,
        }}
      >
        Warden Office
      </div>

      <div
        style={{
          flex: 1,
          padding: '20px',
          background: '#f8fafc',
          overflowY: 'auto',
        }}
      >
        {loading && <div>Loading chat...</div>}

        {messages.map((m) => {
          const isMe =
            String(m.fromStudent) === String(student?._id);

          return (
            <div
              key={m._id}
              style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  padding: '12px',
                  background: isMe ? 'var(--primary)' : '#fff',
                  color: isMe ? '#fff' : '#000',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                }}
              >
                <div style={{ marginBottom: 6 }}>{m.text}</div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {m.createdAt
                    ? new Date(m.createdAt).toLocaleString()
                    : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={send}
        style={{
          padding: '16px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          gap: '10px',
        }}
      >
        <input
          className="form-control"
          placeholder="Type..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
