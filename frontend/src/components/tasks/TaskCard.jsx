import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Clock, MessageSquare, AlertCircle } from 'lucide-react';

const TaskCard = ({ task, onClick }) => {
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
      className="glass-card p-4 bg-surface/80 hover:bg-surface transition-colors cursor-grab active:cursor-grabbing mb-3"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></span>
        <span className="text-xs font-semibold text-muted uppercase tracking-wider">{task.priority}</span>
      </div>
      
      <h4 className="text-white font-medium mb-3 leading-snug">{task.title}</h4>
      
      {task.description && (
        <p className="text-sm text-muted line-clamp-2 mb-4">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-3 text-xs text-muted">
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </div>
          )}
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center font-bold text-[10px] text-white">
          A
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
