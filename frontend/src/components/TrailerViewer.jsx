import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieDetailsFetcher from "./MovieDetailsFetcher";
import { useNavigate } from 'react-router-dom';

const TrailerViewer = ({ movieId, isFocused, setIsFocused, isDescription, setIsDescription,user,setUser,movieIds,recentlyWatchedMovie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shortenedDescription = isDescription ? isDescription.slice(0, 1000) : '';
  
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/homepage"); // Corrected path syntax
  };

  const handleCloseFocus = () => {
    setIsFocused(!isFocused);
  };

  const fetchDescription = async () => {
    if (!movieId) return; // If there's no movieId, do nothing

    try {
      const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Fetch the API key from the .env file

      if (!apiKey) {
        throw new Error("API key is missing.");
      }

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
      );

      const { overview } = response.data;

      // Update the description only if it's not the same as the new one
      setIsDescription((prevDescription) => {
        if (prevDescription !== overview) {
          return overview || 'No description available';
        }
        return prevDescription; // Do not overwrite if the description is the same
      });
    } catch (error) {
      console.error("Error fetching description:", error);
    }
  };

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Fetch the API key from the .env file

        if (!apiKey) {
          throw new Error("API key is missing.");
        }

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
        );

        const results = response.data.results || [];

        const trailer = results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
        setError("Failed to fetch trailer. Please check the API key and movie ID.");
        setTrailerKey(null);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchDescription();
      fetchTrailer();
    } else {
      setLoading(false);
    }
  }, [movieId]);

  if (loading) {
    return (
      <p className="text-center text-lg font-semibold text-slate-500">
        Loading trailer...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center font-semibold text-slate-500">
        {error}
      </p>
    );
  }

  if (!trailerKey) {
    return (
      <p className="text-center text-lg font-semibold text-slate-500">
        No trailer available for this movie.
        <button onClick={handleGoBack}>Go Back</button>
      </p>
    );
  }

  return (
    <div className="trailer-container bg-gray-800 p-6 rounded-lg shadow-lg max-w-7xl mx-auto mt-5">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-md mb-4"
      ></iframe>
      {/* Display description if available */}
      {isDescription && (
        <div className="text-slate-500 text-lg mb-4 text-justify">
          {shortenedDescription}
        </div>
      )}
      <button
        onClick={handleCloseFocus}
        className="mt-4 mb-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
      >
        Close
      </button>

      <div className="text-slate-500 text-2xl mb-4 text-justify" >Viewers with similar interset also watch:</div>

      <MovieDetailsFetcher
            movieIds={movieIds}
            recentlyWatchedMovie={recentlyWatchedMovie}
            user={user}
            setUser={setUser}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
           
          />
    </div>
  );
};

export default TrailerViewer;
