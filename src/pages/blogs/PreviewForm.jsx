import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useParams, Navigate } from 'react-router-dom';
import useBlogStore from '../../store/blogStore';
import useAuthStore from '../../store/authStore';

function PreviewForm({ title }) {
  const { postId } = useParams(); // Extract postId from URL params
  const [postDetails, setPostDetails] = useState(null); // Initialize postDetails as null
  const blogStore = useBlogStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    document.title = `D-Blog - ${title}`;
    if (isAuthenticated) {
      // Fetch post details using postId
      blogStore.fetchPost(postId)
        .then(response => {
          setPostDetails(response.data); // Update postDetails state with fetched data
        })
        .catch(error => {
          console.error('Error fetching post details:', error);
        });
    }
  }, [postId, title, blogStore, isAuthenticated]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        throw new Error('Unauthenticated');
      }
  
      const formData = new FormData();
      // Add updated image if it exists
      if (postDetails.img_url instanceof File) {
        formData.append('img_url', postDetails.img_url);
      }
      formData.append('title', postDetails.title);
      formData.append('description', postDetails.description);
      formData.append('content', postDetails.content);
  
      await blogStore.updatePost(postId, formData, useAuthStore.getState().user.token);
      alert('Post Updated Successfully');
    } catch (error) {
      console.error('Error updating post:', error);
      let errorMessage = 'An error occurred';
      if (error.message === 'Unauthenticated') {
        errorMessage = 'User is not authenticated';
      }
      alert(errorMessage);
    }
  };
  

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="py-3 mx-4 md:mx-20 overflow-x-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link to="/">
            <FiArrowLeft className="text-gray-600 mr-2 text-lg font-bold" />
          </Link>
          <span className="text-gray-600 mr-2">Draft</span>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-600"
            style={{
              backgroundColor: '#E9EFF3',
              borderRadius: '8px',
              padding: '8px 16px',
              fontFamily: 'Sora',
              fontSize: '14px',
              fontWeight: '600',
              lineHeight: '24.3px',
              textAlign: 'center',
            }}
          >
            Preview
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" style={{ background: '#093D9F', borderRadius: '8px', fontFamily: 'Sora', fontSize: '14px', fontWeight: '600', lineHeight: '24.3px', textAlign: 'center' }} onClick={handleUpdatePost}>
            Publish
          </button>
        </div>
      </div>
      <div className="mb-4 mt-10 text-center flex justify-center">
        <div className="relative bg-gray-200 w-full max-w-4xl mx-auto">
          <div className="min-w-0 w-full h-40 rounded-md flex flex-col items-center justify-center p-4">
          <img
  id="headerImage"
  src={postDetails.img_preview_url || (postDetails.img_url ? `https://Activeapis.site${postDetails.img_url}` : '')}
  alt="Header"
  className="w-full h-auto rounded-md object-cover"
/>     </div>
        </div>
      </div>
      <div className="mb-4 mx-auto max-w-4xl">
        <input type="text" id="subtitle" className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-sora font-bold text-4xl text-gray-900" placeholder="Title" value={postDetails?.title || ''} onChange={(e) => setPostDetails(prevState => ({ ...prevState, title: e.target.value }))} />
      </div>
      <div className="mb-4 mx-auto max-w-4xl">
        <input type="text" id="subtitle" className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-inter text-base text-gray-900" placeholder="Subtitle" value={postDetails?.description || ''} onChange={(e) => setPostDetails(prevState => ({ ...prevState, description: e.target.value }))} />
      </div>
      <div className="mb-4 mx-auto max-w-4xl relative">
        <textarea id="description" rows="4" className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-inter text-base text-gray-900" placeholder="Description" value={postDetails?.content || ''} onChange={(e) => setPostDetails(prevState => ({ ...prevState, content: e.target.value }))}></textarea>
        <div className="absolute bottom-2 right-2">
          {/* Your overlay editor component */}
        </div>
      </div>
    </div>
  );
}

export default PreviewForm;
