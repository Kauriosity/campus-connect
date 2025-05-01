import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const MobileNav = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-bold text-blue-600">
            CampusConnect
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 lg:hidden">
          <div className="p-4 space-y-4">
            <Link
              to="/"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <FiHome size={20} />
              <span>Home</span>
            </Link>

            {user ? (
              <>
                <div className="p-3 text-gray-700">
                  Welcome, {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 w-full"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUser size={20} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUser size={20} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav; 