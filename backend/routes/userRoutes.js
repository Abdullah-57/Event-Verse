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
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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
// router.post('/login/:role', async (req, res) => {
//   const { role } = req.params;
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email, role });
//     if (!user) {
//       return res.status(400).json({ message: `Invalid email or password for ${role}` });
//     }

//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: `Invalid email or password for ${role}` });
//     }

//     res.status(200).json({ message: `${role} login successful`, user });
//   } catch (error) {
//     console.error(`Error during ${role} login:`, error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// Role-specific login
router.post('/login/:role', async (req, res) => {
  const { role } = req.params;
  const { email, password } = req.body;

  try {
    // Log incoming request parameters
    console.log(`Login attempt - Role: ${role}, Email: ${email}, Password: ${password}`);

    // Normalize the role to lowercase (if necessary)
    const roleLower = role.toLowerCase();
    const emailLower = email.trim().toLowerCase(); // Normalize email case and remove leading/trailing spaces

    // Log normalized email and role
    console.log(`Normalized Role: ${roleLower}, Normalized Email: ${emailLower}`);

    // Find the user with the provided email and role
    const user = await User.findOne({ email: emailLower, role: roleLower });
    console.log('User found:', user);

    if (!user) {
      console.log(`No user found for email: ${emailLower} and role: ${roleLower}`);
      return res.status(400).json({ message: `Invalid email or password for ${roleLower}` });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log(`Invalid password for email: ${emailLower}`);
      return res.status(400).json({ message: `Invalid email or password for ${roleLower}` });
    }

    // If login is successful, send the response
    res.status(200).json({ message: `${roleLower} login successful`, user: { _id: user._id, email: user.email } });
  } catch (error) {
    console.error('Error during login process:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



export default router;
