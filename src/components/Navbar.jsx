import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore'; // Import useAuthStore

function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [userName, setUserName] = useState('');
  const navbarRef = useRef(null);
  const { user, isAuthenticated } = useAuthStore(); // Destructure user and isAuthenticated from the store

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavbarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
      localStorage.setItem('userName', user.name);
    } else {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, [user]);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsNavbarOpen(false); // Close the navbar after selecting a tab (for mobile view)
  };

  return (
    <div className="py-3 mx-20 relative" ref={navbarRef}>
      <h2 className="mt-4 mb-4 text-4xl font-semibold text-gray-900 font-sora text-center">
        <Link to="/" style={{ fontFamily: 'Sora', fontSize: '40px', lineHeight: '50.4px', textAlign: 'center', textDecoration: 'none', color: '#111827' }}>
          {userName ? `${userName}'s` : "SLO"} Blog Space
        </Link>
      </h2>
      <nav className="border-t-2 border-b-2 border-gray-200 hidden md:block">
        <div className="flex justify-center items-center mt-4 mb-4"> 
          <Link to="/" className={`block text-gray-600 hover:text-gray-900 md:mr-4 relative ${activeTab === 'home' ? 'font-semibold text-blue-500' : ''}`} onClick={() => handleTabClick('home')}>
            Home
            {activeTab === 'home' && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 h-1 w-1 rounded-full"></span>}
          </Link>
          <Link to="/" className={`block text-gray-600 hover:text-gray-900 md:mr-4 relative ${activeTab === 'posts' ? 'font-semibold text-blue-500' : ''}`} onClick={() => handleTabClick('posts')}>
            Posts
            {activeTab === 'posts' && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 h-1 w-1 rounded-full"></span>}
          </Link>
          {isAuthenticated && (
            <>
              <a href="#" className={`block text-gray-600 hover:text-gray-900 md:mr-4 relative ${activeTab === 'subscribers' ? 'font-semibold text-blue-500' : ''}`} onClick={() => handleTabClick('subscribers')}>
                Subscribers
                {activeTab === 'subscribers' && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 h-1 w-1 rounded-full"></span>}
              </a>
              <a href="#" className={`block text-gray-600 hover:text-gray-900 md:mr-4 relative ${activeTab === 'statistics' ? 'font-semibold text-blue-500' : ''}`} onClick={() => handleTabClick('statistics')}>
                Statistics
                {activeTab === 'statistics' && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 h-1 w-1 rounded-full"></span>}
              </a>
              <a href="#" className={`block text-gray-600 hover:text-gray-900 relative ${activeTab === 'settings' ? 'font-semibold text-blue-500' : ''}`} onClick={() => handleTabClick('settings')}>
                Settings
                {activeTab === 'settings' && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 h-1 w-1 rounded-full"></span>}
              </a>
            </>
          )}
        </div>
      </nav>
      <nav className={`border-t-2 border-b-2 border-gray-200 ${isNavbarOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="flex flex-col justify-center items-center mt-4 mb-4"> 
          <Link to="/" className="block text-gray-600 hover:text-gray-900 mb-4">Home</Link>
          <Link to="/" className="block text-gray-600 hover:text-gray-900 mb-4">Posts</Link>
          {isAuthenticated && (
            <>
              <a href="#" className="block text-gray-600 hover:text-gray-900 mb-4">Subscribers</a>
              <a href="#" className="block text-gray-600 hover:text-gray-900 mb-4">Statistics</a>
              <a href="#" className="block text-gray-600 hover:text-gray-900 mb-4">Settings</a>
            </>
          )}
        </div>
      </nav>
      <button onClick={toggleNavbar} className="absolute top-0 right-0 mr-4 mt-4 md:hidden">
        {isNavbarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
    </div>
  );
}

export default Navbar;
