import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const ContactPage = () => {
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
      <header className="text-center py-16">
        <h2 className="text-5xl font-extrabold mb-4 animate-bounce">
          Get in Touch
        </h2>
        <p className="text-lg max-w-3xl mx-auto">
          We’d love to hear from you! Whether you’re an attendee, organizer, or
          vendor, our team is here to help you with any queries or support.
        </p>
      </header>
      {/* Contact Form Section */}
      <section className="py-10 bg-white text-black rounded-t-3xl">
        <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg bg-gray-100">
          <h3 className="text-3xl font-bold text-center mb-8 text-purple-600">
            Contact Us
          </h3>
          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Your Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Subject Input */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter subject"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-lg font-semibold mb-2">
                Message
              </label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your message here"
                rows="5"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      {/* Additional Info Section */}
      <section className="py-10 text-center">
        <h3 className="text-3xl font-bold mb-4">Our Contact Information</h3>
        <p className="text-lg mb-6">
          Feel free to reach us through the following channels:
        </p>
        <div className="space-y-4">
          <p className="flex items-center justify-center gap-2">
            <span className="font-bold">Email:</span>
            <a
              href="mailto:support@eventverse.com"
              className="text-yellow-300 hover:text-yellow-400 transition"
            >
              support@eventverse.com
            </a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="font-bold">Phone:</span>
            <a
              href="tel:+1234567890"
              className="text-yellow-300 hover:text-yellow-400 transition"
            >
              +1 234 567 890
            </a>
          </p>
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

export default ContactPage;
