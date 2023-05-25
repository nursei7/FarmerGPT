const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, farmType, location } = req.body;

  // Check if user with the same email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    farmType,
    location,
  });

  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
};


const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }
  
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      const hashed = await bcrypt.hash(password, 0);
      // console.log(hashed);
      // console.log(existingUser.password);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Authentication successful
    res.status(200).json({ message: 'Logged in successfully' });
  };

module.exports = {
    register,
    login,
};
