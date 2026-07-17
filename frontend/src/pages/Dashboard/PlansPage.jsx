import { motion } from 'framer-motion';
import { HiCheck, HiOutlinePlus, HiOutlinePencil, HiOutlineUsers } from 'react-icons/hi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ChartCard from '../../components/common/ChartCard';
import Button from '../../components/common/Button';
import { MEMBERSHIP_PLANS, MEMBERSHIP_DISTRIBUTION } from '../../utils/data';

const PlanCard = ({ plan }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full" style={{ background: plan.color }} />
          <h3 className="text-white font-bold text-lg">{plan.name}</h3>
        </div>
        <p className="text-slate-400 text-sm">{plan.duration} subscription</p>
      </div>
      <button className="p-2 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors">
        <HiOutlinePencil size={16} />
      </button>
    </div>

    <div className="mb-5">
      <span className="text-4xl font-bold text-white">${plan.price}</span>
      <span className="text-slate-400 text-sm">/month</span>
    </div>

    <div className="space-y-2 mb-5">
      {plan.features.map((feature) => (
        <div key={feature} className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${plan.color}20` }}>
            <HiCheck size={10} style={{ color: plan.color }} />
          </div>
          <span className="text-slate-300 text-sm">{feature}</span>
        </div>
      ))}
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <HiOutlineUsers size={16} />
        <span>{plan.members} members</span>
      </div>
      <span className="text-emerald-400 text-sm font-semibold">
        ${(plan.price * plan.members).toLocaleString()}/mo
      </span>
    </div>
  </motion.div>
);

const PlansPage = () => {
  return (
    <DashboardLayout title="Membership Plans" breadcrumb="GymFlow HQ · Plans">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-slate-400 text-sm">4 active plans</p>
          <Button size="sm" icon={<HiOutlinePlus size={16} />}>Create Plan</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {MEMBERSHIP_PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <ChartCard title="Plan Distribution" subtitle="Members per plan">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={MEMBERSHIP_DISTRIBUTION} cx="50%" cy="50%" outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {MEMBERSHIP_DISTRIBUTION.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'rgba(30,41,59,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="glass rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-5">Revenue by Plan</h3>
            <div className="space-y-4">
              {MEMBERSHIP_PLANS.map((plan) => {
                const revenue = plan.price * plan.members;
                const maxRevenue = Math.max(...MEMBERSHIP_PLANS.map(p => p.price * p.members));
                const pct = (revenue / maxRevenue) * 100;
                return (
                  <div key={plan.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-slate-300 text-sm">{plan.name}</span>
                      <span className="text-white font-semibold text-sm">${revenue.toLocaleString()}/mo</span>
                    </div>
                    <div className="h-2 bg-slate-700/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ background: plan.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlansPage;
