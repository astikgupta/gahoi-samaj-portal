const User = require('../models/User');

// @desc    Get all approved users
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            $or: [
                { city: { $regex: req.query.keyword, $options: 'i' } },
                { profession: { $regex: req.query.keyword, $options: 'i' } },
                { name: { $regex: req.query.keyword, $options: 'i' } },
            ]
        } : {};

        // Only show approved users in the directory
        const filter = { ...keyword, isApproved: true };

        const users = await User.find(filter).select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUsers, getUserById };
