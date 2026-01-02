const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String }, // e.g. "NPTEL"
    date: { type: String },
    image: { type: String },
    link: { type: String },
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Certification', CertificationSchema);
