import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart2, LogOut, Settings, Activity } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Tasks', path: '/dashboard/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  if (!user) return null;

  return (
    <div className="w-64 bg-background border-r border-white/10 h-screen flex flex-col pt-6 pb-4">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
          Q
        </div>
        <span className="text-xl font-semibold tracking-tight text-white">Quantum</span>
      </div>

      <div className="px-4 mb-4">
        <button className="w-full bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary hover:to-accent text-white py-2.5 rounded-xl font-medium shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2" onClick={() => navigate('/dashboard/tasks?new=true')}>
          <span className="text-lg leading-none">+</span> New task
        </button>
      </div>

      <div className="px-4 text-xs font-semibold text-muted tracking-wider mb-2 mt-4 uppercase">Workspace</div>
      
      <nav className="flex-1 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-muted hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-muted hover:bg-white/5 hover:text-danger w-full transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
