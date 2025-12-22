import React, { useContext } from "react";
import logo from "../../public/white_logo.png";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Navbar = () => {
  const { user, role } = useContext(AuthContext); // role: 'admin' or 'donor'
  const location = useLocation();

  // Define all possible links
  const allLinks = [
    { name: "Home", to: "/home", roles: ["guest", "donor", "admin"] },
    { name: "Donate", to: "/donate", roles: ["guest", "donor", "admin"] },
    { name: "All Request", to: "/all-request", roles: ["donor", "admin"] },
    { name: "Search Donors", to: "/search-request", roles: ["guest", "donor", "admin"] },
    { name: "Dashboard", to: "/dashboard", roles: ["donor", "admin"] },
    { name: "Users", to: "/users", roles: ["admin"] }, // only admin can see
  ];

  const navLinkClass = (path) =>
    `px-3 py-2 rounded-md font-medium transition ${
      location.pathname === path
        ? "bg-white text-red-600 shadow-lg"
        : "text-white hover:bg-red-600/20"
    }`;

  const handleLogout = () => signOut(auth);

  return (
    <header className="bg-red-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img src={logo} alt="Red Love" className="w-8" />
            Red Love
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-2">
            {allLinks
              .filter(link => (user ? link.roles.includes(role) : link.roles.includes("guest")))
              .map(link => (
                <NavLink key={link.to} to={link.to} className={() => navLinkClass(link.to)}>
                  {link.name}
                </NavLink>
              ))}
          </nav>

          {/* Right: User Avatar + Login/Logout */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="avatar">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <img src={user.photoURL || "https://i.ibb.co/2kR8bZR/user.png"} alt="User Avatar" />
                </div>
              </div>
            )}

            {/* Desktop Login/Logout */}
            {user ? (
              <button
                onClick={handleLogout}
                className="hidden lg:flex bg-white text-red-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hidden lg:flex bg-white text-red-500 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-white rounded-box w-52 text-black"
              >
                {allLinks
                  .filter(link => (user ? link.roles.includes(role) : link.roles.includes("guest")))
                  .map(link => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className={() =>
                          location.pathname === link.to
                            ? "block px-4 py-2 rounded-md bg-red-100 text-red-600 font-semibold"
                            : "block px-4 py-2 rounded-md hover:bg-red-50"
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                {user ? (
                  <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-red-50 rounded-md">
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/login" className="block px-4 py-2 hover:bg-red-50 rounded-md">Login</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
