const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    res.send('Post created');
});

router.get('/:id', (req, res) => {
    res.send(`Post with ID: ${req.params.id}`);
});

router.get('/', (req, res) => {
    res.send('Post routes will be here!');
});

module.exports = router; 
