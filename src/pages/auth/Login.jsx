import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye and eye-off icons from react-icons
import logo from '../../images/logo.svg'; // Import the logo from the assets folder
import { Link } from 'react-router-dom'; 

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4"> {/* Reduced margin top */}
        <img
          className="mx-auto h-10 w-auto"
          src={logo} // Use the imported logo
          alt="Your Company"
        />
        <h2 className="mt-4 text-center text-4xl font-bold leading-10 tracking-tight text-gray-900 font-sora"> {/* Updated font size and styles */}
          Welcome Back
          <br />
          <span className="text-base text-gray-500 font-inter">Please enter your details</span> {/* Removed font-weight */}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm"> {/* Adjusted margin top */}
        <form className="space-y-6" action="#" method="POST">
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
                placeholder="Enter email address"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sora"
                style={{ height: '48px', outline: 'none' }} // Set the height and remove outline
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
                autoComplete="current-password"
                required
                placeholder="Enter password"
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sora"
                style={{ height: '48px', outline: 'none' }} // Set the height and remove outline
              />
              <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center" style={{ top: '70%', transform: 'translateY(-50%)' }}>
                {passwordVisible ? (
                  // Password visibility toggle icon when password is visible
                  <FiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  // Password visibility toggle icon when password is hidden
                  <FiEye className="h-5 w-5 text-gray-400" />
                )}
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
              className="w-full bg-[#093D9F] px-24 py-4 text-lg font-semibold leading-6 text-white rounded-md shadow-sm hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-sora"
              style={{ height: '56px' }} // Set the height of the button
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 font-sora">
  Don't have an account?{' '}
  <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Create account</Link>
</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
