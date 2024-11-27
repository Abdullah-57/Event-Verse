import React from 'react';
import { Link } from 'react-router-dom';

const DashboardOrganizer = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get the user data from localStorage

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You're logged in as an Organizer!</p>
      
      {/* Navigation to Event Creation */}
      <div>
        <h3>Organizer Tools</h3>
        <ul>
          <li>
            <Link to="/organizer/create-event">Create a New Event</Link>
          </li>
          {/* Add other tools as needed */}
        </ul>
      </div>
    </div>
  );
};

export default DashboardOrganizer;
