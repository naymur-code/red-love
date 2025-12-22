import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddVolunteer = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const axiosSecure = useAxiosSecure();

    /* Load districts & upazilas */
    useEffect(() => {
        axios.get("/districts.json")
            .then(res => setDistricts(res.data.districts))
            .catch(err => console.log(err));

        axios.get("/upazilas.json")
            .then(res => setUpazilas(res.data.upazilas))
            .catch(err => console.log(err));
    }, []);

    /* Handle form submit */
    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const bloodGroup = form.bloodGroup.value;
        const file = form.avatar.files[0];

        /* Password validation */
        if (!/(?=.*[A-Z])/.test(password)) {
            setLoading(false);
            return setError("Must contain at least one uppercase letter");
        }
        if (!/(?=.*[a-z])/.test(password)) {
            setLoading(false);
            return setError("Must contain at least one lowercase letter");
        }
        if (password.length < 6) {
            setLoading(false);
            return setError("Password must be at least 6 characters");
        }

        try {
            /* Upload image */
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=d57038d1bb0012ba418be365dc12a3b6`,
                { image: file },
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            const photoUrl = imgRes.data.data.display_url;

            /* User info */
            const userInfo = {
                name,
                email,
                photoUrl,
                bloodGroup,
                district,
                upazila,
                role: "volunteer",
                status: "active",
                password
            };

            /* Save to database */
            const res = await axiosSecure.post("/users", userInfo);

            if (res.data.insertedId) {
                form.reset();
                 Swal.fire({
        title: "Volunteer Added Successfully!",
        text: "The volunteer account has been created.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#dc2626"
    });
            }

        } catch (err) {
            console.log(err);
            setError("Failed to add volunteer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-10">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Add New Volunteer
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Register a volunteer for blood donation support
                </p>
            </div>

            {/* Card */}
            <div className="max-w-4xl bg-white rounded-2xl shadow-md border p-8">
                {error && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="label">Full Name</label>
                            <input
                                name="name"
                                required
                                className="input input-bordered w-full"
                                placeholder="Enter name"
                            />
                        </div>

                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="input input-bordered w-full"
                                placeholder="Enter email"
                            />
                        </div>

                        <div>
                            <label className="label">Profile Photo</label>
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                required
                                className="file-input file-input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="label">Blood Group</label>
                            <select
                                name="bloodGroup"
                                required
                                defaultValue=""
                                className="select select-bordered w-full"
                            >
                                <option value="" disabled>Select group</option>
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

                        <div>
                            <label className="label">District</label>
                            <select
                                name="district"
                                required
                                defaultValue=""
                                className="select select-bordered w-full"
                            >
                                <option value="" disabled>Select district</option>
                                {districts.map(d => (
                                    <option key={d.id} value={d.name}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="label">Upazila</label>
                            <select
                                name="upazila"
                                required
                                defaultValue=""
                                className="select select-bordered w-full"
                            >
                                <option value="" disabled>Select upazila</option>
                                {upazilas.map(u => (
                                    <option key={u.id} value={u.name}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="input input-bordered w-full"
                                placeholder="Temporary password"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-error px-10"
                        >
                            {loading ? "Adding..." : "Add Volunteer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVolunteer;