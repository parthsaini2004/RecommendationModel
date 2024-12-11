import React from 'react';

const SmallestBlock = ({ title, description, posterPath }) => {
  // Use a fallback image URL if posterPath is missing
  const imageUrl = posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '/path/to/placeholder-image.jpg';

  return (
    <div className="bg-white p-4 shadow-md rounded-lg max-w-xs">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
};

export default SmallestBlock;
