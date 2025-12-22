import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import { NavLink } from 'react-router';

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    axiosSecure.get('/request?page=0&size=3')
      .then(res => setRecentRequests(res.data.request))
      .catch(console.error);
  }, [axiosSecure]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-red-700">
            Welcome, {user?.displayName} 👋
          </h1>
          <p className="text-gray-600">
            Manage your recent blood donation requests
          </p>
        </div>

        {/* Hide section if no request */}
        {recentRequests.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">

            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                🩸 Recent Donation Requests
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Recipient</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Blood</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {recentRequests.map((req, index) => (
                    <tr key={req._id} className="border-b hover:bg-red-50">
                      <td className="px-6 py-4">{index + 1}</td>

                      <td className="px-6 py-4 font-medium">
                        {req.recipientName}
                      </td>

                      <td className="px-6 py-4">
                        {req.district}, {req.upazila}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-red-600 text-white text-sm font-bold">
                          {req.bloodGroup}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {new Date(req.recipientDate).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">{req.donationTime}</td>

                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white
                          ${req.donation_status === 'pending' && 'bg-orange-500'}
                          ${req.donation_status === 'inprogress' && 'bg-blue-500'}
                          ${req.donation_status === 'done' && 'bg-green-600'}
                          ${req.donation_status === 'canceled' && 'bg-gray-500'}
                        `}>
                          {req.donation_status}
                        </span>

                        {/* Donor info */}
                        {req.donation_status === 'inprogress' && (
                          <p className="text-xs text-gray-500 mt-1">
                            Donor: {req.donorName} ({req.donorEmail})
                          </p>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center space-x-2">

                        <NavLink to={`/dashboard/request/${req._id}`}>
                          <button className="btn btn-xs btn-outline">
                            View
                          </button>
                        </NavLink>

                        {req.donation_status === 'pending' && (
                          <>
                            <NavLink to={`/dashboard/edit-request/${req._id}`}>
                              <button className="btn btn-xs btn-warning">
                                Edit
                              </button>
                            </NavLink>

                            <button className="btn btn-xs btn-error">
                              Delete
                            </button>
                          </>
                        )}

                        {req.donation_status === 'inprogress' && (
                          <>
                            <button className="btn btn-xs btn-success">
                              Done
                            </button>
                            <button className="btn btn-xs btn-error">
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View All */}
            <div className="p-6 text-right">
              <NavLink to="/dashboard/my-request">
                <button className="btn btn-outline btn-error">
                  View My All Requests →
                </button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
