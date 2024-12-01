const express = require('express');
const Thread = require('../models/Thread'); // Import your Thread model
const router = express.Router();

// Create a new thread/post
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newThread = new Thread({
            title,
            content,
            creator,//: req.body.creator || "Anonymous"  // Temporary default value
        });
        await newThread.save();
        res.status(201).json({ msg: 'Post created successfully', thread: newThread });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ msg: 'Failed to create post' });
    }
});

router.post('/create', async (req, res) => {
   
    res.send({msg:'Thread created'});
});

router.get('/:id', (req, res) => {
    res.send(`Thread with ID: ${req.params.id}`);
});

router.get('/', (req, res) => {
    res.send('Thread routes will be here!');
});

module.exports = router;  