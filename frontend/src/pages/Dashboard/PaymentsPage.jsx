import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineDownload, HiOutlineCash } from 'react-icons/hi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import StatsCard from '../../components/common/StatsCard';
import Button from '../../components/common/Button';
import { PAYMENTS } from '../../utils/data';

const PaymentsPage = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = PAYMENTS.filter((p) => {
    const matchSearch = p.member.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPaid = PAYMENTS.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = PAYMENTS.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
  const totalFailed = PAYMENTS.filter(p => p.status === 'Failed').length;

  const columns = [
    { key: 'id', label: 'Transaction ID', render: (val) => <span className="text-emerald-400 font-mono text-xs">{val}</span> },
    { key: 'member', label: 'Member', sortable: true, render: (val) => <span className="text-white text-sm font-medium">{val}</span> },
    { key: 'plan', label: 'Plan', render: (val) => <span className="text-slate-300 text-sm">{val}</span> },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right', render: (val) => <span className="text-white font-semibold">${val}</span> },
    { key: 'date', label: 'Date', sortable: true, render: (val) => <span className="text-slate-400 text-xs">{val}</span> },
    { key: 'method', label: 'Method', render: (val) => <span className="text-slate-300 text-sm">{val}</span> },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <Badge
          variant={val === 'Paid' ? 'success' : val === 'Failed' ? 'danger' : val === 'Pending' ? 'warning' : 'info'}
          dot
        >
          {val}
        </Badge>
      ),
    },
    {
      key: 'receipt_action',
      label: '',
      align: 'right',
      render: () => (
        <button className="text-xs text-slate-400 hover:text-white transition-colors">Receipt</button>
      ),
    },
  ];

  return (
    <DashboardLayout title="Payments" breadcrumb="GymFlow HQ · Payments">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatsCard title="Total Collected" value={totalPaid} format="currency" prefix="$" icon={<HiOutlineCash size={22} />} color="#10B981" change={8.7} />
          <StatsCard title="Pending" value={totalPending} format="currency" prefix="$" icon={<HiOutlineCash size={22} />} color="#F59E0B" />
          <StatsCard title="Failed Payments" value={totalFailed} icon={<HiOutlineCash size={22} />} color="#EF4444" change={-2} />
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-48">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 input-focus"
            />
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Paid', 'Pending', 'Failed', 'Refunded'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                  filterStatus === s ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm" icon={<HiOutlineDownload size={16} />}>Export CSV</Button>
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <Table columns={columns} data={filtered} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentsPage;
