import React, { useContext, useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Settings as SettingsIcon, LogOut, Sparkles, Menu, X } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { TaskContext } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { tasks } = useContext(TaskContext) || { tasks: [] };
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search on Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/dashboard/tasks?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Compute notifications
  const overdueTasks = tasks ? tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done') : [];
  const todayTasks = tasks ? tasks.filter(t => {
    if (!t.dueDate || t.status === 'Done') return false;
    return new Date(t.dueDate).toDateString() === new Date().toDateString();
  }) : [];
  
  const notifications = [
    ...overdueTasks.map(t => ({ id: t._id, type: 'overdue', title: 'Overdue Task', message: t.title })),
    ...todayTasks.map(t => ({ id: t._id, type: 'today', title: 'Due Today', message: t.title }))
  ];

  if (!user) return null;

  return (
    <>
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-surface/30 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2 md:gap-4 flex-1 max-w-xl">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-muted hover:text-white shrink-0"
        >
          <Menu size={24} />
        </button>
        <div className="relative group flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-[#c084fc] transition-colors" size={18} />
          <input 
            ref={searchInputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
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
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="text-muted hover:text-white transition-colors relative block"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-danger rounded-full ring-2 ring-[#0B0C10] animate-pulse"></span>
            )}
          </button>
          
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-4 w-80 glass-card bg-[#111218]/95 backdrop-blur-xl border border-white/10 shadow-2xl py-2 overflow-hidden z-50 rounded-2xl"
              >
                <div className="px-4 py-2 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded-full">{notifications.length} new</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-muted text-sm">
                      You're all caught up!
                    </div>
                  ) : (
                    notifications.map((notif, idx) => (
                      <div key={notif.id + idx} className="px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 mt-1.5 rounded-full ${notif.type === 'overdue' ? 'bg-danger' : 'bg-warning'}`}></div>
                          <div>
                            <p className="text-sm font-medium text-white">{notif.title}</p>
                            <p className="text-xs text-muted mt-0.5">{notif.message}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[100] bg-[#111218] flex flex-col md:hidden"
          >
            <div className="h-16 px-4 flex justify-between items-center border-b border-white/5 bg-surface/30">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b6cf8] to-[#c58dfa] flex items-center justify-center font-bold text-white shadow-lg">F</div>
                <span className="text-xl font-semibold text-white">Flow</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-muted hover:text-white p-2">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 bg-background">
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard'); }} className="w-full text-left px-4 py-3 rounded-xl text-white hover:bg-white/5 font-medium">Dashboard</button>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard/tasks'); }} className="w-full text-left px-4 py-3 rounded-xl text-white hover:bg-white/5 font-medium">Tasks</button>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard/analytics'); }} className="w-full text-left px-4 py-3 rounded-xl text-white hover:bg-white/5 font-medium">Analytics</button>
              <button onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard/settings'); }} className="w-full text-left px-4 py-3 rounded-xl text-white hover:bg-white/5 font-medium">Settings</button>
              
              <div className="pt-6 mt-6 border-t border-white/10">
                <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-danger hover:bg-danger/10 font-medium">
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
