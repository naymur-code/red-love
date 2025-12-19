import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard Overview
        </h1>
        <span className="text-sm text-gray-500">
          Welcome back 👋
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Donors" value="1,248" />
        <StatCard title="Blood Requests" value="312" />
        <StatCard title="Pending Requests" value="48" />
        <StatCard title="Completed Donations" value="890" />
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Requests */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Recent Blood Requests
          </h2>

          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Patient</th>
                <th className="text-left py-2">Blood Group</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-2">Rahim</td>
                <td className="py-2">A+</td>
                <td className="py-2 text-yellow-600">Pending</td>
              </tr>
              <tr>
                <td className="py-2">Karim</td>
                <td className="py-2">O+</td>
                <td className="py-2 text-green-600">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Quick Actions
          </h2>

          <div className="space-y-3">
            <button className="w-full py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition">
              Add Blood Request
            </button>
            <button className="w-full py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
              View All Donors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

/* Stat Card Component */
const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-sm text-gray-500">{title}</p>
    <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
  </div>
);
