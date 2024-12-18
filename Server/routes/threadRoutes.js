const express = require('express');
const Thread = require('../models/Thread'); // Import your Thread model
const router = express.Router();

// Create a new thread
router.post('/create', async (req, res) => {
    console.log('Request body:', req.body); // Log incoming data
    const { title, content, creator } = req.body;

    try {
        // Create a new thread instance
        const newThread = new Thread({
            title,
            content,
            creator,
        });

        // Save the thread to the database
        await newThread.save();

        console.log('Thread created:', newThread);

        // Respond to the client with success or error message
        res.status(201).send({ msg: 'Thread created', thread: newThread });
    } catch (error) {
        console.error('Error creating thread:', error);
        res.status(500).send({ msg: 'Failed to create thread', error: error.message });
    }
});

// Fetch all threads for main page
router.get('/', async (req, res) => {
    try {
        const threads = await Thread.find().sort({ createdAt: -1 }); // Fetch threads sorted by creation date
        res.json(threads); // Send the threads as a JSON response
    } catch (error) {
        console.error('Error fetching threads:', error);
        res.status(500).json({ error: 'Server error' }); // Handle any errors
    }
});

// Add a comment to a thread
router.post('/:threadId/comments', async (req, res) => {
    const { threadId } = req.params;
    const { content, creator } = req.body;

    try {
        const thread = await Thread.findById(threadId);
        if (!thread) {
            return res.status(404).json({ msg: 'Thread not found' });
        }

        const newComment = { content, creator };
        thread.comments.push(newComment); // Add the comment
        await thread.save(); // Save the updated thread

        res.status(201).json({ msg: 'Comment added', comment: newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;  