import { motion } from 'framer-motion';
import {
  HiOutlineLightningBolt,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineCreditCard,
  HiOutlineUserGroup,
  HiOutlineDeviceMobile,
  HiOutlineSparkles,
} from 'react-icons/hi';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { FEATURES } from '../../utils/data';

const ICONS = {
  brain: HiOutlineLightningBolt,
  users: HiOutlineUsers,
  chart: HiOutlineChartBar,
  payment: HiOutlineCreditCard,
  trainer: HiOutlineUserGroup,
  mobile: HiOutlineDeviceMobile,
};

const FeatureCard = ({ feature, index }) => {
  const { ref, isVisible } = useAnimateOnScroll(0.06);
  const Icon = ICONS[feature.icon] || HiOutlineLightningBolt;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.065, ease: [0.16, 1, 0.3, 1] }}
      className="group glass-card rounded-2xl p-7 feature-card-hover relative overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.065)' }}
    >
      {/* Top-edge shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0.08) 60%, transparent)' }}
      />

      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${feature.color}22 0%, ${feature.color}0d 100%)`,
          border: `1px solid ${feature.color}25`,
          color: feature.color,
          boxShadow: `0 4px 14px ${feature.color}15`,
        }}
      >
        <Icon size={21} />
      </div>

      <h3
        className="font-display font-semibold text-white mb-3"
        style={{ fontSize: '1rem', letterSpacing: '-0.025em', lineHeight: 1.3 }}
      >
        {feature.title}
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.7 }}>
        {feature.description}
      </p>

      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.color}50, transparent)` }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${feature.color}10, transparent 70%)`,
        }}
      />
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { ref, isVisible } = useAnimateOnScroll(0.1);

  return (
    <section id="features" className="py-32 relative">
      {/* Section top divider */}
      <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-2/3 pointer-events-none" />

      {/* Radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(16,185,129,0.05) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: 'rgba(16,185,129,0.07)',
              border: '1px solid rgba(16,185,129,0.18)',
              color: '#34d399',
            }}
          >
            <HiOutlineSparkles size={11} />
            Everything You Need
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)', letterSpacing: '-0.04em', lineHeight: 1.08 }}
          >
            Powerful Features for
            <br />
            <span className="gradient-text">Modern Gym Operations</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="max-w-xl mx-auto leading-relaxed"
            style={{ color: '#94a3b8', fontSize: '1.05rem' }}
          >
            From member check-in to revenue forecasting, GymFlow handles every aspect
            of your gym's operations with intelligent automation.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
