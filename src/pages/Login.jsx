import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email) return toast.warning("Please enter email");
    if (!password) return toast.warning("Please enter password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return toast.warning("Please enter a valid email.");

    try {
      const response = await axios.post(`${apiUrl}/api/user/login`, { email, password });

      if (response.status === 200) {
        const data = response.data;
        login(data.token, data.user_.role, data.user_.fullName);

        if (data.user_.role === "1") {
          navigate("/dashboard/admin");
        } else if (data.user_.role === "2") {
          navigate("/dashboard/teamlead");
        }

        toast.success("Login successful");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 rounded-6xl shadow-md">
      <div
        className="bg-white rounded-lg shadow-lg flex overflow-hidden"
        style={{ width: "400px" }}
      >
        <div className="w-full  p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter your details to log in to your account.
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex space-x-4"></div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                ref={emailRef}
                id="email"
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="m@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                id="password"
                type="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md shadow-md transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
