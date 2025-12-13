import { BrowserRouter, Routes, Route } from "react-router-dom";
import HostelLoginToggle from "./pages/HostelLoginToggle.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import "./App.css";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HostelLoginToggle />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
