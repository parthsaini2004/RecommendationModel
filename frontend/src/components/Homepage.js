import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import RecentlyViewedMovie from './RecentlyViewedMovie'; // Import the new component

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');  // Ensure you're using the same key 'authToken'
  
        if (!token) {
          console.log('Token not found');
          setLoading(false);
          return; // If token is not found, don't try to fetch user details
        }
  
        // Ensure the token is sent with 'Bearer' prefix
        const response = await axios.get('http://localhost:5000/api/user-details', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);  // Stop loading state after request is complete
      }
    };
  
    fetchUserDetails();
  }, []);  // Empty array ensures this runs only once when the component mounts
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#000000] min-h-screen pt-1">
      {user ? (
        <>
          <Navbar user={user} />
          {user.viewDetails && user.viewDetails.recentlyWatched && (
            <div className="px-3 ml-5 max-w-xl mx-auto my-1 cursor-pointer sh">
              <div className=" items-center gap-4 relative ">
                <p className="text-3xl font-semibold text-white text-left mt-[30px] px-[118px]">Recently Viewed:</p>
                <RecentlyViewedMovie movieId={user.viewDetails.recentlyWatched} />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg">
            <p className="text-center text-xl text-gray-700 font-semibold mb-4">
              Please sign in to access your recommendations.
            </p>
            <p className="text-gray-500 text-center">
              You will be able to personalize your movie recommendations once logged in.
            </p>
            <Link to="/">
              <p className="text-center shadow-lg shadow-slate-900 rounded-lg px-1 mt-5 mx-48 py-4 pt-4 text-xl text-gray-700 font-semibold">
                Sign In
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
