const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected');

        // Find existing admin (either 'admin' or 'Kritika1211' if run again)
        let user = await User.findOne({});

        if (user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('Kritika1211', salt);

            user.username = 'Kritika1211';
            user.password = hashedPassword;
            await user.save();
            console.log('Admin updated to Kritika1211');
        } else {
            // Create if doesn't exist
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('Kritika1211', salt);
            const newUser = new User({ username: 'Kritika1211', password: hashedPassword });
            await newUser.save();
            console.log('Admin created as Kritika1211');
        }
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
