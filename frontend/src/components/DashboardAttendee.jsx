import React, { useState, useEffect } from 'react';
import EventSearch from './EventSearch';
import EventDashboard from './EventDashboard';

const DashboardAttendee = () => {
   const [activeSection, setActiveSection] = useState('dashboard'); // Track the active section
  const [showEventSearch, setShowEventSearch] = useState(false);
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



    // Render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'search':
        return <EventSearch />;
      case 'events':
        return <EventDashboard />;
      default:
        return (
          <>
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
            <p>Dashboard content here...</p>
          </>
        );
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You're logged in as an Attendee!</p>


      <nav>
        <button onClick={() => setActiveSection('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveSection('search')}>Search Events</button>
        <button onClick={() => setActiveSection('events')}>Registered Events</button>
      </nav>

      <div>{renderContent()}</div>
    
    </div>
  );
};

export default DashboardAttendee;
