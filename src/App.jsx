import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import NewPostForm from './pages/blogs/NewPostForm.jsx';
import PreviewForm from './pages/blogs/PreviewForm.jsx';
import BlogPost from './pages/blogs/BlogPost.jsx';
import EditBlogForm from './pages/blogs/EditBlogForm.jsx'; // Import EditBlogForm

function App() {
  return (
    <Routes> 
      <Route path="/" element={<Home title="Home" />} />
      <Route path="/login" element={<Login title="Login" />} />
      <Route path="/register" element={<Register title="Register" />} />
      <Route path="/add" element={<NewPostForm title="Add Post" />} />
      <Route path="/preview" element={<PreviewForm title="Preview Post" />} />
      <Route path="/blog/:postId" element={<BlogPost title="Blog" />} />
      <Route path="/edit/:postId" element={<EditBlogForm title="Edit Post" />} /> {/* Route for edit page */}
      {/* Add more routes for other pages */}
    </Routes>
  );
}

export default App;
