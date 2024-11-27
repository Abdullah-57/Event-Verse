import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js'; // Ensure User model is imported

const router = express.Router();

// Fetch events with optional filters (date, location, type)
router.get('/search', async (req, res) => {
  try {
    const { date, location, type } = req.query;

    const filter = {};
    if (date) filter.date = new Date(date);
    if (location) filter.location = location;
    if (type) filter.type = type;

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Book tickets for an event
router.post('/book', async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableTickets < tickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    event.availableTickets -= tickets;
    await event.save();

    res.status(200).json({ message: 'Tickets booked successfully', event });
  } catch (error) {
    console.error('Error booking tickets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Create a new event (Organizer only)
router.post('/create', async (req, res) => {
  try {
    const { name, date, location, type, availableTickets } = req.body;

    // Verify that the user is an Organizer
    const organizer = await User.findOne({ role: 'Organizer' });

    console.log(organizer);

    if (!organizer) {
      return res.status(403).json({ message: 'Unauthorized: Only organizers can create events' });
    }

    const event = new Event({
      name,
      date,
      location,
      type,
      availableTickets,
    });

    await event.save();

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch all events created by the organizer
router.get('/organizer/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const organizer = await User.findOne({ email, role: 'Organizer' });
    if (!organizer) {
      return res.status(403).json({ message: 'Unauthorized: Only organizers can view this data' });
    }

    const events = await Event.find({ organizerEmail: email });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching organizer events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





export default router;
