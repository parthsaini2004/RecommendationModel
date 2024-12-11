import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImageUrl } from './utils';

const RecentlyViewedMovie = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return; // Exit if movieId is not provided

      const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Ensure this is set
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

      try {
        const response = await axios.get(url);
        // console.log("Fetched Movie Details:", response.data); // Debug log
        setMovie(response.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieId) {
    return <p>No movie selected to display.</p>;
  }

  if (!movie) {
    return <p>Loading...</p>;
  }

  const imageUrl = movie.poster_path ? getImageUrl(movie.poster_path) : null;

  return (
    <div className="flex items-center gap-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-[100px] h-[120px] object-cover rounded mt-[-50px]"
        />
      ) : (
        <p className="text-gray-100">No Image Available</p>
      )}
      <p className="text-3xl font-semibold text-gray-100 ">{movie.title}</p>
    </div>
  );
};

export default RecentlyViewedMovie;
