import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem';
import './TodoList.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const TodoList = ({ todos, onToggle, onDelete, onUpdate, emptyMessage, isCompleted }) => {
  if (todos.length === 0 && emptyMessage) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="empty-icon"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✨
        </motion.div>
        <p>{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <motion.ul
      className="todo-list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
            isCompleted={isCompleted}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default TodoList;
