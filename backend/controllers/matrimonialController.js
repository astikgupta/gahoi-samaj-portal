const MatrimonialProfile = require('../models/MatrimonialProfile');
const User = require('../models/User');

// @desc    Create matrimonial profile
// @route   POST /api/matrimonial
// @access  Private
const createProfile = async (req, res) => {
    try {
        const { fullName, age, height, education, profession, city, familyBackground, contactDetails, kundliUrl, photoUrl } = req.body;

        if (age < 18) {
            return res.status(400).json({ message: 'Must be 18 or older to create a matrimonial profile' });
        }

        const profileExists = await MatrimonialProfile.findOne({ user: req.user._id });

        if (profileExists) {
            return res.status(400).json({ message: 'User already has a matrimonial profile' });
        }

        const profile = await MatrimonialProfile.create({
            user: req.user._id,
            fullName,
            age,
            height,
            education,
            profession,
            city,
            familyBackground,
            contactDetails,
            kundliUrl,
            photoUrl
        });

        res.status(201).json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all approved matrimonial profiles (18+ only enforced via user age check)
// @route   GET /api/matrimonial
// @access  Private
const getProfiles = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.age < 18) {
            return res.status(403).json({ message: 'Must be 18 or older to view matrimonial profiles' });
        }

        const { minAge, maxAge, education, profession, city } = req.query;

        let filter = { isApproved: true };

        if (education) {
            filter.education = { $regex: education, $options: 'i' };
        }
        if (profession) {
            filter.profession = { $regex: profession, $options: 'i' };
        }
        if (city) {
            filter.city = { $regex: city, $options: 'i' };
        }
        if (minAge || maxAge) {
            filter.age = {};
            if (minAge) filter.age.$gte = Number(minAge);
            if (maxAge) filter.age.$lte = Number(maxAge);
        }

        const profiles = await MatrimonialProfile.find(filter).populate('user', 'name email');
        res.json(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getProfileById = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.age < 18) {
            return res.status(403).json({ message: 'Must be 18 or older to view matrimonial profiles' });
        }

        const profile = await MatrimonialProfile.findById(req.params.id).populate('user', 'name email');

        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createProfile, getProfiles, getProfileById };
