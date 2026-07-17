import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiMinus } from 'react-icons/hi';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { FAQ_ITEMS } from '../../utils/data';

const FAQItem = ({ item, index, isOpen, onToggle }) => {
  const { ref, isVisible } = useAnimateOnScroll(0.04);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, delay: index * 0.035, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden transition-all duration-250"
      style={{
        background: isOpen ? 'rgba(16,185,129,0.04)' : 'rgba(16,24,40,0.55)',
        backdropFilter: 'blur(24px)',
        border: isOpen ? '1px solid rgba(16,185,129,0.22)' : '1px solid rgba(255,255,255,0.065)',
        boxShadow: isOpen ? '0 0 24px rgba(16,185,129,0.06)' : 'none',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-7 py-5 text-left group"
      >
        <span
          className="font-display font-semibold pr-4 leading-snug transition-colors duration-200"
          style={{
            fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
            letterSpacing: '-0.02em',
            color: isOpen ? '#34d399' : '#f1f5f9',
          }}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isOpen ? 'rgba(16,185,129,0.16)' : 'rgba(255,255,255,0.05)',
            border: isOpen ? '1px solid rgba(16,185,129,0.28)' : '1px solid rgba(255,255,255,0.08)',
            color: isOpen ? '#34d399' : '#94a3b8',
          }}
        >
          <HiPlus size={14} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="px-7 pb-6 pt-4 leading-relaxed"
              style={{
                color: '#94a3b8',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, isVisible } = useAnimateOnScroll(0.1);

  return (
    <section id="faq" className="py-32 relative">
      <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-2/3 pointer-events-none" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 40% at 50% 100%, rgba(16,185,129,0.045) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: 'rgba(6,182,212,0.07)',
              border: '1px solid rgba(6,182,212,0.18)',
              color: '#22d3ee',
            }}
          >
            Common Questions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white mb-5"
            style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.4rem)', letterSpacing: '-0.04em', lineHeight: 1.08 }}
          >
            Frequently Asked
            <span className="gradient-text"> Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="leading-relaxed"
            style={{ color: '#94a3b8', fontSize: '1.05rem' }}
          >
            Everything you need to know about GymFlow. Can't find your answer?{' '}
            <a
              href="mailto:support@gymflow.io"
              className="transition-colors"
              style={{ color: '#34d399' }}
              onMouseEnter={(e) => (e.target.style.color = '#6ee7b7')}
              onMouseLeave={(e) => (e.target.style.color = '#34d399')}
            >
              Contact our team.
            </a>
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
