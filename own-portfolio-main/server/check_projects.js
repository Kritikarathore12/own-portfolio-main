const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        const projects = await Project.find({});
        projects.forEach(p => {
            console.log(`Title: ${p.title}`);
            console.log(`Image: ${p.image}`);
            console.log(`IsVisible: ${p.isVisible}`);
            console.log('---');
        });
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
