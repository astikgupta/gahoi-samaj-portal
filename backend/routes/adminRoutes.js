const express = require('express');
const router = express.Router();
const { approveUser, approveMatrimonialProfile, getPendingApprovals, getStats } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.put('/approve-user/:id', protect, admin, approveUser);
router.put('/approve-matrimonial/:id', protect, admin, approveMatrimonialProfile);
router.get('/pending-approvals', protect, admin, getPendingApprovals);
router.get('/stats', protect, admin, getStats);

module.exports = router;
