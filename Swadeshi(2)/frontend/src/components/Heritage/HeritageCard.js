import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiEye, FiHeart, FiArrowRight } from 'react-icons/fi';
import './HeritageCard.css';

const HeritageCard = ({ heritage, featured = false }) => {
  // Construct proper image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/400x300?text=Heritage+Image';
    if (imageUrl.startsWith('data:')) return imageUrl; // Base64 data URI
    if (imageUrl.startsWith('http')) return imageUrl; // External URL
    return `http://localhost:5000${imageUrl}`; // Fallback for old file-based images
  };

  const imageUrl = heritage.images?.[0]?.url || null;

  return (
    <motion.div
      className={`heritage-card ${featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Link to={`/heritage/${heritage._id}`} className="card-link">
        <div className="card-image">
          <img src={getImageUrl(imageUrl)} alt={heritage.title} />
          {heritage.featured && (
            <span className="featured-badge">Featured</span>
          )}
        </div>
        <div className="card-content">
          <div className="card-category">
            {heritage.category?.icon} {heritage.category?.name}
          </div>
          <h3 className="card-title">{heritage.title}</h3>
          <p className="card-description">
            {heritage.description?.substring(0, 120)}...
          </p>
          <div className="card-footer">
            <div className="card-location">
              <FiMapPin /> {heritage.state}
              {heritage.city && `, ${heritage.city}`}
            </div>
            <div className="card-stats">
              <span><FiEye /> {heritage.views || 0}</span>
              <span><FiHeart /> {heritage.likes || 0}</span>
            </div>
          </div>
          <div className="card-action">
            Learn More <FiArrowRight />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HeritageCard;

