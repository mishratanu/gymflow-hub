import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineFilter, HiOutlinePlus, HiOutlineDownload, HiOutlinePencil, HiOutlineTrash, HiOutlineX } from 'react-icons/hi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { apiGet, apiPost, apiPut, apiDelete, API_ENDPOINTS } from '../../config/api';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split('T')[0];

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  plan: 'Basic',
  status: 'Active',
  join_date: today(),
};

// ─── Member Form Modal ────────────────────────────────────────────────────────
const MemberFormModal = ({ isOpen, onClose, onSaved, editMember }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editMember) {
        setForm({
          name:      editMember.name      || '',
          email:     editMember.email     || '',
          phone:     editMember.phone     || '',
          plan:      editMember.plan      || 'Basic',
          status:    editMember.status    || 'Active',
          join_date: editMember.join_date || today(),
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setError('');
    }
  }, [isOpen, editMember]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || form.name.trim().length < 2) { setError('Name must be at least 2 characters.'); return; }
    if (!form.email.includes('@')) { setError('Please enter a valid email address.'); return; }

    setSaving(true);
    setError('');
    try {
      let saved;
      if (editMember) {
        saved = await apiPut(API_ENDPOINTS.MEMBER_BY_ID(editMember.id), form);
      } else {
        saved = await apiPost(API_ENDPOINTS.MEMBERS, form);
      }
      onSaved(saved, !!editMember);
      onClose();
    } catch (err) {
      // Try to extract JSON error from backend
      const msg = (() => {
        try {
          const idx = err.message.indexOf('{');
          if (idx !== -1) {
            const body = JSON.parse(err.message.slice(idx));
            return body?.error || err.message;
          }
        } catch { /* ignore */ }
        return err.message || 'Something went wrong.';
      })();
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all';
  const labelCls = 'block text-sm font-medium text-slate-300 mb-1.5';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editMember ? 'Edit Member' : 'Add New Member'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? 'Saving…' : editMember ? 'Save Changes' : 'Add Member'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm flex items-start gap-2">
            <HiOutlineX size={16} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
          <input className={inputCls} placeholder="Alex Johnson" value={form.name} onChange={set('name')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Email <span className="text-red-400">*</span></label>
            <input className={inputCls} type="email" placeholder="alex@email.com" value={form.email} onChange={set('email')} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input className={inputCls} placeholder="+1 (555) 000-0000" value={form.phone} onChange={set('phone')} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Membership Plan <span className="text-red-400">*</span></label>
            <select className={inputCls} value={form.plan} onChange={set('plan')}>
              <option value="Basic">Basic — $29/mo</option>
              <option value="Standard">Standard — $49/mo</option>
              <option value="Premium">Premium — $79/mo</option>
              <option value="Elite">Elite — $129/mo</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Status <span className="text-red-400">*</span></label>
            <select className={inputCls} value={form.status} onChange={set('status')}>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Join Date</label>
          <input className={inputCls} type="date" value={form.join_date} onChange={set('join_date')} />
        </div>
      </div>
    </Modal>
  );
};

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
const DeleteConfirmModal = ({ member, onClose, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError]   = useState('');

  const handleDelete = async () => {
    setDeleting(true);
    setError('');
    try {
      await apiDelete(API_ENDPOINTS.MEMBER_BY_ID(member.id));
      onDeleted(member.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to delete member.');
      setDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={!!member}
      onClose={onClose}
      title="Delete Member"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={deleting}>Cancel</Button>
          <Button
            onClick={handleDelete}
            disabled={deleting}
            className="!bg-red-500/20 !text-red-400 hover:!bg-red-500/30 !border-red-500/30"
          >
            {deleting ? 'Deleting…' : 'Delete Member'}
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
        )}
        <p className="text-slate-300 text-sm">
          Are you sure you want to delete <span className="text-white font-semibold">{member?.name}</span>?
        </p>
        <p className="text-slate-500 text-xs">This action cannot be undone. The member record will be permanently removed.</p>
      </div>
    </Modal>
  );
};

// ─── Members Page ─────────────────────────────────────────────────────────────
const MembersPage = () => {
  const [members, setMembers]         = useState([]);
  const [loading, setLoading]         = useState(true);
  const [fetchError, setFetchError]   = useState('');

  const [search, setSearch]           = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlan, setFilterPlan]   = useState('All');

  const [addModal, setAddModal]       = useState(false);
  const [editMember, setEditMember]   = useState(null);   // member being edited
  const [deleteMember, setDeleteMember] = useState(null); // member to confirm-delete
  const [viewMember, setViewMember]   = useState(null);   // member detail view

  // ── Fetch members ────────────────────────────────────────────────────────────
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const data = await apiGet(API_ENDPOINTS.MEMBERS);
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      setFetchError(err.message || 'Failed to load members.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  // ── Mutation callbacks ────────────────────────────────────────────────────────
  const handleSaved = useCallback((saved, isEdit) => {
    if (isEdit) {
      setMembers((prev) => prev.map((m) => (m.id === saved.id ? saved : m)));
    } else {
      setMembers((prev) => [...prev, saved]);
    }
  }, []);

  const handleDeleted = useCallback((id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ── Filter ────────────────────────────────────────────────────────────────────
  const filtered = members.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
                        m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || m.status === filterStatus;
    const matchPlan   = filterPlan   === 'All' || m.plan   === filterPlan;
    return matchSearch && matchStatus && matchPlan;
  });

  // ── Table columns ─────────────────────────────────────────────────────────────
  const columns = [
    {
      key: 'name',
      label: 'Member',
      sortable: true,
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <Avatar initials={row.avatar || (row.name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)} size="sm" />
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
      key: 'phone',
      label: 'Phone',
      render: (val) => <span className="text-slate-400 text-xs">{val || '—'}</span>,
    },
    {
      key: 'join_date',
      label: 'Joined',
      sortable: true,
      render: (val) => <span className="text-slate-400 text-xs">{val || '—'}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setViewMember(row)}
            className="px-3 py-1 text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
          >
            View
          </button>
          <button
            onClick={() => setEditMember(row)}
            className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors flex items-center gap-1"
          >
            <HiOutlinePencil size={12} /> Edit
          </button>
          <button
            onClick={() => setDeleteMember(row)}
            className="px-3 py-1 text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1"
          >
            <HiOutlineTrash size={12} /> Delete
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
            <p className="text-slate-400 text-sm">
              {loading ? 'Loading…' : `${filtered.length} of ${members.length} members`}
            </p>
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

        {/* Fetch error */}
        {fetchError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-4 text-red-400 text-sm flex items-center justify-between">
            <span>{fetchError}</span>
            <button onClick={fetchMembers} className="text-xs underline ml-4 hover:text-red-300">Retry</button>
          </div>
        )}

        {/* Filters */}
        <div className="glass rounded-2xl p-4 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-48">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search members…"
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
          {loading ? (
            <div className="flex items-center justify-center py-20 text-slate-500 text-sm">Loading members…</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <HiOutlineSearch size={40} className="mb-3 opacity-40" />
              <p className="text-sm">{members.length === 0 ? 'No members yet. Add your first member!' : 'No members match your search.'}</p>
              {members.length === 0 && (
                <button onClick={() => setAddModal(true)} className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm underline">Add Member</button>
              )}
            </div>
          ) : (
            <Table columns={columns} data={filtered} />
          )}
        </div>
      </div>

      {/* Add / Edit Member Modal */}
      <MemberFormModal
        isOpen={addModal || !!editMember}
        onClose={() => { setAddModal(false); setEditMember(null); }}
        onSaved={handleSaved}
        editMember={editMember}
      />

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        member={deleteMember}
        onClose={() => setDeleteMember(null)}
        onDeleted={handleDeleted}
      />

      {/* Member Detail Modal */}
      <Modal
        isOpen={!!viewMember}
        onClose={() => setViewMember(null)}
        title="Member Details"
        size="lg"
      >
        {viewMember && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar
                initials={viewMember.avatar || (viewMember.name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)}
                size="xl"
                online={viewMember.status === 'Active'}
              />
              <div>
                <h3 className="text-xl font-bold text-white">{viewMember.name}</h3>
                <p className="text-slate-400">{viewMember.email}</p>
                {viewMember.phone && <p className="text-slate-400 text-sm">{viewMember.phone}</p>}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={viewMember.plan === 'Elite' ? 'elite' : viewMember.plan === 'Premium' ? 'success' : 'default'}>
                    {viewMember.plan}
                  </Badge>
                  <Badge variant={viewMember.status === 'Active' ? 'success' : viewMember.status === 'Expired' ? 'danger' : 'warning'} dot>
                    {viewMember.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Member ID',  value: viewMember.id },
                { label: 'Joined',     value: viewMember.join_date || '—' },
                { label: 'Phone',      value: viewMember.phone || '—' },
                { label: 'Plan',       value: viewMember.plan },
              ].map(({ label, value }) => (
                <div key={label} className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-slate-400 text-xs mb-1">{label}</p>
                  <p className="text-white font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button size="sm" onClick={() => { setViewMember(null); setEditMember(viewMember); }}>
                Edit Member
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => { setViewMember(null); setDeleteMember(viewMember); }}
                className="!text-red-400 hover:!bg-red-500/10"
              >
                Delete Member
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
};

export default MembersPage;
