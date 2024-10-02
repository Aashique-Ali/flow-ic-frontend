import React from 'react';


const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen rounded-3xl shadow-lg bg-gradient-to-br from-[#3F88C0] to-[#3F88C0] text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-5xl font-bold mb-4 animate-fadeIn">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-100 mb-8 animate-fadeInDelay">
          We're working hard to bring you this feature. Stay tuned for updates!
        </p>

      </div>
      <div className="mt-10">
        <div className="w-16 h-16 border-t-4 border-b-4 text-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default ComingSoon;

