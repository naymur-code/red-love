import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddRequest = () => {
    const { user } = useContext(AuthContext)
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([])
    const [error, setError] = useState([])
    const axiosSecure=useAxiosSecure()

    useEffect(() => {
        axios.get('/districts.json')
            .then(res => setDistricts(res.data.districts)
            )
            .catch(error => console.log(error)
            )

        axios.get('/upazilas.json')
            .then(res => setUpazilas(res.data.upazilas)
            )
            .catch(error => setError(error.message)
            )

    }, [])
    const handleAddRequest = (e) => {
        e.preventDefault()
        const form = e.target
        const requestName = form.requestName.value;
        const requestEmail = form.requestEmail.value;
        const recipientName = form.recipientName.value;
        const recipientEmail = form.recipientEmail.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const recipientAddress = form.recipientAddress.value;
        const recipientDate = form.recipientDate.value;
        const donationTime = form.donationTime.value;
        const bloodGroup = form.bloodGroup.value

        const formData = {
            requestName,
            requestEmail,
            recipientName,
            recipientEmail,
            recipientAddress,
            upazila,
            district,
            recipientDate,
            donationTime,
            bloodGroup,
            donation_status: 'pending'
        }

        axiosSecure.post('/request',formData)
        .then(res=>console.log(res))
        .catch(error=>console.log(error))
  
    }
    return (
        <div>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow my-20">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Add Donation Request
                </h2>

                <form onSubmit={handleAddRequest} className="space-y-5">

                    {/* request data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Request Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Request Name
                            </label>
                            <input
                                name='requestName'
                                type="text"
                                defaultValue={user.displayName}
                                placeholder="Enter Request Name"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                                readOnly
                            />
                        </div>
                        {/* Request Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Request Email
                            </label>
                            <input
                                name='requestEmail'
                                type="text"
                                defaultValue={user.email}
                                placeholder="Enter Request Name"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                                readOnly
                            />
                        </div>

                    </div>

                    {/* Recipient data */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Recipient Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Recipient Name
                            </label>
                            <input
                                name='recipientName'
                                type="text"
                                placeholder="Enter Recipient Name"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                        {/* Recipient Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Recipient Email
                            </label>
                            <input
                                name='recipientEmail'
                                type="email"
                                placeholder="Enter Recipient Email"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>

                    </div>

                    {/* Location */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Recipient District */}

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Recipient District

                            </label>
                            <select
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400" name='district'
                                required
                            >
                                <option value="">Select  district </option>
                                {
                                    districts.map(district => <option key={district.id} value={district?.name}>{district?.name}</option>
                                    )}
                            </select>
                        </div>

                        {/* Recipient Upazila */}

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Recipient Upazila

                            </label>
                            <select
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400" name='upazila'
                                required
                            >
                                <option value="">Select  upazila </option>
                                {
                                    upazilas.map(upazila => <option key={upazila.id} value={upazila?.name}>{upazila?.name}</option>
                                    )
                                }
                            </select>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Recipient Address
                            </label>
                            <input
                                name='recipientAddress'
                                type="text"
                                placeholder="Address"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Hospital Name
                            </label>
                            <input
                                name='hospitalName'
                                type="text"
                                placeholder="Hospital"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Donation Date
                            </label>
                            <input
                                name='recipientDate'
                                type="date"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Donation Time
                            </label>
                            <input
                                name='donationTime'
                                type="time"
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                                required
                            />
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Blood Group
                        </label>
                        <select
                            name='bloodGroup'
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                            required
                        >
                            <option value="">Select blood group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Create Donation Request
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AddRequest;