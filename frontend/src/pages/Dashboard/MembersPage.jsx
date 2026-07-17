import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSearch, HiOutlineFilter, HiOutlinePlus, HiOutlineDownload } from 'react-icons/hi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { MEMBERS } from '../../utils/data';

const MembersPage = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlan, setFilterPlan] = useState('All');
  const [addModal, setAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const filtered = MEMBERS.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || m.status === filterStatus;
    const matchPlan = filterPlan === 'All' || m.plan === filterPlan;
    return matchSearch && matchStatus && matchPlan;
  });

  const columns = [
    {
      key: 'name',
      label: 'Member',
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <Avatar initials={row.avatar} size="sm" />
          <div>
            <p className="text-white font-medium text-sm">{row.name}</p>
            <p className="text-slate-400 text-xs">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'plan',
      label: 'Plan',
      sortable: true,
      render: (val) => (
        <Badge variant={val === 'Elite' ? 'elite' : val === 'Premium' ? 'success' : val === 'Standard' ? 'info' : 'default'}>
          {val}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (val) => (
        <Badge variant={val === 'Active' ? 'success' : val === 'Expired' ? 'danger' : 'warning'} dot>
          {val}
        </Badge>
      ),
    },
    {
      key: 'attendance',
      label: 'Attendance',
      sortable: true,
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-slate-700 rounded-full max-w-16">
            <div
              className="h-full rounded-full"
              style={{ width: `${val}%`, background: val >= 80 ? '#10B981' : val >= 50 ? '#F59E0B' : '#EF4444' }}
            />
          </div>
          <span className="text-slate-300 text-xs">{val}%</span>
        </div>
      ),
    },
    { key: 'joined', label: 'Joined', sortable: true, render: (val) => <span className="text-slate-400 text-xs">{val}</span> },
    {
      key: 'renewalDate',
      label: 'Renewal',
      render: (val) => <span className="text-slate-400 text-xs">{val}</span>,
    },
    {
      key: 'id',
      label: 'Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setSelectedMember(row)}
            className="px-3 py-1 text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
          >
            View
          </button>
          <button className="px-3 py-1 text-xs bg-slate-700/60 text-slate-300 hover:bg-slate-600/60 rounded-lg transition-colors">
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout title="Members" breadcrumb="GymFlow HQ · Members">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-slate-400 text-sm">{filtered.length} of {MEMBERS.length} members</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" icon={<HiOutlineDownload size={16} />}>
              Export
            </Button>
            <Button size="sm" icon={<HiOutlinePlus size={16} />} onClick={() => setAddModal(true)}>
              Add Member
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-48">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 input-focus"
            />
          </div>

          <div className="flex items-center gap-2">
            <HiOutlineFilter className="text-slate-400" size={16} />
            <span className="text-slate-400 text-sm">Status:</span>
            {['All', 'Active', 'Expired', 'Suspended'].map((s) => (
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

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Plan:</span>
            {['All', 'Basic', 'Standard', 'Premium', 'Elite'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPlan(p)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                  filterPlan === p ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <Table columns={columns} data={filtered} />
        </div>
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Add New Member"
        footer={
          <>
            <Button variant="ghost" onClick={() => setAddModal(false)}>Cancel</Button>
            <Button onClick={() => setAddModal(false)}>Add Member</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Alex" required />
            <Input label="Last Name" placeholder="Johnson" required />
          </div>
          <Input label="Email" type="email" placeholder="alex@email.com" required />
          <Input label="Phone" placeholder="+1 (555) 000-0000" />
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-2">Membership Plan</label>
            <select className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white input-focus">
              <option value="Basic">Basic — $29/mo</option>
              <option value="Standard">Standard — $49/mo</option>
              <option value="Premium" selected>Premium — $79/mo</option>
              <option value="Elite">Elite — $129/mo</option>
            </select>
          </div>
          <Input label="Start Date" type="date" required />
        </div>
      </Modal>

      {/* Member Detail Modal */}
      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title="Member Details"
        size="lg"
      >
        {selectedMember && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar initials={selectedMember.avatar} size="xl" online={selectedMember.status === 'Active'} />
              <div>
                <h3 className="text-xl font-bold text-white">{selectedMember.name}</h3>
                <p className="text-slate-400">{selectedMember.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={selectedMember.plan === 'Elite' ? 'elite' : 'success'}>{selectedMember.plan}</Badge>
                  <Badge variant={selectedMember.status === 'Active' ? 'success' : 'danger'} dot>{selectedMember.status}</Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Member ID', value: selectedMember.id },
                { label: 'Joined', value: selectedMember.joined },
                { label: 'Renewal Date', value: selectedMember.renewalDate },
                { label: 'Attendance Rate', value: `${selectedMember.attendance}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-400 text-xs mb-1">{label}</p>
                  <p className="text-white font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default MembersPage;
