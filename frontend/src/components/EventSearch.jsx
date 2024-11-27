import React, { useState } from 'react';

const EventSearch = () => {
  const [filters, setFilters] = useState({ date: '', location: '', type: '' });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const searchEvents = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:5000/api/events/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching events.');
    }
  };

  const bookEvent = async (eventId) => {
      try {
        
           const user = JSON.parse(localStorage.getItem('user')); // Get the user data from localStorage
            if (!user || !user.email) {
            throw new Error('User email not found. Please log in.');
            }

            const attendeeEmail = user.email; // Extract attendee email from user data
          const tickets = prompt('Enter the number of tickets you want to book:');
          
           if (isNaN(tickets) || tickets <= 0) {
      throw new Error('Invalid number of tickets');
    }

      
      const response = await fetch('http://localhost:5000/api/events/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, tickets: parseInt(tickets, 10), attendeeEmail }),
      });

      if (!response.ok) {
        throw new Error('Failed to book tickets');
      }

      const data = await response.json();
      alert(data.message);
      searchEvents(); // Refresh events after booking
    } catch (err) {
      console.error(err);
      alert('An error occurred while booking tickets.');
    }
  };

  return (
    <div>
      <h2>Event Search</h2>
      <div>
        <label>
          Date:
          <input type="date" name="date" value={filters.date} onChange={handleInputChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={filters.location} onChange={handleInputChange} />
        </label>
        <label>
          Type:
          <input type="text" name="type" value={filters.type} onChange={handleInputChange} />
        </label>
        <button onClick={searchEvents}>Search</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h3>Available Events</h3>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                <p>
                  <strong>{event.name}</strong> - {event.date} - {event.location} - {event.type} - Tickets
                  Available: {event.availableTickets}
                </p>
                <button onClick={() => bookEvent(event._id)}>Book Tickets</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventSearch;
