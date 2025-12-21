const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Certification = require('../models/Certification');

router.get('/', async (req, res) => {
    try {
        const certs = await Certification.find().sort({ date: -1 });
        res.json(certs);
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

router.delete('/:id', auth, async (req, res) => {
    try {
        await Certification.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Certification removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
