import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Container from '../components/Container';
import { AuthContext } from '../provider/AuthProvider';

const ViewDetailsRequest = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const [request, setRequest] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get(`/view-details/${id}`)
            .then(res => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, [axiosSecure, id]);

    const handleConfirmDonation = (e) => {
        e.preventDefault()
        const donationInfo = {
            donorName: user.displayName,
            donorEmail: user.email,
            status: 'inprogress'
        };

        // console.log(request.donation_status='dd');
        axiosSecure.patch(`/donation-request/${id}`, donationInfo)
            .then(() => {
                setRequest(prev => ({
                    ...prev,
                    donation_status: 'inprogress'
                }));
                document.getElementById('donate_modal').close();
            })
            .catch(err => console.log(err));
    };

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    return (
        <Container>
            <div className="max-w-3xl mx-auto my-12">

                <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
                    🩸 Donation Request Details
                </h1>

                {/* Details Card */}
                <div className="bg-white shadow-lg rounded-2xl p-8 border">
                    <div className="flex justify-between items-center mb-6">
                        <span className="px-5 py-2 bg-red-100 text-red-600 rounded-full font-bold text-lg">
                            {request.bloodGroup}
                        </span>
                        <span className="capitalize text-sm font-semibold text-gray-500">
                            Status: {request.donation_status}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                        <p><span className="font-semibold">Recipient Name:</span> {request.recipientName}</p>
                        <p><span className="font-semibold">Location:</span> {request.district}, {request.upazila}</p>
                        <p><span className="font-semibold">Donation Date:</span> {request.recipientDate}</p>
                        <p><span className="font-semibold">Donation Time:</span> {request.donationTime}</p>
                        {/* {request.hospitalName && (
                            <p><span className="font-semibold">Hospital:</span> {request.hospitalName}</p>
                        )} */}
                        {/* {request.message && (
                            <p className="sm:col-span-2">
                                <span className="font-semibold">Message:</span> {request.message}
                            </p>
                        )} */}
                    </div>

                    {/* Donate Button */}
                    {request.donation_status === 'pending' && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => document.getElementById('donate_modal').showModal()}
                                className="btn btn-error btn-wide"
                            >
                                Donate Blood
                            </button>
                        </div>
                    )}
                </div>

                {/* Donate Modal */}
                <dialog id="donate_modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-xl mb-4 text-center text-red-600">
                            Confirm Donation
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="label">Donor Name</label>
                                <input
                                    type="text"
                                    value={user.displayName}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div>
                                <label className="label">Donor Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        <div className="modal-action flex justify-between mt-6">
                            <button
                                onClick={() => document.getElementById('donate_modal').close()}
                                className="btn btn-outline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDonation}
                                className="btn btn-error"
                            >
                                Confirm Donation
                            </button>
                        </div>
                    </div>
                </dialog>

            </div>
        </Container>
    );
};

export default ViewDetailsRequest;
