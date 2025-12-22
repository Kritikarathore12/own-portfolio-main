const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Project = require('./models/Project');
const Hackathon = require('./models/Hackathon');

dotenv.config();

const projects = [
    {
        title: "Portfolio Website",
        description: "A personal portfolio website built with MERN stack to showcase my skills and projects.",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        link: "https://github.com/Kritikarathore12/own-portfolio-main",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
        title: "E-Commerce Dashboard",
        description: "A full-featured analytics dashboard for e-commerce platforms with real-time data visualization.",
        techStack: ["Next.js", "Tailwind CSS", "Recharts"],
        link: "#",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1515&q=80"
    }
];

const hackathons = [
    {
        title: "KRIYETA 4.0",
        description: "Secured 1st position in the KRIYETA 4.0 hackathon demonstrating innovative problem solving.",
        badge: "Winner 🥇",
        isStat: false
    },
    {
        title: "Hackathon Journey",
        description: "Actively participated in more than 5 hackathons, consistently learning and building.",
        isStat: true,
        statValue: "5+"
    },
    {
        title: "PRAYATNA 2.0",
        description: "Achieved top rank in the prestigious PRAYATNA 2.0 hackathon event.",
        badge: "Winner 🏆",
        isStat: false
    }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        // Seed Projects
        try {
            await Project.deleteMany({}); // Clear existing for clean seed
            await Project.insertMany(projects);
            console.log('Projects Seeded');
        } catch (err) {
            console.error('Error seeding projects:', err);
        }

        // Seed Hackathons
        try {
            await Hackathon.deleteMany({});
            await Hackathon.insertMany(hackathons);
            console.log('Hackathons Seeded');
        } catch (err) {
            console.error('Error seeding hackathons:', err);
        }

        // Check if admin exists
        const user = await User.findOne({ username: 'admin' });
        if (user) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const newUser = new User({
            username: 'admin',
            password: hashedPassword
        });

        await newUser.save();
        console.log('Admin user created (admin / admin123)');
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
