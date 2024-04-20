// Register.js
import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../../store/authStore';
import LoadingSpinner from '../../components/LoadingSpinner'; // Import the LoadingSpinner component
import { FaCircle } from 'react-icons/fa';

function Register({ title }) {
  useEffect(() => {
    document.title = `D-Blog - ${title}`;
  }, [title]);

  const { register } = useAuthStore();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State to track registration loading

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsRegistering(true); // Show loading spinner
    const userData = {
      full_name: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value
    };

    if (userData.password !== userData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsRegistering(false); // Hide loading spinner
      return;
    }

    try {
      const response = await register(userData);
      setRegistrationMessage(response.message);
      toast.success(response.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay redirecting to the login page
    } catch (error) {
      console.error('Error registering:', error);
      let errorMessage = 'An error occurred';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
        const errors = error.response.data.message.errors;
        if (errors.email) {
          errorMessage = errors.email[0];
        }
      }
      toast.error(errorMessage);
    } finally {
      setIsRegistering(false); // Hide loading spinner
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
        <Link to="/">
          <img className="mx-auto h-10 w-auto" src={logo} alt="Your Company" />
        </Link>
        <h2 className="mt-4 text-center text-4xl font-bold leading-10 tracking-tight text-gray-900 font-sora">
          Create an account
          <br />
          <span className="text-base text-gray-500 font-inter">Post, manage your blogs. Keep up with the audience.</span>
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleRegistration} className="space-y-6">
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900 font-sora">
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="fullname"
                required
                placeholder="Enter full name"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sora"
                style={{ height: '48px', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 font-sora">
              Email Address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter email address"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sora"
                style={{ height: '48px', outline: 'none' }}
              />
            </div>
          </div>

          <div className="relative mt-4">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 font-sora">
              Password
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="new-password"
                required
                placeholder="Enter password"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sora"
                style={{ height: '48px', outline: 'none' }}
              />
              <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center" style={{ top: '70%', transform: 'translateY(-50%)' }}>
                {passwordVisible ? (
                  <FiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="relative mt-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900 font-sora">
              Confirm Password
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                required
                placeholder="Confirm password"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sora"
                style={{ height: '48px', outline: 'none' }}
              />
              <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center" style={{ top: '70%', transform: 'translateY(-50%)' }}>
                {confirmPasswordVisible ? (
                  <FiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <FiEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#093D9F] px-24 py-4 text-lg font-semibold leading-6 text-white rounded-md shadow-sm hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-sora relative"
              style={{ height: '56px' }}
            >
              {isRegistering ? (
                <div className="flex items-center">
                  <LoadingSpinner />
                  <span className="ml-1">Processing...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 font-sora">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
