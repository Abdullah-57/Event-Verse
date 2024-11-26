import React from 'react';

const DashboardAttendee = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get the user data from localStorage

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You're logged in as an Attendee!</p>
      {/* Add attendee-specific content here */}
    </div>
  );
};

export default DashboardAttendee;
