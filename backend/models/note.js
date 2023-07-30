const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String
})

const Note = mongoose.model('notes', new mongoose.Schema({
    content: String,

    color: {
        type: String,
        required: true
    },

    user: {
        type: userSchema,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
}));

module.exports = Note;