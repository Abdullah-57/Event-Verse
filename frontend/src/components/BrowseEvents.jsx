import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaTicketAlt,
  FaGlobe,
} from "react-icons/fa";

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ date: "", location: "", type: "" });
  const [selectedTickets, setSelectedTickets] = useState({});

  const imageList = [
    "/images/events/classicalSerenade.png",
    "/images/events/countryLegends.png",
    "/images/events/Marathon.png",
    "/images/events/RockFestival.png",
    "/images/events/ElectricSymphony.png",
    "/images/events/MelodyMania.png",
    "/images/events/MetroPolisMarathon.png",
    "/images/events/musicalFusion.png",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/events/all-events"
        );
        const data = await response.json();

        // Assign a random image to each event and set the events state
        const activeEvents = data
          .filter((event) => !event.isEnded)
          .map((event) => ({
            ...event,
            image: imageList[Math.floor(Math.random() * imageList.length)],
          }));

        setEvents(activeEvents);
        setFilteredEvents(activeEvents);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setFilteredEvents(
      events.filter((event) => {
        const matchesDate =
          !filters.date ||
          new Date(event.date).toLocaleDateString() === filters.date;
        const matchesLocation =
          !filters.location ||
          event.location.toLowerCase().includes(filters.location.toLowerCase());
        const matchesType =
          !filters.type ||
          event.type.toLowerCase().includes(filters.type.toLowerCase());
        return matchesDate && matchesLocation && matchesType;
      })
    );
  };

  const handleTicketChange = (eventId, count) => {
    setSelectedTickets((prev) => ({ ...prev, [eventId]: count }));
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(242, 98, 152, 0.3), rgba(242, 98, 152, 0.7)), url('./images/login_bc.png')`,
        backgroundSize: "cover",
      }}
    >
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="loader border-t-4 border-b-4 border-yellow-400 h-12 w-12 rounded-full animate-spin"></div>
        </div>
      )}

      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 animate-bounce">
          Discover <span className="text-yellow-400">Events</span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-100">
          Explore and book tickets for exciting events near you.
        </p>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-indigo-300" />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-3 text-indigo-300" />
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Filter by Location"
              className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="relative">
            <FaGlobe className="absolute left-3 top-3 text-indigo-300" />
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="Filter by Type"
              className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
        <button
          onClick={applyFilters}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-full transition-transform transform hover:scale-105"
        >
          Apply Filters
        </button>
      </div>

      {/* Event List */}
      <section className="container mx-auto px-6 py-10">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-lg">No events match your criteria!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-gray-900 text-white p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-center text-2xl font-bold mb-2 text-yellow-400 uppercase">
                  {event.name}
                </h3>
                <p className="text-sm mb-2">
                  <FaCalendarAlt className="inline-block mr-2 text-indigo-300" />
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm mb-2">
                  <FaMapMarkerAlt className="inline-block mr-2 text-indigo-300" />
                  {event.location}
                </p>
                <p className="text-sm mb-2">
                  <FaGlobe className="inline-block mr-2 text-indigo-300" />
                  {event.type}
                </p>
                <p className="text-sm mb-2">
                  <FaDollarSign className="inline-block mr-2 text-indigo-300" />
                  ${event.amount}
                </p>
                <p className="text-sm mb-4">
                  <FaTicketAlt className="inline-block mr-2 text-indigo-300" />
                  {event.availableTickets} Tickets Available
                </p>
                <input
                  type="number"
                  min="1"
                  max={event.availableTickets}
                  placeholder="Tickets to Buy"
                  className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
                  onChange={(e) =>
                    handleTicketChange(event._id, e.target.value)
                  }
                />
                <div className="flex justify-center">
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                    onClick={() =>
                      alert(
                        `Total Price: $${
                          event.amount * (selectedTickets[event._id] || 0)
                        }`
                      )
                    }
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BrowseEvents;
