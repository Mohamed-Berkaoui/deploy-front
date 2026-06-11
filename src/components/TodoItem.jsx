import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { FiCheck, FiTrash2, FiEdit3, FiX, FiSave } from 'react-icons/fi';
import './TodoItem.css';

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    x: -100,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, isCompleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isDeleting, setIsDeleting] = useState(false);

  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['#ef4444', '#ffffff', '#22c55e']
  );
  const deleteOpacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0]);
  const completeOpacity = useTransform(x, [0, 50, 100], [0, 0.5, 1]);

  const handleDragEnd = () => {
    const xVal = x.get();
    if (xVal < -80) {
      setIsDeleting(true);
      setTimeout(() => {
        onDelete(todo._id);
      }, 200);
    } else if (xVal > 80) {
      onToggle(todo._id);
    }
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo._id, { title: editTitle.trim(), description: editDescription.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  return (
    <motion.li
      className={`todo-item-wrapper ${isCompleted ? 'completed' : ''}`}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
    >
      <motion.div className="swipe-actions">
        <motion.div className="swipe-delete" style={{ opacity: deleteOpacity }}>
          <FiTrash2 />
        </motion.div>
        <motion.div className="swipe-complete" style={{ opacity: completeOpacity }}>
          <FiCheck />
        </motion.div>
      </motion.div>

      <motion.div
        className="todo-item"
        style={{ background, x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: isEditing ? 1 : 1.01 }}
        whileTap={{ scale: isEditing ? 1 : 0.99 }}
      >
        <AnimatePresence mode="wait">
          {isEditing ? (
            <motion.div
              key="editing"
              className="edit-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <input
                type="text"
                className="edit-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Task title"
                autoFocus
              />
              <input
                type="text"
                className="edit-input edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
              />
              <div className="edit-actions">
                <motion.button
                  className="edit-btn save"
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiSave />
                  Save
                </motion.button>
                <motion.button
                  className="edit-btn cancel"
                  onClick={handleCancel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiX />
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="display"
              className="display-mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.button
                className={`checkbox ${todo.completed ? 'checked' : ''}`}
                onClick={() => onToggle(todo._id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence>
                  {todo.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <FiCheck />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="todo-content">
                <h3 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="todo-description">{todo.description}</p>
                )}
              </div>

              <div className="todo-actions">
                <motion.button
                  className="action-btn edit"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiEdit3 />
                </motion.button>
                <motion.button
                  className="action-btn delete"
                  onClick={() => {
                    setIsDeleting(true);
                    setTimeout(() => onDelete(todo._id), 200);
                  }}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiTrash2 />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.li>
  );
};

export default TodoItem;
