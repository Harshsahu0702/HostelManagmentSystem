import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useStudent } from "../../contexts/StudentContext";
import {
  getAdminsForChat,
  getPersonalMessages,
  sendPersonalMessage,
} from "../../services/api";

const Chat = () => {
  const { student } = useStudent() || {};

  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= LOAD ADMINS ================= */
  useEffect(() => {
    const loadAdmins = async () => {
      try {
        const res = await getAdminsForChat();
        const list = res.data || [];
        setAdmins(list);
        if (list.length > 0) {
          setSelectedAdmin(list[0]); // default select first admin
        }
      } catch (err) {
        console.error("Failed to load admins", err);
      }
    };

    loadAdmins();
  }, []);

  /* ================= LOAD MESSAGES ================= */
  useEffect(() => {
    if (!selectedAdmin) return;

    const loadMessages = async () => {
      setLoading(true);
      try {
        const res = await getPersonalMessages(selectedAdmin._id);
        setMessages(res.data || []);
      } catch (err) {
        console.error("Failed to load messages", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedAdmin]);

  /* ================= SEND MESSAGE ================= */
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedAdmin) return;

    try {
      await sendPersonalMessage(selectedAdmin._id, input);
      setInput("");

      // reload messages
      const res = await getPersonalMessages(selectedAdmin._id);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Failed to send message");
    }
  };

  return (
    <div
      className="card"
      style={{
        height: "calc(100vh - 180px)",
        display: "flex",
        flexDirection: "column",
        padding: 0,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid var(--border)",
          fontWeight: 700,
        }}
      >
        {selectedAdmin
          ? `Chat with ${selectedAdmin.name}`
          : "Select an Admin"}
      </div>

      {/* MESSAGES */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#f8fafc",
          overflowY: "auto",
        }}
      >
        {loading && <div>Loading chat...</div>}

        {messages.map((m) => {
          const isMe =
            m.senderType === "student" &&
            String(m.senderId) === String(student?._id);

          return (
            <div
              key={m._id}
              style={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  padding: "12px",
                  background: isMe ? "var(--primary)" : "#fff",
                  color: isMe ? "#fff" : "#000",
                  borderRadius: "12px",
                  fontSize: "0.9rem",
                  maxWidth: "70%",
                }}
              >
                <div style={{ marginBottom: 6 }}>{m.text}</div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    textAlign: "right",
                  }}
                >
                  {m.createdAt
                    ? new Date(m.createdAt).toLocaleString()
                    : ""}
                </div>
              </div>
            </div>
          );
        })}

        {messages.length === 0 && !loading && (
          <div style={{ textAlign: "center", color: "#777" }}>
            No messages yet
          </div>
        )}
      </div>

      {/* INPUT */}
      <form
        onSubmit={handleSend}
        style={{
          padding: "16px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          className="form-control"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
