import React, { useState, useEffect } from 'react';

const DashboardAttendee = () => {
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // Get the user data from localStorage

  // Fetch preferences from the backend
  const fetchPreferences = async () => {
    try {
      // Replace 'http://localhost:5000/api/users/preferences' with your actual API URL if different
      const response = await fetch(`http://localhost:5000/api/users/preferences?email=${user.email}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.preferences) {
        setPreferences(data.preferences); // Set state with fetched preferences
      } else {
        setError('Preferences not found.');
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      setError('An error occurred while fetching preferences.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch preferences when the component mounts
  useEffect(() => {
    fetchPreferences();
  }, []);

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You're logged in as an Attendee!</p>

      {loading ? (
        <p>Loading preferences...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h3>Your Preferences</h3>
          {preferences.length > 0 ? (
            <ul>
              {preferences.map((preference, index) => (
                <li key={index}>{preference}</li>
              ))}
            </ul>
          ) : (
            <p>You have not set any preferences yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAttendee;
