// Header.js
import React, { useState, useEffect, useRef } from 'react';
import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link from React Router
import logo from '../assets/images/logo.svg'; 
import useAuthStore from '../store/authStore'; // Import the auth store
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const profileRef = useRef(null);
  const authStore = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    setIsAuthenticated(authStore);
    
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [authStore]);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    useAuthStore.getState().logout();
  };

  return (
    <div>
    <header className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo linked to the homepage */}
        <div className="flex items-center">
          <Link to="/">
            <img
              className="h-8 w-auto ml-4 sm:ml-8" // Adjusted left margin for mobile view
              src={logo} // Use the imported logo
              alt="Your Company"
            />
          </Link>
        </div>
        {/* Notification bell and Profile dropdown */}
        {isAuthenticated ? (
          <div className="flex items-center pr-6 sm:pr-10"> {/* Adjusted right padding for mobile view */}
            {/* Notification bell */}
            <button className="relative rounded-full bg-white border border-gray-300 p-1 text-gray-800 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent">
              <span className="sr-only">View notifications</span>
              <FiBell className="h-4 w-4" />
            </button>
            {/* Profile circle */}
            <div ref={profileRef} className="relative ml-2 sm:ml-3 pr-4 sm:pr-20 md:pr-4"> {/* Adjusted right padding for mobile view */}
              <button onClick={toggleProfileMenu} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </button>
              {/* Profile dropdown menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1">Settings</a>
                  <a href="" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" onClick={handleLogout}>Sign out</a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center pr-6 sm:pr-10"> {/* Adjusted right padding for mobile view */}
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" style={{ background: '#093D9F' }}>
                <FontAwesomeIcon icon={faSignInAlt} className="mr-1" /> {/* Adjust the margin as needed */}
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  </div>
);
}

export default Header;
