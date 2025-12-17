import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { FiUpload, FiX } from 'react-icons/fi';
import './Contribute.css';

const Contribute = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    category: '',
    state: '',
    city: '',
    historicalSignificance: '',
    culturalImportance: '',
    yearEstablished: '',
    tags: '',
    images: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchCategories();
  }, [isAuthenticated, navigate]);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.slice(0, 5); // Max 5 images
    setFormData({ ...formData, images: imageFiles });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for multipart upload
      const submitData = new FormData();

      // Append all text fields
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('detailedDescription', formData.detailedDescription);
      submitData.append('category', formData.category);
      submitData.append('state', formData.state);
      submitData.append('city', formData.city);
      submitData.append('historicalSignificance', formData.historicalSignificance);
      submitData.append('culturalImportance', formData.culturalImportance);
      submitData.append('yearEstablished', formData.yearEstablished);
      submitData.append('tags', formData.tags);

      // Append image files
      formData.images.forEach((image) => {
        submitData.append('images', image);
      });

      await api.post('/heritage', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Heritage item submitted successfully!');
      navigate('/heritage');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contribute-page">
      <div className="container">
        <div className="page-header">
          <h1>Contribute to Heritage</h1>
          <p>Share India's cultural treasures with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="contribute-form">
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Taj Mahal"
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Uttar Pradesh"
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Agra"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Brief description..."
              />
            </div>

            <div className="form-group">
              <label>Detailed Description</label>
              <textarea
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                rows="6"
                placeholder="Detailed information..."
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Cultural & Historical Information</h2>
            <div className="form-group">
              <label>Historical Significance</label>
              <textarea
                name="historicalSignificance"
                value={formData.historicalSignificance}
                onChange={handleChange}
                rows="4"
                placeholder="Historical importance..."
              />
            </div>

            <div className="form-group">
              <label>Cultural Importance</label>
              <textarea
                name="culturalImportance"
                value={formData.culturalImportance}
                onChange={handleChange}
                rows="4"
                placeholder="Cultural significance..."
              />
            </div>

            <div className="form-group">
              <label>Year Established</label>
              <input
                type="text"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleChange}
                placeholder="e.g., 1653"
              />
            </div>

            <div className="form-group">
              <label>Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., monument, mughal, unesco"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Images</h2>
            <div className="form-group">
              <label className="file-label">
                <FiUpload /> Upload Images (Max 5)
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
              {formData.images.length > 0 && (
                <div className="image-preview">
                  {formData.images.map((image, index) => (
                    <div key={index} className="preview-item">
                      <span>{image.name}</span>
                      <button type="button" onClick={() => removeImage(index)}>
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Contribution'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contribute;

