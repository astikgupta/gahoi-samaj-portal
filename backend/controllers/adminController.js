const User = require('../models/User');
const MatrimonialProfile = require('../models/MatrimonialProfile');

// @desc    Approve user registration
// @route   PUT /api/admin/approve-user/:id
// @access  Private/Admin
const approveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.isApproved = true;
            await user.save();
            res.json({ message: 'User approved' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Approve matrimonial profile
// @route   PUT /api/admin/approve-matrimonial/:id
// @access  Private/Admin
const approveMatrimonialProfile = async (req, res) => {
    try {
        const profile = await MatrimonialProfile.findById(req.params.id);

        if (profile) {
            profile.isApproved = true;
            await profile.save();
            res.json({ message: 'Matrimonial profile approved' });
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get pending approvals
// @route   GET /api/admin/pending-approvals
// @access  Private/Admin
const getPendingApprovals = async (req, res) => {
    try {
        const pendingUsers = await User.find({ isApproved: false }).select('-password');
        const pendingProfiles = await MatrimonialProfile.find({ isApproved: false }).populate('user', 'name email');

        res.json({ pendingUsers, pendingProfiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const approvedUsers = await User.countDocuments({ isApproved: true });
        const totalProfiles = await MatrimonialProfile.countDocuments();
        const approvedProfiles = await MatrimonialProfile.countDocuments({ isApproved: true });

        res.json({
            users: { total: totalUsers, approved: approvedUsers, pending: totalUsers - approvedUsers },
            profiles: { total: totalProfiles, approved: approvedProfiles, pending: totalProfiles - approvedProfiles }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { approveUser, approveMatrimonialProfile, getPendingApprovals, getStats };
