import React, { useState } from "react";

import Sidebar from "./components/Sidebar.jsx";


import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Complaints from "./pages/Complaints";
import AntiRagging from "./pages/AntiRagging";
import Mess from "./pages/Mess";
import Departure from "./pages/Departure";
import Fees from "./pages/Fees";
import Chat from "./pages/Chat";
import Feedback from "./pages/Feedback";

import "./styles/global.css";

export default function StudentPanel() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard setActivePage={setActivePage} />;
      case "notifications": return <Notifications />;
      case "complaints": return <Complaints />;
      case "antiragging": return <AntiRagging />;
      case "mess": return <Mess />;
      case "departure": return <Departure />;
      case "fees": return <Fees />;
      case "chat": return <Chat />;
      case "feedback": return <Feedback />;
      default: return <Dashboard setActivePage={setActivePage} />;
    }
  };

  const getPageTitle = () =>
    activePage.charAt(0).toUpperCase() +
    activePage.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <main className="main-content">
        <Header
          title={getPageTitle()}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="content-area">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
