import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye and eye-off icons from react-icons
import logo from '../../images/logo.svg'; // Import the logo from the assets folder
import { FaCircle } from 'react-icons/fa'; // Import bullet icon from react-icons
import { Link } from 'react-router-dom'; 

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
          Create an account
          <br />
          <span className="text-base text-gray-500 font-inter">Post, manage your blogs. Keep up with audience.</span> {/* Updated text */}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm"> {/* Adjusted margin top */}
        <form className="space-y-6" action="#" method="POST">
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
                style={{ height: '48px', outline: 'none' }} // Set the height and remove outline
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
                autoComplete="new-password"
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
                style={{ height: '48px', outline: 'none' }} // Set the height and remove outline
              />
              <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center" style={{ top: '70%', transform: 'translateY(-50%)' }}>
                {confirmPasswordVisible ? (
                  // Password visibility toggle icon when password is visible
                  <FiEyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  // Password visibility toggle icon when password is hidden
                  <FiEye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 text-gray-900 font-sora">
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm password"
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-sora"
              style={{ height: '48px', outline: 'none' }} // Set the height and remove outline
            />
     
     <ul className="text-xs text-gray-500 mt-2 flex flex-wrap">
  <li className="flex items-center mb-2" style={{ marginLeft: '0px' }}> {/* Adjusted marginLeft */}
    <FaCircle className="mr-3 text-gray-500 border border-gray-500 rounded-full" style={{ fill: 'white' }} /> At least 8 characters
  </li>
  <li className="flex items-center mb-2" style={{ marginLeft: '0px' }}> {/* Adjusted marginLeft */}
    <FaCircle className="ml-24 mr-2 text-gray-500 border border-gray-500 rounded-full" style={{ fill: 'white' }} />  Lowercase and Uppercase
  </li>
  <li className="flex items-center mb-2" style={{ marginLeft: '0px' }}> {/* Adjusted marginLeft */}
    <FaCircle className="mr-3 text-gray-500 border border-gray-500 rounded-full" style={{ fill: 'white' }} /> At least One special character
  </li>
  <li className="flex items-center mb-2" style={{ marginLeft: '0px' }}> {/* Adjusted marginLeft */}
    <FaCircle className="ml-12 mr-2 text-gray-500 border border-gray-500 rounded-full" style={{ fill: 'white' }} /> At least one number
  </li>
</ul> </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#093D9F] px-24 py-4 text-lg font-semibold leading-6 text-white rounded-md shadow-sm hover:bg-[#111827] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-sora"
              style={{ height: '56px' }} // Set the height of the button
            >
              Create Account
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
