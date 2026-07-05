const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const africanCountries = require('./data');

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
