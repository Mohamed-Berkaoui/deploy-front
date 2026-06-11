import { useState, useEffect, useCallback } from 'react';
import { todosAPI } from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await todosAPI.getAll();
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title, description = '') => {
    const response = await todosAPI.create({ title, description });
    setTodos((prev) => [response.data, ...prev]);
    return response.data;
  };

  const updateTodo = async (id, updates) => {
    const response = await todosAPI.update(id, updates);
    setTodos((prev) =>
      prev.map((todo) => (todo._id === id ? response.data : todo))
    );
    return response.data;
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    if (todo) {
      return updateTodo(id, { completed: !todo.completed });
    }
  };

  const deleteTodo = async (id) => {
    await todosAPI.delete(id);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos,
  };
};
