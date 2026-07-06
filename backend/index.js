const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB (AfricanCapitals)'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const app = express();
const PORT = process.env.PORT || 5000;

const africanCountries = require('./data');
const User = require('./models/User');

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('African Capitals Backend API is running!');
});

// Example API Route
app.get('/api/status', (req, res) => {
  res.json({ status: 'success', message: 'Backend is connected to the frontend!' });
});

// Capitals Endpoint
app.get('/api/capitals', (req, res) => {
  res.json(africanCountries);
});

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Tafadhali jaza sehemu zote (All fields are required)' });
  }
  
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Barua pepe hii tayari inatumika (User already exists)' });
    }
    
    // Create user
    const newUser = new User({ name, email, password });
    await newUser.save();
    
    res.status(201).json({ message: 'Usajili umekamilika kikamilifu!', user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Hitilafu imetokea (Server error)' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Tafadhali jaza barua pepe na nenosiri (Email and password required)' });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Barua pepe au nenosiri si sahihi (Invalid credentials)' });
    }
    
    // In a real app, compare hashed passwords. Assuming plain text for this simple app based on register.
    if (user.password !== password) {
      return res.status(400).json({ error: 'Barua pepe au nenosiri si sahihi (Invalid credentials)' });
    }
    
    res.status(200).json({ message: 'Umefanikiwa kuingia (Login successful)!', user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Hitilafu imetokea (Server error)' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
