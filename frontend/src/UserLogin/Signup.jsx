import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import BgImage from '../assets/bg6.jpg'

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = "Username is required";
    if (!values.password) errors.password = "Password is required";
    else if (values.password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8082/api/auth/signup', values);
        if (response.data) {
          alert('Registration successfull!'); // Show success message
          navigate('/login');
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrorText('Username already exists'); // Handle user exists error
        } else {
          setErrorText('username already exsist');
        }
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="absolute inset-0 opacity-50 bg-cover bg-center" style={{ backgroundImage: `url(${BgImage})` }}></div>
      <div className="flex justify-center items-center h-full">
        <div className="grid grid-cols-1 gap-0 max-w-lg w-full">
          <div className="flex flex-col justify-center items-center relative z-10 md:pb-20 pt-40">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded md:px-10 md:pt-10">
              <h2 className="text-3xl font-bold mb-4 text-center text-blue-900 pb-15">SignUp</h2>
              <div className="mb-4">
                <label htmlFor="username" className="block text-black-700 font-bold mb-2 text-sm">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your Username"
                  value={values.username}
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.username && <span className='text-red-500 text-xs p-1'>{errors.username}</span>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-black-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter your Password"
                    value={values.password}
                    onChange={handleInput}
                    className="shadow appearance-none border rounded w-[208%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.password && <span className='text-red-500 text-xs p-1'>{errors.password}</span>}
                </div>
              </div>
              {errorText && <div className="text-red-500 text-xs mb-4">{errorText}</div>}
              <div className="flex items-center justify-center md:mt-5">
                <button
                  className="hover:bg-blue-800 text-white md:w-[100%] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-bl from-cyan-400 to-blue-900"
                  type="submit"
                >
                  SignUp
                </button>
              </div>
              <div>
                <p className="text-center text-gray-600 md:pb-10">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-900 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Register;
