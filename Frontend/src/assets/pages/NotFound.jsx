import React from 'react';

function NotFound() {
  return (
    <div className="h-screen w-full bg-[#222831] text-[#EEEEEE] flex flex-col items-center justify-center space-y-8 px-6">
      <h1 className="text-9xl font-extrabold text-[#0E8388]">404</h1>
      <p className="text-3xl text-center font-medium text-[#EEEEEE]">
        Oops! The page you're looking for doesn't exist.
      </p>

      <a href="/">
        <button className="bg-[#0E8388] text-[#EEEEEE] text-2xl font-semibold py-3 px-12 rounded-full shadow-xl hover:bg-[#2E4F4F] transition duration-300 transform hover:scale-110">
          Back to Home
        </button>
      </a>
    </div>
  );
}

export default NotFound;
