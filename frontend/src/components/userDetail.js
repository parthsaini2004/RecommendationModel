import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/user-details', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h3>View Details</h3>
      <p>Movies Watched: {user.viewDetails.moviesWatched}</p>
      <p>Recently Watched: {user.viewDetails.recentlyWatched}</p>
      <p>Recently Viewed At: {user.viewDetails.recentlyViewedAt}</p>
      <h4>Movie List:</h4>
      <ul>
        {user.viewDetails.movieList.map((movie) => (
          <li key={movie.movieId}>
            {movie.movieTitle} (Frequency: {movie.frequency})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
