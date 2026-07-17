import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';
import { HiOutlineDownload, HiOutlineChartBar } from 'react-icons/hi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ChartCard from '../../components/common/ChartCard';
import Button from '../../components/common/Button';
import StatsCard from '../../components/common/StatsCard';
import { REVENUE_DATA, ATTENDANCE_DATA } from '../../utils/data';

const MEMBER_GROWTH = [
  { month: 'Jan', members: 1050 }, { month: 'Feb', members: 1089 },
  { month: 'Mar', members: 1102 }, { month: 'Apr', members: 1134 },
  { month: 'May', members: 1156 }, { month: 'Jun', members: 1178 },
  { month: 'Jul', members: 1201 }, { month: 'Aug', members: 1219 },
  { month: 'Sep', members: 1240 }, { month: 'Oct', members: 1258 },
  { month: 'Nov', members: 1271 }, { month: 'Dec', members: 1284 },
];

const CHURN_DATA = [
  { month: 'Jan', churn: 3.2 }, { month: 'Feb', churn: 2.8 },
  { month: 'Mar', churn: 3.5 }, { month: 'Apr', churn: 2.1 },
  { month: 'May', churn: 1.9 }, { month: 'Jun', churn: 2.4 },
  { month: 'Jul', churn: 2.0 }, { month: 'Aug', churn: 1.8 },
  { month: 'Sep', churn: 2.2 }, { month: 'Oct', churn: 1.7 },
  { month: 'Nov', churn: 1.5 }, { month: 'Dec', churn: 1.6 },
];

const ReportsPage = () => {
  return (
    <DashboardLayout title="Reports" breadcrumb="GymFlow HQ · Reports">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-slate-400 text-sm">December 2024 — Year overview</p>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" icon={<HiOutlineDownload size={16} />}>Export PDF</Button>
            <Button variant="secondary" size="sm" icon={<HiOutlineDownload size={16} />}>Export CSV</Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatsCard title="Annual Revenue" value={528000} format="currency" prefix="$" change={22.4} icon={<HiOutlineChartBar size={22} />} color="#10B981" />
          <StatsCard title="Member Growth" value={22.3} suffix="%" change={8.1} icon={<HiOutlineChartBar size={22} />} color="#3B82F6" />
          <StatsCard title="Avg Churn Rate" value={2.1} suffix="%" change={-1.2} icon={<HiOutlineChartBar size={22} />} color="#F59E0B" />
          <StatsCard title="LTV per Member" value={1240} format="currency" prefix="$" change={15.3} icon={<HiOutlineChartBar size={22} />} color="#8B5CF6" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ChartCard title="Annual Revenue" subtitle="Monthly revenue — 2024">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: 'rgba(30,41,59,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Member Growth" subtitle="Total members — 2024">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={MEMBER_GROWTH} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(30,41,59,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Line type="monotone" dataKey="members" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Churn Rate" subtitle="Monthly churn % — 2024">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={CHURN_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="churnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip contentStyle={{ background: 'rgba(30,41,59,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Area type="monotone" dataKey="churn" stroke="#F59E0B" strokeWidth={2.5} fill="url(#churnGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Weekly Attendance" subtitle="Check-ins by day">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ATTENDANCE_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(30,41,59,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                <Bar dataKey="checkins" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Check-ins" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
