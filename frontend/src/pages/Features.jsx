import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const FeaturesPage = () => {
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

      {/* Header */}
      <header className="text-center py-20">
        <h2 className="text-5xl font-extrabold mb-4 animate-bounce">
          Explore Our Features
        </h2>
        <p className="text-lg mb-10 max-w-3xl mx-auto">
          Discover how EventVerse empowers attendees, organizers, and vendors to
          create seamless event experiences. From planning to execution, we’ve
          got you covered.
        </p>
      </header>

      {/* Features Section */}
      <section className="py-10 bg-white text-black rounded-t-3xl">
        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {/* Feature 1: Attendee Module */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Attendee Module
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Secure user registration and login.</li>
              <li>Search and book events with filters.</li>
              <li>Download e-tickets with QR-code-based check-in.</li>
              <li>Provide feedback and view past interactions.</li>
            </ul>
          </div>

          {/* Feature 2: Organizer Module */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Organizer Module
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Create and manage events seamlessly.</li>
              <li>Set ticket types, pricing, and availability.</li>
              <li>Track attendee details and respond to queries.</li>
              <li>Access real-time analytics and feedback.</li>
            </ul>
          </div>

          {/* Feature 3: Admin Module */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Admin Module
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Approve events and manage users.</li>
              <li>Generate reports on event metrics and user activity.</li>
              <li>Handle complaints and feedback moderation.</li>
              <li>Monitor overall platform growth and analytics.</li>
            </ul>
          </div>

          {/* Feature 4: Vendor Module */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Vendor Module
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Secure vendor registration and profile setup.</li>
              <li>Bid for event contracts with transparency.</li>
              <li>Track payment statuses for services.</li>
              <li>Engage in sponsorships effectively.</li>
            </ul>
          </div>

          {/* Feature 5: Payment Integration */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Payment Integration
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Secure and seamless ticket purchases.</li>
              <li>Support for multiple payment gateways (Stripe, PayPal).</li>
              <li>Transparent tracking of all transactions.</li>
            </ul>
          </div>

          {/* Feature 6: Event Analytics */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-600">
              Event Analytics
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Detailed reports on attendee feedback.</li>
              <li>Real-time ticket sales tracking.</li>
              <li>Insights into attendee engagement.</li>
              <li>Data-driven recommendations for future events.</li>
            </ul>
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

export default FeaturesPage;
