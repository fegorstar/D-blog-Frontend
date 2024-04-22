import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';

const BASE_URL = 'https://Activeapis.site'; 
const useBlogStore = create((set) => ({
  //================== Fetch Posts ======================
  posts: [], // Initial state for blog posts

  fetchPost: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/getpost/${postId}`);
      return response.data.data; // Return the post data
    } catch (error) {
      console.error('Error fetching post details:', error);
      throw error;
    }
  },

  //=======================================================

  createPost: async (postData, token) => {
    try {
      // Check if the user is authenticated
      if (!useAuthStore.getState().isAuthenticated) {
        throw new Error('Unauthenticated');
      }

      const response = await axios.post(`${BASE_URL}/api/blog/post`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data;

      set((prevState) => ({
        ...prevState,
        posts: [...prevState.posts, responseData.data],
      }));

      return { data: responseData.data, message: responseData.message };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },


    // Update an existing blog post
    updatePost: async (postId, updatedData, token) => {
      try {
        // Check if the user is authenticated
        if (!useAuthStore.getState().isAuthenticated) {
          throw new Error('Unauthenticated');
        }
  
        const response = await axios.post(`${BASE_URL}/api/blog/update/${postId}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const updatedPost = response.data.data;
  
        set((prevState) => ({
          ...prevState,
          posts: prevState.posts.map((post) =>
            post.post_id === updatedPost.post_id ? updatedPost : post
          ),
        }));
  
        return { data: updatedPost, message: response.data.message };
      } catch (error) {
        console.error('Error updating post:', error);
        throw error;
      }
    },

    

  fetchUserPosts: async () => {
  try {
    const token = useAuthStore.getState().user.token;
    const response = await axios.get(`${BASE_URL}/api/blog/postbyuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userPosts = response.data.data;
    set((prevState) => ({ posts: [...prevState.posts, ...userPosts] }));
    return userPosts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }
},

fetchAllPosts: async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/allpost`);
    const allPosts = response.data.data;
    set((prevState) => ({ posts: [...prevState.posts, ...allPosts] }));
    return allPosts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
},


 deletePost: async (postId) => {
    try {
      const token = useAuthStore.getState().user.token;
      const response = await axios.delete(`${BASE_URL}/api/blog/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove the deleted post from the state
      set((prevState) => ({
        posts: prevState.posts.filter((post) => post.post_id !== postId),
      }));
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  publishPost: async (postId) => {
    try {
      const token = useAuthStore.getState().user.token;
      const response = await axios.post(`${BASE_URL}/api/blog/publishpost/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error publishing post:', error);
      throw error;
    }
  },

  unpublishPost: async (postId) => {
    try {
      const token = useAuthStore.getState().user.token;
      const response = await axios.post(`${BASE_URL}/api/blog/unpublishpost/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error unpublishing post:', error);
      throw error;
    }
  },

  addComment: async (postId, commentText) => {
    try {
      // Check if the user is authenticated
      if (!useAuthStore.getState().isAuthenticated) {
        throw new Error('You must be logged in to add a comment.');
      }

      if (!commentText) {
        throw new Error('Comment text is required.');
      }

      const token = useAuthStore.getState().user.token;
      const response = await axios.post(`${BASE_URL}/api/blog/comment`, {
        post_id: postId,
        comment: commentText, // Update this line
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newComment = response.data.data;

      set((prevState) => ({
        comments: [...prevState.comments, newComment],
      }));

      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },
  
  fetchComments: async (postId, setComments) => {
    try {
      // Get the user's authentication token
      const token = useAuthStore.getState().user.token;
  
      // Fetch comments for the post with authentication token included in headers
      const response = await axios.get(`${BASE_URL}/api/blog/comment/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const commentsData = response.data;
      // Set comments using setComments method
      setComments(commentsData);
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  
}));

export default useBlogStore;
