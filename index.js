const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/StudentRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', studentRoutes);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Trying another port...`);
    app.listen(0, () => {
      console.log('Server started on an available port.');
    });
  } else {
    console.error('Server error:', err);
  }
});
