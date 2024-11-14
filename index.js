require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes.js');
const facultyRoutes = require('./routes/facultyRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js'); 

const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
 
app.use('/api', studentRoutes);
app.use('/api', facultyRoutes);  
app.use('/api', uploadRoutes);  
 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err)); 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 
