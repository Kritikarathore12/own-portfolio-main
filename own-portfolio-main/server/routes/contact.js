const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // Import Model
// const nodemailer = require('nodemailer'); // Removed

// POST /api/contact - Save message to DB
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(200).json({ message: 'Message sent successfully!' });

    } catch (err) {
        console.error('Contact Save Error:', err);
        res.status(500).json({ message: 'Failed to save message.' });
    }
});

// GET /api/contact - Get all messages (For Admin)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
