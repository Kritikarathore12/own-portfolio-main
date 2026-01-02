const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio');
        console.log('MongoDB Connected');

        const username = 'Kritika';
        const password = 'Kritika1211';

        // Check if user exists
        let user = await User.findOne({ username });

        if (user) {
            console.log('User found, updating password...');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            console.log('Password updated.');
        } else {
            console.log('User not found, creating new admin...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user = new User({
                username,
                password: hashedPassword
            });
            await user.save();
            console.log('Admin user created.');
        }

        // Also log all users to be sure
        const users = await User.find({});
        console.log('Current Users:', users.map(u => u.username));

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

resetAdmin();
