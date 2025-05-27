// node-backend/server.js

const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

app.get('/api/user', (req, res) => {
  res.json({ name: 'John Doe' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
