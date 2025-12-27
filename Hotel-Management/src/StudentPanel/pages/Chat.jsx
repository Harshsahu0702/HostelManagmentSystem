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
        if (list.length > 0) setSelectedAdmin(list[0]);
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
      } catch {
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

    await sendPersonalMessage(selectedAdmin._id, input);
    setInput("");

    const res = await getPersonalMessages(selectedAdmin._id);
    setMessages(res.data || []);
  };

  return (
    <div
      className="card"
      style={{
        height: "calc(100vh - 180px)",
        display: "flex",
        padding: 0,
      }}
    >
      {/* ================= LEFT: ADMIN LIST ================= */}
      <div
        style={{
          width: 260,
          borderRight: "1px solid var(--border)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "12px 16px",
            fontWeight: 700,
            borderBottom: "1px solid var(--border)",
          }}
        >
          Admins
        </div>

        {admins.map((admin) => (
          <div
            key={admin._id}
            onClick={() => setSelectedAdmin(admin)}
            style={{
              padding: "12px 16px",
              cursor: "pointer",
              background:
                selectedAdmin?._id === admin._id
                  ? "rgba(79,70,229,0.1)"
                  : "transparent",
              borderLeft:
                selectedAdmin?._id === admin._id
                  ? "4px solid var(--primary)"
                  : "4px solid transparent",
            }}
          >
            <div style={{ fontWeight: 600 }}>{admin.name}</div>
            <div style={{ fontSize: "0.8rem", color: "#666" }}>
              {admin.role || "Admin"}
            </div>
          </div>
        ))}

        {admins.length === 0 && (
          <div style={{ padding: 16, color: "#777" }}>
            No admins found
          </div>
        )}
      </div>

      {/* ================= RIGHT: CHAT ================= */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
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
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    padding: "12px",
                    background: isMe ? "var(--primary)" : "#fff",
                    color: isMe ? "#fff" : "#000",
                    borderRadius: 12,
                    maxWidth: "70%",
                  }}
                >
                  <div>{m.text}</div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      marginTop: 4,
                      opacity: 0.7,
                      textAlign: "right",
                    }}
                  >
                    {new Date(m.createdAt).toLocaleTimeString()}
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
            gap: 10,
          }}
        >
          <input
            className="form-control"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-primary">
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
