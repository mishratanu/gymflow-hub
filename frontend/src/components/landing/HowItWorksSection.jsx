import { motion } from 'framer-motion';
import {
  HiOutlineCog,
  HiOutlineLightningBolt,
  HiOutlineTrendingUp,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { HOW_IT_WORKS } from '../../utils/data';
import gymImg from '../../assets/modern_gym_interior_dark.jpg';
import trainerImg from '../../assets/personal_trainer_coaching.jpg';
import analyticsImg from '../../assets/gym_dashboard_analytics.jpg';

const ICONS = {
  setup: HiOutlineCog,
  automate: HiOutlineLightningBolt,
  grow: HiOutlineTrendingUp,
};

const IMAGES = [gymImg, trainerImg, analyticsImg];

const STEP_HIGHLIGHTS = [
  ['Import existing member data', 'Connect your payment gateway', 'Customize your branding'],
  ['Auto-send renewal reminders', 'AI attendance predictions', 'Smart trainer scheduling'],
  ['Revenue analytics dashboard', 'Churn prediction alerts', 'Growth opportunity reports'],
];

const StepItem = ({ step, index }) => {
  const { ref, isVisible } = useAnimateOnScroll(0.1);
  const Icon = ICONS[step.icon] || HiOutlineCog;
  const isEven = index % 2 === 0;
  const highlights = STEP_HIGHLIGHTS[index] || [];

  return (
    <div
      ref={ref}
      className={`flex flex-col ${
        isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } items-center gap-12 lg:gap-20`}
    >
      {/* Content side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {/* Step number + icon row */}
        <div className="flex items-center gap-4 mb-7">
          <span
            className="font-display font-black leading-none select-none"
            style={{ fontSize: '5.5rem', letterSpacing: '-0.05em', color: 'rgba(16,185,129,0.07)' }}
          >
            {step.step}
          </span>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.07) 100%)',
              border: '1px solid rgba(16,185,129,0.22)',
              boxShadow: '0 8px 24px rgba(16,185,129,0.12)',
            }}
          >
            <Icon className="text-emerald-400" size={24} />
          </div>
        </div>

        <h3
          className="font-display font-bold text-white mb-4"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', letterSpacing: '-0.04em', lineHeight: 1.15 }}
        >
          {step.title}
        </h3>
        <p
          className="mb-7 leading-[1.75]"
          style={{ color: '#94a3b8', fontSize: '1.05rem' }}
        >
          {step.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-3">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}
              >
                <HiOutlineCheckCircle size={12} className="text-emerald-400" />
              </div>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{item}</span>
            </li>
          ))}
        </ul>

        {index < HOW_IT_WORKS.length - 1 && (
          <div
            className="flex items-center gap-2 mt-7"
            style={{ color: 'rgba(16,185,129,0.5)', fontSize: '0.8rem', fontWeight: 600 }}
          >
            <span>Continue to next step</span>
            <HiOutlineArrowRight size={13} />
          </div>
        )}
      </motion.div>

      {/* Image side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative w-full"
      >
        {/* Ambient glow */}
        <div
          className="absolute -inset-8 -z-10 pointer-events-none"
          style={{
            borderRadius: '40px',
            background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.09) 0%, transparent 65%)',
            filter: 'blur(20px)',
          }}
        />

        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <img
            src={IMAGES[index]}
            alt={step.title}
            className="w-full object-cover block"
            style={{ height: 'clamp(240px, 32vw, 360px)' }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(8,14,26,0.65) 0%, transparent 55%)' }}
          />

          {/* Step chip */}
          <div className="absolute bottom-5 left-5">
            <div
              className="glass-card rounded-xl px-4 py-2.5"
              style={{ border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(16,185,129,0.18)', border: '1px solid rgba(16,185,129,0.25)' }}
                >
                  <Icon className="text-emerald-400" size={12} />
                </div>
                <div>
                  <p className="text-white font-display font-semibold" style={{ fontSize: '0.75rem' }}>{step.title}</p>
                  <p style={{ color: '#64748b', fontSize: '0.7rem' }}>Step {step.step} of {HOW_IT_WORKS.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const HowItWorksSection = () => {
  const { ref, isVisible } = useAnimateOnScroll(0.1);

  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-2/3 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.025) 50%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: 'rgba(59,130,246,0.07)',
              border: '1px solid rgba(59,130,246,0.18)',
              color: '#60a5fa',
            }}
          >
            Simple Onboarding
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)', letterSpacing: '-0.04em', lineHeight: 1.08 }}
          >
            Up and Running in
            <span className="gradient-text"> 3 Simple Steps</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="max-w-xl mx-auto leading-relaxed"
            style={{ color: '#94a3b8', fontSize: '1.05rem' }}
          >
            No technical expertise required. Our guided setup gets you operational in under 30 minutes.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-28">
          {HOW_IT_WORKS.map((step, index) => (
            <StepItem key={step.step} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
