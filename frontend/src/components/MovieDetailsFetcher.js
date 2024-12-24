import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetailsFetcher = ({ movieIds, user, setUser, setIsFocused, isFocused }) => {
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const apiUrl = 'https://api.themoviedb.org/3/movie/';

  const handleUpdateMovie = async (movieId) => {
    if (!user || !user.email) {
      alert('User not authenticated!');
      return;
    }

    try {
      const response = await axios.post('https://recommendationmodelbackend.onrender.com/api/update-recently-watched', {
        email: user.email,
        recentlyWatchedMovie: movieId,
      });

      console.log(response.data.message); // Display success message

      // Optionally refresh user data after the update
      setUser((prevUser) => ({
        ...prevUser,
        viewDetails: {
          ...prevUser.viewDetails,
          recentlyWatched: movieId,
          recentlyViewedAt: new Date(),
        },
      }));

      setIsFocused(true);
      window.scrollTo({
        top: 5, // Adjust the number to the scroll position you want (in pixels)
        behavior: 'smooth', // Smooth scrolling
      });

    } catch (error) {
      console.error('Error updating recently watched movie:', error);
    } 
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!movieIds || movieIds.length === 0) return;

      try {
        const movieDetails = await Promise.all(
          movieIds.map(async (movieId) => {
            const response = await axios.get(`${apiUrl}${movieId}?api_key=${apiKey}`);
            const { title, poster_path, overview } = response.data;
            return {
              id: movieId, // Add movieId to the object
              title,
              poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
              description: overview,
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
    <div className="flex flex-wrap justify-center gap-6 ">
      {movies.map((movie) => (
        <button
          className="object-cover cursor-pointer"
          key={movie.id} // Ensure key is unique
          onClick={() => handleUpdateMovie(movie.id)} // Pass movieId when clicked
        >
          <div className="max-w-xs w-72 h-[400px] rounded-lg overflow-hidden shadow-lg bg-transparent flex flex-col">
            {/* Image container */}
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            {/* Title and description container */}
            <div className="flex-grow px-4 py-2 flex justify-center">
              <h3 className="text-xl font-semibold text-center text-slate-500">{movie.title}</h3>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default MovieDetailsFetcher;
