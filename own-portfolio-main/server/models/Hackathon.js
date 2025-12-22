const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    badge: { type: String }, // e.g., "Winner 🥇"
    isStat: { type: Boolean, default: false }, // if true, renders as a stat card
    statValue: { type: String }, // e.g., "5+"
    link: { type: String }
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
