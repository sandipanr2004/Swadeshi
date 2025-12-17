import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import HeritageCard from '../components/Heritage/HeritageCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const { id } = useParams();
  const [heritage, setHeritage] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchData = async () => {
    try {
      const [categoryRes, heritageRes] = await Promise.all([
        api.get(`/categories`).then(res => res.data.find(c => c._id === id)),
        api.get(`/heritage?category=${id}`)
      ]);
      setCategory(categoryRes);
      setHeritage(heritageRes.data.heritage);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="category-page">
      <div className="container">
        {category && (
          <div className="category-header">
            <div className="category-icon-large" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
              {category.icon || '🏛️'}
            </div>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
          </div>
        )}

        <div className="grid grid-3">
          {heritage.map((item) => (
            <HeritageCard key={item._id} heritage={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

