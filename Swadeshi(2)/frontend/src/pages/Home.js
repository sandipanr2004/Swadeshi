import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import api from '../utils/api';
import HeritageCard from '../components/Heritage/HeritageCard';
import CategoryCard from '../components/Category/CategoryCard';
import { FiArrowRight, FiSearch, FiTrendingUp, FiHeart, FiEye, FiActivity } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const [featuredHeritage, setFeaturedHeritage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  // Parallax Mouse Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const heroX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 20 });
  const heroY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 150, damping: 20 });
  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), { stiffness: 50, damping: 20 });
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 50, damping: 20 });

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    fetchData();
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchData = async () => {
    try {
      const [heritageRes, categoriesRes, trendingRes] = await Promise.all([
        api.get('/heritage?featured=true&limit=6'),
        api.get('/categories'),
        api.get('/heritage?limit=4')
      ]);

      setFeaturedHeritage(heritageRes.data.heritage);
      setCategories(categoriesRes.data);
      setTrending(trendingRes.data.heritage);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="home">
      {/* Interactive Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-bg-layer"
          style={{ x: bgX, y: bgY }}
        />
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                y: [null, Math.random() * -100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div
          className="hero-content"
          style={{ x: heroX, y: heroY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="logo-container"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/atmanirbhar-logo.jpg"
              alt="Atmanirbhar Bharat Logo"
              className="atmanirbhar-logo"
            />
            <div className="logo-glow"></div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Swadeshi for <span className="gradient-text">Atmanirbhar Bharat</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover India's Rich Heritage & Culture
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link to="/heritage" className="btn btn-primary glow-effect">
              Explore Heritage <FiArrowRight />
            </Link>
            <Link to="/contribute" className="btn btn-outline glass-effect">
              Contribute
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Explore Categories</h2>
            <p className="section-subtitle">
              Journey through India's diverse cultural heritage
            </p>
          </motion.div>

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <motion.div
              className="grid grid-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {categories.map((category) => (
                <motion.div key={category._id} variants={itemVariants}>
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Heritage */}
      <section className="section featured-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Featured Heritage</h2>
            <p className="section-subtitle">
              Iconic monuments and cultural treasures of India
            </p>
          </motion.div>

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <motion.div
              className="grid grid-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredHeritage.map((item) => (
                <motion.div key={item._id} variants={itemVariants}>
                  <HeritageCard heritage={item} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            className="text-center"
            style={{ marginTop: '60px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/heritage" className="btn btn-primary btn-lg">
              View All Heritage <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">
              <FiTrendingUp style={{ color: 'var(--secondary)' }} /> Trending Now
            </h2>
            <p className="section-subtitle">
              Most viewed and loved heritage sites
            </p>
          </motion.div>

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <motion.div
              className="grid grid-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {trending.map((item) => (
                <motion.div key={item._id} variants={itemVariants}>
                  <HeritageCard heritage={item} featured />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotate: 2 }}
            >
              <div className="stat-icon-wrapper">
                <FiEye className="stat-icon" />
              </div>
              <h3>10K+</h3>
              <p>Heritage Sites</p>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10, rotate: -2 }}
            >
              <div className="stat-icon-wrapper">
                <FiHeart className="stat-icon" />
              </div>
              <h3>50K+</h3>
              <p>Contributors</p>
            </motion.div>

            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10, rotate: 2 }}
            >
              <div className="stat-icon-wrapper">
                <FiActivity className="stat-icon" />
              </div>
              <h3>100K+</h3>
              <p>Monthly Visitors</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
