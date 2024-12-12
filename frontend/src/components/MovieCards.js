// File: src/components/MovieCards.js

import React from 'react';

const MovieCards = ({ movieDetails }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {movieDetails.map((movie, index) => (
        <div key={index} className="max-w-xs w-56 rounded-lg overflow-hidden shadow-lg bg-white">
          <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
          <div className="px-4 py-2">
            <h3 className="text-xl font-semibold text-center text-gray-800">{movie.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCards;
