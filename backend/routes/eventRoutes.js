import express from "express";
import Event from "../models/Event.js";
import User from "../models/User.js"; // Ensure User model is imported
import Stripe from "stripe";
import PDFDocument from "pdfkit";

const stripe = Stripe(
  "sk_test_51QPnXdJyiSSWZbn6eBB6RtOKnFmmuFpsn47p42om9ZmIxz63fJ1iWTrwPF9gsy0cpor7cqZsBbplNjvOnEHCpXzV006Alo1R5W"
);

const router = express.Router();

// Route: Download E-Ticket
router.post("/download-ticket", async (req, res) => {
  const { eventId, attendeeEmail } = req.body;

  try {
    // Validate input
    if (!eventId || !attendeeEmail) {
      return res
        .status(400)
        .json({ message: "Event ID and attendee email are required." });
    }

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Check if the attendee is registered
    if (!event.attendees.includes(attendeeEmail)) {
      return res
        .status(404)
        .json({ message: "No booking found for the provided email." });
    }

    // Generate PDF E-Ticket
    const doc = new PDFDocument();
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(chunks);
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="E-Ticket-${eventId}.pdf"`,
      });
      res.send(pdfBuffer);
    });

    // Add E-Ticket content
    doc.fontSize(20).text("E-Ticket", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Event Name: ${event.name}`);
    doc.text(`Date: ${event.date.toDateString()}`);
    doc.text(`Location: ${event.location}`);
    doc.text(`Type: ${event.type}`);
    doc.text(`Ticket Price: $${(event.amount / 100).toFixed(2)}`);
    doc.moveDown();
    doc.text(`Attendee: ${attendeeEmail}`);
    doc.moveDown();
    doc.text("Thank you for booking with us!");
    doc.end();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while generating the E-Ticket." });
  }
});

// Fetch events with optional filters (date, location, type)
router.get("/search", async (req, res) => {
  try {
    const { date, location, type } = req.query;

    const filter = {};
    if (date) filter.date = new Date(date);
    if (location) filter.location = location;
    if (type) filter.type = type;

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Book tickets for an event
router.post("/book", async (req, res) => {
  try {
    const { eventId, tickets, attendeeEmail } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableTickets < tickets) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    // Calculate the total amount (in cents) for the selected number of tickets
    const totalAmount = event.amount * tickets;

    // Ensure attendees is always an array
    if (!Array.isArray(event.attendees)) {
      event.attendees = [];
    }

    // Check if attendee is already registered
    if (event.attendees.includes(attendeeEmail)) {
      return res
        .status(400)
        .json({ message: "You are already registered for this event" });
    }

    // Add the attendee to the event's list
    event.attendees.push(attendeeEmail);

    // Subtract the number of booked tickets from availableTickets
    event.availableTickets -= tickets;

    // Save the updated event
    await event.save();

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      description: `Booking ${tickets} tickets for ${event.name}`,
      receipt_email: attendeeEmail,
    });

    // Respond with the client secret from the payment intent
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      eventId,
      tickets,
      attendeeEmail,
      totalAmount,
    });
  } catch (error) {
    console.error("Error booking tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new event (Organizer only)
router.post("/create", async (req, res) => {
  try {
    const {
      name,
      date,
      location,
      type,
      availableTickets,
      amount,
      organizerid,
    } = req.body;

    // Verify that the user is an Organizer
    const organizer = await User.findOne({
      _id: organizerid,
      role: "Organizer",
    });

    console.log(organizer);

    if (!organizer) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only organizers can create events" });
    }

    const event = new Event({
      name,
      date,
      location,
      type,
      availableTickets,
      amount,
      createdBy: organizerid,
      organizerName: organizer.name,
      isEnded: false,
    });

    await event.save();

    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch all events created by the organizer
router.get("/organizer/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const organizer = await User.findOne({ email, role: "Organizer" });
    if (!organizer) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only organizers can view this data" });
    }

    const events = await Event.find({ organizerEmail: email });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching organizer events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch registered events for an attendee
router.get("/registered-events/:email", async (req, res) => {
  try {
    const attendeeEmail = req.params.email;

    // Fetch events where the attendee is registered
    const registeredEvents = await Event.find({ attendees: attendeeEmail });

    res.status(200).json({ registeredEvents });
  } catch (error) {
    console.error("Error fetching registered events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch all events
router.get("/all-events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch events." });
  }
});

// Route to end an event
router.put("/end-event/:id", async (req, res) => {
  const { id } = req.params;
  const { organizerId } = req.body;

  try {
    // Find the event
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    // Check if the organizer is the creator of the event
    if (event.createdBy.toString() !== organizerId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to end this event." });
    }

    // Mark the event as ended
    event.isEnded = true;
    await event.save();

    res.status(200).json({ message: "Event ended successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to end the event." });
  }
});

//route toedit event by specific organizer who created it
router.put("/edit-event/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, location, type, availableTickets, amount } = req.body;
  const { organizerId } = req.body;
  try {
    // Find the event
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    // Check if the organizer is the creator of the event
    if (event.createdBy.toString() !== organizerId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this event." });
    }
    // Update the event
    event.name = name;
    event.date = date;
    event.location = location;
    event.type = type;
    event.availableTickets = availableTickets;

    await event.save();
    res.status(200).json({ message: "Event updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update the event." });
  }
});

export default router;
