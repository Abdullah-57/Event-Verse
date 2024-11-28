import React, { useState } from 'react';

const EventCreation = ({ organizerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    type: '',
    availableTickets: 0,
     amount: 0, // Add amount field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, organizerId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Event created successfully!');
      } else {
        alert(data.message || 'Failed to create event.');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      alert('An error occurred while creating the event.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </label>
      <label>
        Type:
        <input type="text" name="type" value={formData.type} onChange={handleChange} required />
      </label>
      <label>
        Available Tickets:
        <input
          type="number"
          name="availableTickets"
          value={formData.availableTickets}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Amount per Ticket (in cents):
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
        />
      </label>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventCreation;
