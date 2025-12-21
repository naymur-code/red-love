import React, { useContext } from "react";
import logo from "../../public/white_logo.png";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Navbar = () => {
    const { user } = useContext(AuthContext);

    const navList = (
        <>
            <li>
                <NavLink to="/home">Home</NavLink>
            </li>
            <li>
                <NavLink to="/donate">Donate</NavLink>
            </li>
            <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <NavLink to="/users">Users</NavLink>
            </li>
        </>
    );

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div className="bg-red-500 text-white">
            <Container>
                <div className="navbar px-0">

                    {/* LEFT: Logo */}
                    <div className="navbar-start">
                        <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
                            <img src={logo} alt="Red Love" className="w-8" />
                            Red Love
                        </Link>
                    </div>

                    {/* CENTER: Desktop Menu */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navList}
                        </ul>
                    </div>

                    {/* RIGHT */}
                    <div className="navbar-end gap-2">

                        {/* Avatar (Mobile + Desktop) */}
                        {user && (
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL || "https://i.ibb.co/2kR8bZR/user.png"} />
                                </div>
                            </div>
                        )}

                        {/* Mobile Menu */}
                        <div className="dropdown dropdown-end lg:hidden">
                            <label tabIndex={0} className="btn btn-ghost text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </label>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 w-52 rounded-box
                bg-white text-black shadow"
                            >
                                {navList}

                                {user ? (
                                    <li>
                                        <button onClick={handleLogout}>Logout</button>
                                    </li>
                                ) : (
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Desktop Login / Logout */}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="btn hidden lg:flex bg-white text-red-500 border-0"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="btn hidden lg:flex bg-white text-red-500 border-0"
                            >
                                Login
                            </Link>
                        )}

                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Navbar;
