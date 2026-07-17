import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCheckCircle, HiOutlineTrash, HiOutlineBell } from 'react-icons/hi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { NOTIFICATIONS } from '../../utils/data';

const NotificationsPage = () => {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState('All');

  const filtered = notifs.filter(n => {
    if (filter === 'Unread') return !n.read;
    if (filter === 'Read') return n.read;
    return true;
  });

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));
  const deleteNotif = (id) => setNotifs(notifs.filter(n => n.id !== id));

  const TYPE_CONFIG = {
    success: { variant: 'success', label: 'Success' },
    warning: { variant: 'warning', label: 'Warning' },
    error: { variant: 'danger', label: 'Alert' },
    info: { variant: 'info', label: 'Info' },
  };

  return (
    <DashboardLayout title="Notifications" breadcrumb="GymFlow HQ · Notifications">
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {['All', 'Unread', 'Read'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm rounded-xl font-medium transition-all ${
                  filter === f ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {f}
                {f === 'Unread' && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                    {notifs.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" icon={<HiOutlineCheckCircle size={16} />} onClick={markAllRead}>
            Mark all read
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <HiOutlineBell className="text-slate-600 mx-auto mb-3" size={40} />
              <p className="text-slate-400">No notifications to show</p>
            </div>
          ) : (
            filtered.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 ${
                  !notif.read ? 'border-l-2 border-l-emerald-500' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notif.type === 'success' ? 'bg-emerald-500/15' :
                  notif.type === 'warning' ? 'bg-amber-500/15' :
                  notif.type === 'error' ? 'bg-red-500/15' : 'bg-blue-500/15'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    notif.type === 'success' ? 'bg-emerald-400' :
                    notif.type === 'warning' ? 'bg-amber-400' :
                    notif.type === 'error' ? 'bg-red-400' : 'bg-blue-400'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`font-semibold text-sm ${!notif.read ? 'text-white' : 'text-slate-300'}`}>
                        {notif.title}
                      </p>
                      <p className="text-slate-400 text-sm mt-0.5">{notif.message}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant={TYPE_CONFIG[notif.type]?.variant || 'default'} size="sm">
                        {TYPE_CONFIG[notif.type]?.label}
                      </Badge>
                      {!notif.read && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-slate-500 text-xs">{notif.time}</span>
                    <button
                      onClick={() => deleteNotif(notif.id)}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <HiOutlineTrash size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
