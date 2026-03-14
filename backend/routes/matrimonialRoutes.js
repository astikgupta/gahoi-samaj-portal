const express = require('express');
const router = express.Router();
const { createProfile, getProfiles, getProfileById } = require('../controllers/matrimonialController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, createProfile).get(protect, getProfiles);
router.route('/:id').get(protect, getProfileById);

module.exports = router;
