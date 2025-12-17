const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Heritage = require('../models/Heritage');
const Category = require('../models/Category');
const { auth, adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// @route   GET /api/heritage
// @desc    Get all heritage items with filters
// @access  Public
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional(),
  query('state').optional(),
  query('search').optional(),
  query('featured').optional().isBoolean()
], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = {};

    // Only show active items to public, but allow status filter for admin
    if (!req.query.status || req.query.status === 'active') {
      filter.status = 'active';
    } else if (req.query.status) {
      filter.status = req.query.status;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.state) {
      filter.state = new RegExp(req.query.state, 'i');
    }

    if (req.query.featured === 'true') {
      filter.featured = true;
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    const heritage = await Heritage.find(filter)
      .populate('category', 'name icon color')
      .populate('contributedBy', 'name email')
      .sort(req.query.search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Heritage.countDocuments(filter);

    res.json({
      heritage,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/heritage/:id
// @desc    Get single heritage item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const heritage = await Heritage.findById(req.params.id)
      .populate('category', 'name icon color')
      .populate('contributedBy', 'name email')
      .populate('likedBy', 'name');

    if (!heritage) {
      return res.status(404).json({ message: 'Heritage item not found' });
    }

    // Increment views
    heritage.views += 1;
    await heritage.save();

    res.json(heritage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/heritage
// @desc    Create new heritage item
// @access  Private
router.post('/', [
  auth,
  upload.array('images', 5), // Accept up to 5 images
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('state').trim().notEmpty().withMessage('State is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Process uploaded images - convert to Base64
    const images = req.files ? req.files.map(file => ({
      url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      caption: '',
      filename: file.originalname,
      size: file.size
    })) : [];

    // Parse tags if they're sent as a string
    let tags = req.body.tags;
    if (typeof tags === 'string') {
      tags = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }

    const heritageData = {
      ...req.body,
      tags,
      images,
      contributedBy: req.user._id,
      status: 'active' // All contributions are now immediately active
    };

    const heritage = new Heritage(heritageData);
    await heritage.save();

    // Update category count
    await Category.findByIdAndUpdate(req.body.category, { $inc: { count: 1 } });

    res.status(201).json(heritage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/heritage/:id
// @desc    Update heritage item
// @access  Private (Admin or Contributor)
router.put('/:id', auth, async (req, res) => {
  try {
    const heritage = await Heritage.findById(req.params.id);

    if (!heritage) {
      return res.status(404).json({ message: 'Heritage item not found' });
    }

    // Check if user is admin or contributor
    if (req.user.role !== 'admin' && heritage.contributedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(heritage, req.body);
    await heritage.save();

    res.json(heritage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/heritage/:id
// @desc    Delete heritage item
// @access  Private (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const heritage = await Heritage.findById(req.params.id);

    if (!heritage) {
      return res.status(404).json({ message: 'Heritage item not found' });
    }

    await Heritage.findByIdAndDelete(req.params.id);

    // Update category count
    await Category.findByIdAndUpdate(heritage.category, { $inc: { count: -1 } });

    res.json({ message: 'Heritage item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/heritage/:id/like
// @desc    Like/Unlike heritage item
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const heritage = await Heritage.findById(req.params.id);

    if (!heritage) {
      return res.status(404).json({ message: 'Heritage item not found' });
    }

    const likedIndex = heritage.likedBy.indexOf(req.user._id);

    if (likedIndex > -1) {
      heritage.likedBy.splice(likedIndex, 1);
      heritage.likes -= 1;
    } else {
      heritage.likedBy.push(req.user._id);
      heritage.likes += 1;
    }

    await heritage.save();
    res.json({ likes: heritage.likes, liked: likedIndex === -1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

