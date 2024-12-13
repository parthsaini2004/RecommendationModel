import React, { useEffect, useState } from "react";
import axios from "axios";

const TrailerViewer = ({ movieId }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Fetch the API key from the .env file

        // Log the API key to confirm it's being accessed correctly (remove in production)
        console.log("TMDB API Key:", apiKey);

        if (!apiKey) {
          throw new Error("API key is missing.");
        }

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
        );

        // Log the API response to inspect its structure
        console.log("API Response Data:", response.data);

        const results = response.data.results || [];

        // Log each video result for debugging
        results.forEach((video, index) => {
          console.log(`Video ${index + 1}:`, video);
        });

        const trailer = results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          console.log("No trailer found for this movie.");
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
      fetchTrailer();
    } else {
      console.log("Invalid movieId provided:", movieId);
      setLoading(false);
    }
  }, [movieId]);

  if (loading) {
    return <p>Loading trailer...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!trailerKey) {
    return <p>No trailer available for this movie.</p>;
  }

  return (
    <div className="trailer-container">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default TrailerViewer;
