const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes imports
const authRoutes = require("./routes/authRoutes");
const hostelSetupRoutes = require("./routes/hostelSetup");
const roomRoutes = require("./routes/roomRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminAllotRoutes = require("./routes/adminAllotRoutes");
const panelRoutes = require("./routes/panelRoutes");
const chatRoutes = require("./routes/chatRoutes"); // 🔥 NEW

// routes
app.use("/api/auth", authRoutes);
app.use("/api/hostel-setup", hostelSetupRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/admin", adminAllotRoutes);
app.use("/api/panel", panelRoutes);
app.use("/api/chat", chatRoutes); // 🔥 NEW

// DB
const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hostel-management";

mongoose
  .connect(mongoURI)
  .then(() => {
    if (process.env.MONGO_URI) {
      console.log("MongoDB connected (Atlas)");
    } else {
      console.log("MongoDB connected (Local):", mongoURI);
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});