import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { HiOutlineClipboardCheck, HiOutlineLogout, HiOutlineClock } from 'react-icons/hi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ChartCard from '../../components/common/ChartCard';
import StatsCard from '../../components/common/StatsCard';
import Avatar from '../../components/common/Avatar';
import Badge from '../../components/common/Badge';
import { ATTENDANCE_DATA, MEMBERS } from '../../utils/data';

const LIVE_CHECKINS = [
  { member: 'Alex Johnson', avatar: 'AJ', time: '2 min ago', type: 'Check In' },
  { member: 'Olivia Chen', avatar: 'OC', time: '8 min ago', type: 'Check In' },
  { member: 'Marcus Williams', avatar: 'MW', time: '15 min ago', type: 'Check Out' },
  { member: 'Sophia Lee', avatar: 'SL', time: '22 min ago', type: 'Check In' },
  { member: 'James Rodriguez', avatar: 'JR', time: '35 min ago', type: 'Check Out' },
  { member: 'Isabella Martinez', avatar: 'IM', time: '48 min ago', type: 'Check In' },
  { member: 'Ryan Thompson', avatar: 'RT', time: '1 hr ago', type: 'Check In' },
];

const HOURLY_DATA = [
  { hour: '6am', count: 24 }, { hour: '7am', count: 67 }, { hour: '8am', count: 89 },
  { hour: '9am', count: 112 }, { hour: '10am', count: 98 }, { hour: '11am', count: 76 },
  { hour: '12pm', count: 134 }, { hour: '1pm', count: 89 }, { hour: '2pm', count: 56 },
  { hour: '3pm', count: 78 }, { hour: '4pm', count: 145 }, { hour: '5pm', count: 178 },
  { hour: '6pm', count: 156 }, { hour: '7pm', count: 134 }, { hour: '8pm', count: 87 },
  { hour: '9pm', count: 45 },
];

const AttendancePage = () => {
  return (
    <DashboardLayout title="Attendance" breadcrumb="GymFlow HQ · Attendance">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatsCard title="Today's Check-ins" value={347} change={5.2} icon={<HiOutlineClipboardCheck size={22} />} color="#10B981" />
          <StatsCard title="Currently In Gym" value={89} icon={<HiOutlineClock size={22} />} color="#3B82F6" />
          <StatsCard title="Today's Check-outs" value={258} change={3.1} icon={<HiOutlineLogout size={22} />} color="#F59E0B" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ChartCard title="Hourly Traffic" subtitle="Check-ins by hour today">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={HOURLY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="hour" tick={{ fill: '#64748B', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(30,41,59,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Line type="monotone" dataKey="count" stroke="#10B981" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Weekly Attendance" subtitle="This week vs last week">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ATTENDANCE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(30,41,59,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Bar dataKey="checkins" fill="#10B981" radius={[4, 4, 0, 0]} name="Check-ins" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Live Feed */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-white font-semibold">Live Attendance Feed</h3>
              <p className="text-slate-400 text-sm">Real-time check-in/out activity</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-green" />
              Live
            </div>
          </div>
          <div className="space-y-3">
            {LIVE_CHECKINS.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar initials={entry.avatar} size="sm" />
                  <div>
                    <p className="text-white text-sm font-medium">{entry.member}</p>
                    <p className="text-slate-400 text-xs">{entry.time}</p>
                  </div>
                </div>
                <Badge
                  variant={entry.type === 'Check In' ? 'success' : 'default'}
                  dot
                  size="sm"
                >
                  {entry.type}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
