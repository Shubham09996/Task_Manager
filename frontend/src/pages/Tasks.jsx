import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskBoard from '../components/tasks/TaskBoard';
import { Search, Filter, Plus, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Tasks = () => {
  const { tasks, fetchTasks, loading, updateTaskStatus, createTask, updateTask, deleteTask } = useContext(TaskContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To do',
    priority: 'Medium',
    dueDate: ''
  });

  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    status: '',
    page: 1,
    limit: 10
  });

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  useEffect(() => {
    fetchTasks(filters).then(res => {
      if (res) {
        setPagination({ page: res.page, pages: res.pages, total: res.total });
      }
    });
  }, [fetchTasks, filters]);

  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      openModal();
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;
    const task = tasks.find(t => t._id === taskId);
    
    if (task && task.status !== newStatus) {
      await updateTaskStatus(taskId, newStatus);
    }
  };

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        status: 'To do',
        priority: 'Medium',
        dueDate: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTask) {
      await updateTask(editingTask._id, formData);
    } else {
      await createTask(formData);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (editingTask && window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(editingTask._id);
      closeModal();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Tasks</h1>
          <p className="text-muted">Plan, prioritize and ship — across {tasks.length} active items.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">✨</span>
            AI suggestions
          </button>
          <button onClick={() => openModal()} className="btn-primary rounded-xl text-sm px-5">
            <Plus size={16} /> New task
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input 
            type="text" 
            placeholder="Filter tasks..." 
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            className="w-full bg-white/5 border border-white/5 rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <select 
          value={filters.priority}
          onChange={(e) => setFilters({...filters, priority: e.target.value})}
          className="bg-white/5 border border-white/5 text-white text-sm rounded-full px-4 py-1.5 focus:outline-none appearance-none"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        
        <button className="bg-white/5 border border-white/5 text-white text-sm rounded-full px-4 py-1.5 flex items-center gap-2 hover:bg-white/10 transition-colors">
          <Filter size={14} /> More
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="text-muted">Loading tasks...</div>
        ) : (
          <TaskBoard tasks={tasks} onDragEnd={handleDragEnd} onTaskClick={openModal} />
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6 bg-white/5 border border-white/5 rounded-xl px-4 py-3">
        <div className="text-sm text-muted">
          Showing <span className="text-white">{tasks.length}</span> of <span className="text-white">{pagination.total}</span> tasks
        </div>
        <div className="flex items-center gap-2">
          <button 
            disabled={pagination.page <= 1}
            onClick={() => setFilters({ ...filters, page: pagination.page - 1 })}
            className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-muted px-2">Page {pagination.page} of {pagination.pages || 1}</span>
          <button 
            disabled={pagination.page >= pagination.pages}
            onClick={() => setFilters({ ...filters, page: pagination.page + 1 })}
            className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg p-6 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-muted hover:text-white transition-colors">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6">{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-1">Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-muted mb-1">Description</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="input-field min-h-[100px] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="input-field appearance-none bg-surface"
                  >
                    <option value="Backlog">Backlog</option>
                    <option value="To do">To do</option>
                    <option value="In progress">In progress</option>
                    <option value="In review">In review</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="input-field appearance-none bg-surface"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted mb-1">Due Date</label>
                <input 
                  type="date" 
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="input-field bg-surface text-white"
                  style={{colorScheme: 'dark'}}
                />
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
                {editingTask ? (
                  <button type="button" onClick={handleDelete} className="text-danger hover:text-danger/80 text-sm font-medium px-4 py-2">
                    Delete Task
                  </button>
                ) : <div></div>}
                <div className="flex gap-3">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-sm text-white hover:bg-white/5 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary text-sm px-6">
                    {editingTask ? 'Save Changes' : 'Create Task'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
