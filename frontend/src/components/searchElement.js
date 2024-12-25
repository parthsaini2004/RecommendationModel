import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchElement = ({ searchValue, user, setUser, setIsFocused }) => {
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Ensure your API key is set in environment variables
  const searchUrl = 'https://api.themoviedb.org/3/search/movie';
  const [errorCame,setErrorCame]=useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [progress, setProgress] = useState(0);
  // const handleUpdateMovie = async (movieId) => {
  //   if (!user || !user.email) {
  //     alert('User not authenticated!');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('https://recommendationmodelbackend.onrender.com/api/update-recently-watched', {
  //       email: user.email,
  //       recentlyWatchedMovie: movieId,
  //     });
  //     if(response.status===300){
  //       throw new Error('An intentional error');
        
  //     }
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

  //   } catch (error) {
  //       console.error('Error updating recently watched movie:', error);
  //       setErrorCame(true);
  //       setTimeout(() => {
  //         setErrorCame(false);
  //       }, 2500);
         
  //     setIsFocused(false);
  //   } 
  // };
  const handleUpdateMovie = async (movieId) => {
    if (!user || !user.email) {
      alert('User not authenticated!');
      return;
    }
  
    setIsLoading(true); // Start loading
  
    try {
      const response = await axios.post('https://recommendationmodelbackend.onrender.com/api/update-recently-watched', {
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
      console.error('Error updating recently watched movie:', error);
      setErrorCame(true);
      setTimeout(() => {
        setErrorCame(false);
      }, 2500);
      // setIsFocused(false);
      
    } finally {
      setIsLoading(false); // End loading
      
    }
  };
  

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchValue) {
        setSearchResults([]); // Clear results if searchValue is empty
        return;
      }

      try {
        const response = await axios.get(searchUrl, {
          params: {
            api_key: apiKey,
            query: searchValue,
          },
        });

        const results = response.data.results
          .map((movie) => ({
            id: movie.id,
            title: movie.title,
            poster: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : null, // Handle cases where no poster is available
            popularity: movie.popularity, // Extract popularity
          }))
          .sort((a, b) => b.popularity - a.popularity); // Sort by popularity (descending)

        setSearchResults(results);
        
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchMovies();
  }, [searchValue, apiKey]);


  useEffect(() => {
    // Simulate loading progress
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 50);
      return () => clearInterval(timer); // Clean up on component unmount
    }
  }, [progress]);

  if(isLoading){
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
    
   
      {searchResults.length > 0 ? 
      
      (
        
        searchResults.map((movie) => (

            <button
            key={movie.id}
            onClick={() => handleUpdateMovie(movie.id)} // Pass movieId when clicked
          >
           
       
         <div
            key={movie.id}
            className="cursor-pointer max-w-xs w-72 h-[400px] rounded-lg overflow-hidden shadow-lg bg-transparent flex flex-col"
          >
            {/* Image container */}
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="w-full h-72 flex items-center justify-center bg-gray-200">
                <p className="text-gray-500">No Image</p>
              </div>
            )}
            {/* Title and button container */}
            <div className="flex-grow px-4 py-2 flex flex-col items-center justify-between">
              <h3 className="text-xl font-semibold text-center text-slate-500">{movie.title}</h3>
              
             
            </div>
          </div>
          </button>

        ))

      ) 
            
    
      : (
        <p className="text-center text-gray-500">
          {searchValue ? `No results found for "${searchValue}".` : 'Start typing to search movies.'}
        </p>
      )}
    </div>
    </>
  );
};

export default SearchElement;
