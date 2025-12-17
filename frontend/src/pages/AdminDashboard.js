import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [pendingHeritage, setPendingHeritage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingHeritage();
  }, []);

  const fetchPendingHeritage = async () => {
    try {
      const res = await api.get('/heritage?status=pending');
      setPendingHeritage(res.data.heritage);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/heritage/${id}`, { status: 'active' });
      toast.success('Approved');
      fetchPendingHeritage();
    } catch (error) {
      toast.error('Failed to approve');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/heritage/${id}`, { status: 'archived' });
      toast.success('Rejected');
      fetchPendingHeritage();
    } catch (error) {
      toast.error('Failed to reject');
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        <div className="admin-content">
          <section>
            <h2>Pending Approvals</h2>
            {pendingHeritage.length === 0 ? (
              <p>No pending items</p>
            ) : (
              <div className="admin-table">
                {pendingHeritage.map((item) => (
                  <div key={item._id} className="admin-item">
                    <div className="item-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <span>{item.state}</span>
                    </div>
                    <div className="item-actions">
                      <button onClick={() => handleApprove(item._id)} className="btn-approve">
                        <FiCheck /> Approve
                      </button>
                      <button onClick={() => handleReject(item._id)} className="btn-reject">
                        <FiX /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

