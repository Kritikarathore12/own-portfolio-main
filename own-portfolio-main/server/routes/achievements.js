const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Achievement = require('../models/Achievement');

router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.json(achievements);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    const { title, description, tags, image, link } = req.body;
    try {
        const newAchievement = new Achievement({ title, description, tags, image, link });
        const achievement = await newAchievement.save();
        res.json(achievement);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Achievement.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Achievement removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
