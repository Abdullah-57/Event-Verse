import React from 'react';
import AddEvent from './components/AddEvent';
import EventList from './components/EventList';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Event-Verse</h1>
      <button onClick={() => navigate('/signup')}>Go to Signup</button>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
