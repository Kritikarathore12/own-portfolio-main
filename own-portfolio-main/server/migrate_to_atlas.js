const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const LOCAL_URI = 'mongodb://127.0.0.1:27017/portfolio';
const ATLAS_URI = process.env.MONGO_URI;

if (!ATLAS_URI) {
    console.error('Error: MONGO_URI is not defined in .env');
    process.exit(1);
}

const migrate = async () => {
    console.log('🚀 Starting migration process...');

    let localConn, atlasConn;

    try {
        // 1. Connect to Local Database
        console.log('Connecting to LOCAL database...');
        localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
        console.log('✅ Connected to Local DB.');

        // 2. Fetch all data from Local
        const getCollectionData = async (conn, name) => {
            try {
                const data = await conn.collection(name).find({}).toArray();
                return data;
            } catch (e) {
                console.log(`Note: Collection '${name}' not found or empty in local DB.`);
                return [];
            }
        };

        const projects = await getCollectionData(localConn, 'projects');
        const achievements = await getCollectionData(localConn, 'achievements');
        const certifications = await getCollectionData(localConn, 'certifications');
        const experiences = await getCollectionData(localConn, 'experiences');
        const hackathons = await getCollectionData(localConn, 'hackathons');
        const users = await getCollectionData(localConn, 'users');

        console.log(`\n📊 Data found in Local DB:
        - Projects: ${projects.length}
        - Achievements: ${achievements.length}
        - Certifications: ${certifications.length}
        - Experiences: ${experiences.length}
        - Hackathons: ${hackathons.length}
        - Users: ${users.length}`);

        // 3. Connect to Atlas Database
        console.log('\nConnecting to ATLAS database...');
        atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
        console.log('✅ Connected to Atlas DB.');

        // 4. Migrate Data (Overwrite Atlas with Local)
        const migrateCollection = async (conn, name, data) => {
            if (data.length === 0) return;
            const col = conn.collection(name);
            await col.deleteMany({}); // Clear existing (dummy) data in Atlas
            await col.insertMany(data);
            console.log(`✅ Migrated ${data.length} documents to Atlas '${name}' collection.`);
        };

        await migrateCollection(atlasConn, 'projects', projects);
        await migrateCollection(atlasConn, 'achievements', achievements);
        await migrateCollection(atlasConn, 'certifications', certifications);
        await migrateCollection(atlasConn, 'experiences', experiences);
        await migrateCollection(atlasConn, 'hackathons', hackathons);

        // Only migrate users if we found some locally, otherwise keep the one we just created or merge? 
        // User asked for "all data added earlier", which implies their admin login too.
        if (users.length > 0) {
            await migrateCollection(atlasConn, 'users', users);
        }

        console.log('\n✨ MIGRATION COMPLETE! All local data is now on the cloud.');

    } catch (err) {
        console.error('❌ Migration Failed:', err);
    } finally {
        if (localConn) await localConn.close();
        if (atlasConn) await atlasConn.close();
        process.exit(0);
    }
};

migrate();
