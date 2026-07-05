const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const africanCountries = require('./data');

// In-memory user store (For demo purposes)
const users = [];

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
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Tafadhali jaza sehemu zote (All fields are required)' });
  }
  
  // Check if user already exists
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Barua pepe hii tayari inatumika (User already exists)' });
  }
  
  // Create user
  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  
  res.status(201).json({ message: 'Usajili umekamilika kikamilifu!', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
