const mongoose = require('mongoose');
const User = require('./models/User');
const MatrimonialProfile = require('./models/MatrimonialProfile');
const Event = require('./models/Event');
require('dotenv').config();

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/gahoi_samaj_connect');
        console.log('Connected to MongoDB');
        
        let user1 = await User.findOne({ email: 'test1@example.com' });
        if (!user1) {
            user1 = new User({
                name: 'Rohan Gupta',
                fatherName: 'Sanjay Gupta',
                email: 'test1@example.com',
                phoneNumber: '9876543210',
                city: 'Delhi',
                state: 'Delhi',
                profession: 'Software Engineer',
                age: 28,
                gender: 'Male',
                password: 'password123',
                isApproved: true
            });
            await user1.save();
        } else {
            user1.isApproved = true;
            await user1.save();
        }
        
        let user2 = await User.findOne({ email: 'test2@example.com' });
        if (!user2) {
            user2 = new User({
                name: 'Priya Nema',
                fatherName: 'Rajesh Nema',
                email: 'test2@example.com',
                phoneNumber: '9876543211',
                city: 'Jabalpur',
                state: 'Madhya Pradesh',
                profession: 'Doctor',
                age: 26,
                gender: 'Female',
                password: 'password123',
                isApproved: true
            });
            await user2.save();
        } else {
            user2.isApproved = true;
            await user2.save();
        }

        console.log('Dummy Users inserted/updated');

        await MatrimonialProfile.deleteMany({});
        await MatrimonialProfile.create([
            {
                user: user1._id,
                fullName: 'Rohan Gupta',
                age: 28,
                height: "5'10\"",
                education: 'B.Tech IT',
                profession: 'Senior Developer at MNC',
                city: 'Delhi',
                familyBackground: 'Nuclear family, father is a businessman.',
                contactDetails: 'Email: test1@example.com',
                isApproved: true
            },
            {
                user: user2._id,
                fullName: 'Priya Nema',
                age: 26,
                height: "5'4\"",
                education: 'MBBS',
                profession: 'Resident Doctor',
                city: 'Jabalpur',
                familyBackground: 'Joint family based in MP.',
                contactDetails: 'Phone: 9876543211',
                isApproved: true
            }
        ]);
        console.log('Dummy Matrimonial Profiles inserted');

        await Event.deleteMany({});
        await Event.create([
            {
                title: 'Gahoi Samaj Annual Gathering 2026',
                description: 'Join us for the biggest community event of the year featuring cultural programs, networking, and a grand feast.',
                date: new Date('2026-05-15'),
                location: 'Gahoi Bhavan, Jhansi, UP',
                eventType: 'Meeting'
            },
            {
                title: 'Youth Career Counseling Seminar',
                description: 'A dedicated session for Gahoi youth to get guidance on various career paths from industry professionals.',
                date: new Date('2026-06-10'),
                location: 'Community Hall, Bhopal, MP',
                eventType: 'Charity'
            }
        ]);
        console.log('Dummy Events inserted');

        mongoose.connection.close();
        console.log('Done mapping dummy data!');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seedDB();
