const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

// Load env
dotenv.config();

// Define schemas (inline to avoid path issues)
const CertificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String },
    date: { type: String },
    image: { type: String },
    link: { type: String },
    order: { type: Number, default: 0 }
});
const Certification = mongoose.model('Certification', CertificationSchema);

const ExperienceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    company: { type: String },
    date: { type: String },
    description: { type: String },
    order: { type: Number, default: 0 }
});
const Experience = mongoose.model('Experience', ExperienceSchema);

const AchievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    tags: [{ type: String }],
    images: [{ type: String }],
    link: { type: String },
    order: { type: Number, default: 0 }
});
const Achievement = mongoose.model('Achievement', AchievementSchema);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio')
    .then(async () => {
        console.log('MongoDB Connected');

        const certs = await Certification.find({});
        const exps = await Experience.find({});
        const achievements = await Achievement.find({});

        const data = {
            certifications: certs,
            experience: exps,
            achievements: achievements
        };

        fs.writeFileSync('all_data_dump.json', JSON.stringify(data, null, 2));
        console.log('Data dumped to all_data_dump.json');

        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
