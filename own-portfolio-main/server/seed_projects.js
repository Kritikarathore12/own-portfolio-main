const mongoose = require('mongoose');
const Project = require('./models/Project');
const dotenv = require('dotenv');

dotenv.config();

const dummyProjects = [
    {
        title: 'AI Analytics Dashboard',
        description: 'A comprehensive dashboard for visualizing AI model performance metrics in real-time.',
        techStack: ['React', 'Python', 'TensorFlow', 'D3.js'],
        link: 'https://github.com',
        github: 'https://github.com',
        image: 'https://placehold.co/600x400?text=AI+Dashboard'
    },
    {
        title: 'E-commerce Platform',
        description: 'Full-featured online store with cart, user authentication, and payment gateway integration.',
        techStack: ['MERN Stack', 'Redux', 'Stripe'],
        link: 'https://github.com',
        github: 'https://github.com',
        image: 'https://placehold.co/600x400?text=E-commerce'
    },
    {
        title: 'Real-time Chat App',
        description: 'Instant messaging application supporting private and group chats with multimedia sharing.',
        techStack: ['Socket.io', 'Node.js', 'React', 'MongoDB'],
        link: 'https://github.com',
        github: 'https://github.com',
        image: 'https://placehold.co/600x400?text=Chat+App'
    },
    {
        title: 'Portfolio Website',
        description: 'Personal portfolio website showcasing skills, projects, and professional experience.',
        techStack: ['React', 'Framer Motion', 'CSS3'],
        link: 'https://github.com',
        github: 'https://github.com',
        image: 'https://placehold.co/600x400?text=Portfolio'
    },
    {
        title: 'Task Manager Pro',
        description: 'Productivity tool for team collaboration, task assignment, and progress tracking.',
        techStack: ['Vue.js', 'Firebase', 'Tailwind'],
        link: 'https://github.com',
        github: 'https://github.com',
        image: 'https://placehold.co/600x400?text=Task+Manager'
    }
];

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log('MongoDB Connected');
        await Project.deleteMany({});
        await Project.insertMany(dummyProjects);
        console.log('Dummy projects inserted');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
