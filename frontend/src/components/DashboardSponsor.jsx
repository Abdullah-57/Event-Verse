import React from 'react';

const DashboardSponsor = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get the user data from localStorage

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You're logged in as a Vendor/Sponsor!</p>
      {/* Add sponsor-specific content here */}
    </div>
  );
};

export default DashboardSponsor;
