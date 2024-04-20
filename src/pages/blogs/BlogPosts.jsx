import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiFilter, FiChevronDown, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link from React Router
import useBlogStore from '../../store/blogStore'; // Import your store
import useAuthStore from '../../store/authStore'; // Import the auth store

function BlogPosts({ title }) {
  const [posts, setPosts] = useState([]); // State to store fetched posts
  const { fetchPosts } = useBlogStore(); // Use your custom hook to fetch posts
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    document.title = `D-Blog - ${title}`;

    // Fetch posts when the component mounts
    fetchPosts()
      .then((data) => {
        setPosts(data); // Update component state with fetched posts
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [title, fetchPosts]);

  const [activeTab, setActiveTab] = useState('published'); // State to track active tab
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false); // State to track filter dropdown visibility
  const [selectedFilter, setSelectedFilter] = useState('Oldest'); // State to track selected filter option
  const [isActionDropdownOpen, setIsActionDropdownOpen] = useState(false); // State to track action dropdown visibility
  const filterDropdownRef = useRef(null); // Ref for filter dropdown
  const actionDropdownRef = useRef(null); // Ref for action dropdown

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Hide filter dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
      if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target)) {
        setIsActionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (option) => {
    setSelectedFilter(option);
    setIsFilterDropdownOpen(false); // Close the filter dropdown after selecting an option
  };

  const handleActionDropdownToggle = () => {
    setIsActionDropdownOpen(!isActionDropdownOpen);
  };

  return (
    <div className="py-3 mx-4 md:mx-20">
      {/* Your Posts section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 md:mb-0" style={{ fontFamily: 'Sora', fontSize: '24px', fontWeight: '600', lineHeight: '32px', textAlign: 'left' }}>{isAuthenticated ? 'Your Posts' : 'Posts'}</h2>
        {/* Link to the new post form */}
        {isAuthenticated && (
          <Link to="/add">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" style={{ background: '#093D9F' }}>
              Create New Post
            </button>
          </Link>
        )}
      </div>
      {/* Tabs section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex flex-wrap justify-center md:justify-start">
          {/* Render tabs based on the fetched posts */}
          {posts.map((post) => (
            <button
              key={post.id}
              className={`relative text-gray-600 mr-4 mb-2 md:mb-0 ${activeTab === post.status ? 'font-semibold text-blue-500' : 'text-blue-900'}`}
              onClick={() => handleTabClick(post.status)}
            >
              {post.status} <span className="text-xs ml-1">({post.count})</span>
              {activeTab === post.status && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 h-1 w-1 rounded-full"></span>}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center">
          <div className="relative flex items-center h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-gray-300">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <FiSearch />
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 pl-1"
              type="text"
              id="search"
              placeholder="Search"
              style={{ fontFamily: 'Sora', fontSize: '14px', fontWeight: '400', lineHeight: '20px', textAlign: 'left' }}
            />
            <FiSearch className="absolute right-0 mr-2 text-gray-400" />
          </div>
          <FiFilter className="text-gray-600 ml-4" />
          <span className="ml-2 text-gray-600">Filter: </span>
          <div className="relative ml-1">
            <button
              className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            >
              {selectedFilter}
              <FiChevronDown className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" />
            </button>
            {isFilterDropdownOpen && (
              <div ref={filterDropdownRef} className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <ul className="py-1">
                  <li className={`text-gray-700 block px-4 py-2 text-sm w-full text-left ${selectedFilter === 'Oldest' ? 'bg-gray-100 text-gray-900' : ''}`} onClick={() => handleFilterChange('Oldest')}>
                    Oldest
                  </li>
                  <li className={`text-gray-700 block px-4 py-2 text-sm w-full text-left ${selectedFilter === 'Newest' ? 'bg-gray-100 text-gray-900' : ''}`} onClick={() => handleFilterChange('Newest')}>
                    Newest
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Blog posts content */}
      <div>
        {/* Render posts based on the selected tab */}
        {posts
          .filter((post) => post.status === activeTab)
          .map((post) => (
            <div key={post.id}>
              {/* Content for published posts */}
              {/* Post details  here*/}
              <div className="border-t border-b my-4"></div>
              <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                {/* Render post details based on the fetched data */}
              </div>
            </div>
          ))}
      </div>
      {/* Post details */}
      <div className="border-t border-b my-4"></div>
    </div>
  );
}

export default BlogPosts;
