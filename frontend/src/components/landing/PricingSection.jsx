import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck, HiX, HiOutlineLightningBolt, HiOutlineSparkles } from 'react-icons/hi';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { PRICING_PLANS } from '../../utils/data';

const PricingCard = ({ plan, index, isAnnual }) => {
  const { ref, isVisible } = useAnimateOnScroll(0.06);
  const price = isAnnual ? Math.floor(plan.price * 0.8) : plan.price;
  const annualSavings = (plan.price - price) * 12;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-3xl p-8 flex flex-col pricing-card-hover"
      style={
        plan.popular
          ? {
              background:
                'linear-gradient(160deg, rgba(16,185,129,0.09) 0%, rgba(14,22,38,0.72) 45%, rgba(16,185,129,0.045) 100%)',
              border: '1px solid rgba(16,185,129,0.28)',
              boxShadow:
                '0 0 0 1px rgba(16,185,129,0.18), 0 28px 64px rgba(0,0,0,0.45), 0 0 70px rgba(16,185,129,0.07)',
            }
          : {
              background: 'rgba(16,24,40,0.6)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.065)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.055)',
            }
      }
    >
      {/* Top shimmer for popular */}
      {plan.popular && (
        <div
          className="absolute top-0 left-10 right-10 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.6), transparent)' }}
        />
      )}

      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white font-bold shadow-lg"
            style={{
              fontSize: '0.72rem',
              background: 'linear-gradient(135deg, #10B981, #059669)',
              boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
            }}
          >
            <HiOutlineLightningBolt size={11} />
            Most Popular
          </div>
        </div>
      )}

      {/* Plan header */}
      <div className="mb-6">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: `linear-gradient(135deg, ${plan.color}22, ${plan.color}0d)`,
            border: `1px solid ${plan.color}22`,
          }}
        >
          <div className="w-3.5 h-3.5 rounded-full" style={{ background: plan.color }} />
        </div>
        <h3
          className="font-display font-bold text-white mb-2"
          style={{ fontSize: '1.2rem', letterSpacing: '-0.03em' }}
        >
          {plan.name}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: 1.65 }}>{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-7 pb-7" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${plan.name}-${isAnnual}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-end gap-1.5">
              <span
                className="font-display font-bold text-white"
                style={{ fontSize: '2.8rem', letterSpacing: '-0.05em', lineHeight: 1 }}
              >
                ${price}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '6px' }}>/month</span>
            </div>
            {isAnnual && annualSavings > 0 && (
              <p style={{ color: '#34d399', fontSize: '0.75rem', marginTop: '6px', fontWeight: 600 }}>
                Save ${annualSavings}/year billed annually
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-7 flex-1">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.22)' }}
            >
              <HiCheck className="text-emerald-400" size={11} />
            </div>
            <span style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6 }}>{feature}</span>
          </div>
        ))}
        {plan.notIncluded?.map((feature) => (
          <div key={feature} className="flex items-start gap-3" style={{ opacity: 0.35 }}>
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <HiX className="text-slate-500" size={11} />
            </div>
            <span style={{ color: '#64748b', fontSize: '0.875rem', textDecoration: 'line-through' }}>{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          to="/register"
          className={`w-full py-3.5 rounded-2xl font-semibold text-center block transition-all duration-200 ${
            plan.popular ? 'btn-primary text-white' : 'text-white'
          }`}
          style={!plan.popular ? {
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.875rem',
          } : { fontSize: '0.875rem' }}
        >
          {plan.cta}
        </Link>
      </motion.div>
    </motion.div>
  );
};

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const { ref, isVisible } = useAnimateOnScroll(0.1);

  return (
    <section id="pricing" className="py-32 relative">
      <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-2/3 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(16,185,129,0.055) 0%, transparent 58%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: 'rgba(245,158,11,0.07)',
              border: '1px solid rgba(245,158,11,0.18)',
              color: '#fbbf24',
            }}
          >
            <HiOutlineSparkles size={11} />
            Simple Pricing
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)', letterSpacing: '-0.04em', lineHeight: 1.08 }}
          >
            Plans That Grow
            <span className="gradient-text"> With Your Gym</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: '#94a3b8', fontSize: '1.05rem' }}
          >
            Start free for 14 days. No credit card required. Upgrade when you're ready.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.26, duration: 0.45 }}
            className="inline-flex items-center rounded-2xl p-1.5"
            style={{
              background: 'rgba(16,24,40,0.6)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.065)',
            }}
          >
            {[{ label: 'Monthly', val: false }, { label: 'Annual', val: true }].map(({ label, val }) => (
              <button
                key={label}
                onClick={() => setIsAnnual(val)}
                className="relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
                style={{ color: isAnnual === val ? '#ffffff' : '#64748b' }}
              >
                {isAnnual === val && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.24)' }}
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {label}
                  {val && (
                    <span
                      className="font-bold rounded-full px-2 py-0.5"
                      style={{ fontSize: '0.65rem', background: 'rgba(245,158,11,0.18)', color: '#fbbf24' }}
                    >
                      -20%
                    </span>
                  )}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          className="text-center mt-12"
          style={{ color: '#475569', fontSize: '0.8rem' }}
        >
          All plans include a 14-day free trial. No credit card required. Questions?{' '}
          <a
            href="mailto:sales@gymflow.io"
            className="link-underline transition-colors"
            style={{ color: 'rgba(16,185,129,0.65)' }}
            onMouseEnter={(e) => (e.target.style.color = '#34d399')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(16,185,129,0.65)')}
          >
            Contact our sales team.
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
