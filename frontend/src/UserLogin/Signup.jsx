import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { ValidationSchema } from "../Validations/validationSchema"; // Import Yup validation schema
import BgImage from "../assets/bg6.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          "http://localhost:8082/api/auth/signup",
          values
        );
        if (response.data) {
          toast.success("Registration successful!");
          navigate("/login");
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrors({ username: "Username already exists" });
        } else {
          setErrors({ general: "An error occurred, please try again later" });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div
        className="absolute inset-0 opacity-50 bg-cover bg-center"
        style={{ backgroundImage: `url(${BgImage})` }}
      ></div>
      <div className="flex justify-center items-center h-full">
        <div className="grid grid-cols-1 gap-0 max-w-lg w-full">
          <div className="flex flex-col justify-center items-center relative z-10 md:pb-20 pt-40">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-md rounded md:px-10 md:pt-10"
            >
              <h2 className="text-3xl font-bold mb-4 text-center text-blue-900 pb-15">
                SignUp
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-black-700 font-bold mb-2 text-sm"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formik.touched.username && formik.errors.username && (
                  <span className="text-red-500 text-xs p-1">
                    {formik.errors.username}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-black-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter your Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="shadow appearance-none border rounded w-[208%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <span className="text-red-500 text-xs p-1">
                      {formik.errors.password}
                    </span>
                  )}
                </div>
              </div>

              {formik.errors.general && (
                <div className="text-red-500 text-xs mb-4">
                  {formik.errors.general}
                </div>
              )}

              <div className="flex items-center justify-center md:mt-5">
                <button
                  className="hover:bg-blue-800 text-white md:w-[100%] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-gradient-to-bl from-cyan-400 to-blue-900"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  SignUp
                </button>
              </div>

              <div>
                <p className="text-center text-gray-600 md:pb-10">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-900 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
