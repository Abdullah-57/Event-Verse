import React, { useState } from 'react';
import Preferences from './Preferences';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Attendee', // Default role; you can make this dynamic if needed.
  });

  const [message, setMessage] = useState('');
  const [showPreferences, setShowPreferences] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Signup successful!');
        if (formData.role === 'Attendee') {
          setShowPreferences(true);
        }
      } else {
        setMessage(data.message || 'An error occurred during signup.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Signup error:', error);
    }
  };

   if (showPreferences) {
    return <Preferences email={formData.email} />;
  }


  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Attendee">Attendee</option>
          <option value="Organizer">Organizer</option>
          <option value="Admin">Admin</option>
          <option value="Sponsor">Vendor/Sponsor</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
