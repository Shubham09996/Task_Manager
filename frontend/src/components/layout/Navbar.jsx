import React, { useContext } from 'react';
import { Search, Bell } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-surface/30 backdrop-blur-md sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks, projects, people..." 
            className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-muted bg-white/5 border border-white/10 rounded">Ctrl</kbd>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-muted bg-white/5 border border-white/10 rounded">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-4">
        <button className="text-muted hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-danger rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l border-white/10 pl-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary to-primary flex items-center justify-center font-bold text-sm">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white leading-none">{user.name}</p>
            <p className="text-xs text-muted mt-1">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
