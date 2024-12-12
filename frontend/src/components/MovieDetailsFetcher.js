import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetailsFetcher = ({ movieIds }) => {
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const apiUrl = 'https://api.themoviedb.org/3/movie/';

  useEffect(() => {
    const fetchMovies = async () => {
      if (!movieIds || movieIds.length === 0) return;

      try {
        const movieDetails = await Promise.all(
          movieIds.map(async (movieId) => {
            const response = await axios.get(`${apiUrl}${movieId}?api_key=${apiKey}`);
            const { title, poster_path } = response.data;
            return {
              title,
              poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
            };
          })
        );
        setMovies(movieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovies();
  }, [movieIds]);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {movies.map((movie, index) => (
        <div key={index} className="max-w-xs w-72 rounded-lg overflow-hidden shadow-lg bg-white">
          <img src={movie.poster} alt={movie.title} className="w-full h-72 object-cover" />
          <div className="px-4 py-2">
            <h3 className="text-xl font-semibold text-center text-gray-800">{movie.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieDetailsFetcher;
