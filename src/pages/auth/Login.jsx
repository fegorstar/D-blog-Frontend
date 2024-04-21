// Login.js
import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from '../../store/authStore';
import LoadingSpinner from '../../components/LoadingSpinner'; // Import the LoadingSpinner component

function Login({ title }) {
  useEffect(() => {
    document.title = `D-Blog - ${title}`;
  }, [title]);

  const { login } = useAuthStore();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner
    try {
      const { token, message: successMessage } = await login({ email, password }); // Pass email and password
      console.log('Received token:', token); // Add this line
      localStorage.setItem('authToken', token);
      const name = localStorage.getItem('userName');
      localStorage.setItem('userName', name); // Save user name in localStorage
      if (successMessage) {
        toast.success(successMessage);
      } else {
        toast.success('Login successful');
      }
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      let errorMessage = 'An error occurred';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // Hide loading spinner
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
          Welcome Back
          <br />
          <span className="text-base text-gray-500 font-inter">Please enter your details</span>
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 font-sora">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type={passwordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sora"
                style={{ height: '48px', outline: 'none' }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                style={{ top: '70%', transform: 'translateY(-50%)' }}
              >
                {passwordVisible ? <FiEyeOff className="h-5 w-5 text-gray-400" /> : <FiEye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 font-sora">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>

          <div>
          <button
    type="submit"
    className="w-full bg-[#093D9F] px-24 py-4 text-lg font-semibold leading-6 text-white rounded-md shadow-sm hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-sora relative"
    style={{ height: '56px' }}
  >
    <div className="flex items-center justify-center">
      {isLoading && <LoadingSpinner />}
      {isLoading ? (
        <span className="ml-1">Loading...</span>
      ) : (
        'Login'
      )}
    </div>
  </button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 font-sora">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
