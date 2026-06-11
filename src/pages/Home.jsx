import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../hooks/useTodos';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import Header from '../components/Header';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo, updateTodo } = useTodos();

  const pendingTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <div className="home-container">
      <motion.div
        className="home-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="gradient-orb orb-3" />
      </motion.div>

      <div className="home-content">
        <Header user={user} />

        <motion.main
          className="main-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="todo-section">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>
                {pendingTodos.length === 0
                  ? 'All caught up!'
                  : `${pendingTodos.length} task${pendingTodos.length !== 1 ? 's' : ''} remaining`}
              </h2>
              <p>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </motion.div>

            <AddTodo onAdd={addTodo} />

            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.div>
            )}

            {loading ? (
              <motion.div
                className="loading-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="loading-spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p>Loading your todos...</p>
              </motion.div>
            ) : (
              <>
                <TodoList
                  todos={pendingTodos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onUpdate={updateTodo}
                  emptyMessage="No pending tasks. Add one above!"
                />

                {completedTodos.length > 0 && (
                  <motion.div
                    className="completed-section"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="completed-header">
                      Completed ({completedTodos.length})
                    </h3>
                    <TodoList
                      todos={completedTodos}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onUpdate={updateTodo}
                      isCompleted
                    />
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Home;
