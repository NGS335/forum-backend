const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

//User registering
router.post('/register', [
    
    // username and password check
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
    console.log(req.body);
    //validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        //checking if username is taken already
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username already taken' });
        }

        //creating new user
        user = new User({
            username,
            password
        });

        //password hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //saving new user to db
        await user.save();
        console.log('User registered successfully');
        res.status(201).json({ msg: 'User registered successfully' });

    } catch (err) {
        console.error('Error during registration: ', err.message);
        res.status(500).send('Server error');
    }
});

//user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        
        // Log the successful login in console
        console.log(`User ${username} logged in successfully`);


        // Include the username in the response for the client to use
        res.status(200).json({ msg: 'Login successful', username });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;  