import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImageUrl } from './utils';

const RecentlyViewedMovie = ({ movieId,isFocused,setIsFocused }) => {
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
        console.error("Error fetching movie details:", err);
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

  const handleUpdateMovie =  (movieId) => {
    setIsFocused(!isFocused);
  }
 
  return (
   
    <div  onClick={() => handleUpdateMovie(movieId)} className="flex items-center gap-4 py-4 px-3 bg-gray-800 rounded-lg shadow-lg w-full max-w-md mt-5 mb-5 ml-[110px] cursor-pointer">
       
          
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-[100px] h-[120px] object-cover rounded-md"
        />
      ) : (
        <p className="text-gray-500">No Image Available</p>
      )}
      <div className="flex-1">
      
      <p className="text-2lg font-semibold text-white">Recently Viewed:</p>
        <p className="text-lg font-semibold text-white">{movie.title}</p>
        <p className="text-sm text-gray-400">{movie.release_date.slice(0,4)}</p>
      </div>
      
    </div>
   
  );
};

export default RecentlyViewedMovie;
