import React from "react";
import "./Dashboard.css";
import EventDashBoard from "./DashboardEvent/EventDashboard";
import DashBoardTicket from "./DashboardTicket/DashBoardTicket";

const Dashboard = () => {
  return (
    <div className="dash-container">
      <h1>Dashboard</h1>

      <EventDashBoard />
      <DashBoardTicket />
    </div>
  );
};

export default Dashboard;
