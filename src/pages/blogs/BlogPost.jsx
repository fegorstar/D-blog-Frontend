import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { FiHeart, FiMessageCircle, FiShare2, FiMoreHorizontal, FiImage } from 'react-icons/fi'; // Changed FiShare to FiShare2, Added FiMoreHorizontal
import { Link } from 'react-router-dom'; // Import Link from React Router


function BlogPost({ title }) {
  useEffect(() => {
    document.title = `D-Blog - ${title}`;
  }, [title]);

  
  return (
    <div>
      <Header />
      {/* Blog post content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Bisola's Space */}
            <h2 className="mt-4 mb-0 text-4xl font-semibold text-gray-900 font-sora text-center">
              {/* Link to the home page */}
              <Link to="/" style={{ fontFamily: 'Sora', fontSize: '40px', lineHeight: '50.4px', textAlign: 'center', textDecoration: 'none', color: '#111827' }}>
               Introduction to UI/UX
              </Link>
            </h2>
            {/* Please enter your details */}
            <div className="text-center mb-6">
              <span className="text-base text-gray-500 font-inter">A look into the tech career that has sent Nigeria into the tech space</span>
            </div>
            {/* Blogger profile */}
            <div className="flex items-center mt-4 mb-4 justify-center">
              <img className="h-10 w-10 rounded-full mr-2" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Blogger" />
              <div>
                <p className="text-gray-600 text-sm">Blogger Name</p>
                <p className="text-gray-600 text-sm">Apr 16, 2024 &middot; 4 min read</p>
              </div>
            </div>
          </div>
        </div>
        {/* Border */}
      
        {/* Centered section */}
        <div className="mb-4 mt-4 text-center flex justify-center">
          <div className="w-full max-w-2xl">
            {/* Like, comment, share icons */}
            <div className="border-t border-b my-1"></div>
            <div className="flex items-center mt-4 mb-4 justify-center">
              <div className="flex items-center">
                <FiHeart className="h-5 w-5 text-gray-600" />
                <p className="text-gray-600 text-sm ml-2">100</p> {/* Display like count */}
              </div>
              <div className="flex items-center ml-4">
                <FiMessageCircle className="h-5 w-5 text-gray-600" />
                <p className="text-gray-600 text-sm ml-2">50</p> {/* Display comment count */}
              </div>
              <div className="flex items-center ml-auto">
                <FiShare2 className="h-5 w-5 text-gray-600" /> {/* Changed to FiShare2 */}
                <FiMoreHorizontal className="h-5 w-5 text-gray-600 ml-2" /> {/* Changed to FiMoreHorizontal */}
              </div>
            
            </div>
            <div className="border-t border-b my-1"></div>
            {/* Blog post image */}
            <img className="mt-10 w-826 h-320 rounded-md" src="https://via.placeholder.com/800x400" alt="Blog Post" style={{ top: '418px', left: '307px', gap: '0px', opacity: '0px' }} /> {/* Adjusted image size */}
            {/* Blog post description */}
            <p className="text-gray-600 mt-4 mb-4 text-left">If you're like me then you just got into the UI/UX design space, or perhaps you heard about it vaguely and it interest you but you lack deep knowledge as to if it will make a good career path. I am here to share my knowledge with you, let's grow together!
In this post I will be answering some questions that you may have, that I asked before embarking on this journey.
What is UI/UX?
While they usually both come up in the same context, UI is not UX. UI fully called User interface refers to what consumers/people who use a product see when they interact with the product. For example, what you see when you go on a website; the arrangement of the sections, the website layout, down to the colours used are functions of the UI.|
Balance
Visual hierarchy 
Emphasis
Contrast 
Repetition
Negative Space
Balance 
Balance is created when you distribute design across the page. It would be unwise to fill just one side of the page with good design and leave the other half empty. The ability to distribute, combine and align design give a good balance.</p>
            <div className="w-full max-w-2xl">
            {/* Like, comment, share icons */}
            <div className="border-t border-b my-1"></div>
            <div className="flex items-center mt-4 mb-4 justify-center">
              <div className="flex items-center">
                <FiHeart className="h-5 w-5 text-gray-600" />
                <p className="text-gray-600 text-sm ml-2">100</p> {/* Display like count */}
              </div>
              <div className="flex items-center ml-4">
                <FiMessageCircle className="h-5 w-5 text-gray-600" />
                <p className="text-gray-600 text-sm ml-2">50</p> {/* Display comment count */}
              </div>
              <div className="flex items-center ml-auto">
                <FiShare2 className="h-5 w-5 text-gray-600" /> {/* Changed to FiShare2 */}
                <FiMoreHorizontal className="h-5 w-5 text-gray-600 ml-2" /> {/* Changed to FiMoreHorizontal */}
              </div>
              </div>
              <div className="border-t border-b my-1"></div>
              </div>
            
            {/* Comment section */}
            
            {/* Add your comment section here */}
          </div>
        </div>
        {/* Border */}
      
      </div>
    </div>
  );
}

export default BlogPost;
