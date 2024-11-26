import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Attendee');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password, role);
      const response = await axios.post(`http://localhost:5000/api/users/login/${role}`, { email, password });
      setMessage(response.data.message);

      // Assuming the response contains user data (including role)
      const user = response.data.user;
      
      // Save user data to localStorage (or context) for later use
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to the appropriate dashboard based on role
      if (user.role === 'Attendee') {
        navigate('/dashboard/attendee');
      } else if (user.role === 'Organizer') {
        navigate('/dashboard/organizer');
      } else if (user.role === 'Admin') {
        navigate('/dashboard/admin');
      } else if (user.role === 'Sponsor') {
        navigate('/dashboard/sponsor');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Attendee">Attendee</option>
          <option value="Organizer">Organizer</option>
          <option value="Admin">Admin</option>
          <option value="Sponsor">Vendor/Sponsor</option>
        </select>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
