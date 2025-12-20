import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all');
    const axiosSecure = useAxiosSecure();


    const allUserDataLoad = () => {
        axiosSecure.get('/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }
    useEffect(() => {
        allUserDataLoad()

    }, [axiosSecure]);


    // 🔍 Filter users
    const filteredUsers =
        filter === 'all'
            ? users
            : users.filter(u => u.status === filter);

    const handleStatusChange = (email, status) => {
        axiosSecure.patch(`/update/users/status?email=${email}&&status=${status}`)
            .then(res => {
                if (res.data.acknowledged == true) {
                    allUserDataLoad()
                }

            })
            .catch(error => console.log(error))
    }
    return (
        <div className="p-6 bg-white rounded-xl shadow-md">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-red-700">
                    🩸 All Users
                </h2>

                {/* Filter */}
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="select select-bordered border-red-500 focus:outline-red-600"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-red-700 text-white">
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id} className="hover:bg-red-50 transition">

                                {/* User Info */}
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-12 rounded-full ring ring-red-400 ring-offset-2">
                                                <img src={user?.photoUrl} alt={user?.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{user?.name}</p>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="capitalize font-medium">
                                    {user?.role}
                                </td>

                                {/* Status */}
                                <td>
                                    <span
                                        className={`badge font-semibold px-4 py-2
                      ${user.status === 'active'
                                                ? 'badge-success'
                                                : 'badge-error'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                {/* Action */}
                                <td className="text-center">
                                    {
                                        user.status == 'active' ? <button
                                            onClick={() => handleStatusChange(user?.email, 'blocked')}
                                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Block
                                        </button> : <button
                                            onClick={() => handleStatusChange(user?.email, 'active')}
                                            className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
                                        >
                                            Active
                                        </button>
                                    }

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {filteredUsers.length === 0 && (
                    <p className="text-center py-6 text-gray-500">
                        No users found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
