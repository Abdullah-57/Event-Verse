import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardOrganizer = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user data
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch all events
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/events/all-events"
        );
        const data = await response.json();
        console.log("Fetched Events:", data); // Debug fetched events
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchEvents();
  }, []);

  // End an event
  const handleEndEvent = async (eventId) => {
    try {
      if (!user || !user._id) {
        alert("User not logged in. Please log in again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/events/end-event/${eventId}`, // Fix the endpoint URL
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ organizerId: user._id }), // Pass user._id as organizerId
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Update UI to mark the event as ended
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === eventId ? { ...event, isEnded: true } : event
          )
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Failed to end event:", err);
    }
  };

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>You're logged in as an Organizer!</p>
      <div>
        <h3>Organizer Tools</h3>
        <ul>
          <li>
            <Link to="/organizer/create-event">Create a New Event</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>All Events</h3>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                <strong>{event.name}</strong> -{" "}
                {new Date(event.date).toLocaleDateString()} - {event.location}
                <span> (Organizer: {event.createdBy})</span>
                {event.isEnded ? (
                  <span> (Ended)</span>
                ) : event.createdBy === user._id ? ( // Check if event was created by logged-in user
                  <button onClick={() => handleEndEvent(event._id)}>
                    End Event
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardOrganizer;
