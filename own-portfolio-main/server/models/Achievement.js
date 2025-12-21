const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    image: { type: String },
    link: { type: String }
});

module.exports = mongoose.model('Achievement', AchievementSchema);
