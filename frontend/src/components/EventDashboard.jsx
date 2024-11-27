import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get attendee details
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/registered-events/${user.email}`
        );
        setEvents(response.data.registeredEvents);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching registered events:', err);
        setError('Unable to fetch registered events.');
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, [user.email]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{user.name}'s Event Dashboard</h2>
      <h3>Registered Events</h3>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              <h4>{event.name}</h4>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Location: {event.location}</p>
              <p>Type: {event.type}</p>
              <button onClick={() => alert(JSON.stringify(event, null, 2))}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No registered events found.</p>
      )}
    </div>
  );
};

export default EventDashboard;
