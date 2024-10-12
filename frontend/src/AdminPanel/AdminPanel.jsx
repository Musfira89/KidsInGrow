import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddQuestion from './AddQuestion';
import AddActivities from './AddActivities';
import VerifyReport from './VerifyReport';
import BgImage1 from '../assets/bgp1.jpg';

const AdminPanel = () => {
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [showVerifyReport, setShowVerifyReport] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/auth/logout', {}, { withCredentials: true });
      console.log(response.data.message); // Handle success
      toast.success('Logged out successfully'); // Show success toast
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error logging out'); // Show error toast
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cover" style={{ backgroundImage: `url(${BgImage1})` }}>
      <header className="w-full py-4 bg-slate-200 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-8">
          <h1 className="text-4xl font-bold text-black">ADMIN DASHBOARD</h1>
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-row justify-center items-start space-x-40 space-y-44 mt-10">
        <div
          className={`transition-transform transform duration-300 ease-in-out ${
            showAddQuestionForm ? 'translate-y-[-100px]' : 'translate-y-0'
          }`}
        >
          <div className="p-10 mt-44 shadow-lg bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Add Question</h2>
            <button
              className="border-2 border-teal-800 text-white py-3 px-7 rounded-lg mt-5 text-lg hover:bg-teal-700 transition-colors duration-300"
              onClick={() => setShowAddQuestionForm(!showAddQuestionForm)}
            >
              {showAddQuestionForm ? 'Close Form' : 'Add Question'}
            </button>
          </div>
        </div>

        <div
          className={`transition-transform transform duration-300 ease-in-out ${
            showVerifyReport ? 'translate-y-[-100px]' : 'translate-y-0'
          }`}
        >
          <div className="p-10 shadow-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold mb-4">Verify Report</h2>
            <button
              className="border-2 border-purple-800 text-white py-3 px-7 rounded-lg mt-5 text-lg hover:bg-purple-700 transition-colors duration-300"
              onClick={() => setShowVerifyReport(!showVerifyReport)}
            >
              {showVerifyReport ? 'Hide Reports' : 'View Reports'}
            </button>
          </div>
        </div>

        <div className="p-10 h-[50%] shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-2xl font-semibold mb-4">Add Activities</h2>
          <AddActivities />
        </div>
      </div>

      {showAddQuestionForm && <AddQuestion />}
      {showVerifyReport && <VerifyReport />}
      <ToastContainer />
    </div>
  );
};

export default AdminPanel;
