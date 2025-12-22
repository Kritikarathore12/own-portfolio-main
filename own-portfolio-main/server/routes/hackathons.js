const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Hackathon = require('../models/Hackathon');

// @route   GET api/hackathons
// @desc    Get all hackathons
// @access  Public
router.get('/', async (req, res) => {
    try {
        const hackathons = await Hackathon.find();
        res.json(hackathons);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/hackathons
// @desc    Add a new hackathon
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, description, image, badge, isStat, statValue, link } = req.body;
    try {
        const newHackathon = new Hackathon({ title, description, image, badge, isStat, statValue, link });
        const hackathon = await newHackathon.save();
        res.json(hackathon);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/hackathons/:id
// @desc    Delete a hackathon
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        await Hackathon.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Hackathon removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
