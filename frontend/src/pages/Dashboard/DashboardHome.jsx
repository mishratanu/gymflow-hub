import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  HiOutlineUsers,
  HiOutlineClipboardCheck,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineCalendar,
  HiOutlineRefresh,
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCard from '../../components/common/StatsCard';
import ChartCard from '../../components/common/ChartCard';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import {
  STATS, REVENUE_DATA, ATTENDANCE_DATA, MEMBERSHIP_DISTRIBUTION,
  RECENT_ACTIVITY, UPCOMING_RENEWALS, MEMBERS,
} from '../../utils/data';

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-4 py-3 border border-slate-700/50 shadow-xl">
      <p className="text-slate-400 text-xs mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-300 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">
            {typeof p.value === 'number' && p.name === 'revenue' ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const ACTIVITY_COLORS = {
  checkin: 'text-emerald-400 bg-emerald-500/10',
  checkout: 'text-slate-400 bg-slate-700/50',
  payment: 'text-blue-400 bg-blue-500/10',
  new_member: 'text-purple-400 bg-purple-500/10',
  renewal: 'text-amber-400 bg-amber-500/10',
  plan_change: 'text-cyan-400 bg-cyan-500/10',
  trainer: 'text-rose-400 bg-rose-500/10',
};

const DashboardHome = () => {
  const [revenueView, setRevenueView] = useState('revenue');

  const statsData = [
    { title: 'Total Members', value: STATS.totalMembers, change: STATS.memberGrowth, icon: <HiOutlineUsers size={22} />, color: '#10B981', format: 'number' },
    { title: "Today's Attendance", value: STATS.todayAttendance, change: STATS.attendanceGrowth, icon: <HiOutlineClipboardCheck size={22} />, color: '#3B82F6', format: 'number' },
    { title: 'Monthly Revenue', value: STATS.monthlyRevenue, change: STATS.revenueGrowth, icon: <HiOutlineCash size={22} />, color: '#F59E0B', format: 'currency', prefix: '$' },
    { title: 'Active Memberships', value: STATS.activeMemberships, change: STATS.membershipGrowth, icon: <HiOutlineCreditCard size={22} />, color: '#8B5CF6', format: 'number' },
  ];

  return (
    <DashboardLayout title="Dashboard" breadcrumb="GymFlow HQ · Overview">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {statsData.map((stat, i) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Revenue Chart */}
          <ChartCard
            title="Revenue Overview"
            subtitle="Monthly performance — 2024"
            className="xl:col-span-2"
            actions={
              <div className="flex gap-1">
                {['revenue', 'profit'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setRevenueView(v)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all capitalize ${
                      revenueView === v ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            }
          >
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Area type="monotone" dataKey={revenueView} stroke={revenueView === 'revenue' ? '#10B981' : '#3B82F6'} strokeWidth={2.5} fill={revenueView === 'revenue' ? 'url(#revenueGrad)' : 'url(#profitGrad)'} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Membership Distribution */}
          <ChartCard title="Membership Plans" subtitle="Active distribution">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={MEMBERSHIP_DISTRIBUTION} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {MEMBERSHIP_DISTRIBUTION.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(30,41,59,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {MEMBERSHIP_DISTRIBUTION.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-slate-400 text-xs">{item.name}</span>
                  </div>
                  <span className="text-white text-xs font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Attendance Chart + Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Attendance */}
          <ChartCard title="Weekly Attendance" subtitle="Check-ins this week" className="xl:col-span-2">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ATTENDANCE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CUSTOM_TOOLTIP />} />
                <Bar dataKey="checkins" fill="#10B981" radius={[4, 4, 0, 0]} name="checkins" />
                <Bar dataKey="checkouts" fill="#3B82F6" radius={[4, 4, 0, 0]} name="checkouts" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Recent Activity */}
          <ChartCard title="Recent Activity" subtitle="Live updates">
            <div className="space-y-3 max-h-56 overflow-y-auto sidebar-scroll">
              {RECENT_ACTIVITY.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${ACTIVITY_COLORS[activity.type] || 'text-slate-400 bg-slate-700/50'}`}>
                    <HiOutlineLightningBolt size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-xs leading-relaxed">{activity.message}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {/* Upcoming Renewals */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-semibold">Upcoming Renewals</h3>
                <p className="text-slate-400 text-sm">Members expiring soon</p>
              </div>
              <Badge variant="warning" dot>{UPCOMING_RENEWALS.length} pending</Badge>
            </div>
            <div className="space-y-3">
              {UPCOMING_RENEWALS.map((renewal) => (
                <div key={renewal.member} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <Avatar initials={renewal.member.split(' ').map(n => n[0]).join('')} size="sm" />
                    <div>
                      <p className="text-white text-sm font-medium">{renewal.member}</p>
                      <p className="text-slate-400 text-xs">{renewal.plan} · {renewal.date}</p>
                    </div>
                  </div>
                  <Badge variant={renewal.daysLeft <= 5 ? 'danger' : 'warning'} size="sm">
                    {renewal.daysLeft}d left
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Members */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-semibold">Recent Members</h3>
                <p className="text-slate-400 text-sm">Latest registrations</p>
              </div>
              <button className="text-emerald-400 text-sm hover:text-emerald-300 flex items-center gap-1">
                View all <HiOutlineArrowRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {MEMBERS.slice(0, 5).map((member) => (
                <div key={member.id} className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
                  <div className="flex items-center gap-3">
                    <Avatar initials={member.avatar} size="sm" />
                    <div>
                      <p className="text-white text-sm font-medium">{member.name}</p>
                      <p className="text-slate-400 text-xs">{member.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={member.plan === 'Elite' ? 'elite' : member.plan === 'Premium' ? 'success' : 'default'}
                      size="sm"
                    >
                      {member.plan}
                    </Badge>
                    <Badge
                      variant={member.status === 'Active' ? 'success' : member.status === 'Expired' ? 'danger' : 'warning'}
                      size="sm"
                      dot
                    >
                      {member.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
