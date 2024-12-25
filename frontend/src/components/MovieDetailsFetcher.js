import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetailsFetcher = ({  user, setUser, setIsFocused, isFocused }) => {
  const movieIds = user.viewDetails.movieList.map((movie) => movie.movieId);
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const apiUrl = 'https://api.themoviedb.org/3/movie/';
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(false); 
  const [progress, setProgress] = useState(0);
  const [errorCame,setErrorCame]=useState(false);

  // const handleUpdateMovie = async (movieId) => {
  //   console.log("start");
  //   console.log(movieIds);
  //   if (!user || !user.email) {
  //     alert('User not authenticated!');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`${baseUrl}/api/update-recently-watched`, {
  //       email: user.email,
  //       recentlyWatchedMovie: movieId,
  //     });

  //     console.log(response.data.message); // Display success message

  //     // Optionally refresh user data after the update
  //     setUser((prevUser) => ({
  //       ...prevUser,
  //       viewDetails: {
  //         ...prevUser.viewDetails,
  //         recentlyWatched: movieId,
  //         recentlyViewedAt: new Date(),
  //       },
  //     }));

  //     setIsFocused(true);
  //     window.scrollTo({
  //       top: 5, // Adjust the number to the scroll position you want (in pixels)
  //       behavior: 'smooth', // Smooth scrolling
  //     });

  //   } catch (error) {
  //     console.error('Error updating recently watched movie:', error);
  //   } 
  //   console.log("end");
  //   console.log(movieIds);
  // };

  useEffect(() => {
    // Simulate loading progress
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 50);
      return () => clearInterval(timer); // Clean up on component unmount
    }
  }, [progress]);



  const handleUpdateMovie = async (movieId) => {
    console.log("start");
    console.log(movieIds);

    if (!user || !user.email) {
      alert('User not authenticated!');
      return;
    }

    setLoading(true); // Start loading

    try {
      
      const response = await axios.post(`${baseUrl}/api/update-recently-watched`, {
        email: user.email,
        recentlyWatchedMovie: movieId,
      });
      if (response.status === 300) {
        throw new Error('An intentional error');
      }
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
      setErrorCame(true);
      setTimeout(() => {
        setErrorCame(false);
      }, 2500);
      console.error('Error updating recently watched movie:', error);
    } finally {
      setLoading(false); // Stop loading
    }

    console.log("end");
    console.log(movieIds);
  };
  useEffect(() => {
    const fetchMovies = async () => {
      if (!movieIds || movieIds.length === 0) return;
      // console.log(movieIds);
      try {
        // console.log(movieIds);
        
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
  }, [user]);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     if (!movieIds || movieIds.length === 0) return; // Skip if no movieIds
  //     console.log('Fetching movies for IDs:', movieIds);
  
  //     try {
  //       const movieDetails = await Promise.all(
  //         movieIds.map(async (movieId) => {
  //           try {
  //             const response = await axios.get(`${apiUrl}${movieId}?api_key=${apiKey}`);
  //             const { title, poster_path, overview } = response.data;
  //             return {
  //               id: movieId,
  //               title,
  //               poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
  //               description: overview,
  //             };
  //           } catch (innerError) {
  //             // Log specific error (e.g., 404 or network error)
  //             if (innerError.response?.status === 404) {
  //               console.warn(`Movie with ID ${movieId} not found.`);
  //             } else {
  //               console.error(`Error fetching movie ID ${movieId}:`, innerError);
  //             }
  //             return null; // Return `null` to handle gracefully
  //           }
  //         })
  //       );
  
  //       // Filter out nulls (invalid or not found movies)
  //       const validMovies = movieDetails.filter((movie) => movie !== null);
  
  //       // Update state only with valid movies
  //       setMovies(validMovies);
  //     } catch (error) {
  //       console.error('Error fetching movie details:', error);
  //     }
  //   };
  
  //   fetchMovies();
  // }, [movieIds]);
  
  if(loading){
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Container for loading bar and text */}
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Loading Bar */}
        <div className="w-2/3 h-2 bg-gray-300 rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-400 to-indigo-600"
            style={{ width: `${progress}%`, transition: 'width 0.1s ease' }}
          ></div>
        </div>

        {/* Show More Loading Text */}
        <div className="text-white text-xl font-semibold animate-pulse">
          Loading  Movie
        </div>
      </div>
    </div>
    );
     
    
  }

  return (
    <>
       {errorCame && (
        <div className="fixed top-[90px] left-0 right-0 text-center text-red-500 font-semibold text-lg p-4 bg-red-100 border border-red-500 rounded-lg shadow-lg">
          <strong>Sorry!</strong> We can't show the movie right now because it's not in the database.
        </div>
      )}
       
       <div className="flex flex-wrap justify-center gap-6">
        
  {movies
    .filter((movie) => movie !== null) // Filter out null movies
    .map((movie) => (
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
  
    </>
   

  );
};

export default MovieDetailsFetcher;
