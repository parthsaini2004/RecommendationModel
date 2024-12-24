// import React, { useState } from 'react';

// const AddUser = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page refresh on form submit

//     if (!name || !email || !password) {
//       setError('All fields are required.');
//       setSuccess(null);
//       return;
//     }

//     const userData = { name, email, password };

//     try {
//       setLoading(true);
//       const response = await fetch('https://recommendationmodelbackend.onrender.com/api/add-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('User added successfully!');
//         setError(null);
//         setName('');
//         setEmail('');
//         setPassword('');
//       } else {
//         setError(data.message || 'Failed to add user.');
//         setSuccess(null);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred while adding the user.');
//       setSuccess(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold text-center mb-6">Add New User</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 text-white rounded-md transition duration-200 ${
//               loading
//                 ? 'bg-blue-300 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {loading ? 'Submitting...' : 'Add User'}
//           </button>
//         </div>
//       </form>
//       {success && (
//         <p className="mt-4 text-green-600 text-center">{success}</p>
//       )}
//       {error && (
//         <p className="mt-4 text-red-600 text-center">{error}</p>
//       )}
//     </div>
//   );
// };

// export default AddUser;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are required.');
      setSuccess(null);
      return;
    }

    const userData = { name, email, password };

    try {
      setLoading(true);
      const response = await fetch('https://recommendationmodelbackend.onrender.com/api/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('User added successfully!');
        setError(null);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(data.message || 'Failed to add user.');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while adding the user.');
      setSuccess(null);
    } finally {
      setLoading(false);
      navigate("/signin");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-indigo-900 to-black">
      <div className="w-full max-w-md p-8 bg-black bg-opacity-80 border border-indigo-700 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-indigo-200 bg-transparent border border-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-indigo-200 bg-transparent border border-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Set Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-indigo-200 bg-transparent border border-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white transition duration-200 ${
                loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Submitting...' : 'Sign Up'}
            </button>
          </div>
        </form>
        {success && (
          <p className="mt-4 text-center text-green-400 font-medium">{success}</p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-400 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AddUser;
