const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getUsers);
router.route('/:id').get(protect, getUserById);

module.exports = router;
