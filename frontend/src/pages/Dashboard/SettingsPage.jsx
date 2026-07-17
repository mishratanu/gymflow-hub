import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineBell, HiOutlineShieldCheck, HiOutlineCreditCard, HiOutlineGlobe } from 'react-icons/hi';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Avatar from '../../components/common/Avatar';
import { useApp } from '../../context/AppContext';

const TABS = [
  { id: 'profile', label: 'Profile', icon: HiOutlineUser },
  { id: 'notifications', label: 'Notifications', icon: HiOutlineBell },
  { id: 'security', label: 'Security', icon: HiOutlineShieldCheck },
  { id: 'billing', label: 'Billing', icon: HiOutlineCreditCard },
  { id: 'gym', label: 'Gym Settings', icon: HiOutlineGlobe },
];

const SettingsPage = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(res => setTimeout(res, 1000));
    setSaving(false);
  };

  return (
    <DashboardLayout title="Settings" breadcrumb="GymFlow HQ · Settings">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="glass rounded-2xl p-3 space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === id
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-semibold text-lg mb-1">Profile Settings</h2>
                  <p className="text-slate-400 text-sm">Update your personal information and preferences.</p>
                </div>

                <div className="flex items-center gap-6 pb-6 border-b border-slate-700/50">
                  <Avatar initials={user?.avatar || 'JB'} size="2xl" online />
                  <div>
                    <Button variant="secondary" size="sm">Change Photo</Button>
                    <p className="text-slate-500 text-xs mt-2">JPG, GIF or PNG. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="First Name" defaultValue="Jordan" required />
                  <Input label="Last Name" defaultValue="Blake" required />
                  <Input label="Email Address" type="email" defaultValue={user?.email} required />
                  <Input label="Phone Number" defaultValue="+1 (555) 234-5678" />
                  <Input label="Job Title" defaultValue="Gym Administrator" />
                  <Input label="Location" defaultValue="New York, NY" />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-2">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Managing GymFlow HQ — dedicated to delivering the best fitness experience."
                    className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 input-focus resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} loading={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-semibold text-lg mb-1">Notification Preferences</h2>
                  <p className="text-slate-400 text-sm">Control how and when you receive notifications.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'New member registrations', desc: 'Get notified when a new member joins', defaultChecked: true },
                    { label: 'Payment received', desc: 'Notify when a payment is processed', defaultChecked: true },
                    { label: 'Payment failed', desc: 'Alert when a payment fails', defaultChecked: true },
                    { label: 'Membership expiring', desc: 'Remind 7 days before expiration', defaultChecked: true },
                    { label: 'Trainer performance reports', desc: 'Weekly trainer performance summary', defaultChecked: false },
                    { label: 'Monthly revenue report', desc: 'Monthly financial summary', defaultChecked: true },
                    { label: 'Marketing emails', desc: 'Product updates and tips', defaultChecked: false },
                  ].map(({ label, desc, defaultChecked }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0">
                      <div>
                        <p className="text-white text-sm font-medium">{label}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} loading={saving}>Save Preferences</Button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-semibold text-lg mb-1">Security Settings</h2>
                  <p className="text-slate-400 text-sm">Manage your password and account security.</p>
                </div>
                <div className="space-y-4">
                  <Input label="Current Password" type="password" placeholder="Enter current password" />
                  <Input label="New Password" type="password" placeholder="Enter new password" helper="Minimum 8 characters" />
                  <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
                </div>
                <div className="pt-4 border-t border-slate-700/50">
                  <h3 className="text-white font-medium mb-3">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-xl">
                    <div>
                      <p className="text-white text-sm font-medium">Authenticator App</p>
                      <p className="text-slate-400 text-xs">Use an authenticator app for extra security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable 2FA</Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} loading={saving}>Update Password</Button>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-semibold text-lg mb-1">Billing & Subscription</h2>
                  <p className="text-slate-400 text-sm">Manage your GymFlow subscription and payment methods.</p>
                </div>
                <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-400 font-semibold">Pro Plan</p>
                      <p className="text-slate-300 text-sm">$99/month · Renews Jan 1, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">Change Plan</Button>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-3">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 bg-slate-700 rounded flex items-center justify-center text-xs text-slate-300 font-bold">VISA</div>
                      <div>
                        <p className="text-white text-sm">Visa ending in 4242</p>
                        <p className="text-slate-400 text-xs">Expires 12/26</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Update</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gym' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-white font-semibold text-lg mb-1">Gym Settings</h2>
                  <p className="text-slate-400 text-sm">Configure your gym's details and operating hours.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Gym Name" defaultValue="GymFlow HQ" required />
                  <Input label="Website" defaultValue="https://gymflowhq.com" />
                  <Input label="Phone" defaultValue="+1 (555) 100-2000" />
                  <Input label="Email" defaultValue="info@gymflowhq.com" type="email" />
                  <Input label="Address" defaultValue="123 Fitness Ave, New York, NY 10001" className="sm:col-span-2" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-3">Operating Hours</h3>
                  <div className="space-y-2">
                    {['Monday – Friday', 'Saturday', 'Sunday'].map((day, i) => (
                      <div key={day} className="flex items-center justify-between p-3 bg-slate-800/60 rounded-xl">
                        <span className="text-slate-300 text-sm">{day}</span>
                        <span className="text-white text-sm font-medium">
                          {i === 0 ? '5:00 AM – 11:00 PM' : i === 1 ? '6:00 AM – 10:00 PM' : '7:00 AM – 9:00 PM'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleSave} loading={saving}>Save Settings</Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
