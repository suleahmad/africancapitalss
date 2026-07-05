const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
