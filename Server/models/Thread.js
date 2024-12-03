const mongoose = require('mongoose');

//schema for comments
const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    creator: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const threadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    comments: [CommentSchema] // Embed comments
}, { timestamps: true });

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
