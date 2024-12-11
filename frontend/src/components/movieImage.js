import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getImageUrl } from './utils'; // Import the utility function

const MovieImage = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = 'e547e17d4e91f3e62a571655cd1ccaff';
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

      try {
        const response = await axios.get(url);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const imageUrl = movie.poster_path ? getImageUrl(movie.poster_path) : null;

  return (
    <div className="movie-card">
      <h2>{movie.title}</h2>
      {imageUrl ? (
        <img src={imageUrl} alt={movie.title} />
      ) : (
        <p>No Image Available</p>
      )}
    </div>
  );
};

export default MovieImage;
