const mongoose = require('mongoose');

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
}, { timestamps: true });

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
