import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart2, LogOut, Settings, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <div className={`bg-background border-r border-white/10 h-screen hidden md:flex flex-col pt-6 pb-4 transition-all duration-300 relative ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-[#111218] border border-white/10 rounded-full p-1 text-muted hover:text-white transition-colors z-50 shadow-lg"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <Link to="/" className={`px-6 mb-8 flex items-center hover:opacity-80 transition-opacity ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b6cf8] to-[#c58dfa] flex-shrink-0 flex items-center justify-center font-bold text-white shadow-lg">
          F
        </div>
        {!isCollapsed && <span className="text-xl font-semibold tracking-tight text-white whitespace-nowrap overflow-hidden">Flow</span>}
      </Link>

      <div className={`px-4 mb-4 ${isCollapsed ? 'flex justify-center px-2' : ''}`}>
        <button 
          className="w-full bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary hover:to-accent text-white py-2.5 rounded-xl font-medium shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2" 
          onClick={() => navigate('/dashboard/tasks?new=true')}
          title="New Task"
        >
          {isCollapsed ? <Plus size={20} /> : <><span className="text-lg leading-none">+</span> New task</>}
        </button>
      </div>

      {!isCollapsed && <div className="px-4 text-xs font-semibold text-muted tracking-wider mb-2 mt-4 uppercase whitespace-nowrap">Workspace</div>}
      
      <nav className={`flex-1 space-y-1 ${isCollapsed ? 'px-3 mt-8' : 'px-2'}`}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/dashboard'}
            title={item.name}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2.5 rounded-xl transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-4'} ${
                isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-muted hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <div className="flex-shrink-0">{item.icon}</div>
            {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={`mt-auto ${isCollapsed ? 'px-3' : 'px-4'}`}>
        <button 
          onClick={handleLogout}
          title="Logout"
          className={`flex items-center gap-3 py-2.5 rounded-xl text-muted hover:bg-white/5 hover:text-danger w-full transition-all overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'px-4'}`}
        >
          <div className="flex-shrink-0"><LogOut size={20} /></div>
          {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
