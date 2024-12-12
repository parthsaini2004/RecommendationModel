import React, { useState } from 'react';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const response = await fetch('http://localhost:5000/api/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while adding the user.');
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Add User'}
        </button>
      </form>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddUser;
