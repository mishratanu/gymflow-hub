import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import { TESTIMONIALS } from '../../utils/data';
import Avatar from '../common/Avatar';

const TestimonialCard = ({ testimonial, index }) => {
  const { ref, isVisible } = useAnimateOnScroll(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-2xl p-6 flex flex-col gap-4 hover:border-slate-600/50 transition-all duration-300"
    >
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <HiStar key={i} className="text-amber-400" size={16} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-slate-300 text-sm leading-relaxed flex-1">"{testimonial.text}"</p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-700/50">
        <Avatar initials={testimonial.avatar} size="md" />
        <div>
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-slate-400 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const { ref, isVisible } = useAnimateOnScroll(0.1);

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-800/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            Customer Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Trusted by
            <span className="gradient-text"> 2,400+ Gym Owners</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Real results from real gym owners who transformed their operations with GymFlow.
          </motion.p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        {/* Social Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-16 glass rounded-2xl p-8 flex flex-wrap items-center justify-center gap-12"
        >
          {[
            { value: '4.9/5', label: 'Average Rating', sub: 'From 1,200+ reviews' },
            { value: '98%', label: 'Customer Satisfaction', sub: 'Based on NPS surveys' },
            { value: '34%', label: 'Revenue Increase', sub: 'Average in first 6 months' },
            { value: '80%', label: 'Time Saved', sub: 'On admin tasks per week' },
          ].map(({ value, label, sub }) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-white text-sm font-medium">{label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
