import React, { useEffect, useState, useRef } from 'react';
import { FiArrowLeft, FiImage } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useBlogStore from '../../store/blogStore';
import useAuthStore from '../../store/authStore'; // Update the import statement
import LoadingSpinner from '../../components/LoadingSpinner';
import ReactQuill from 'react-quill'; // Import ReactQuill

import 'react-quill/dist/quill.snow.css'; // Import Quill styles

function NewPostForm({ title }) {
  useEffect(() => {
    document.title = `D-Blog - ${title}`;
    titleInputRef.current.focus(); // Focus on the title input field when the page loads
  }, [title]);

  const navigate = useNavigate();
  const titleInputRef = useRef(null); // Create a ref for the title input field
  const [isPublishing, setIsPublishing] = useState(false);
  const [postData, setPostData] = useState({
    img_url: null,
    title: '',
    description: '',
    content: '',
    isPublished: false,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const authStore = useAuthStore(); // Initialize the authStore
  const blogStore = useBlogStore(); // Initialize the blogStore

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostData((prevState) => ({
        ...prevState,
        img_url: file,
      }));

      // Display image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
  
    try {
      // Check if the user is authenticated
      if (!authStore.isAuthenticated) {
        throw new Error('Unauthenticated');
      }
  
      const formData = new FormData();
      // Add image only if it's present
      if (postData.img_url) {
        formData.append('img_url', postData.img_url);
      }
      formData.append('title', postData.title);
      formData.append('description', postData.description);
      formData.append('content', postData.content);

      const response = await blogStore.createPost(formData, authStore.user.token); // Use blogStore.createPost
      toast.success(response.message);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (error) {
      console.error('Error creating post:', error);
      let errorMessage = 'An error occurred';
      if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
        const errorMessages = error.response.data.message.errors.title || [];
        errorMessage = errorMessages.join(' ');
      } else if (error.message === 'Unauthenticated') {
        errorMessage = 'User is not authenticated';
      }
      toast.error(errorMessage);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="py-3 mx-4 md:mx-20 overflow-x-hidden"> {/* Hide horizontal overflow */}
      <ToastContainer /> {/* Toast container for displaying notifications */}
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* Use Link for the arrow icon */}
          <Link to="/">
            <FiArrowLeft className="text-gray-600 mr-2 text-lg font-bold" />
          </Link>
          <span className="text-gray-600 mr-2">Draft</span>
        </div>
        <div className="flex space-x-2">
          {/* Preview Button */}
          <button
            className="text-gray-600"
            style={{
              backgroundColor: '#E9EFF3', // Set background color
              borderRadius: '8px', // Set border radius
              padding: '8px 16px', // Adjust padding
              fontFamily: 'Sora', // Set font family
              fontSize: '14px', // Set font size
              fontWeight: '600', // Set font weight
              lineHeight: '24.3px', // Set line height
              textAlign: 'center', // Set text alignment
            }}
          >
            Preview
          </button>
          {/* Publish Button */}
          <button
            type="submit"
            onClick={handlePublish}
            disabled={!postData.title || !postData.description || !postData.content}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md ${(!postData.title || !postData.description || !postData.content) && 'opacity-50 cursor-not-allowed'}`}
            style={{ background: '#093D9F', borderRadius: '8px', fontFamily: 'Sora', fontSize: '14px', fontWeight: '600', lineHeight: '24.3px', textAlign: 'center' }}
          >
            {isPublishing ? (
              <div className="flex items-center">
                <LoadingSpinner />
                <span className="ml-1">Saving...</span>
              </div>
            ) : (
              'Create Post'
            )}
          </button>
        </div>
      </div>
      {/* Form */}
      <form encType="multipart/form-data">
        {/* Header Image Selector */}
        <div className="mb-4 mt-10 text-center flex justify-center">
          <div className="relative bg-gray-200 w-full max-w-4xl mx-auto">
            <input
              type="file"
              id="headerImage"
              onChange={handleFileChange}
              className="absolute h-full w-full opacity-0"
            />
            <div className="min-w-0 w-full h-40 rounded-md flex flex-col items-center justify-center p-4">
              {imagePreview ? (
                <img src={imagePreview} alt="Header" className="h-full w-full object-cover rounded-md" />
              ) : (
                <React.Fragment>
                  <FiImage className="text-gray-400 h-8 w-8 mb-2" />
                  <label htmlFor="headerImage" className="text-gray-600 font-semibold block">Add Header Image</label>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        {/* Title Input */}
        <div className="mb-4 mx-auto max-w-4xl">
          <input
            type="text"
            id="title"
            ref={titleInputRef} // Set the ref for the title input field
            className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-sora font-bold text-4xl text-gray-900"
            placeholder="Title"
            onChange={(e) => {
              setPostData((prevState) => ({
                ...prevState,
                title: e.target.value,
              }));
            }}
          />
        </div>
        {/* Subtitle Input */}
        <div className="mb-4 mx-auto max-w-4xl">
          <input
            type="text"
            id="description"
            className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-inter text-base text-gray-900"
            placeholder="Subtitle"
            onChange={(e) => {
              setPostData((prevState) => ({
                ...prevState,
                description: e.target.value,
              }));
            }}
          />
        </div>
        {/* Description Input using ReactQuill */}
        <div className="mb-4 mx-auto max-w-4xl" style={{ overflow: 'hidden' }}>
          <ReactQuill
            value={postData.content}
            onChange={(content) => setPostData((prevState) => ({ ...prevState, content }))}
            className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-inter text-base text-gray-900"
            placeholder="Description"
            style={{ height: '300px', overflow: 'hidden' }} // Set the height of the editor and prevent overflow
          />
        </div>
      </form>
    </div>
  );
}

export default NewPostForm;
