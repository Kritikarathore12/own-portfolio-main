const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    image: { type: String },
    link: { type: String },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Achievement', AchievementSchema);
