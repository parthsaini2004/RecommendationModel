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
      className="flex items-center gap-5 p-5 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-lg mt-5 mb-5 ml-[100px] cursor-pointer"
    >
      {/* Movie Poster */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-[120px] h-[140px] object-cover rounded-lg border-2 border-gray-700 shadow-sm"
        />
      ) : (
        <p className="text-gray-500 italic">No Image Available</p>
      )}

      {/* Movie Details */}
      <div className="flex-1">
        <p className="text-xl font-extrabold text-indigo-400 tracking-wide mb-1">
          Recently Viewed
        </p>
        <p className="text-lg font-semibold text-white truncate">{movie.title}</p>
        <p className="text-sm text-gray-400 mt-1 italic">{movie.release_date.slice(0, 4)}</p>
      </div>
    </div>
  );
};

export default RecentlyViewedMovie;
