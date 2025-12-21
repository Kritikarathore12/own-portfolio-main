const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    role: { type: String, required: true }, // e.g. Team Leader
    company: { type: String }, // e.g. QuizWizz (Project or Company)
    date: { type: String }, // e.g. Feb 2025
    description: { type: String } // e.g. "Organized events..."
});

module.exports = mongoose.model('Experience', ExperienceSchema);
