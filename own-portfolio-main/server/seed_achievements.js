const mongoose = require('mongoose');
const Achievement = require('./models/Achievement');
const dotenv = require('dotenv');
dotenv.config();

const dummyAchievements = [
    {
        title: 'KRIYETA 4.0',
        description: 'Secured 1st position in the KRIYETA 4.0 hackathon demonstrating innovative problem solving.',
        tags: ['Winner 🥇', 'Hackathon'],
        images: [],
        link: ''
    },
    {
        title: 'Hackathon Journey',
        description: 'Actively participated in more than 5 hackathons, consistently learning and building.',
        tags: ['5+ Hackathons', 'Experience'],
        images: [],
        link: ''
    },
    {
        title: 'PRAYATNA 2.0',
        description: 'Achieved top rank in the prestigious PRAYATNA 2.0 hackathon event.',
        tags: ['Winner 🏆', 'Hackathon'],
        images: [],
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
