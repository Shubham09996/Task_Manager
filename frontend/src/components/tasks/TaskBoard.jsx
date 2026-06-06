import React from 'react';
import { useDroppable, DndContext, pointerWithin, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({ title, tasks, id, onTaskClick }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  const columnColors = {
    'Backlog': 'text-muted',
    'To do': 'text-secondary',
    'In progress': 'text-primary',
    'Done': 'text-success'
  };

  return (
    <div className="flex flex-col min-w-[300px] max-w-[300px]">
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className={`w-2 h-2 rounded-full bg-current ${columnColors[title] || 'text-white'}`}></span>
        <h3 className="font-semibold text-white">{title}</h3>
        <span className="text-muted text-sm ml-2">{tasks.length}</span>
        <button className="ml-auto text-muted hover:text-white transition-colors">+</button>
      </div>
      
      <div 
        ref={setNodeRef} 
        className="flex-1 bg-white/5 rounded-2xl p-3 min-h-[150px] border border-white/5 transition-colors"
      >
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onClick={onTaskClick} />
        ))}
      </div>
    </div>
  );
};

const TaskBoard = ({ tasks, onDragEnd, onTaskClick }) => {
  const columns = ['Backlog', 'To do', 'In progress', 'Done'];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <DndContext onDragEnd={onDragEnd} collisionDetection={pointerWithin} sensors={sensors}>
      <div className="flex gap-6 overflow-x-auto pb-4 pt-2">
        {columns.map(col => (
          <Column 
            key={col} 
            id={col} 
            title={col} 
            tasks={tasks.filter(t => t.status === col)} 
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
