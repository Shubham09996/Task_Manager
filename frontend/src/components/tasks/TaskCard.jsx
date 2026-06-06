import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import toast from 'react-hot-toast';
import { Clock, MessageSquare, AlertCircle, Edit2, Trash2, CheckCircle } from 'lucide-react';
import api from '../../api/api';
import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const TaskCard = ({ task, onClick }) => {
  const { deleteTask, updateTaskStatus } = useContext(TaskContext);
  const { user } = useContext(AuthContext);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: { ...task }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 10,
  } : undefined;

  const priorityColors = {
    'Low': 'bg-secondary',
    'Medium': 'bg-warning',
    'High': 'bg-danger'
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      onClick={() => onClick(task)}
      className="glass-card p-4 bg-surface/80 hover:bg-surface transition-colors cursor-grab active:cursor-grabbing mb-3 group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></span>
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">{task.priority}</span>
        </div>
        
        {/* Explicit Action Buttons */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {task.status !== 'Done' && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                updateTaskStatus(task._id, 'Done');
              }} 
              className="text-muted hover:text-emerald-400 transition-colors"
              title="Mark as Complete"
            >
              <CheckCircle size={14} />
            </button>
          )}
          <button 
            onClick={(e) => { e.stopPropagation(); onClick(task); }} 
            className="text-muted hover:text-white transition-colors"
            title="Edit Task"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              toast((t) => (
                <div className="flex flex-col gap-3">
                  <span className="text-white font-medium">Delete this task?</span>
                  <div className="flex gap-2 justify-end mt-1">
                    <button onClick={() => toast.dismiss(t.id)} className="text-muted hover:text-white px-3 py-1 text-sm bg-white/5 rounded transition-colors">Cancel</button>
                    <button onClick={() => { deleteTask(task._id); toast.dismiss(t.id); }} className="bg-danger text-white px-3 py-1 rounded text-sm shadow-lg hover:opacity-90 transition-opacity">Delete</button>
                  </div>
                </div>
              ), { duration: 5000, id: `delete-${task._id}` });
            }} 
            className="text-muted hover:text-danger transition-colors"
            title="Delete Task"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <h4 className="text-white font-medium mb-3 leading-snug">{task.title}</h4>
      
      {task.description && (
        <p className="text-sm text-muted line-clamp-2 mb-4">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-3 text-xs text-muted">
          {(task.dueDate || task.dueTime) && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {task.dueDate && new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              {task.dueDate && task.dueTime && ' · '}
              {task.dueTime && (
                <span>
                  {new Date(`2000-01-01T${task.dueTime}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center font-bold text-[10px] text-white uppercase" title={user?.name || 'Assignee'}>
          {user?.name ? user.name.charAt(0) : 'U'}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
