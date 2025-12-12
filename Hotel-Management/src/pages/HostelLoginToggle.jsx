import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./HostelLoginToggle.css";
import Header from "../components/Header";
import Hyperspeed from "../components/Hyperspeed";
import { hyperspeedPresets } from "../components/hyperspeedPresets";
import axios from "axios";

export default function HostelLoginToggle() {
  const [mode, setMode] = useState("student");

  // State objects to hold credentials separately
  const [adminCreds, setAdminCreds] = useState({
    email: "",
    password: "",
  });

  const [studentCreds, setStudentCreds] = useState({
    sid: "",
    password: "",
  });

  // Handlers to update state as user types
  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminCreds((prev) => ({ ...prev, [name]: value }));
    console.log("adminCreds (next):", { ...adminCreds, [name]: value });l
  };

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentCreds((prev) => ({ ...prev, [name]: value }));
    console.log("studentCreds (next):", { ...studentCreds, [name]: value });
  };

  // When form submitted, use the state objects (instead of FormData)

const submitHandler = async (e) => {
  e.preventDefault();

  try {
    if (mode === "student") {
      const res = await axios.post(
        "http://localhost:5000/api/auth/student/login",
        studentCreds
      );

      console.log(res.data);
      alert(res.data.message);

    } else {
      const res = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        adminCreds
      );

      console.log(res.data);
      alert(res.data.message);
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="login-container">
      {/* Hyperspeed full-screen background */}
      <div className="hyperspeed-bg">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>

      {/* Floating animations */}
      <div className="blob-left"></div>
      <div className="blob-right"></div>
      {/* HEADER */}
      <Header />

      <div className="login-wrapper">
        {/* Toggle Buttons */}
        <div className="toggle-container">
          <div
            className={`toggle-background ${mode === "admin" ? "admin" : "student"}`}
          ></div>

          <div className="toggle-buttons">
            <button
              onClick={() => setMode("admin")}
              className={`toggle-btn ${mode === "admin" ? "active" : "inactive"}`}
            >
              Admin
            </button>
            <button
              onClick={() => setMode("student")}
              className={`toggle-btn ${mode === "student" ? "active" : "inactive"}`}
            >
              Student
            </button>
          </div>
        </div>

        {/* FORM BELOW */}
        <div className="form-wrapper">
          <div className="form-card">
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to continue</p>

            <AnimatePresence mode="wait">
              {mode === "student" ? (
                <motion.form
                  key="student"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={submitHandler}
                  className="form-student"
                >
                  <div className="form-group">
                    <label className="form-label">Student ID</label>
                    <input
                      required
                      name="sid"
                      placeholder="eg. S2001"
                      className="form-input student-focus"
                      onChange={handleStudentChange}
                      value={studentCreds.sid}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="form-input student-focus"
                      onChange={handleStudentChange}
                      value={studentCreds.password}
                    />
                  </div>

                  <button className="submit-btn student">Sign in</button>
                </motion.form>
              ) : (
                <motion.form
                  key="admin"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={submitHandler}
                  className="form-admin"
                >
                  <div className="form-group">
                    <label className="form-label">Admin Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="admin@college.edu"
                      className="form-input admin-focus"
                      onChange={handleAdminChange}
                      value={adminCreds.email}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      required
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="form-input admin-focus"
                      onChange={handleAdminChange}
                      value={adminCreds.password}
                    />
                  </div>

                  <button className="submit-btn admin">Admin Sign in</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
