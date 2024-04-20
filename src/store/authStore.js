// authStore.js
import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'https://Activeapis.site'; // Replace with your base URL
const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,

  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, credentials);
      const responseData = response.data;
      const { token, name } = responseData.data; // Destructure token and name from responseData.data

      set((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        user: { name }, // Set the user name in the store
      }));

      // Attempt to save token and name to localStorage
      try {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', name); // Save user name in localStorage
      } catch (localStorageError) {
        console.error('Error setting authToken in localStorage:', localStorageError);
      }

      return { token, message: 'Login successful' };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, userData);
      const responseData = response.data;

      const { name, email } = responseData.data; // Destructure name and email from responseData.data

      set((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        user: { name }, // Set the user name in the store
      }));

      // Attempt to save token and name to localStorage
      try {
        localStorage.setItem('authToken', responseData.token);
        localStorage.setItem('userName', name); // Save user name in localStorage
      } catch (localStorageError) {
        console.error('Error setting authToken in localStorage:', localStorageError);
      }

      return { name, email, message: 'Registration successful' };
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  logout: () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      set({
        isAuthenticated: false,
        user: null,
      });
      console.log('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Load stored authentication data from local storage
  loadStoredAuthData: () => {
    const authToken = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');

    if (authToken && userName) {
      set((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        user: { name: userName },
      }));
    }
  },
}));

// Load stored authentication data from local storage
useAuthStore.getState().loadStoredAuthData();

export default useAuthStore;
