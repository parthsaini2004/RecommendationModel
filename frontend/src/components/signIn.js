import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post('https://recommendationmodelbackend.onrender.com/api/signin', { email, password });
      const { token } = response.data;
  
      // Save token as 'authToken' to localStorage
      localStorage.setItem('authToken', token);  // Make sure the token is saved as 'authToken'
  
      console.log('Token saved in localStorage:', token); // Log to confirm it's stored
  
      navigate('/homepage');
    } catch (err) {
      setError(err.response?.data?.error || 'Sign-in failed');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-4 text-red-600 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
