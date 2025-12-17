import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { FiMapPin, FiEye, FiHeart, FiCalendar, FiTag, FiArrowLeft } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './HeritageDetail.css';

const HeritageDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [heritage, setHeritage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  // Construct proper image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/800x400?text=Heritage+Image';
    if (imageUrl.startsWith('data:')) return imageUrl; // Base64 data URI
    if (imageUrl.startsWith('http')) return imageUrl; // External URL
    return `http://localhost:5000${imageUrl}`; // Fallback for old file-based images
  };

  useEffect(() => {
    fetchHeritage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchHeritage = async () => {
    try {
      const res = await api.get(`/heritage/${id}`);
      setHeritage(res.data);
      setLiked(res.data.likedBy?.some(user => user._id === localStorage.getItem('userId')));
    } catch (error) {
      toast.error('Failed to load heritage details');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like');
      return;
    }

    try {
      const res = await api.post(`/heritage/${id}/like`);
      setHeritage({ ...heritage, likes: res.data.likes });
      setLiked(res.data.liked);
      toast.success(res.data.liked ? 'Liked!' : 'Unliked');
    } catch (error) {
      toast.error('Failed to like');
    }
  };

  if (loading) return <div className="spinner"></div>;
  if (!heritage) return <div>Heritage not found</div>;

  return (
    <div className="heritage-detail">
      <div className="container">
        <Link to="/heritage" className="back-link">
          <FiArrowLeft /> Back to Heritage
        </Link>

        <div className="detail-header">
          <div className="detail-images">
            {heritage.images?.[0] && (
              <img src={getImageUrl(heritage.images[0].url)} alt={heritage.title} />
            )}
          </div>
          <div className="detail-info">
            <div className="category-badge">
              {heritage.category?.icon} {heritage.category?.name}
            </div>
            <h1>{heritage.title}</h1>
            <div className="detail-meta">
              <span><FiMapPin /> {heritage.state}{heritage.city && `, ${heritage.city}`}</span>
              <span><FiEye /> {heritage.views} views</span>
              <span><FiHeart /> {heritage.likes} likes</span>
            </div>
            <button onClick={handleLike} className={`like-btn ${liked ? 'liked' : ''}`}>
              <FiHeart /> {liked ? 'Liked' : 'Like'}
            </button>
          </div>
        </div>

        <div className="detail-content">
          <div className="content-main">
            <h2>About</h2>
            <p>{heritage.description}</p>
            {heritage.detailedDescription && (
              <>
                <h2>Detailed Description</h2>
                <p>{heritage.detailedDescription}</p>
              </>
            )}
            {heritage.historicalSignificance && (
              <>
                <h2>Historical Significance</h2>
                <p>{heritage.historicalSignificance}</p>
              </>
            )}
            {heritage.culturalImportance && (
              <>
                <h2>Cultural Importance</h2>
                <p>{heritage.culturalImportance}</p>
              </>
            )}
          </div>
          <div className="content-sidebar">
            <div className="info-card">
              <h3>Information</h3>
              {heritage.yearEstablished && (
                <div className="info-item">
                  <FiCalendar /> Established: {heritage.yearEstablished}
                </div>
              )}
              {heritage.tags?.length > 0 && (
                <div className="info-item">
                  <FiTag /> Tags: {heritage.tags.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeritageDetail;

