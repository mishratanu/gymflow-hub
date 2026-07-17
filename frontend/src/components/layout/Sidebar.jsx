import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineUserGroup,
  HiOutlineClipboardCheck,
  HiOutlineCreditCard,
  HiOutlineCash,
  HiOutlineChartBar,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';

// roles: which roles can SEE this nav item (undefined = all authenticated)
const NAV_ITEMS = [
  { path: '/dashboard',              label: 'Dashboard',        icon: HiOutlineViewGrid },
  { path: '/dashboard/members',      label: 'Members',          icon: HiOutlineUsers,         roles: ['super_admin','gym_owner','trainer','receptionist'] },
  { path: '/dashboard/trainers',     label: 'Trainers',         icon: HiOutlineUserGroup,     roles: ['super_admin','gym_owner','trainer','receptionist'] },
  { path: '/dashboard/attendance',   label: 'Attendance',       icon: HiOutlineClipboardCheck, roles: ['super_admin','gym_owner','trainer','receptionist'] },
  { path: '/dashboard/plans',        label: 'Membership Plans', icon: HiOutlineCreditCard,    roles: ['super_admin','gym_owner'] },
  { path: '/dashboard/payments',     label: 'Payments',         icon: HiOutlineCash,          roles: ['super_admin','gym_owner'] },
  { path: '/dashboard/reports',      label: 'Reports',          icon: HiOutlineChartBar,      roles: ['super_admin','gym_owner'] },
  { path: '/dashboard/notifications', label: 'Notifications',   icon: HiOutlineBell },
  { path: '/dashboard/settings',     label: 'Settings',         icon: HiOutlineCog,           roles: ['super_admin','gym_owner'] },
];

const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar, notifications } = useApp();
  const { user, logout } = useAuth();

  const displayName = user?.full_name || user?.name || 'User';
  const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const roleLabel = user?.role ? user.role.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Admin';
  const userRole = user?.role || '';
  const location = useLocation();

  // Filter nav items by the current user's role
  const visibleNavItems = NAV_ITEMS.filter(item =>
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col bg-slate-900/95 border-r border-slate-700/50 backdrop-blur-xl overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700/50 flex-shrink-0">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                <HiOutlineLightningBolt className="text-white" size={16} />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">GymFlow</span>
            </motion.div>
          )}
          {sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto"
            >
              <HiOutlineLightningBolt className="text-white" size={16} />
            </motion.div>
          )}
        </AnimatePresence>

        {!sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
          >
            <HiOutlineChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-4 px-3 space-y-1">
        {visibleNavItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));
          const isNotif = path === '/dashboard/notifications';

          return (
            <NavLink key={path} to={path}>
              <motion.div
                whileHover={{ x: 2 }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative
                  ${isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }
                `}
              >
                <div className="relative flex-shrink-0">
                  <Icon size={20} />
                  {isNotif && notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold">
                      {notifications}
                    </span>
                  )}
                </div>
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !sidebarCollapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle when collapsed */}
      {sidebarCollapsed && (
        <div className="px-3 pb-2">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2.5 rounded-xl hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
          >
            <HiOutlineChevronRight size={16} />
          </button>
        </div>
      )}

      {/* User Profile */}
      <div className="border-t border-slate-700/50 p-3 flex-shrink-0">
        <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-700/50 transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <Avatar initials={initials} size="sm" online />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-white truncate">{displayName}</p>
                <p className="text-xs text-slate-400 truncate">{roleLabel}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!sidebarCollapsed && (
            <button
              onClick={logout}
              className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors flex-shrink-0"
              title="Logout"
            >
              <HiOutlineLogout size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
