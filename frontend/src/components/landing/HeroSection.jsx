import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  HiArrowRight,
  HiPlay,
  HiOutlineUsers,
  HiOutlineTrendingUp,
  HiOutlineLightningBolt,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
  HiShieldCheck,
} from 'react-icons/hi';
import gymDashImg from '../../assets/gym_dashboard_analytics.jpg';

const STATS = [
  { label: 'Gyms Worldwide', value: '2,400+' },
  { label: 'Members Managed', value: '1.2M+' },
  { label: 'Revenue Increase', value: '34%' },
  { label: 'Uptime SLA', value: '99.9%' },
];

const TRUST_BADGES = [
  'No credit card required',
  '14-day free trial',
  'Cancel anytime',
];

// Deterministic star positions — seeded so no hydration mismatch
const STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 97.32) % 100,
  size: i % 7 === 0 ? 2.2 : i % 4 === 0 ? 1.6 : i % 3 === 0 ? 1.2 : 0.9,
  opacity: i % 5 === 0 ? 0.55 : i % 3 === 0 ? 0.35 : 0.2,
  duration: 2.5 + (i % 5) * 0.7,
  delay: (i % 12) * 0.25,
}));

const StarField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {STARS.map((star) => (
      <div
        key={star.id}
        className="star"
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          '--duration': `${star.duration}s`,
          '--delay': `${star.delay}s`,
          opacity: star.opacity,
        }}
      />
    ))}
  </div>
);

const FloatingCard = ({ children, yValues, delay = 0, className = '' }) => (
  <motion.div
    animate={{ y: yValues }}
    transition={{ duration: 4 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
    className={`glass-card-elevated rounded-2xl p-4 shadow-2xl hidden xl:block ${className}`}
    style={{ border: '1px solid rgba(255,255,255,0.09)' }}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.975]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '160px', paddingBottom: '100px' }}
    >
      {/* Deep background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Grid overlay — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <StarField />

      {/* Primary emerald glow — top center */}
      <div
        className="absolute orb-primary pointer-events-none"
        style={{
          top: '-5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1100px',
          height: '600px',
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.14) 0%, rgba(16,185,129,0.05) 35%, transparent 65%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Left accent orb */}
      <div
        className="absolute orb-secondary pointer-events-none"
        style={{
          top: '35%',
          left: '5%',
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.055) 0%, transparent 65%)',
        }}
      />

      {/* Right accent orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '25%',
          right: '5%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)',
          animation: 'orbFloat 20s ease-in-out infinite',
        }}
      />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '220px',
          background: 'linear-gradient(to top, #080e1c 0%, rgba(8,14,28,0.7) 50%, transparent 100%)',
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-7"
        >
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.22)',
              color: '#34d399',
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <HiOutlineLightningBolt size={12} />
            <span className="font-display tracking-tight">AI-Powered Gym Management — Now Live</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-7">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white block"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
            }}
          >
            The Complete Platform
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold gradient-text block"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 1.12,
            }}
          >
            for Modern Gyms
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-slate-400 max-w-2xl mx-auto mb-12 mt-10 leading-[1.82] px-4"
          style={{ fontSize: 'clamp(1.05rem, 1.4vw, 1.18rem)' }}
        >
          GymFlow automates member management, billing, attendance, and trainer scheduling —
          powered by AI that predicts churn and maximizes your revenue.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
            <Link
              to="/register"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 btn-primary text-white font-semibold rounded-2xl"
              style={{ fontSize: '0.95rem' }}
            >
              Start Free 14-Day Trial
              <HiArrowRight size={16} />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.975 }}>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 btn-outline text-white font-semibold rounded-2xl"
              style={{ fontSize: '0.95rem' }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <HiPlay size={10} className="text-emerald-400 ml-0.5" />
              </div>
              View Live Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.44 }}
          className="flex flex-wrap items-center justify-center gap-5 mb-14"
        >
          {TRUST_BADGES.map((badge) => (
            <div key={badge} className="flex items-center gap-1.5" style={{ color: '#64748b', fontSize: '0.8rem' }}>
              <HiOutlineCheckCircle size={13} style={{ color: 'rgba(16,185,129,0.55)' }} />
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.46 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 sm:gap-x-16 gap-y-8 max-w-4xl mx-auto place-content-center justify-items-center"
          style={{ marginBottom: '5rem' }}
        >
          {STATS.map(({ label, value }, i) => (
            <div key={label} className="text-center">
              <div
                className="font-display font-bold gradient-text"
                style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}
              >
                {value}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Deep glow behind preview */}
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-40px',
              borderRadius: '40px',
              background: 'radial-gradient(ellipse at 50% 55%, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.06) 40%, transparent 65%)',
              filter: 'blur(24px)',
            }}
          />

          {/* Floating metric card — left */}
          <FloatingCard yValues={[0, -14, 0]} delay={0} className="absolute -left-14 top-14 w-52">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <HiOutlineUsers className="text-emerald-400" size={18} />
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>Active Members</p>
                <p className="font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.03em' }}>1,284</p>
                <p style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>+12% this month</p>
              </div>
            </div>
          </FloatingCard>

          {/* Floating metric card — right */}
          <FloatingCard yValues={[0, 12, 0]} delay={0.9} className="absolute -right-14 top-14 w-56">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
              >
                <HiOutlineTrendingUp className="text-blue-400" size={18} />
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>Monthly Revenue</p>
                <p className="font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.03em' }}>$48,650</p>
                <p style={{ fontSize: '0.7rem', color: '#60a5fa', fontWeight: 600 }}>+8.3% vs last month</p>
              </div>
            </div>
          </FloatingCard>

          {/* Floating metric card — bottom left */}
          <FloatingCard yValues={[0, -9, 0]} delay={1.5} className="absolute -left-10 bottom-20 w-48">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <HiOutlineChartBar className="text-amber-400" size={18} />
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>Today's Check-ins</p>
                <p className="font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.03em' }}>347</p>
                <p style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 600 }}>Peak: 2–4 PM</p>
              </div>
            </div>
          </FloatingCard>

          {/* Floating metric card — bottom right */}
          <FloatingCard yValues={[0, 10, 0]} delay={2.1} className="absolute -right-10 bottom-20 w-48">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                <HiShieldCheck className="text-violet-400" size={18} />
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>Retention Rate</p>
                <p className="font-display font-bold text-white" style={{ fontSize: '1.1rem', letterSpacing: '-0.03em' }}>94.2%</p>
                <p style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 600 }}>Industry avg: 72%</p>
              </div>
            </div>
          </FloatingCard>

          {/* Browser frame */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative rounded-3xl overflow-hidden preview-glow"
            style={{ border: '1px solid rgba(255,255,255,0.09)' }}
          >
            {/* Browser chrome bar */}
            <div
              className="flex items-center gap-3 px-5 py-3"
              style={{
                background: 'rgba(8,14,26,0.97)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(239,68,68,0.65)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(245,158,11,0.65)' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(16,185,129,0.65)' }} />
              </div>
              {/* URL bar */}
              <div className="flex-1 flex justify-center">
                <div
                  className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs max-w-xs w-full justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: '#64748b',
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  app.gymflow.io/dashboard
                </div>
              </div>
              {/* Window controls */}
              <div className="flex gap-1.5">
                <div className="w-7 h-4 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
                <div className="w-7 h-4 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
            </div>

            {/* Dashboard screenshot */}
            <img
              src={gymDashImg}
              alt="GymFlow Dashboard — AI-powered gym management platform"
              className="w-full object-cover object-top block"
              style={{ maxHeight: '520px' }}
            />

            {/* Bottom fade into background */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: '120px',
                background: 'linear-gradient(to top, rgba(8,14,26,0.75) 0%, transparent 100%)',
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
