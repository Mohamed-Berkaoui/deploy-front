import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiCheckSquare } from 'react-icons/fi';
import './Header.css';

const Header = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="logo"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiCheckSquare className="logo-icon" />
        <span>Taskify</span>
      </motion.div>

      <div className="header-right">
        <motion.div
          className="user-info"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="user-name">{user?.name}</span>
        </motion.div>

        <motion.button
          className="logout-button"
          onClick={handleLogout}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          <FiLogOut />
          <span>Logout</span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
