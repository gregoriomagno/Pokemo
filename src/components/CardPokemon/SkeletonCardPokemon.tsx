import React from "react";

const SkeletonCardPokemon = () => {
  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-gray-300 h-40 w-full"></div>

        <div className="p-4">
          <div className="bg-gray-300 h-4 w-20 mb-2"></div>
          <div className="flex justify-between">
            <div className="bg-gray-300 h-4 w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardPokemon;
