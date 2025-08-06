
import React from 'react';

const LoadingState = () => {
  return (
    <div className="mt-6 p-4">
      <div className="flex flex-col space-y-4 items-center">
        <div className="w-10 h-10 border-4 border-[#2977b7] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#2977b7] font-nunito">Loading posts...</p>
      </div>
    </div>
  );
};

export default LoadingState;
