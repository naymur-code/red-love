import React from "react";
import logo from "../../public/white_logo.png";
import { Link, NavLink } from "react-router";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-red-500 text-white">
      <footer className="container mx-auto">
        <div className="footer sm:footer-horizontal p-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link
              to="/"
              className="flex items-center gap-2 bg-transparent text-white text-xl font-semibold
                         border-0 hover:border-0 focus:border-0 active:border-0
                         outline-none shadow-none"
            >
              <img src={logo} alt="Red Love Logo" width="35" />
              Red Love
            </Link>

            <p className="md:w-80 text-red-100">
              Red Love is an automated blood donation platform connecting donors
              and seekers instantly through SMS and web technology.
            </p>

            <div className="flex text-xl gap-4 text-red-200">
              <FaFacebook className="cursor-pointer hover:text-white" />
              <FaTwitter className="cursor-pointer hover:text-white" />
              <FaYoutube className="cursor-pointer hover:text-white" />
              <FaInstagramSquare className="cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Quick Links */}
          <nav>
            <h6 className="footer-title text-lg font-bold text-white">
              Quick Links
            </h6>
            <NavLink className="hover:text-red-200" to="/">Home</NavLink>
            <NavLink className="hover:text-red-200" to="/services">Services</NavLink>
            <NavLink className="hover:text-red-200" to="/profile">My Profile</NavLink>
            <NavLink className="hover:text-red-200" to="/register">Register</NavLink>
          </nav>

          {/* Services */}
          <nav>
            <h6 className="footer-title text-lg font-bold text-white">
              Our Services
            </h6>
            <p className="text-red-200">Emergency Blood Search</p>
            <p className="text-red-200">Donor Registration</p>
            <p className="text-red-200">Blood Request Tracking</p>
            <p className="text-red-200">Hospital Support</p>
          </nav>

          {/* Contact */}
          <nav>
            <h6 className="footer-title text-lg font-bold text-white">
              Contact Us
            </h6>

            <div className="flex gap-2 items-start text-red-200">
              <IoLocationOutline className="text-lg text-white" />
              <p>
                123 Blood Care Street <br /> Badda, Dhaka
              </p>
            </div>

            <div className="flex gap-2 text-red-200">
              <MdOutlinePhone className="text-lg text-white" />
              <p>+880 1774 571133</p>
            </div>

            <div className="flex gap-2 text-red-200">
              <MdOutlineEmail className="text-lg text-white" />
              <p>support@redlove.org</p>
            </div>
          </nav>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="border-t border-red-500 py-5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between text-center text-red-200 gap-3">
          <p>© 2025 Red Love. All rights reserved.</p>
          <div className="flex gap-4 justify-center">
            <a className="hover:text-white" href="#">Privacy Policy</a>
            <a className="hover:text-white" href="#">Terms of Service</a>
            <a className="hover:text-white" href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
