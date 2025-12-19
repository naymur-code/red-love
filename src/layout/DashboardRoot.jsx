import React from "react";
import Aside from "../components/Aside";
import { Outlet } from "react-router";

const DashboardRoot = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Aside />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardRoot;
