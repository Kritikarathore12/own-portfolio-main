const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Achievement = require('../models/Achievement');

router.get('/', async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ order: 1 });
        res.json(achievements);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT api/achievements/reorder (Private)
router.put('/reorder', auth, async (req, res) => {
    const { order } = req.body;
    try {
        const operations = order.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { order: index }
            }
        }));
        await Achievement.bulkWrite(operations);
        res.json({ msg: 'Reordered' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    const { title, description, tags, images, link } = req.body;
    try {
        const newAchievement = new Achievement({ title, description, tags, images, link });
        const achievement = await newAchievement.save();
        res.json(achievement);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT api/achievements/:id (Private)
router.put('/:id', auth, async (req, res) => {
    const { title, description, tags, images, link } = req.body;
    try {
        let achievement = await Achievement.findById(req.params.id);
        if (!achievement) return res.status(404).json({ msg: 'Achievement not found' });

        achievement = await Achievement.findByIdAndUpdate(
            req.params.id,
            { $set: { title, description, tags, images, link } },
            { new: true }
        );
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
