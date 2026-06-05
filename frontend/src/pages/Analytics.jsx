import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics = () => {
  const { tasks, fetchTasks, loading } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const completed = tasks.filter(t => t.status === 'Done').length;
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const data = last7Days.map(date => {
    const dateStr = date.toISOString().split('T')[0];
    const dayTasks = tasks.filter(t => new Date(t.createdAt).toISOString().split('T')[0] === dateStr);
    const completedTasks = tasks.filter(t => t.status === 'Done' && new Date(t.updatedAt).toISOString().split('T')[0] === dateStr);
    return {
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      created: dayTasks.length,
      completed: completedTasks.length
    };
  });

  const rateData = [...Array(4)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (3 - i) * 7);
    const upToDateTasks = tasks.filter(t => new Date(t.createdAt) <= d);
    const completedUpToDate = upToDateTasks.filter(t => t.status === 'Done');
    const rate = upToDateTasks.length ? Math.round((completedUpToDate.length / upToDateTasks.length) * 100) : 0;
    return { name: `W${i + 1}`, rate };
  });

  const statusData = [
    { name: 'Backlog', value: tasks.filter(t => t.status === 'Backlog').length, color: '#6b7280' },
    { name: 'To do', value: tasks.filter(t => t.status === 'To do').length, color: '#22d3ee' },
    { name: 'In progress', value: tasks.filter(t => t.status === 'In progress').length, color: '#a855f7' },
    { name: 'In review', value: tasks.filter(t => t.status === 'In review').length, color: '#eab308' },
    { name: 'Done', value: tasks.filter(t => t.status === 'Done').length, color: '#22c55e' }
  ].filter(item => item.value > 0);

  if (loading) return <div className="text-white">Loading analytics...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-muted">Deep dive into your team's velocity and task distribution.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 col-span-2 border border-white/5">
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

        <div className="glass-card p-6 border border-white/5 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-white mb-6 w-full text-left">Task Distribution</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{backgroundColor: '#1a1a24', borderColor: '#ffffff10', borderRadius: '8px'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {statusData.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-muted">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6 col-span-3 border border-white/5 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-white">Completion rate trend</h3>
            <p className="text-sm text-muted">Rolling 30-day window showing velocity improvement</p>
          </div>
          <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{backgroundColor: '#1a1a24', borderColor: '#ffffff10', borderRadius: '8px'}} />
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

export default Analytics;
