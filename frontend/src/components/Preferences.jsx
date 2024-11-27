import React, { useState } from 'react';

const Preferences = ({ email }) => {
  const [preferences, setPreferences] = useState([]);
  const [currentPreference, setCurrentPreference] = useState('');
  const [message, setMessage] = useState('');

  const addPreference = () => {
    if (currentPreference.trim()) {
      setPreferences([...preferences, currentPreference.trim()]);
      setCurrentPreference('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, preferences }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Preferences saved successfully!');
      } else {
        setMessage(data.message || 'An error occurred while saving preferences.');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Set Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter a preference"
            value={currentPreference}
            onChange={(e) => setCurrentPreference(e.target.value)}
          />
          <button type="button" onClick={addPreference}>
            Add Preference
          </button>
        </div>
        <ul>
          {preferences.map((pref, index) => (
            <li key={index}>{pref}</li>
          ))}
        </ul>
        <button type="submit">Save Preferences</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Preferences;
