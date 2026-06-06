import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import toast from 'react-hot-toast';
import TaskBoard from '../components/tasks/TaskBoard';
import { Search, Filter, Plus, X, ChevronDown } from 'lucide-react';
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
    dueDate: '',
    dueTime: ''
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
    let shouldUpdateParams = false;
    const newParams = new URLSearchParams(searchParams);

    if (newParams.get('new') === 'true') {
      openModal();
      newParams.delete('new');
      shouldUpdateParams = true;
    }

    const q = newParams.get('q');
    if (q) {
      setFilters(prev => ({ ...prev, search: q }));
      newParams.delete('q');
      shouldUpdateParams = true;
    }

    if (shouldUpdateParams) {
      setSearchParams(newParams);
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
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        dueTime: task.dueTime || ''
      });
    } else {
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        status: 'To do',
        priority: 'Medium',
        dueDate: '',
        dueTime: ''
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
    if (editingTask) {
      toast((t) => (
        <div className="flex flex-col gap-3">
          <span className="text-white font-medium">Delete this task?</span>
          <div className="flex gap-2 justify-end mt-1">
            <button onClick={() => toast.dismiss(t.id)} className="text-muted hover:text-white px-3 py-1 text-sm bg-white/5 rounded transition-colors">Cancel</button>
            <button onClick={() => { deleteTask(editingTask._id); closeModal(); toast.dismiss(t.id); }} className="bg-danger text-white px-3 py-1 rounded text-sm shadow-lg hover:opacity-90 transition-opacity">Delete</button>
          </div>
        </div>
      ), { duration: 5000, id: `delete-${editingTask._id}` });
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

        <div className="relative">
          <select 
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="bg-white/5 border border-white/5 text-white text-sm rounded-full pl-4 pr-10 py-1.5 focus:outline-none appearance-none hover:bg-white/10 transition-colors cursor-pointer"
          >
            <option className="bg-[#111218] text-white" value="">All Priorities</option>
            <option className="bg-[#111218] text-white" value="High">High</option>
            <option className="bg-[#111218] text-white" value="Medium">Medium</option>
            <option className="bg-[#111218] text-white" value="Low">Low</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        </div>
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
                <div className="relative">
                  <label className="block text-sm text-muted mb-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="input-field appearance-none bg-surface pr-10 cursor-pointer"
                  >
                    <option className="bg-[#111218] text-white" value="Backlog">Backlog</option>
                    <option className="bg-[#111218] text-white" value="To do">To do</option>
                    <option className="bg-[#111218] text-white" value="In progress">In progress</option>
                    <option className="bg-[#111218] text-white" value="Done">Done</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-[38px] text-muted pointer-events-none" />
                </div>
                <div className="relative">
                  <label className="block text-sm text-muted mb-1">Priority</label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                    className="input-field appearance-none bg-surface pr-10 cursor-pointer"
                  >
                    <option className="bg-[#111218] text-white" value="Low">Low</option>
                    <option className="bg-[#111218] text-white" value="Medium">Medium</option>
                    <option className="bg-[#111218] text-white" value="High">High</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-[38px] text-muted pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-1">Due Date</label>
                  <input 
                    type="date" 
                    value={formData.dueDate}
                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                    className="input-field bg-surface text-white w-full"
                    style={{colorScheme: 'dark'}}
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-1">Due Time</label>
                  <input 
                    type="time" 
                    value={formData.dueTime}
                    onChange={(e) => setFormData({...formData, dueTime: e.target.value})}
                    className="input-field bg-surface text-white w-full"
                    style={{colorScheme: 'dark'}}
                  />
                </div>
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
