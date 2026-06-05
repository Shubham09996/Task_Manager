import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { tasks, fetchTasks, loading } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const completed = tasks.filter(t => t.status === 'Done').length;
  const inProgress = tasks.filter(t => t.status === 'In progress').length;
  const overdue = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done').length;
  
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const data = [
    { name: 'Mon', completed: 4, created: 6 },
    { name: 'Tue', completed: 7, created: 5 },
    { name: 'Wed', completed: 10, created: 8 },
    { name: 'Thu', completed: 6, created: 9 },
    { name: 'Fri', completed: 12, created: 7 },
    { name: 'Sat', completed: 3, created: 2 },
    { name: 'Sun', completed: 2, created: 1 },
  ];

  const rateData = [
    { name: 'W1', rate: 45 },
    { name: 'W2', rate: 52 },
    { name: 'W3', rate: 68 },
    { name: 'W4', rate: completionRate },
  ];

  if (loading) return <div className="text-white">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="glass-card p-8 bg-gradient-to-br from-surface to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <div className="flex gap-4">
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm text-white">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              7 days streak
            </div>
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white flex items-center gap-2">
              <span className="text-muted">Focus Score</span> 
              <span className="font-semibold text-secondary">92</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-3">Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{user?.name?.split(' ')[0]}</span>.</h1>
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
            <p className="text-success text-xs flex items-center gap-1 mt-1"><TrendingUp size={12} /> +12% vs last week</p>
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
            <p className="text-success text-xs flex items-center gap-1 mt-1"><TrendingUp size={12} /> +24% vs last week</p>
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
            <p className="text-danger text-xs flex items-center gap-1 mt-1"><TrendingUp size={12} className="rotate-180" /> -4% vs last week</p>
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
            <p className="text-danger text-xs flex items-center gap-1 mt-1"><TrendingUp size={12} className="rotate-180" /> -32% vs last week</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Weekly productivity</h3>
              <p className="text-sm text-muted">Tasks completed vs created — this week</p>
            </div>
            <div className="flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary"></span> Completed</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary"></span> Created</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{backgroundColor: '#1a1a24', borderColor: '#ffffff10', borderRadius: '8px'}} />
                <Bar dataKey="completed" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="created" fill="#22d3ee" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div>
            <h3 className="text-lg font-bold text-white">Completion rate</h3>
            <p className="text-sm text-muted">Rolling 30-day window</p>
          </div>
          <div className="flex-1 flex flex-col justify-center my-4">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white">{completionRate}</span>
              <span className="text-xl text-muted">%</span>
            </div>
          </div>
          <div className="h-24 w-full mt-auto">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rateData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="rate" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
