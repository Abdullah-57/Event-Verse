import React from 'react';
import AddEvent from './components/AddEvent';
import EventList from './components/EventList';

const App = () => {
  return (
    <div>
      <h1>Event-Verse</h1>
      <AddEvent />
      <EventList />
    </div>
  );
};

export default App;
