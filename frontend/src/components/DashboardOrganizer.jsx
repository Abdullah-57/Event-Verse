import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const OrganizerDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center p-5">
          <h1 className="text-3xl font-bold text-white">
            <NavLink to="/">EventVerse</NavLink>
          </h1>
          <div className="hidden md:flex gap-6 text-lg">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition duration-300 text-white"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/organizer/create-event"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition duration-300 text-white"
              }
            >
              Create Event
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition duration-300 text-white"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition duration-300 text-white"
              }
            >
              Logout
            </NavLink>
          </div>
          {/* Hamburger Menu */}
          <button
            className="block md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        {/* Dropdown Menu for Mobile */}
        {isMenuOpen && (
          <ul className="md:hidden bg-gray-700 text-white text-lg">
            <li className="border-b border-gray-600">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 text-yellow-400 bg-gray-800"
                    : "block py-3 px-5 hover:bg-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="border-b border-gray-600">
              <NavLink
                to="/create-event"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 text-yellow-400 bg-gray-800"
                    : "block py-3 px-5 hover:bg-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Create Event
              </NavLink>
            </li>
            <li className="border-b border-gray-600">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 text-yellow-400 bg-gray-800"
                    : "block py-3 px-5 hover:bg-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 text-yellow-400 bg-gray-800"
                    : "block py-3 px-5 hover:bg-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        )}
      </nav>

      {/* Header */}
      <header className="text-center py-20">
        <h2 className="text-5xl font-extrabold mb-6 animate-bounce">
          Welcome, Organizer
        </h2>
        <p className="text-lg max-w-2xl mx-auto">
          Manage your events, track sales, and engage with attendees all from
          one place.
        </p>
      </header>

      {/* Main Dashboard */}
      <section className="px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Event Management */}
          <div className="bg-gray-100 text-black p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Manage Events</h3>
            <p>
              View, edit, or delete events you've created. Keep track of event
              schedules and details in one place.
            </p>
            <Link
              to="/manage-events"
              className="block mt-4 text-center bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition"
            >
              Go to Events
            </Link>
          </div>

          {/* Card 2: Ticket Sales */}
          <div className="bg-gray-100 text-black p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Ticket Sales</h3>
            <p>
              Monitor ticket sales, track revenue, and ensure attendees can
              access your events without issues.
            </p>
            <Link
              to="/ticket-sales"
              className="block mt-4 text-center bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition"
            >
              View Sales
            </Link>
          </div>

          {/* Card 3: Analytics */}
          <div className="bg-gray-100 text-black p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Event Analytics</h3>
            <p>
              Gain insights into event performance with real-time analytics and
              feedback from attendees.
            </p>
            <Link
              to="/analytics"
              className="block mt-4 text-center bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition"
            >
              View Analytics
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p>© 2024 EventVerse. All rights reserved.</p>
        <div className="flex justify-center gap-5 mt-4">
          <a href="#" className="hover:text-yellow-400">
            Facebook
          </a>
          <a href="#" className="hover:text-yellow-400">
            Twitter
          </a>
          <a href="#" className="hover:text-yellow-400">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default OrganizerDashboard;
