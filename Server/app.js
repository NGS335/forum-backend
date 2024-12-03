const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');


require('dotenv').config(); 

const app = express();
app.use(express.static('public'));

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


app.use(express.json()); // parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'yourSecretKey',  // Replace with a secure key in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Set to true if using HTTPS
}));

//routes
app.use('/api/users', userRoutes);   
app.use('/api/threads', threadRoutes);
app.use('/api/posts', postRoutes);

/*app.get('/', (req, res) => {
  res.send('Welcome to the forum!');
});*/

// Serve the main forum page at /forum
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
