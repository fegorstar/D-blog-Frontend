// blogStore.js
import { create } from 'zustand'; 
import axios from 'axios';

const BASE_URL = 'https://Activeapis.site'; // Replace with your base URL

const useBlogStore = create((set) => ({
  //================== Fetch Posts ======================
  posts: [], // Initial state for blog posts
  fetchPosts: async () => { // Define fetchPosts function
    try {
      const response = await axios.get(`${BASE_URL}/api/blog/post`);
      const posts = response.data;
      set({ posts }); // Update the posts state with the fetched data
      return posts; // Return the fetched posts
    } catch (error) {
      console.error('Error fetching all posts:', error);
      return []; // Return an empty array in case of error
    }
  },
  //=======================================================



  //================== Fetch Posts by User ===============
  getPostsByUser: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blog/postbyuser`);
      const posts = response.data;
      set({ posts }); // Update the posts state with the fetched data
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  },
  //=======================================================

  //================== Fetch Post by ID ==================
  getPostById: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blog/post/${postId}`);
      return response.data; // Return the post data
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
      return null;
    }
  },
  //=======================================================

  //================== Total User Posts ==================
  getTotalUserPosts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blog/totalpost`);
      return response.data.totalPosts; // Return the total number of user posts
    } catch (error) {
      console.error('Error fetching total user posts:', error);
      return null;
    }
  },
  //=======================================================

  //================== Create and Publish Post ===========
  createAndPublishPost: async (postData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/blog/createnpublish`, postData);
      // Assuming successful creation and publication don't require additional handling
    } catch (error) {
      console.error('Error creating and publishing post:', error);
    }
  },
  //=======================================================

  //================== Publish Post ======================
  publishPost: async (postId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/blog/publishpost/${postId}`);
      // Assuming successful publication doesn't require additional handling
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  },
  //=======================================================

  //================== Delete Post =======================
  deletePost: async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/api/blog/post/${postId}`);
      // Assuming successful deletion doesn't require additional handling
    } catch (error) {
      console.error(`Error deleting post with ID ${postId}:`, error);
    }
  },
  //=======================================================

  //================== Add Comment =======================
  addComment: async (commentData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/blog/comment`, commentData);
      // Assuming successful addition of comment doesn't require additional handling
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  },
  //=======================================================

  //================== Delete Comment ====================
  deleteComment: async (commentId) => {
    try {
      await axios.delete(`${BASE_URL}/api/blog/comment/${commentId}`);
      // Assuming successful deletion doesn't require additional handling
    } catch (error) {
      console.error(`Error deleting comment with ID ${commentId}:`, error);
    }
  },
  //=======================================================

  //================== Get Comments =======================
  getComments: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blog/comment/${postId}`);
      return response.data; // Return the comments
    } catch (error) {
      console.error(`Error fetching comments for post with ID ${postId}:`, error);
      return [];
    }
  },
  //=======================================================

  //================== Count Comments =====================
  countComments: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blog/countcomment/${postId}`);
      return response.data.count; // Return the count of comments
    } catch (error) {
      console.error(`Error counting comments for post with ID ${postId}:`, error);
      return 0;
    }
  },
  //=======================================================

  //================== Like a Post ========================
  likePost: async (postId) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/blog/likes`, { postId });
      // Assuming successful like operation doesn't require additional handling
    } catch (error) {
      console.error('Error liking post:', error);
    }
  },
  //=======================================================

  //================== Unlike a Post ======================
  unlikePost: async (postId) => {
    try {
      await axios.delete(`${BASE_URL}/api/blog/likes/${postId}`);
      // Assuming successful unlike operation doesn't require additional handling
    } catch (error) {
      console.error(`Error unliking post with ID ${postId}:`, error);
    }
  },
  //=======================================================

  //================== Get Total Likes ====================
  getTotalLikes: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blog/likestotal/${postId}`);
      return response.data.totalLikes; // Return the total number of likes
    } catch (error) {
      console.error(`Error fetching total likes for post with ID ${postId}:`, error);
      return 0;
    }
  },
  //=======================================================

  //================== Check if Post is Liked =============
  isPostLiked: async (postId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blog/ispostliked/${postId}`);
      return response.data.isLiked; // Return true if post is liked, false otherwise
    } catch (error) {
      console.error(`Error checking if post with ID ${postId} is liked:`, error);
      return false;
    }
  },
  //=======================================================
}));

export default useBlogStore;
