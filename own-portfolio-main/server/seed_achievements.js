const mongoose = require('mongoose');
const Achievement = require('./models/Achievement');
// const dotenv = require('dotenv');
// dotenv.config();

const dummyAchievements = [
    {
        title: 'Best Developer 2024',
        description: 'Recognized for outstanding contributions to open source projects.',
        tags: ['Award', 'Development'],
        image: '',
        link: ''
    },
    {
        title: 'Open Source Contributor',
        description: 'Active contributor to various React ecosystem libraries.',
        tags: ['Community', 'Open Source'],
        image: '',
        link: ''
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio')
    .then(async () => {
        console.log('MongoDB Connected');
        await Achievement.deleteMany({});
        await Achievement.insertMany(dummyAchievements);
        console.log('Dummy achievements inserted');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
