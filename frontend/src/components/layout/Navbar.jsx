import React, { useContext, useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Settings as SettingsIcon, LogOut, Sparkles } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-surface/30 backdrop-blur-md sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-[#c084fc] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search tasks, projects, people..." 
            className="w-full bg-[#111218]/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-muted focus:outline-none focus:ring-1 focus:ring-[#c084fc]/50 focus:bg-[#111218] transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-muted bg-white/5 border border-white/10 rounded">Ctrl</kbd>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-muted bg-white/5 border border-white/10 rounded">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-4">
        <button className="text-muted hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ef4444] rounded-full ring-2 ring-[#0B0C10]"></span>
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-6 border-l border-white/10 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9b6cf8] to-[#67e8f9] flex items-center justify-center font-bold text-sm text-white shadow-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white leading-none">{user.name}</p>
              <p className="text-xs text-muted mt-1">{user.email}</p>
            </div>
            <ChevronDown size={14} className={`text-muted transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Next Level Dropdown */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-4 w-64 bg-[#16171d]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 origin-top-right"
              >
                {/* Header Profile Section */}
                <div className="p-5 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9b6cf8] to-[#67e8f9] flex items-center justify-center font-bold text-lg text-white shadow-lg relative">
                      {user.name?.charAt(0).toUpperCase()}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#16171d]"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{user.name}</h4>
                      <p className="text-xs text-gray-400 truncate w-32">{user.email}</p>
                    </div>
                  </div>

                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button 
                    onClick={() => { setIsProfileOpen(false); navigate('/dashboard/settings'); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all group"
                  >
                    <User size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                    My Profile
                  </button>

                </div>

                {/* Logout Section */}
                <div className="p-2 border-t border-white/5">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
