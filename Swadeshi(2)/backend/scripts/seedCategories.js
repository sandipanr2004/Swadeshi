const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categories = [
  {
    name: 'Monuments',
    description: 'Historic monuments and architectural marvels of India',
    icon: '🏛️',
    color: '#dc2626',
    featured: true
  },
  {
    name: 'Festivals',
    description: 'Colorful festivals and celebrations across India',
    icon: '🎉',
    color: '#f59e0b',
    featured: true
  },
  {
    name: 'Traditions',
    description: 'Age-old traditions and customs',
    icon: '🙏',
    color: '#10b981',
    featured: true
  },
  {
    name: 'Arts & Crafts',
    description: 'Traditional arts, crafts, and handicrafts',
    icon: '🎨',
    color: '#8b5cf6',
    featured: true
  },
  {
    name: 'Music & Dance',
    description: 'Classical and folk music and dance forms',
    icon: '🎵',
    color: '#ec4899',
    featured: true
  },
  {
    name: 'Cuisine',
    description: 'Regional cuisines and culinary traditions',
    icon: '🍛',
    color: '#f97316',
    featured: true
  },
  {
    name: 'Literature',
    description: 'Ancient texts, epics, and literary works',
    icon: '📚',
    color: '#06b6d4',
    featured: false
  },
  {
    name: 'Religious Sites',
    description: 'Temples, mosques, churches, and gurudwaras',
    icon: '🕉️',
    color: '#6366f1',
    featured: true
  }
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Sandipan_Roy:Sandipan2004@cluster0.k7ludco.mongodb.net/swadeshi_heritage?retryWrites=true&w=majority');
    console.log('✅ Connected to MongoDB');

    // Clear existing categories
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing categories');

    // Insert new categories
    const inserted = await Category.insertMany(categories);
    console.log(`✅ Inserted ${inserted.length} categories`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
}

seedCategories();

