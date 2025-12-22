import React, { useEffect, useState, } from 'react';
import { NavLink } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Container from '../components/Container';

const AllRequest = () => {
    const axiosSecure = useAxiosSecure();

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axiosSecure.get('/pending-request')
            .then(res => setRequests(res.data))
            .catch(error => console.log(error));
    }, [axiosSecure]);


    return (
        <Container>
            <div className="my-16">
                <h1 className="text-3xl font-bold text-center mb-10 text-red-600">
                    🩸 Pending Donation Requests
                </h1>

                {requests.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No pending donation requests found.
                    </p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {requests.map(data => (
                            <div
                                key={data._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border"
                            >
                                {/* Blood Group Badge */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="px-4 py-1 rounded-full bg-red-100 text-red-600 font-bold">
                                        {data.bloodGroup}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        Pending
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="space-y-2 text-gray-700">
                                    <p>
                                        <span className="font-semibold">Recipient:</span>{' '}
                                        {data.recipientName}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Location:</span>{' '}
                                        {data.district}, {data.upazila}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Date:</span>{' '}
                                        {data.recipientDate}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Time:</span>{' '}
                                        {data.donationTime}
                                    </p>
                                </div>

                                {/* Action */}
                                <div className="mt-6">
                                    <NavLink to={`/view-details/${data._id}`}>
                                        <button
                                            className="w-full btn btn-outline btn-error"
                                        >
                                            View Details
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default AllRequest;
