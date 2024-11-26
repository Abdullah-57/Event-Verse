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
