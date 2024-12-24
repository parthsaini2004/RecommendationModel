import React, { useState } from 'react';

const FetchUser = () => {
  
  // State to store the user email, response data, error, and loading status
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  // Function to handle the API call
  const fetchUserData = async () => {
    if (!email) {
      setError('Please enter an email address.');
      setUserData(null);
      return;
    }

    setLoading(true); // Set loading to true
    setError(null); // Clear any previous error
    setUserData(null); // Clear previous user data

    try {
      const response = await fetch(`${baseUrl}/api/fetch-users`, {
        method: 'GET', // Use GET to fetch all users
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const user = data.find((user) => user.email === email.trim()); // Find user by email
        if (user) {
          setUserData(user); // Store the found user in state
        } else {
          setError('User not found.');
        }
      } else {
        setError('Error fetching users.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while fetching user data.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Fetch User Data</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={fetchUserData}
        disabled={loading}
        className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
          loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {loading ? 'Fetching...' : 'Fetch User'}
      </button>

      {userData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">User Information:</h3>
          <p className="text-gray-700">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {userData.email}
          </p>
          {/* Add more fields as necessary */}
        </div>
      )}
      {error && (
        <p className="text-red-500 mt-4 text-center">
          {error}
        </p>
      )}
    </div>
  );
};

export default FetchUser;
