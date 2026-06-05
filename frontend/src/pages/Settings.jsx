import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Bell, Shield, Key } from 'lucide-react';

const Settings = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-muted">Manage your account preferences and workspace settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-lg bg-white/10 text-white font-medium flex items-center gap-3">
            <User size={18} /> Profile
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3">
            <Shield size={18} /> Security
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3">
            <Bell size={18} /> Notifications
          </button>
          <button className="w-full text-left px-4 py-2 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3">
            <Key size={18} /> API Keys
          </button>
        </div>

        <div className="col-span-3 space-y-6">
          <div className="glass-card p-8 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-2">
                  Change Avatar
                </button>
                <p className="text-xs text-muted">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted mb-1.5">Full Name</label>
                  <input type="text" defaultValue={user?.name} className="input-field bg-surface text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-1.5">Email Address</label>
                  <input type="email" defaultValue={user?.email} className="input-field bg-surface text-white" disabled />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1.5">Role / Job Title</label>
                <input type="text" placeholder="e.g. Senior Developer" className="input-field bg-surface text-white" />
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-sm font-bold transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
          <div className="glass-card p-8 border border-danger/20">
             <h3 className="text-xl font-bold text-danger mb-2">Danger Zone</h3>
             <p className="text-muted text-sm mb-6">Permanently delete your account and all associated tasks.</p>
             <button className="bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20 px-6 py-2 rounded-lg text-sm font-bold transition-colors">
               Delete Account
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
