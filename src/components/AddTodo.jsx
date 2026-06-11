import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiX, FiSend } from 'react-icons/fi';
import './AddTodo.css';

const AddTodo = ({ onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError('');

    try {
      await onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setError('');
    setIsExpanded(false);
  };

  return (
    <div className="add-todo-container">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="add-button"
            className="add-todo-button"
            onClick={() => setIsExpanded(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="add-icon"
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FiPlus />
            </motion.div>
            <span>Add new task</span>
          </motion.button>
        ) : (
          <motion.form
            key="add-form"
            className="add-todo-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {error && (
              <motion.div
                className="add-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {error}
              </motion.div>
            )}

            <motion.input
              type="text"
              className="add-input"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            />

            <motion.input
              type="text"
              className="add-input add-description"
              placeholder="Add a description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            />

            <motion.div
              className="add-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
                whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.98 }}
              >
                <FiX />
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="submit-btn"
                disabled={!title.trim() || loading}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <motion.div
                    className="spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    <FiSend />
                    Add Task
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddTodo;
