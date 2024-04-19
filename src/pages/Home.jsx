import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'; // Import the Navbar component
import BlogPosts from './blogs/BlogPosts';
function Home() {
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
