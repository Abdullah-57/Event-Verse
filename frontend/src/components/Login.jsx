// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('Attendee');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`/api/users/login/${role}`, { email, password });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'An error occurred');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <select value={role} onChange={(e) => setRole(e.target.value)}>
//           <option value="Attendee">Attendee</option>
//           <option value="Organizer">Organizer</option>
//           <option value="Admin">Admin</option>
//           <option value="Vendor/Sponsor">Vendor/Sponsor</option>
//         </select>
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Attendee');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Replace with the appropriate backend URL if different
      const baseUrl = 'http://localhost:5000';
      const response = await axios.post(`${baseUrl}/api/users/login/${role.toLowerCase()}`, {
        email,
        password,
      });

      setMessage(response.data.message);
      console.log('Login successful:', response.data.user);  // Log the user data received
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      console.error('Login error:', errorMessage);
      setMessage(errorMessage);
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
          <option value="Vendor/Sponsor">Vendor/Sponsor</option>
        </select>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
