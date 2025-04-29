import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-800 text-white rounded-lg p-4 flex items-center">
        <span className="mr-2">Düşünüyorum</span>
        <span className="flex">
          <span className="h-2 w-2 bg-indigo-400 rounded-full mx-0.5 animate-pulse" style={{ animationDelay: '0ms' }}></span>
          <span className="h-2 w-2 bg-indigo-400 rounded-full mx-0.5 animate-pulse" style={{ animationDelay: '300ms' }}></span>
          <span className="h-2 w-2 bg-indigo-400 rounded-full mx-0.5 animate-pulse" style={{ animationDelay: '600ms' }}></span>
        </span>
      </div>
    </div>
  );
};

export default LoadingIndicator;