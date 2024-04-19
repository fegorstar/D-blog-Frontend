import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiImage } from 'react-icons/fi';
import { Link } from 'react-router-dom'; // Import Link from React Router

function EditBlogPostForm({title}) {

  useEffect(() => {
    document.title = `D-Blog - ${title}`;
  }, [title]);


  const [selectedImage, setSelectedImage] = useState(null); // State to store selected image

  // Function to handle image selection
  const handleImageSelect = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file
    setSelectedImage(selectedFile); // Update the selected image state
  };

  return (
    <div className="py-3 mx-4 md:mx-20 overflow-x-hidden"> {/* Hide horizontal overflow */}
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* Use Link for the arrow icon */}
          <Link to="/">
            <FiArrowLeft className="text-gray-600 mr-2 text-lg font-bold" />
          </Link>
          <span className="text-gray-600 mr-2">Draft</span>
        </div>
        <div className="flex space-x-2">
          {/* Preview Button */}
          <button className="text-gray-600"
            style={{
              backgroundColor: '#E9EFF3', // Set background color
              borderRadius: '8px', // Set border radius
              padding: '8px 16px', // Adjust padding
              fontFamily: 'Sora', // Set font family
              fontSize: '14px', // Set font size
              fontWeight: '600', // Set font weight
              lineHeight: '24.3px', // Set line height
              textAlign: 'center', // Set text alignment
            }}
          >
            Preview
          </button>
          {/* Publish Button */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" style={{ background: '#093D9F', borderRadius: '8px', fontFamily: 'Sora', fontSize: '14px', fontWeight: '600', lineHeight: '24.3px', textAlign: 'center' }}>
            Publish
          </button>
        </div>
      </div>
      {/* Form */}
      <form>
        {/* Header Image Selector */}
        <div className="mb-4 mt-10 text-center flex justify-center">
          <div className="relative bg-gray-200 w-full max-w-4xl mx-auto">
            <input type="file" id="headerImage" className="absolute h-full w-full opacity-0" onChange={handleImageSelect} />
            <div className="min-w-0 w-full h-40 rounded-md flex flex-col items-center justify-center p-4">
              <FiImage className="text-gray-400 h-8 w-8 mb-2" />
              {selectedImage ? (
                <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-full h-auto rounded-md" />
              ) : (
                <label htmlFor="headerImage" className="text-gray-600 font-semibold block">Add Header Image</label>
              )}
            </div>
          </div>
        </div>
        {/* Title Input */}
        <div className="mb-4 mx-auto max-w-4xl">
          <input type="text" id="subtitle" className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-sora font-bold text-4xl text-gray-900" placeholder="Title" />
        </div>
        {/* Subtitle Input */}
        <div className="mb-4 mx-auto max-w-4xl">
          <input type="text" id="subtitle" className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-inter text-base text-gray-900" placeholder="Subtitle" />
        </div>
        {/* Description Input */}
        <div className="mb-4 mx-auto max-w-4xl relative">
          <textarea id="description" rows="4" className="bg-white rounded-md pl-2 placeholder-gray-600 focus:outline-none w-full text-left font-inter text-base text-gray-900" placeholder="Description"></textarea>
          <div className="absolute bottom-2 right-2">
            {/* Bottom overlay editor */}
            {/* Your overlay editor component */}
        
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditBlogPostForm;
