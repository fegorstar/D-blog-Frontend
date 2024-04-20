import React from 'react';

const LoadingSpinner = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 012.042 11H0c0 4.418 3.582 8 8 8v-2.042zm15.958-1.249A8.001 8.001 0 0121.958 13h2c0-4.418-3.582-8-8-8v2.042zM20 11a8 8 0 01-8 8v2.042A8.001 8.001 0 0121.958 13H20z"
      ></path>
    </svg>
  );
};

export default LoadingSpinner;
