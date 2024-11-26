import React from 'react';

const DashboardAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get the user data from localStorage

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You're logged in as an Admin!</p>
      {/* Add admin-specific content here */}
    </div>
  );
};

export default DashboardAdmin;
