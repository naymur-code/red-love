import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const Register = () => {
  const [districts, setDistricts] = useState([])
  const [upazilas, setUpazilas] = useState([])
  const [error, setError] = useState('')
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('districts.json')
      .then(res => setDistricts(res.data.districts)
      )
      .catch(error => console.log(error)
      )

    axios.get('upazilas.json')
      .then(res => setUpazilas(res.data.upazilas)
      )
      .catch(error => setError(error.message)
      )

  }, [])


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('')
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const district = form.district.value
    const upazila = form.upazila.value
    const bloodGroup = form.bloodGroup.value

    const photoUrl = form.avatar
    const file = photoUrl.files[0];
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=d57038d1bb0012ba418be365dc12a3b6`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const mainPhotoUrl = res.data.data.display_url;

    // Password validation:
    const uppercase = /^(?=.*[A-Z]).+$/;
    const lowerCase = /^(?=.*[a-z]).+$/;

    if (!uppercase.test(password)) {
      return setError("Must contain at least one uppercase letter!");
    } else if (!lowerCase.test(password)) {
      return setError("Must contain at least one lowercase letter!");
    } else if (password.length < 6) {
      return setError("Minimum 6 characters!");
    }

    const userInfo = { name, email, photoUrl: mainPhotoUrl, bloodGroup, district, upazila, role: 'donor', status: 'active', password }

    if (mainPhotoUrl) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: mainPhotoUrl,
          });
          //  Update context user correctly
          setUser({
            ...result.user,
            displayName: name,
            photoURL: mainPhotoUrl,
          });
          navigate('/')
        })
        .catch(error => setError(error.message))
    }

    console.log(userInfo);


  };

  return (
    <div className="relative flex flex-col rounded-xl bg-transparent justify-center items-center my-16">
      <h2 className="text-2xl font-bold text-center mb-2">
        Create an Account
      </h2>
      <p className="text-center mb-4 text-slate-600">
        Register to access blood donation services
      </p>

      {error && <p className="text-red-400 text-sm">{error}</p>}


      <form
        onSubmit={handleRegister}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-1 flex flex-col gap-6">
          {/* Name */}
          <div className="w-full">
            <label className="block mb-2 text-sm text-slate-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="block mb-2 text-sm text-slate-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            />
          </div>

          {/* avatar */}
          <div className="w-full">
            <label className="block mb-2 text-sm text-slate-600">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              required
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            />
          </div>

          {/*blood group */}
          <div className="w-full">
            <label className="block mb-2 text-sm text-slate-600">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              required
              defaultValue=""
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            >
              <option value="" disabled>
                Select blood group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/*district(select option) */}
          <div className="w-full">
            <label className="block mb-2 text-sm text-slate-600">
              District
            </label>
            <select
              name="district"
              required
              defaultValue=""
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            >
              <option value="" disabled>
                Select Your District
              </option>
              {
                districts.map(district => <option key={district.id} value={district?.name}>{district?.name}</option>
                )
              }
            </select>
          </div>

          {/*upazila(select option) */}
          <div className="w-full">
            <label className="block mb-2 text-sm text-slate-600">
              District
            </label>
            <select
              name="upazila"
              required
              defaultValue=""
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            >
              <option value="" disabled>
                Select Your Upazila
              </option>
              {
                upazilas.map(upazila => <option key={upazila.id} value={upazila?.name}>{upazila?.name}</option>
                )
              }
            </select>
          </div>


          {/* Password */}
          <div className="w-full">
            <label className="block mb-2 text-sm text-slate-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="Your Password"
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            />
          </div>
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 text-sm text-white hover:bg-slate-700 transition"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="flex justify-center mt-6 text-sm text-slate-600">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-semibold text-slate-700 underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
