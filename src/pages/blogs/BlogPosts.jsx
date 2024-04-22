import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiFilter, FiChevronDown, FiShare2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore'; 
import useBlogStore from '../../store/blogStore';
import LoadingSpinner from '../../components/LoadingSpinner';
import logo from '../../assets/images/logo.svg'; 


function BlogPosts({ title }) {
  useEffect(() => {
    document.title = `D-Blog - ${title}`;
  }, [title]);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated); 
  const [activeTab, setActiveTab] = useState('published');
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [draftPosts, setDraftPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Newest');
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const filterDropdownRef = useRef(null);



  const handleDeleteConfirmation = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      try {
        await useBlogStore.getState().deletePost(postId);
        // Remove the deleted post from the state
        setPublishedPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
        setDraftPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
    // Close the dropdown after delete
    setOpenDropdownIndex(null);
  };


  const handleUnpublishConfirmation = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to unpublish this post?');
    if (confirmed) {
      try {
        await useBlogStore.getState().unpublishPost(postId);
        // Refresh the posts after unpublishing
        setPublishedPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
        setDraftPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
      } catch (error) {
        console.error('Error unpublishing post:', error);
      }
    }
  };

  const handlePublishConfirmation = async (postId) => {
    const confirmed = window.confirm('Are you sure you want to publish this post?');
    if (confirmed) {
      try {
        await useBlogStore.getState().publishPost(postId);
        // Refresh the posts after publishing
        setPublishedPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
        setDraftPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
        window.location.reload();
      } catch (error) {
        console.error('Error publishing post:', error);
      }
    }
  };
  


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

 // Inside your functional component
useEffect(() => {
  const handleClickOutside = (event) => {
    if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
      setIsFilterDropdownOpen(false);
      setOpenDropdownIndex(null); // Close the edit/delete dropdown as well
    }
  };
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [setIsFilterDropdownOpen, setOpenDropdownIndex]); 



  useEffect(() => {
    const fetchPublishedPosts = async () => {
      setLoading(true);
      let posts = [];
      if (isAuthenticated) {
        posts = await useBlogStore.getState().fetchUserPosts();
      } else {
        posts = await useBlogStore.getState().fetchAllPosts();
      }
      const publishedPosts = posts.filter(post => post.isPublished === "1");
      setPublishedPosts(publishedPosts);
      setLoading(false);
    };
  
    fetchPublishedPosts();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchDraftPosts = async () => {
      setLoading(true);
      let posts = [];
      if (isAuthenticated) {
        posts = await useBlogStore.getState().fetchUserPosts();
      } else {
        posts = await useBlogStore.getState().fetchAllPosts();
      }
      const draftPosts = posts.filter(post => post.isPublished === "0");
      setDraftPosts(draftPosts);
      setLoading(false);
    };
  
    fetchDraftPosts();
  }, [isAuthenticated]);

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Apply filter logic here if needed
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = publishedPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDrafts = draftPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000); // Convert milliseconds to seconds
    const diffMinutes = Math.floor(diffSeconds / 60); // Convert seconds to minutes
    const diffHours = Math.floor(diffMinutes / 60); // Convert minutes to hours
    const diffDays = Math.floor(diffHours / 24); // Convert hours to days
  
    if (diffSeconds < 60) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  };


  const calculateReadTime = (content) => {
    const wordsPerMinute = 200; // Average case.
    const textLength = content.split(' ').length;
    return Math.ceil(textLength / wordsPerMinute);
  };

  
  return (
    <div className="py-3 mx-4 md:mx-20">
    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <h2 className="text-xl font-semibold mb-2 md:mb-0" style={{ fontFamily: 'Sora', fontSize: '24px', fontWeight: '600', lineHeight: '32px', textAlign: 'left' }}>
        {isAuthenticated ? 'Your Posts' : 'All Posts'}
      </h2>
      {isAuthenticated && (
        <Link to="/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" style={{ background: '#093D9F' }}>
            Create New Post
          </button>
        </Link>
      )}
    </div>
  
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex flex-wrap justify-center md:justify-start">
          {isAuthenticated && (
            <>
             <button
    className={`relative ${activeTab === 'published' ? 'text-blue-900' : 'text-blue-900'} mr-4 mb-2 md:mb-0`}
    onClick={() => handleTabClick('published')}
  >
    <span className={`font-semibold ${activeTab === 'published' ? 'text-blue-900' : 'text-blue-900'}`}>Published</span> <span className={`text-xs ml-1 ${activeTab === 'published' ? 'text-blue-900' : 'text-gray-500'}`}>({publishedPosts.length})</span>
    {activeTab === 'published' && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-900 h-1 w-1 rounded-full"></span>}
  </button>
  <button
    className={`relative ${activeTab === 'draft' ? 'text-blue-900' : 'text-blue-900'} mr-4 mb-2 md:mb-0`}
    onClick={() => handleTabClick('draft')}
  >
    <span className={`font-semibold ${activeTab === 'draft' ? 'text-blue-900' : 'text-blue-900'}`}>Drafts</span> <span className={`text-xs ml-1 ${activeTab === 'draft' ? 'text-blue-900' : 'text-gray-500'}`}>({draftPosts.length})</span>
    {activeTab === 'draft' && <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-900 h-1 w-1 rounded-full"></span>}
  </button>
            </>
          )}
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
              value={searchQuery}
              onChange={handleSearchInputChange}
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
      <div>
        {/* Published Posts section */}
   {/* Published Posts section */}
{activeTab === 'published' && (
  <div>
    {/* Content for published posts */}
    {loading ? (
      <div className="flex items-center justify-center my-8">
        <LoadingSpinner />
      </div>
    ) : (
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={index} className="mb-6 md:mb-4">
              <div className="border-t border-b my-2"></div>
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-4">
              <div className="flex items-center mb-4 md:mb-0">
              <Link to={`/blog/${post.post_id}`}>
  {post.img_url ? (
    <img 
      src={`https://Activeapis.site${post.img_url}`} 
      alt="Post Thumbnail" 
      className="w-20 h-20 md:mr-4 md:mb-0 mb-4 rounded-md object-cover" 
    />
  ) : (
    <img 
    src={logo}  // Provide the URL to your default image here
      alt="Default Post Thumbnail" 
      className="w-20 h-20 md:mr-4 md:mb-0 mb-4 rounded-md object-cover" 
    />
  )}
</Link>
<div className="ml-8 md:ml-0">
  <Link to={`/blog/${post.post_id}`} className="flex items-center">
    <div>
      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{post.description}</p>
      <div className="flex items-center"> {/* Wrap in a flex container */}
        <p className="text-sm text-gray-600 mb-0">
          {formatDate(post.created_at)} . {calculateReadTime(post.description)} min read
        </p>
        <FiShare2 className="text-gray-600 ml-2" /> 
            </div>
            <p className="font-semibold text-sm text-gray-500 pt-1">posted by {post.author}</p> {/* Add margin to the author text */}
  
    </div>
  </Link>
</div>



                </div>
                <div className="flex items-center">
                  <div className="text-sm pt-6 text-gray-600 mr-6 md:mr-14">
                    <span className="font-bold text-lg ml-2">{14}</span>
                    <br />
                    <span>Opened</span>
                  </div>
                  <div className="text-sm pt-6 text-gray-600 mr-6 md:mr-14">
                    <span className="font-bold text-lg ml-2">{10}</span>
                    <br />
                    <span>Reads</span>
                  </div>
                  <div className="text-sm pt-6 text-gray-600 mr-6 md:mr-14">
                    <span className="font-bold text-lg ml-2">{2}</span>
                    <br />
                    <span>New Subs</span>
                  </div>
                  {isAuthenticated && (
                    <button className="text-gray-600 font-semibold" onClick={() => handleDropdownToggle(index)}>
                      ...
                    </button>
                  )}
                  {openDropdownIndex === index && (
                    <div ref={filterDropdownRef} className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {isAuthenticated && (
                        <ul className="py-1">
                         <li className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">
  <button onClick={() => handleUnpublishConfirmation(post.post_id)} className="text-blue-500 hover:text-blue-700">
    Unpublish
  </button>
</li>
                          <li className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">
                            <Link to={`/edit/${post.post_id}`} className="text-blue-500 hover:text-blue-700">
                              Edit
                            </Link>
                          </li>
                          <li className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">
                            <span className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => handleDeleteConfirmation(post.post_id)}>Delete</span>
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 my-1">
            No Post available
          </div>
        )}
      </div>
    )}
  </div>
)}

{/* Draft Posts section */}
{activeTab === 'draft' && (
  <div>
    {/* Content for draft posts */}
    {loading ? (
      <div className="flex items-center justify-center my-8">
        <LoadingSpinner />
      </div>
    ) : (
      <div>
        {filteredDrafts.length === 0 ? (
          <div className="text-center my-4">No draft posts exist</div>
        ) : (
          filteredDrafts.map((post, index) => (
            <div key={index} className="mb-6 md:mb-4">
              <div className="border-t border-b my-2"></div>
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-4">
  <div className="flex items-center mb-4 md:mb-0">
  <Link to={`/blog/${post.post_id}`}>
  {post.img_url ? (
    <img 
      src={`https://Activeapis.site${post.img_url}`} 
      alt="Post Thumbnail" 
      className="w-20 h-20 md:mr-4 md:mb-0 mb-4 rounded-md object-cover" 
    />
  ) : (
    <img 
    src={logo}  // Provide the URL to your default image here
      alt="Default Post Thumbnail" 
      className="w-20 h-20 md:mr-4 md:mb-0 mb-4 rounded-md object-cover" 
    />
  )}
</Link>
   
<div className="ml-8 md:ml-0">
  <Link to={`/blog/${post.post_id}`} className="flex items-center">
    <div>
      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      <p className="text-sm text-gray-600 mb-1">{post.description}</p>
      <div className="flex items-center"> {/* Wrap in a flex container */}
        <p className="text-sm text-gray-600 mb-0">
          {formatDate(post.created_at)} . {calculateReadTime(post.description)} min read
        </p>
        <FiShare2 className="text-gray-600 ml-2" /> 
            </div>
            <p className="font-semibold text-sm text-gray-500 pt-1">posted by {post.author}</p> {/* Add margin to the author text */}
  
    </div>
  </Link>
</div>
</div>


                <div className="flex items-center">
                  <div className="text-sm pt-6 text-gray-600 mr-6 md:mr-14">
                    <span className="font-bold text-lg ml-2">{14}</span>
                    <br />
                    <span>Opened</span>
                  </div>
                  <div className="text-sm pt-6 text-gray-600 mr-6 md:mr-14">
                    <span className="font-bold text-lg ml-2">{10}</span>
                    <br />
                    <span>Reads</span>
                  </div>
                  <div className="text-sm pt-6 text-gray-600 mr-6 md:mr-14">
                    <span className="font-bold text-lg ml-2">{2}</span>
                    <br />
                    <span>New Subs</span>
                  </div>
                  {isAuthenticated && (
                    <button className="text-gray-600 font-semibold" onClick={() => handleDropdownToggle(index)}>
                      ...
                    </button>
                  )}
                  {openDropdownIndex === index && (
                    <div ref={filterDropdownRef} className="absolute right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {isAuthenticated && (
                        <ul className="py-1">
                          <li className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">
                            <button onClick={() => handlePublishConfirmation(post.post_id)} className="text-blue-500 hover:text-blue-700">
                              Publish
                            </button>
                          </li>
                          <li className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">
                            <Link to={`/edit/${post.post_id}`} className="text-blue-500 hover:text-blue-700">
                              Edit
                            </Link>
                          </li>
                          <li className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100">
                            <span className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => handleDeleteConfirmation(post.post_id)}>Delete</span>
                          </li>
                        </ul>
                    
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="border-t border-b my-4"></div>
    </div>
  );
}

export default BlogPosts;
