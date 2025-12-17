import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import HeritageCard from '../components/Heritage/HeritageCard';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import './HeritageList.css';

const HeritageList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [heritage, setHeritage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    state: searchParams.get('state') || ''
  });

  useEffect(() => {
    fetchCategories();
    fetchHeritage();
  }, [page, filters, search]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchHeritage = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
        ...filters
      };
      
      if (search) {
        params.search = search;
      }

      const res = await api.get('/heritage', { params });
      setHeritage(res.data.heritage);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching heritage:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    if (search) {
      setSearchParams({ ...filters, search });
    } else {
      setSearchParams(filters);
    }
    fetchHeritage();
  };

  const clearFilters = () => {
    setFilters({ category: '', state: '' });
    setSearch('');
    setPage(1);
    setSearchParams({});
  };

  return (
    <div className="heritage-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Explore Heritage</h1>
          <p>Discover India's rich cultural heritage</p>
        </div>

        <div className="search-filters">
          <form onSubmit={handleSearch} className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search heritage sites, monuments, traditions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>

          <div className="filters">
            <select
              value={filters.category}
              onChange={(e) => {
                setFilters({ ...filters, category: e.target.value });
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.icon} {cat.name}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Filter by State"
              value={filters.state}
              onChange={(e) => {
                setFilters({ ...filters, state: e.target.value });
                setPage(1);
              }}
            />

            {(filters.category || filters.state || search) && (
              <button onClick={clearFilters} className="btn btn-outline">
                <FiX /> Clear Filters
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : heritage.length === 0 ? (
          <div className="empty-state">
            <h2>No heritage found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-3">
              {heritage.map((item) => (
                <HeritageCard key={item._id} heritage={item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="btn btn-outline"
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="btn btn-outline"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeritageList;

