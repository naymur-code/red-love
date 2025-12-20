import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [myRequest, setMyRequest] = useState([]);
    const [totalRequest, setTotalRequest] = useState(0);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axiosSecure.get(`/request?page=${currentPage - 1}&size=${itemsPerPage}`)
            .then(res => {
                setMyRequest(res.data.request);
                setTotalRequest(res.data.totalRequest);
            })
            .catch(error => console.log(error));
    }, [axiosSecure, currentPage]);

    const numberOfPage = Math.ceil(totalRequest / itemsPerPage);
    const pages = [...Array(numberOfPage).keys()].map(e => e + 1);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-red-700 mb-2">
                        My Blood Donation Requests
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Manage and track all your blood requests
                    </p>
                </div>

                {/* Stats Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8 text-center">
                    <p className="text-gray-600">Total Requests</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">{totalRequest}</p>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-red-600 text-white">
                                <tr>
                                    <th className="text-left py-4 px-6">#</th>
                                    <th className="text-left py-4 px-6">Recipient Name</th>
                                    <th className="text-left py-4 px-6">Blood Group</th>
                                    <th className="text-left py-4 px-6">Location</th>
                                    <th className="text-left py-4 px-6">District / Upazila</th>
                                    <th className="text-left py-4 px-6">Needed Date</th>
                                    <th className="text-left py-4 px-6">Time</th>
                                    <th className="text-left py-4 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myRequest.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-10 text-gray-500">
                                            No requests found
                                        </td>
                                    </tr>
                                ) : (
                                    myRequest.map((request, i) => (
                                        <tr 
                                            key={request._id} 
                                            className="border-b hover:bg-red-50 transition duration-200"
                                        >
                                            <td className="py-4 px-6 font-medium">
                                                {(currentPage - 1) * itemsPerPage + i + 1}
                                            </td>
                                            <td className="py-4 px-6 font-semibold text-gray-800">
                                                {request.recipientName}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-block px-4 py-2 rounded-full text-white font-bold text-sm bg-red-600">
                                                    {request.bloodGroup}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-700">
                                                {request.recipientAddress}
                                            </td>
                                            <td className="py-4 px-6 text-gray-700">
                                                {request.district}, {request.upazila}
                                            </td>
                                            <td className="py-4 px-6 text-gray-800 font-medium">
                                                {new Date(request.recipientDate).toLocaleDateString('en-GB')}
                                            </td>
                                            <td className="py-4 px-6 text-gray-700">
                                                {request.donationTime}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-block px-4 py-2 rounded-full text-white font-bold text-xs ${
                                                    request.donation_status === 'pending' 
                                                        ? 'bg-orange-500' 
                                                        : request.donation_status === 'approved' 
                                                        ? 'bg-green-500' 
                                                        : request.donation_status === 'completed'
                                                        ? 'bg-blue-600'
                                                        : 'bg-gray-500'
                                                }`}>
                                                    {request.donation_status.charAt(0).toUpperCase() + request.donation_status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {numberOfPage > 1 && (
                        <div className="flex flex-wrap justify-center items-center gap-2 py-6 bg-gray-50 px-4">
                            <button
                                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-5 py-3 rounded-lg font-medium bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Previous
                            </button>

                            {pages.map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-12 h-12 rounded-lg font-medium transition ${
                                        page === currentPage
                                            ? 'bg-red-600 text-white shadow-lg'
                                            : 'bg-white border border-gray-300 hover:bg-red-50 hover:border-red-400'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => currentPage < numberOfPage && setCurrentPage(currentPage + 1)}
                                disabled={currentPage === numberOfPage}
                                className="px-5 py-3 rounded-lg font-medium bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyRequest;