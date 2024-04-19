import './App.css';
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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add" element={<NewPostForm />} />
      <Route path="/edit" element={<EditBlogPostForm />} />
      <Route path="/blog" element={<BlogPost />} />
      {/* Add more routes for other pages */}
    </Routes>
  );
}

export default App;
