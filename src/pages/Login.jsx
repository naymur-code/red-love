import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
    const [error,setError]=useState('')
    const { setUser } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                setUser(result.user);

                navigate(location.state || '/')

            })
            .catch(error =>setError(error.message))

    };

    return (
        <div className="relative flex flex-col rounded-xl bg-transparent justify-center items-center my-20">
            <h2 className="text-2xl font-bold text-center mb-2">
                Welcome Back!
            </h2>
            <p className="text-center mb-6 text-slate-600">
                Sign in to access blood donation services
            </p>
      {error && <p className="text-red-400 text-sm">{error}</p>}

            <form
                onSubmit={handleLogin}
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
                <div className="mb-1 flex flex-col gap-6">
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

                {/* Login Button */}
                <button
                    type="submit"
                    className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 text-sm text-white hover:bg-slate-700 transition shadow-md"
                >
                    Login
                </button>

                {/* Register Link */}
                <p className="flex justify-center mt-6 text-sm text-slate-600">
                    Don&apos;t have an account?
                    <Link
                        to="/register"
                        className="ml-1 font-semibold text-slate-700 underline"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
