import React from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/logo.png";
import Qrcode from "../../assets/Qrcode.png";

const Footer = () => {
  return (
    <div className="relative px-4 py-8">
      {/* Blue border at the top of the footer */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-16"
        style={{
          background:
            "linear-gradient(to right, #4EABD9, #53AFE7, transparent)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      ></motion.div>

      {/* Top Footer */}
      <div className="flex flex-col gap-10 xl:gap-0 xl:flex-row xl:items-start py-24 mt-16">
        {/* First Section */}
        <motion.div
          className="flex flex-col gap-4 xl:w-2/6 pl-6 xl:pl-9"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img src={Logo} alt="logo" width={290} height={100} />
        </motion.div>

        {/* Second Section */}
        <motion.div
          className="flex flex-col xl:w-1/6 gap-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-blue-400 font-bold text-3xl">Navigations</h1>
          <ul className="text-lg text-gray-700 flex flex-col gap-4">
            <li>Home</li>
            <li>Services</li>
            <li>FAQ'S</li>
            <li>About us</li>
          </ul>
        </motion.div>

        {/* Third Section */}
        <motion.div
          className="flex flex-col xl:w-1/6 gap-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-blue-400 font-bold text-3xl">Services</h1>
          <ul className="text-lg text-gray-700 flex flex-col gap-4">
            <li>Self Assessment</li>
            <li>Location Suggestions</li>
            <li>Therapist Bot</li>
            <li>Track Progress</li>
            <li>Visual Representation</li>
          </ul>
        </motion.div>

        {/* Fourth Section */}
        <motion.div
          className="flex flex-col xl:w-1/6 gap-5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h1 className="text-blue-400 font-bold text-3xl">Helpline</h1>
          <ul className="text-gray-700 flex flex-col gap-4">
            <li>+92-308-2220203 (WhatsApp)</li>
            <h1 className="text-blue-400 font-bold text-3xl">QR Code</h1>
            <img src={Qrcode} alt="QR Code" width={100} height={100} className="rounded-lg shadow-md" />
          </ul>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <motion.div
        className="bottom-4 left-0 w-full bg-white border-t-2 border-gray-500/40 py-3 text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-lg text-center text-gray-600">
          © 2024 Base. All rights reserved
        </p>
      </motion.div>
    </div>
  );
};

export default Footer;
