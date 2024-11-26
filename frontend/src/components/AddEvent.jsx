import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/events', formData);
      alert('Event added successfully!');
      console.log('Added event:', response.data);
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event.');
    }
  };

  return (
    <div>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="description"
          placeholder="Event Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
