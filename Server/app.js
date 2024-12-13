const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

require('dotenv').config(); 

const app = express();
app.use(express.static('public'));

const userRoutes = require('./routes/userRoutes');  
const threadRoutes = require('./routes/threadRoutes');
const { timeStamp, timeLog } = require('console');
 
userRoutes.use((req, res, next)=>{
  console.log('User Middleware connected');
  next();
})

threadRoutes.use((req, res, next)=>{
  console.log('Thread Middleware connected');
  next();
})

app.use(express.json()); // parsing
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/users', userRoutes);   
app.use('/api/threads', threadRoutes);

// Serve the main forum page at /(localhost:5000)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection 
mongoose.connect(MONGO_URI, { /*useNewUrlParser: true,*/ useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err)); 
  

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Server started at:', new Date().toLocaleString());
});
