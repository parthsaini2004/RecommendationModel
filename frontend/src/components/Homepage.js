import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import RecentlyViewedMovie from './RecentlyViewedMovie';
import MovieDetailsFetcher from './MovieDetailsFetcher';
import TrailerViewer from './TrailerViewer';
import SearchElement from './searchElement';

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieIds, setMovieIds] = useState([]);
  const [recentlyWatchedMovie, setRecentlyWatchedMovie] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isDescription, setIsDescription] = useState('');
  const [searching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          console.log('Token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://recommendationmodelbackend.onrender.com/api/user-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data.user;
        setUser(userData);

        if (userData?.viewDetails?.movieList) {
          let uniqueMovieIds = userData.viewDetails.movieList.map((movie) => movie.movieId);

          if (recentlyWatchedMovie) {
            const movieIndex = uniqueMovieIds.indexOf(recentlyWatchedMovie);
            if (movieIndex !== -1) {
              uniqueMovieIds.splice(movieIndex, 1);
            }
            // uniqueMovieIds.push(recentlyWatchedMovie);
          }

          setMovieIds(uniqueMovieIds);
        }

        if (userData.viewDetails) {
          setRecentlyWatchedMovie(userData.viewDetails.recentlyWatched);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [recentlyWatchedMovie, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <span className="text-lg text-gray-700 font-semibold">
            Loading, please wait...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] min-h-screen pt-1">
      {user ? (
        <>

          <Navbar user={user}
            setIsSearching={setIsSearching}
            setSearchValue={setSearchValue}

          />
          {isFocused && (<TrailerViewer
            movieId={recentlyWatchedMovie}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            isDescription={isDescription}
            setIsDescription={setIsDescription}
            user={user}
            setUser={setUser}
            movieIds={movieIds}
          />)}

          {searching ? (

            <SearchElement
              searchValue={searchValue}
              user={user} // Pass the user state
              setUser={setUser} // Pass the setUser function
              setIsFocused={setIsFocused} // Pass the setIsFocused function
            />


          ) : (
            <>

              {!isFocused && (
                <>
                  {user.viewDetails && user.viewDetails.recentlyWatched && (

                    <RecentlyViewedMovie movieId={user.viewDetails.recentlyWatched} isFocused={isFocused}
                      setIsFocused={setIsFocused} />

                  )}

                  <MovieDetailsFetcher
                    movieIds={movieIds}
                    recentlyWatchedMovie={recentlyWatchedMovie}
                    user={user}
                    setUser={setUser}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                  />


                </>
              )
              }

            </>)
          }


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
