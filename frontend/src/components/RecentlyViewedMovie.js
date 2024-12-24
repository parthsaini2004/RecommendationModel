import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImageUrl } from './utils';

const RecentlyViewedMovie = ({ movieId, isFocused, setIsFocused }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return; // Exit if movieId is not provided

      const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Ensure this is set
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

      try {
        const response = await axios.get(url);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieId) {
    return <p className="text-gray-400 italic font-light">No movie selected to display.</p>;
  }

  if (!movie) {
    return <p className="text-gray-400 italic font-light">Loading...</p>;
  }

  const imageUrl = movie.poster_path ? getImageUrl(movie.poster_path) : null;

  const handleUpdateMovie = (movieId) => {
    setIsFocused(!isFocused);
  };

  return (
    <div
      onClick={() => handleUpdateMovie(movieId)}
      className="flex flex-col md:flex-row gap-5 p-6 bg-black rounded-lg shadow-2xl w-full max-w-md mt-5 mb-5 ml-20 cursor-pointer transform hover:scale-105"
    >
      {/* Movie Poster */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-[140px] h-[180px] object-cover rounded-lg shadow-lg border-4 border-indigo-600"
        />
      ) : (
        <div className="w-[140px] h-[180px] bg-gray-500 rounded-lg flex items-center justify-center text-white font-semibold">
          No Image Available
        </div>
      )}

      {/* Movie Details */}
      <div className="flex flex-col justify-between flex-1">
        <p className="text-xl font-extrabold text-indigo-300 tracking-wide mb-2">
          Recently Viewed
        </p>
        <p className="text-lg font-semibold text-white mb-2">{movie.title}</p>
        <p className="text-sm text-gray-400 mb-3">{movie.release_date.slice(0, 4)}</p>
        
        {/* Movie Overview */}
        <p className="text-sm text-gray-300 italic mb-4 line-clamp-3">
          {movie.overview || 'No description available'}
        </p>
      </div>
    </div>
  );
};

export default RecentlyViewedMovie;
