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
    return <p className="text-gray-400">No movie selected to display.</p>;
  }

  if (!movie) {
    return <p className="text-gray-400">Loading...</p>;
  }

  const imageUrl = movie.poster_path ? getImageUrl(movie.poster_path) : null;

  const handleUpdateMovie = (movieId) => {
    setIsFocused(!isFocused);
  };

  return (
    <div
      onClick={() => handleUpdateMovie(movieId)}
      className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-md mt-5 mb-5 ml-[100px] cursor-pointer"
    >
      {/* Movie Poster */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-[100px] h-[120px] object-cover rounded-md"
        />
      ) : (
        <p className="text-gray-500">No Image Available</p>
      )}

      {/* Movie Details */}
      <div className="flex-1">
        <p className="text-xl font-bold text-slate-100 mb-1">Recently Viewed:</p>
        <p className="text-lg font-semibold text-white truncate">{movie.title}</p>
        <p className="text-sm text-gray-400 mt-1">{movie.release_date.slice(0, 4)}</p>
      </div>
    </div>
  );
};

export default RecentlyViewedMovie;
