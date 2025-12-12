import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./HostelLoginToggle.css";
import Header from "../components/Header";
import Hyperspeed from "../components/Hyperspeed";
import { hyperspeedPresets } from "../components/hyperspeedPresets";

export default function HostelLoginToggle() {
  const [mode, setMode] = useState("student");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    alert(`${mode} login success (demo)`);
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
                <div className={`toggle-background ${mode === "admin" ? "admin" : "student"}`}></div>

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
                      />
                    </div>

                      <button className="submit-btn student">
                      Sign in
                    </button>
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
                      />
                    </div>

                      <button className="submit-btn admin">
                      Admin Sign in
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
        </div>

      </div>
    </div>
  );
}
