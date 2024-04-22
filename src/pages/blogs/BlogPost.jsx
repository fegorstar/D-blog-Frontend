import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Link, useParams } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useBlogStore from '../../store/blogStore';
import { formatDistanceToNow } from 'date-fns';
import { FiHeart, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi'; // Import icons if not already imported

function BlogPost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const addComment = useBlogStore(state => state.addComment);
  const fetchPost = useBlogStore(state => state.fetchPost);
  const fetchComments = useBlogStore(state => state.fetchComments);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postData = await fetchPost(postId);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId, fetchPost]);

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const commentsData = await fetchComments(postId, setComments); // Pass setComments here
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchPostComments();
  }, [postId, fetchComments]);

  
  const handleAddComment = async () => {
    try {
      await addComment(postId, newComment);
      const commentsData = await fetchComments(postId);
      setComments(commentsData);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const timeAgo = post.created_at ? formatDistanceToNow(new Date(post.created_at)) : '';

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="mt-4 mb-0 text-4xl font-semibold text-gray-900 font-sora text-center">
              <Link to="/" className="post-title">{post.title}</Link>
            </h2>
            <div className="text-center mb-6">
              <span className="text-base text-gray-500 font-inter">{post.description}</span>
            </div>
      
          </div>
        </div>
        <div className="mb-4 mt-4 text-center flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="border-t border-b my-1"></div>
            <img 
              src={post.img_url ? `https://Activeapis.site${post.img_url}` : "https://via.placeholder.com/800x400"} 
              alt="Post Thumbnail" 
              className="mt-10 w-826 h-320 rounded-md" 
            />
            <div className="w-full max-w-2xl">
              <div className="border-t border-b my-1"></div>
              <div className="text-gray-600 mt-4 mb-4 text-left" dangerouslySetInnerHTML={{ __html: post.content }} />
              <div className="border-t border-b my-1"></div>
            </div>
            <div className="w-full max-w-2xl">
            <div className="border-t border-b my-1"></div>
{comments && comments.length > 0 ? (
  comments.map((comment) => (
    <div key={comment.comment_id} className="mt-8 mb-4 flex items-start">
      <img className="h-10 w-10 rounded-full mr-2" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" />
      <div>
        <p className="font-semibold">{comment.user}</p>
        <p className="text-gray-600 text-sm">{comment.created_at}</p>
        <div className="w-full max-w-2xl">
          <p className="text-gray-600">{comment.comment}</p>
          <div className="flex items-center mt-2">
            <FiHeart className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600 text-sm mr-4">Like</span>
            <FiMessageCircle className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600 text-sm mr-4">Reply</span>
            <FiMoreHorizontal className="h-5 w-5 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <p>No comments available</p>
)}
<div className="border-t border-b my-1"></div>
            </div>
            <div className="w-full max-w-2xl">
              <div className="border-t border-b my-1"></div>
              {isAuthenticated ? (
                <div className="flex justify-between mt-4">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="border border-gray-300 p-2 w-full rounded-md"
                  />
                  <button
                    onClick={handleAddComment}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Post
                  </button>
                </div>
              ) : (
                <p className="text-red-500">You must be logged in to add a comment.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
