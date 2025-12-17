import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiHome,
  FiBook,
  FiPlusCircle,
  FiShield,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">🇮🇳</span>
            <span className="brand-text">Swadeshi Heritage</span>
          </Link>

          <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FiHome /> Home
            </Link>
            <Link to="/heritage" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              <FiBook /> Explore
            </Link>
            
            {isAuthenticated && (
              <>
                <Link to="/contribute" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  <FiPlusCircle /> Contribute
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                    <FiShield /> Admin
                  </Link>
                )}
              </>
            )}

            <div className="navbar-auth">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                    <FiUser /> {user?.name}
                  </Link>
                  <button className="btn btn-outline" onClick={handleLogout}>
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}

              <button
                type="button"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle light/dark mode"
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

