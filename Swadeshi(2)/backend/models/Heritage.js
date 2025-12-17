const mongoose = require('mongoose');

const heritageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  detailedDescription: {
    type: String,
    default: ''
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: ''
  },
  images: [{
    url: String, // Base64 data URI or external URL
    caption: String,
    filename: String,
    size: Number
  }],
  historicalSignificance: {
    type: String,
    default: ''
  },
  culturalImportance: {
    type: String,
    default: ''
  },
  yearEstablished: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  location: {
    latitude: Number,
    longitude: Number,
    address: String
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'archived'],
    default: 'pending'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  contributedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

heritageSchema.index({ title: 'text', description: 'text', tags: 'text' });
heritageSchema.index({ category: 1, state: 1, featured: 1 });

module.exports = mongoose.model('Heritage', heritageSchema);

