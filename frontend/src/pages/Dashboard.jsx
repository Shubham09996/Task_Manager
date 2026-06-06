import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { CheckCircle, Clock, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { tasks, fetchTasks, loading } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const completed = tasks.filter(t => t.status === 'Done').length;
  const inProgress = tasks.filter(t => t.status === 'In progress').length;
  const overdue = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done').length;
  
  // Calculate dynamic Focus Score
  const focusScore = tasks.length > 0 
    ? Math.max(0, Math.min(100, Math.round((completed / tasks.length) * 100) - (overdue * 5)))
    : 100; // 100 if no tasks

  // Calculate dynamic Streak
  const calculateStreak = () => {
    const doneTasks = tasks.filter(t => t.status === 'Done').sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    if (doneTasks.length === 0) return 0;

    const dates = [...new Set(doneTasks.map(t => new Date(t.updatedAt).toDateString()))];
    let currentStreak = 0;
    let currentDate = new Date();
    
    // Check if task done today
    if (dates.includes(currentDate.toDateString())) {
      currentStreak = 1;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // Check yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (dates.includes(yesterday.toDateString())) {
        currentStreak = 1;
        currentDate = yesterday;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        return 0; // Broken streak
      }
    }

    while (dates.includes(currentDate.toDateString())) {
      currentStreak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return currentStreak;
  };

  const streak = calculateStreak();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const tasksThisWeek = tasks.filter(t => new Date(t.createdAt) >= oneWeekAgo).length;
  const completedThisWeek = tasks.filter(t => t.status === 'Done' && new Date(t.updatedAt) >= oneWeekAgo).length;

  const recentTasks = tasks.slice(0, 5);

  if (loading) return <div className="text-white">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="glass-card p-8 bg-gradient-to-br from-surface to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm text-white">
              <span className={`w-2 h-2 rounded-full ${streak > 0 ? 'bg-primary animate-pulse' : 'bg-muted'}`}></span>
              {streak} {streak === 1 ? 'day' : 'days'} streak
            </div>
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white flex items-center gap-2">
              <span className="text-muted">Focus Score</span> 
              <span className={`font-semibold ${focusScore >= 80 ? 'text-success' : focusScore >= 50 ? 'text-secondary' : 'text-danger'}`}>{focusScore}</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-3">{getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{user?.name?.split(' ')[0]}</span>.</h1>
        <p className="text-muted text-lg">You completed <span className="text-white font-medium">{completed}</span> tasks this week. You have <span className="text-danger font-medium">{overdue}</span> overdue — let's clear those first.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <p className="text-muted text-xs font-semibold tracking-wider uppercase">Total Tasks</p>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary">
              <CheckCircle size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">{tasks.length}</h3>
            <p className="text-muted text-xs flex items-center gap-1 mt-1"><TrendingUp size={12} className="text-success" /> +{tasksThisWeek} this week</p>
          </div>
        </div>
        
        <div className="glass-card p-6 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <p className="text-muted text-xs font-semibold tracking-wider uppercase">Completed</p>
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success">
              <CheckCircle size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">{completed}</h3>
            <p className="text-muted text-xs flex items-center gap-1 mt-1"><TrendingUp size={12} className="text-success" /> +{completedThisWeek} this week</p>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <p className="text-muted text-xs font-semibold tracking-wider uppercase">In Progress</p>
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
              <Clock size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">{inProgress}</h3>
            <p className="text-muted text-xs flex items-center gap-1 mt-1"><Clock size={12} className="text-secondary" /> Active right now</p>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between h-36 border-danger/20">
          <div className="flex justify-between items-start">
            <p className="text-muted text-xs font-semibold tracking-wider uppercase">Overdue</p>
            <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center text-danger">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">{overdue}</h3>
            <p className="text-muted text-xs flex items-center gap-1 mt-1"><AlertTriangle size={12} className="text-danger" /> Needs attention</p>
          </div>
        </div>
      </div>

      {/* Differentiated Content: Recent Tasks instead of Charts */}
      <div className="glass-card p-6 border border-white/5">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Recent Tasks</h3>
          <Link to="/dashboard/tasks" className="text-sm font-medium text-primary hover:text-accent flex items-center gap-1 transition-colors">
            View all tasks <ArrowRight size={14} />
          </Link>
        </div>
        
        {recentTasks.length === 0 ? (
          <div className="text-muted text-sm py-4">No tasks found. Create one to get started!</div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map(task => (
              <div key={task._id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-danger' : task.priority === 'Medium' ? 'bg-warning' : 'bg-secondary'}`}></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">{task.title}</h4>
                    <span className="text-xs text-muted">{task.status}</span>
                  </div>
                </div>
                {task.dueDate && (
                  <div className="text-xs text-muted flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
