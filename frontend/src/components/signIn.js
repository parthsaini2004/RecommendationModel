import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isIframeVisible, setIsIframeVisible] = useState(false); // Control iframe visibility
  const [isFormVisible, setIsFormVisible] = useState(false); // Control form visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger iframe animation first
    setIsIframeVisible(true);

    // Trigger form animation after a delay
    const formTimer = setTimeout(() => {
      setIsFormVisible(true);
    }, 1000);

    return () => clearTimeout(formTimer);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://recommendationmodelbackend.onrender.com/api/signin",
        { email, password }
      );
      const { token } = response.data;

      // Save token as 'authToken' to localStorage
      localStorage.setItem("authToken", token);

      console.log("Token saved in localStorage:", token); // Log to confirm it's stored

      navigate("/homepage");
    } catch (err) {
      setError(err.response?.data?.error || "Sign-in failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black">
      {/* Iframe as background */}
      <iframe
        src="https://my.spline.design/purpleweb-7bb5aecb1a24aea006447600a629f3a4/"
        frameBorder="0"
        width="100%"
        height="100%"
        className={`absolute top-0 left-0 w-full h-full z-0 transform transition-all duration-200 ease-out ${
          isIframeVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        title="Background Animation"
      ></iframe>

      {/* Sign In Form */}
      <div
        className={`relative max-w-md w-full bg-indigo-50 p-8 rounded-lg shadow-lg z-10 transform transition-all duration-1000 ease-out ${
          isFormVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-600">
          Sign In
        </h2>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200 font-semibold"
            >
              Sign In
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        )}
        <p className="mt-6 text-center text-indigo-600">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
