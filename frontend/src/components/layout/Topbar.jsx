import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineChevronDown,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineCheck,
} from 'react-icons/hi';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import { NOTIFICATIONS } from '../../utils/data';

const Topbar = ({ title, breadcrumb }) => {
  const { notifications, markNotificationsRead, theme, toggleTheme, sidebarCollapsed } = useApp();
  const { user, logout } = useAuth();

  // Derive display name and initials from the real user object
  const displayName = user?.full_name || user?.name || 'User';
  const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const role = user?.role ? user.role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Admin';
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const sidebarWidth = sidebarCollapsed ? 72 : 256;

  return (
    <header
      className="fixed top-0 right-0 h-16 z-30 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 transition-all duration-300"
      style={{ left: sidebarWidth }}
    >
      {/* Left */}
      <div>
        <h1 className="text-white font-semibold text-lg">{title}</h1>
        {breadcrumb && <p className="text-slate-400 text-xs">{breadcrumb}</p>}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className={`relative hidden md:flex items-center transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
          <HiOutlineSearch className="absolute left-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search members..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 input-focus"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
        >
          {theme === 'dark' ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
        </button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(prev => !prev); markNotificationsRead(); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-700/60 transition-all"
          >
            <HiOutlineBell size={18} />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold notif-dot">
                {notifications}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 glass-strong rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                  <span className="font-semibold text-white text-sm">Notifications</span>
                  <span className="text-xs text-emerald-400">Mark all read</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className={`px-4 py-3 border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors ${!n.read ? 'bg-emerald-500/5' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          n.type === 'success' ? 'bg-emerald-400' :
                          n.type === 'warning' ? 'bg-amber-400' :
                          n.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">{n.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{n.time}</p>
                        </div>
                        {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center">
                  <span className="text-xs text-emerald-400 cursor-pointer hover:text-emerald-300">View all notifications</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-700/60 transition-all"
          >
            <Avatar initials={initials} size="sm" online />
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white leading-tight">{displayName}</p>
              <p className="text-xs text-slate-400">{role}</p>
            </div>
            <HiOutlineChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-56 glass-strong rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50"
              >
                <div className="px-4 py-3 border-b border-slate-700/50">
                  <p className="text-sm font-semibold text-white">{displayName}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                {[
                  { icon: HiOutlineUser, label: 'My Profile', href: '/dashboard/settings' },
                  { icon: HiOutlineCog, label: 'Settings', href: '/dashboard/settings' },
                ].map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors">
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
                <div className="border-t border-slate-700/50 mt-1">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <HiOutlineLogout size={16} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
