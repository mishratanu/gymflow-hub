import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiArrowRight, HiOutlineShieldCheck, HiOutlineLightningBolt } from 'react-icons/hi';
import { useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';
import gymImg from '../../assets/fitness_training_professional.jpg';

const CTASection = () => {
  const { ref, isVisible } = useAnimateOnScroll(0.1);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src={gymImg} alt="Gym" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
          </div>

          {/* Green glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl" />

          <div className="relative z-10 px-8 sm:px-16 py-20 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <HiOutlineLightningBolt size={12} />
              Start Today — It's Free
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Transform Your Gym
              <br />
              <span className="gradient-text">Operations Today</span>
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Join 2,400+ gym owners who reduced admin work by 80% and increased revenue by an average of 34% in their first six months with GymFlow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 btn-primary text-white font-semibold rounded-xl text-base"
              >
                Start Free 14-Day Trial
                <HiArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl text-base transition-all duration-200 backdrop-blur-sm"
              >
                View Live Demo
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                'No credit card required',
                'Cancel anytime',
                'SOC 2 Certified',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                  <HiOutlineShieldCheck className="text-emerald-400" size={16} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
