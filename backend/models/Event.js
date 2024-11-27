import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  availableTickets: { type: Number, required: true },
  attendees: { type: [String], default: [] } // Array of email addresses of attendees
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
