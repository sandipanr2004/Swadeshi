const express = require('express');
const User = require('../models/User');
const Heritage = require('../models/Heritage');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favorites')
      .populate('contributions')
      .select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/favorites/:heritageId
// @desc    Add/Remove favorite
// @access  Private
router.post('/favorites/:heritageId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const heritageId = req.params.heritageId;

    const index = user.favorites.indexOf(heritageId);

    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(heritageId);
    }

    await user.save();
    res.json({ favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

