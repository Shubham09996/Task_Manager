import React, { createContext, useState, useCallback } from 'react';
import api from '../api/api';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters).toString();
      const { data } = await api.get(`/tasks?${params}`);
      // If no pagination/filters, store all for analytics/board
      setTasks(data.tasks || []);
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      const { data } = await api.post('/tasks', taskData);
      setTasks(prev => [data, ...prev]);
      toast.success('Task created successfully');
      return { success: true, data };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      return { success: false, message: error.response?.data?.message || 'Failed to create task' };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, taskData);
      setTasks(prev => prev.map(t => t._id === id ? data : t));
      toast.success('Task updated');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      return { success: false, message: error.response?.data?.message || 'Failed to update task' };
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/tasks/${id}/status`, { status });
      setTasks(prev => prev.map(t => t._id === id ? data : t));
      toast.success(`Task moved to ${status}`);
      return { success: true };
    } catch (error) {
      toast.error('Failed to update status');
      return { success: false };
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
      toast.success('Task deleted');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      return { success: false, message: error.response?.data?.message || 'Failed to delete task' };
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, createTask, updateTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
