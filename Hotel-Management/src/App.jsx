import { BrowserRouter, Routes, Route } from "react-router-dom";

import HostelLoginToggle from "./pages/HostelLoginToggle.jsx";
import StudentPanel from "./StudentPanel/StudentPanel.jsx";
import { StudentProvider } from './contexts/StudentContext';
import AdminDashboard from "./pages/AdminDashboard.jsx";
import HostelSetupDashboard from "./pages/HostelSetupDashboard.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HostelLoginToggle />} />

        {/* STUDENT PANEL */}
        <Route path="/student-dashboard" element={<StudentProvider><StudentPanel /></StudentProvider>} />

        {/* ADMIN */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/hostel-setup" element={<HostelSetupDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
