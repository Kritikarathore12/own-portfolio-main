const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Experience = require('../models/Experience');

router.get('/', async (req, res) => {
    try {
        const exps = await Experience.find().sort({ order: 1 });
        res.json(exps);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT api/experience/reorder (Private)
router.put('/reorder', auth, async (req, res) => {
    const { order } = req.body;
    try {
        const operations = order.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { order: index }
            }
        }));
        await Experience.bulkWrite(operations);
        res.json({ msg: 'Reordered' });
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

// PUT api/experience/:id (Private)
router.put('/:id', auth, async (req, res) => {
    const { role, company, date, description } = req.body;
    try {
        let exp = await Experience.findById(req.params.id);
        if (!exp) return res.status(404).json({ msg: 'Experience not found' });

        exp = await Experience.findByIdAndUpdate(
            req.params.id,
            { $set: { role, company, date, description } },
            { new: true }
        );
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
