const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

require('dotenv').config(); 

const app = express();

//
/*const userRoutes = express.Router();

userRoutes.post('/register', (req, res) => {
    res.send('User registered');
});

const threadRoutes = express.Router();

threadRoutes.post('/create', (req, res) => {
    res.send('Thread created');
});
*///

const userRoutes = require('./routes/userRoutes');  
const threadRoutes = require('./routes/threadRoutes');
const postRoutes = require('./routes/postRoutes');
const { timeStamp, timeLog } = require('console');
 
userRoutes.use((req, res, next)=>{
  console.log('User Middleware connected');
  next();
})

threadRoutes.use((req, res, next)=>{
  console.log('Thread Middleware connected');
  next();
})

postRoutes.use((req, res, next)=>{
  console.log('Post Middleware connected');
  next();
})
/*
console.log('User Routes:', typeof userRoutes);   
console.log('Thread Routes:', typeof threadRoutes); 
console.log('Post Routes:', typeof postRoutes);    


console.log('User Routes:', userRoutes);
console.log('Thread Routes:', threadRoutes);
console.log('Post Routes:', postRoutes);
*/

app.use(express.json()); // parsing
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/users', userRoutes);   
app.use('/api/threads', threadRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the forum!');
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
