import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { FaHome, FaChild, FaServicestack, FaQuestion, FaInfoCircle } from "react-icons/fa";
import { MdAdminPanelSettings, MdLogin } from "react-icons/md";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <div>
      {/* Top Bar */}
      <div className="bg-gray-100 text-center py-2 text-blue-900 font-semibold">
        Welcome to Markaz e Umeed! Explore our services and activities.
      </div>

      {/* Navbar */}
      <div className="container mx-auto flex items-center justify-between py-4 mb-9">
        <div className="flex items-center">
          <img src={Logo} alt="logo" width={100} height={60} className="mr-4" />
        </div>
        <nav className="bg-white border border-gray-200 rounded-full px-8 py-2 shadow-md">
          <ul className="flex items-center space-x-6">
            <li>
              <HashLink smooth to="#home" className="flex items-center text-blue-950 font-semibold text-lg hover:text-blue-700 transition">
                <FaHome className="mr-2" /> HOME
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#Activity" className="flex items-center text-blue-950 font-semibold text-lg hover:text-blue-700 transition">
                <FaChild className="mr-2" /> ACTIVITY
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#Services" className="flex items-center text-blue-950 font-semibold text-lg hover:text-blue-700 transition">
                <FaServicestack className="mr-2" /> SERVICES
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#faq" className="flex items-center text-blue-950 font-semibold text-lg hover:text-blue-700 transition">
                <FaQuestion className="mr-2" /> FAQ
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="#about" className="flex items-center text-blue-950 font-semibold text-lg hover:text-blue-700 transition">
                <FaInfoCircle className="mr-2" /> ABOUT US
              </HashLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/admin">
            <button className="flex items-center bg-gradient-to-r bg-blue-950 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition">
              <MdAdminPanelSettings className="mr-2" /> ADMIN
            </button>
          </Link>
          <Link to="/login">
            <button className="flex items-center bg-gradient-to-r from-orange-600 to-yellow-400 text-white py-2 px-6 rounded-full shadow-md hover:bg-orange-700 transition">
              <MdLogin className="mr-2" /> LOGIN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
