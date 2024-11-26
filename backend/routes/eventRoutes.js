import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// POST: Create a new event
router.post('/', async (req, res) => {
  const { name, description, date } = req.body;

  try {
    const newEvent = new Event({ name, description, date });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ message: 'Error saving event to the database.' });
  }
});

// GET: Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events from the database.' });
  }
});

export default router;
