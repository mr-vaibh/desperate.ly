const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for todo
const GameSchema = new Schema({
    name: { type: String, required: [true, 'Your name is required'], },
    email: { type: String, required: false },
    phone: { type: Number, required: [true, 'Your phone number is required'], maxlength: 10 },
    slug: { type: String, default: Math.random().toString(36).substring(2, 9), maxlength: 7 },
    isAdult: { type: Boolean },
    score: { type: Number, default: 0 }
});

// Create model for todo
const Game = mongoose.model('game', GameSchema);

module.exports = Game;
