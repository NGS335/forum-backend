const express = require('express');
const path = require('path');
const router = express.Router();

// Route to serve the main forum page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../path/to/main.html')); // Adjust the path
});

module.exports = router;
