import Header from '../components/Header'
import Navbar from '../components/Navbar'; // Import the Navbar component
import BlogPosts from './blogs/BlogPosts';
import React, { useEffect } from 'react';

function Home({ title }) {
  useEffect(() => {
    document.title = `D-Blog - Home`;
  }, [title]);


  return (
    <div>
      <Header/>
        {/* Navbar */}
        <Navbar />
        <BlogPosts/>
     
    </div>
  )
}

export default Home
