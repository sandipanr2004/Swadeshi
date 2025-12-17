import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import HeritageCard from '../components/Heritage/HeritageCard';
import { FiUser, FiMail, FiEdit2 } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/profile');
      setProfile(res.data);
      setContributions(res.data.contributions || []);
      setFavorites(res.data.favorites || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <FiUser />
          </div>
          <div className="profile-info">
            <h1>{profile?.name}</h1>
            <p><FiMail /> {profile?.email}</p>
            <div className="profile-stats">
              <div className="stat">
                <strong>{contributions.length}</strong>
                <span>Contributions</span>
              </div>
              <div className="stat">
                <strong>{favorites.length}</strong>
                <span>Favorites</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <section>
            <h2>My Contributions</h2>
            {contributions.length === 0 ? (
              <p>No contributions yet</p>
            ) : (
              <div className="grid grid-3">
                {contributions.map((item) => (
                  <HeritageCard key={item._id} heritage={item} />
                ))}
              </div>
            )}
          </section>

          <section>
            <h2>My Favorites</h2>
            {favorites.length === 0 ? (
              <p>No favorites yet</p>
            ) : (
              <div className="grid grid-3">
                {favorites.map((item) => (
                  <HeritageCard key={item._id} heritage={item} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;

