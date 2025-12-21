const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Experience = require('../models/Experience');

router.get('/', async (req, res) => {
    try {
        const exps = await Experience.find();
        res.json(exps);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    const { role, company, date, description } = req.body;
    try {
        const newExp = new Experience({ role, company, date, description });
        const exp = await newExp.save();
        res.json(exp);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Experience removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
