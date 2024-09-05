import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BgImage from '../../assets/bg6.jpg';

const AdminLogin = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/Adminlogin', values);
      if (response.data.isAdmin) {
        alert('User Successfully Logged In');
        navigate('/admin-panel');
      } else {
        setErrorText('Access denied. Only admins can log in.');
      }
    } catch (err) {
      setErrorText('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center "style={{ backgroundImage: `url(${BgImage})` }}>
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded">
        <h2 className="text-3xl font-bold text-center text-blue-600">Admin Login</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={values.username}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleInput}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          {errorText && <div className="text-red-500 text-sm">{errorText}</div>}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
