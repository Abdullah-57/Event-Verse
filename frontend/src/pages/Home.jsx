import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Home = () => {
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
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition duration-300 text-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition duration-300 text-white"
              }
            >
              Features
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition duration-300 text-white"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition duration-300 text-white"
              }
            >
              Contact
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
        {isMenuOpen && (
          <ul className="md:hidden bg-gray-700 text-white text-lg">
            <li className="border-b border-gray-600">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 text-yellow-400 bg-gray-800"
                    : "block py-3 px-5 hover:bg-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="border-b border-gray-600">
              <NavLink
                to="/features"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 text-yellow-400 bg-gray-800"
                    : "block py-3 px-5 hover:bg-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </NavLink>
            </li>
            <li className="border-b border-gray-600">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 text-yellow-400 bg-gray-800"
                    : "block py-3 px-5 hover:bg-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 text-yellow-400 bg-gray-800"
                    : "block py-3 px-5 hover:bg-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20">
        <h2 className="text-5xl font-extrabold mb-6 animate-bounce">
          Welcome to EventVerse
        </h2>
        <p className="text-lg mb-10 max-w-3xl mx-auto">
          Your one-stop solution for organizing and managing events
          effortlessly. From booking to analytics, we have everything covered
          for you.
        </p>
        <Link to="/login">
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-full text-xl font-semibold shadow-lg transition duration-300">
            Get Started
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white text-black rounded-t-3xl">
        <h2 className="text-center text-4xl font-bold mb-10">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Attendee Management</h3>
            <p>
              Effortlessly register attendees, manage bookings, and track event
              check-ins with our seamless interface.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Organizer Tools</h3>
            <p>
              Create and manage events, sell tickets, and access insightful
              analytics with just a few clicks.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4">Vendor/Sponsor Module</h3>
            <p>
              Allow vendors and sponsors to engage in event contracts and track
              payment transparently.
            </p>
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

export default Home;
