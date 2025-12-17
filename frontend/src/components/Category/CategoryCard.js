import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      className="category-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/category/${category._id}`} className="category-link">
        <div className="category-icon" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
          {category.icon || '🏛️'}
        </div>
        <h3 className="category-name">{category.name}</h3>
        <p className="category-description">{category.description || 'Explore this category'}</p>
        <div className="category-footer">
          <span className="category-count">{category.count || 0} items</span>
          <FiArrowRight className="arrow-icon" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;

