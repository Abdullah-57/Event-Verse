import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  availableTickets: { type: Number, required: true },
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
