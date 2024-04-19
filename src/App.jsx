import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import NewPostForm from './pages/blogs/NewPostForm.jsx';
import EditBlogPostForm from './pages/blogs/EditBlogPostForm.jsx';
import BlogPost from './pages/blogs/BlogPost.jsx';

function App() {
  return (
    <Routes> 
      <Route path="/" element={<Home title="Home" />} />
      <Route path="/login" element={<Login title="Login" />} />
      <Route path="/register" element={<Register title="Register" />} />
      <Route path="/add" element={<NewPostForm title="Add Post" />} />
      <Route path="/edit" element={<EditBlogPostForm title="Edit Post" />} />
      <Route path="/blog" element={<BlogPost title="Blog" />} />
      {/* Add more routes for other pages */}
    </Routes>
  );
}

export default App;
