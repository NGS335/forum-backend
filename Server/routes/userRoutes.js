const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

/*router.post('/register', (req, res) => {
    res.send('User registered');
});*/

//User registering
router.post('/register', [
    // username and password check
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
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

//login

/*
router.post('/login', (req, res) => {
    res.send('User logged in');
});*/

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        //check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        //password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        //login status (success or error)
        res.status(200).json({ msg: 'Login successful' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', (req, res) => {
    console.log('Get / line')
    res.send('User routes will be here!');
});

module.exports = router;  