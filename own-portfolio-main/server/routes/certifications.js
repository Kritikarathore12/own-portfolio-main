const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Certification = require('../models/Certification');

router.get('/', async (req, res) => {
    try {
        const certs = await Certification.find().sort({ order: 1, date: -1 });
        res.json(certs);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT api/certifications/reorder (Private)
router.put('/reorder', auth, async (req, res) => {
    const { order } = req.body;
    try {
        const operations = order.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { order: index }
            }
        }));
        await Certification.bulkWrite(operations);
        res.json({ msg: 'Reordered' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    const { title, issuer, date, image, link } = req.body;
    try {
        const newCert = new Certification({ title, issuer, date, image, link });
        const cert = await newCert.save();
        res.json(cert);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT api/certifications/:id (Private)
router.put('/:id', auth, async (req, res) => {
    const { title, issuer, date, image, link } = req.body;
    try {
        let cert = await Certification.findById(req.params.id);
        if (!cert) return res.status(404).json({ msg: 'Certification not found' });

        cert = await Certification.findByIdAndUpdate(
            req.params.id,
            { $set: { title, issuer, date, image, link } },
            { new: true }
        );
        res.json(cert);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Certification.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Certification removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
