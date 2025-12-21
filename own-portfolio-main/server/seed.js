const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');

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
