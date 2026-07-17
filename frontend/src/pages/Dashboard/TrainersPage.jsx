import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiStar,
  HiOutlinePlus,
  HiOutlineCalendar,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineBriefcase,
  HiOutlineClipboardCheck,
  HiOutlineCurrencyDollar,
  HiOutlineX,
  HiOutlineSearch,
  HiOutlineFilter,
} from 'react-icons/hi';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import ChartCard from '../../components/common/ChartCard';
import Modal from '../../components/common/Modal';
import { TRAINERS, TRAINER_PERFORMANCE } from '../../utils/data';

// ─── Trainer Profile Modal ────────────────────────────────────────────────────
const TrainerProfileModal = ({ trainer, onClose }) => {
  if (!trainer) return null;

  const radarData = [
    { subject: 'Clients', value: Math.round((trainer.clients / 35) * 100) },
    { subject: 'Rating', value: Math.round((trainer.rating / 5) * 100) },
    { subject: 'Sessions', value: 78 },
    { subject: 'Revenue', value: 82 },
    { subject: 'Retention', value: 91 },
    { subject: 'Satisfaction', value: 88 },
  ];

  const sessionHistory = [
    { week: 'Wk 1', sessions: 24 },
    { week: 'Wk 2', sessions: 28 },
    { week: 'Wk 3', sessions: 22 },
    { week: 'Wk 4', sessions: 31 },
  ];

  return (
    <Modal
      isOpen={!!trainer}
      onClose={onClose}
      title="Trainer Profile"
      size="lg"
    >
      {/* Header */}
      <div className="flex items-start gap-5 mb-6">
        <Avatar initials={trainer.avatar} size="xl" online={trainer.status === 'Active'} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white">{trainer.name}</h2>
              <p className="text-emerald-400 text-sm font-medium mt-0.5">{trainer.specialty}</p>
            </div>
            <Badge variant={trainer.status === 'Active' ? 'success' : 'warning'} dot>
              {trainer.status}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <HiOutlineMail size={14} />
              {trainer.email}
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineCalendar size={14} />
              {trainer.schedule}
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineBriefcase size={14} />
              {trainer.experience} experience
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Active Clients', value: trainer.clients, icon: HiOutlineClipboardCheck, color: 'text-emerald-400' },
          { label: 'Rating', value: `${trainer.rating} ★`, icon: HiStar, color: 'text-amber-400' },
          { label: 'Sessions / Mo', value: Math.round(trainer.clients * 4), icon: HiOutlineCalendar, color: 'text-blue-400' },
          { label: 'Revenue', value: `$${(trainer.clients * 300).toLocaleString()}`, icon: HiOutlineCurrencyDollar, color: 'text-violet-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-slate-800/60 rounded-xl p-3 text-center">
            <Icon size={18} className={`${color} mx-auto mb-1`} />
            <p className="text-white font-bold text-lg leading-tight">{value}</p>
            <p className="text-slate-400 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/40 rounded-xl p-4">
          <p className="text-sm font-medium text-white mb-3">Performance Radar</p>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 10 }} />
              <Radar dataKey="value" fill="#10B981" fillOpacity={0.2} stroke="#10B981" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-slate-800/40 rounded-xl p-4">
          <p className="text-sm font-medium text-white mb-3">Sessions This Month</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={sessionHistory} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15,23,42,0.95)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="sessions" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Specialties / Tags */}
      <div className="mb-2">
        <p className="text-sm font-medium text-slate-300 mb-2">Specialties</p>
        <div className="flex flex-wrap gap-2">
          {trainer.specialty.split(' & ').map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          <span className="px-3 py-1 rounded-full bg-slate-700/60 border border-slate-600/40 text-slate-400 text-xs font-medium">
            Personal Training
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-700/60 border border-slate-600/40 text-slate-400 text-xs font-medium">
            Goal Setting
          </span>
        </div>
      </div>
    </Modal>
  );
};

// ─── Trainer Card ─────────────────────────────────────────────────────────────
const TrainerCard = ({ trainer, onViewProfile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Avatar initials={trainer.avatar} size="lg" online={trainer.status === 'Active'} />
        <div>
          <h3 className="text-white font-semibold text-sm leading-tight">{trainer.name}</h3>
          <p className="text-slate-400 text-xs mt-0.5">{trainer.specialty}</p>
        </div>
      </div>
      <Badge variant={trainer.status === 'Active' ? 'success' : 'warning'} dot size="sm">
        {trainer.status}
      </Badge>
    </div>

    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="bg-slate-800/60 rounded-xl p-3 text-center">
        <p className="text-white font-bold text-lg leading-tight">{trainer.clients}</p>
        <p className="text-slate-400 text-xs mt-0.5">Clients</p>
      </div>
      <div className="bg-slate-800/60 rounded-xl p-3 text-center">
        <div className="flex items-center justify-center gap-1">
          <HiStar className="text-amber-400" size={13} />
          <p className="text-white font-bold text-lg leading-tight">{trainer.rating}</p>
        </div>
        <p className="text-slate-400 text-xs mt-0.5">Rating</p>
      </div>
      <div className="bg-slate-800/60 rounded-xl p-3 text-center">
        <p className="text-white font-bold text-lg leading-tight">{trainer.experience.split(' ')[0]}</p>
        <p className="text-slate-400 text-xs mt-0.5">Years</p>
      </div>
    </div>

    <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/50 pt-4 mt-auto">
      <div className="flex items-center gap-1.5">
        <HiOutlineCalendar size={13} />
        <span>{trainer.schedule}</span>
      </div>
      <button
        type="button"
        onClick={() => onViewProfile(trainer)}
        className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer select-none"
      >
        View Profile
        <span aria-hidden="true">→</span>
      </button>
    </div>
  </motion.div>
);

// ─── Trainers Page ────────────────────────────────────────────────────────────
const TrainersPage = () => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = TRAINERS.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialty.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout title="Trainers" breadcrumb="GymFlow HQ · Trainers">
      <div className="space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-white font-semibold text-lg">
              {TRAINERS.length} Trainers on Staff
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              {TRAINERS.filter((t) => t.status === 'Active').length} active ·{' '}
              {TRAINERS.filter((t) => t.status !== 'Active').length} on leave
            </p>
          </div>
          <Button size="sm" icon={<HiOutlinePlus size={16} />}>
            Add Trainer
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search trainers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Active', 'On Leave'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  statusFilter === s
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:text-white hover:border-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Trainer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((trainer, i) => (
                <motion.div
                  key={trainer.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <TrainerCard
                    trainer={trainer}
                    onViewProfile={setSelectedTrainer}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-16 text-slate-500"
              >
                <HiOutlineSearch size={40} className="mb-3 opacity-40" />
                <p className="text-sm">No trainers match your search.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Performance Chart */}
        <ChartCard
          title="Trainer Performance"
          subtitle="Clients and sessions this month"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={TRAINER_PERFORMANCE}
              margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#64748B', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#64748B', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15,23,42,0.95)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="clients" fill="#10B981" radius={[4, 4, 0, 0]} name="Clients" />
              <Bar dataKey="sessions" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Sessions" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* Trainer Profile Modal */}
      <TrainerProfileModal
        trainer={selectedTrainer}
        onClose={() => setSelectedTrainer(null)}
      />
    </DashboardLayout>
  );
};

export default TrainersPage;
