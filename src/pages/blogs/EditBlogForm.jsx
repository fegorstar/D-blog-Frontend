import React, { useState, useEffect, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useParams, Navigate } from 'react-router-dom';
import useBlogStore from '../../store/blogStore';
import useAuthStore from '../../store/authStore';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast, ToastContainer } from 'react-toastify'; // Import the toast module and ToastContainer
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill's snow theme CSS

function EditBlogForm({ title }) {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState({
    title: '',
    description: '',
    content: '',
    img_url: null,
    img_preview_url: null // Add img_preview_url to store the preview image URL
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // State to track update process
  const blogStore = useBlogStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = `D-Blog - ${title}`;
    if (isAuthenticated) {
      blogStore.fetchPost(postId)
        .then(response => {
          setPostDetails({
            ...response.data,
            img_preview_url: null // Set img_preview_url to null when component first loads
          });
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching post details:', error);
          setIsLoading(false);
        });
    }
  }, [postId, title, blogStore, isAuthenticated]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        throw new Error('Unauthenticated');
      }
  
      // Confirm before updating
      const confirmed = window.confirm('Are you sure you want to update this post?');
      if (!confirmed) return;
  
      setIsUpdating(true); // Start updating process
  
      const formData = new FormData();
      formData.append('title', postDetails.title);
      formData.append('description', postDetails.description);
      formData.append('content', postDetails.content);
      
      // If a new image is uploaded, use it; otherwise, use the server image
      if (postDetails.img_url instanceof File) {
        formData.append('img_url', postDetails.img_url);
      } else {
        // Use the server image URL
        formData.append('img_url', postDetails.img_url);
      }
  
      await blogStore.updatePost(postId, formData, useAuthStore.getState().user.token);
      
      // Display toast notification on successful update
      toast.success('Post updated successfully!');
  
      setIsUpdating(false); // Finish updating process
    } catch (error) {
      console.error('Error updating post:', error);
      let errorMessage = 'An error occurred';
      if (error.message === 'Unauthenticated') {
        errorMessage = 'User is not authenticated';
      }
      alert(errorMessage);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    
    // Update the postDetails state with the new image file and its preview URL
    setPostDetails(prevState => ({
      ...prevState,
      img_url: file,
      img_preview_url: imageUrl
    }));
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="py-3 mx-4 md:mx-20 overflow-x-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to="/">
              <FiArrowLeft className="text-gray-600 mr-2 text-lg font-bold" />
            </Link>
            <span className="text-gray-600 mr-2">Draft</span>
          </div>
        </div>
      
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="mb-4 mt-10 text-center flex justify-center">
              <div className="relative bg-gray-200 w-full max-w-4xl mx-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="absolute h-full w-full opacity-0"
                />
                <div className="min-w-0 w-full h-40 rounded-md overflow-hidden">
                  <img id="headerImage" src={postDetails.img_preview_url ? postDetails.img_preview_url : `https://Activeapis.site${postDetails.img_url}`} alt="Header" className="w-full h-auto rounded-md object-cover" />
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Upload New Image
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4 mx-auto max-w-4xl">
              <input type="text" id="subtitle" className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-sora font-bold text-4xl text-gray-900" placeholder="Title" value={postDetails?.title || ''} onChange={(e) => setPostDetails(prevState => ({ ...prevState, title: e.target.value }))} />
            </div>
            <div className="mb-4 mx-auto max-w-4xl">
              <input type="text" id="subtitle" className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-inter text-base text-gray-900" placeholder="Subtitle" value={postDetails?.description || ''} onChange={(e) => setPostDetails(prevState => ({ ...prevState, description: e.target.value }))} />
            </div>
            <div className="mb-4 mx-auto max-w-4xl relative">
            <ReactQuill 
  style={{ height: '200px' }} // Adjust the height as needed
  value={postDetails?.content || ''}
  onChange={(content) => setPostDetails(prevState => ({ ...prevState, content }))}
/>
             
            </div>
            <div className="mb-4  pt-16 mx-auto max-w-4xl">
              <button
                type="submit"
                onClick={handleUpdatePost}
                disabled={!postDetails.title || !postDetails.description || !postDetails.content}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${(!postDetails.title || !postDetails.description || !postDetails.content) && 'opacity-50 cursor-not-allowed'}`}
                style={{ background: '#093D9F', borderRadius: '8px', fontFamily: 'Sora', fontSize: '14px', fontWeight: '600', lineHeight: '24.3px', textAlign: 'center' }}
              >
                {isUpdating ? (
                  <div className="flex items-center">
                    <LoadingSpinner />
                    <span className="ml-1">Updating...</span>
                  </div>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default EditBlogForm;
