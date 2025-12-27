import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= ROOM APIs ================= */
export const getRoomStats = async () => {
  const res = await api.get("/rooms/stats");
  return res.data;
};

/* ================= STUDENT APIs ================= */
export const registerStudent = async (studentData) => {
  // studentData MUST include hostelId
  const res = await api.post("/students/register", studentData);
  return res.data;
};

export const getAllStudents = async () => {
  const res = await api.get("/students");
  return res.data;
};

export const getStudentById = async (id) => {
  const res = await api.get(`/students/${id}`);
  return res.data;
};

/* ================= PANEL APIs (JWT BASED) ================= */

// Notifications
export const getNotifications = async () => {
  const res = await api.get("/panel/notifications");
  return res.data;
};

// Complaints
export const createComplaint = async (payload) => {
  const res = await api.post("/panel/complaints", payload);
  return res.data;
};

export const getComplaints = async () => {
  const res = await api.get("/panel/complaints");
  return res.data;
};

// Anti-ragging
export const createAntiRagging = async (payload) => {
  const res = await api.post("/panel/antiragging", payload);
  return res.data;
};

export const getAntiRagging = async () => {
  const res = await api.get("/panel/antiragging");
  return res.data;
};

// Mess menu (hostel from JWT)
export const getMessMenu = async () => {
  const res = await api.get("/panel/mess");
  return res.data;
};

// Departure
export const createDeparture = async (payload) => {
  const res = await api.post("/panel/departure", payload);
  return res.data;
};

export const getDepartures = async () => {
  const res = await api.get("/panel/departure");
  return res.data;
};

// Fees
export const getFees = async () => {
  const res = await api.get("/panel/fees");
  return res.data;
};

// Chat
export const postChatMessage = async (payload) => {
  const res = await api.post("/panel/chat", payload);
  return res.data;
};

export const getChat = async () => {
  const res = await api.get("/panel/chat");
  return res.data;
};

// Feedback
export const postFeedback = async (payload) => {
  const res = await api.post("/panel/feedback", payload);
  return res.data;
};

export const getFeedback = async () => {
  const res = await api.get("/panel/feedback");
  return res.data;
};

/* ================= ADMIN APIs ================= */
export const getAdminByEmail = async (email) => {
  const res = await api.get(`/admins/${encodeURIComponent(email)}`);
  return res.data;
};

export const createAdmin = async (adminData) => {
  const res = await api.post("/admins/create", adminData);
  return res.data;
};

/* ================= ROOM ALLOTMENT APIs ================= */
export const getAllRooms = async () => {
  const res = await api.get("/admin/rooms");
  return res.data;
};

export const getAvailableRooms = async (type) => {
  const res = await api.get(
    `/admin/available-rooms${type ? `?type=${encodeURIComponent(type)}` : ""}`
  );
  return res.data;
};

export const autoAllot = async () => {
  const res = await api.post("/admin/auto-allot");
  return res.data;
};

export const manualAllot = async (studentId, roomNumber) => {
  const res = await api.post("/admin/manual-allot", { studentId, roomNumber });
  return res.data;
};

export const removeAllotment = async (studentId) => {
  const res = await api.post("/admin/remove-allotment", { studentId });
  return res.data;
};
