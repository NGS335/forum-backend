const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    res.send('Thread created');
});

router.get('/:id', (req, res) => {
    res.send(`Thread with ID: ${req.params.id}`);
});

router.get('/', (req, res) => {
    res.send('Thread routes will be here!');
});

module.exports = router;  