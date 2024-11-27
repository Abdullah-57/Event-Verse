import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/preferences', async (req, res) => {
  try {
    const { email } = req.query; // Use query parameters for GET requests

    const user = await User.findOne({ email, role: 'Attendee' });
    if (!user) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// userRoutes.js
router.put('/preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body;

    const user = await User.findOne({ email, role: 'Attendee' });
    if (!user) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    user.preferences = preferences;
    await user.save();

    res.status(200).json({ message: 'Preferences saved successfully', preferences: user.preferences });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Role-specific login
router.post('/login/:role', async (req, res) => {
  const { role } = req.params;
    const { email, password } = req.body;
    
    console.log(email, password, role);

  try {
      const user = await User.findOne({ email, role });

      console.log(user);

    if (!user) {
      return res.status(400).json({ message: `Invalid email or password for ${role}` });
    }

      const isPasswordValid = await user.comparePassword(password);

      console.log(isPasswordValid);
      
    if (!isPasswordValid) {
      return res.status(400).json({ message: `Invalid email or password for ${role}` });
      }
      
      if (user && (await user.comparePassword(password))) {
          res.status(200).json({ message: `${role} login successful`, user });
      };
  } catch (error) {
    console.error(`Error during ${role} login:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
