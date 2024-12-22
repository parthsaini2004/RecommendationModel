import React, { useState } from 'react';

const ProcessInputComponent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input) {
      setError('Input is required');
      setOutput([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://recommendationmodelbackend.onrender.com/api/process-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.result);
        setError('');
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to communicate with the backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Process Input with Python</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for Python"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md transition duration-200 ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {output.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center mb-2">Output from Python:</h3>
          <ul className="list-disc pl-6">
            {output.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProcessInputComponent;
