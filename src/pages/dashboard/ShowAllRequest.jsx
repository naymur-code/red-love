import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ShowAllRequest = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axiosSecure.get("/all-request")
            .then(res => setRequests(res.data))
            .catch(err => console.log(err));
    }, [axiosSecure]);

    const statusBadge = (status) => {
        if (status === "pending") return "badge-warning";
        if (status === "inprogress") return "badge-info";
        if (status === "done") return "badge-success";
        return "badge-ghost";
    };

    return (
        <div className="p-6 md:p-10">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    🩸 All Blood Donation Requests
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Admin can manage all donation requests
                </p>
            </div>

            {requests.length === 0 ? (
                <p className="text-center text-gray-500 mt-20">
                    No donation requests found.
                </p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow border">
                    <table className="table table-zebra w-full">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th>#</th>
                                <th>Blood Group</th>
                                <th>Recipient</th>
                                <th>Email</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map((data, index) => (
                                <tr key={data._id}>
                                    <td>{index + 1}</td>

                                    <td>
                                        <span className="badge badge-error badge-outline font-bold">
                                            {data.bloodGroup}
                                        </span>
                                    </td>

                                    <td>{data.recipientName}</td>
                                    <td>{data.
                                        recipientEmail
                                    }</td>

                                    <td>
                                        {data.district}, {data.upazila}
                                    </td>

                                    <td>{data.recipientDate}</td>

                                    <td>{data.donationTime}</td>

                                    <td>
                                        <span
                                            className={`badge capitalize ${statusBadge(
                                                data.donation_status
                                            )}`}
                                        >
                                            {data.donation_status}
                                        </span>
                                    </td>

                                    <td className="text-center space-x-2">
                                        <button
                                            onClick={() =>
                                                navigate(`/view-details/${data._id}`)
                                            }
                                            className="btn btn-xs btn-outline btn-error"
                                        >
                                            View
                                        </button>

                                        {/* {data.donation_status === "pending" && (
                                            <button
                                                onClick={() =>
                                                    navigate(`/dashboard/edit-request/${data._id}`)
                                                }
                                                className="btn btn-xs btn-outline"
                                            >
                                                Edit
                                            </button>
                                        )} */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ShowAllRequest;
