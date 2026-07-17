import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLightningBolt, HiMenu, HiX, HiArrowRight, HiOutlineSparkles } from 'react-icons/hi';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Announcement bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2.5 py-2 px-4 text-xs font-medium"
        style={{
          background: 'linear-gradient(90deg, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.06) 50%, rgba(16,185,129,0.12) 100%)',
          borderBottom: '1px solid rgba(16,185,129,0.15)',
        }}
      >
        <HiOutlineSparkles size={11} className="text-emerald-400" />
        <span className="text-slate-400">
          GymFlow v2.0 is live —{' '}
          <button
            onClick={() => scrollTo('#features')}
            className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
          >
            See what's new →
          </button>
        </span>
      </motion.div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass-nav' : 'bg-transparent'
        }`}
        style={{ top: '33px' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center" style={{ height: '80px' }}>

            {/* Logo — left anchor */}
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 60%, #047857 100%)',
                  boxShadow: '0 0 0 1px rgba(16,185,129,0.4) inset, 0 4px 14px rgba(16,185,129,0.35)',
                }}
              >
                <HiOutlineLightningBolt className="text-white" size={18} />
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
                />
              </motion.div>
              <span
                className="font-display font-bold text-white"
                style={{ fontSize: '1.25rem', letterSpacing: '-0.6px' }}
              >
                GymFlow
              </span>
            </Link>

            {/* Desktop Nav — perfectly centered, flex-1 on both sides keeps it balanced */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  onMouseEnter={() => setActiveLink(label)}
                  onMouseLeave={() => setActiveLink(null)}
                  className="relative px-5 py-2.5 text-sm font-medium rounded-lg transition-colors duration-150"
                  style={{ color: activeLink === label ? '#ffffff' : '#94a3b8' }}
                >
                  {activeLink === label && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              ))}
            </div>

            {/* CTA Buttons — right anchor */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/login"
                  className="btn-outline inline-flex items-center gap-1.5 px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white rounded-xl"
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-xl"
                >
                  Start Free Trial
                  <HiArrowRight size={13} />
                </Link>
              </motion.div>
            </div>

            {/* Mobile toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(prev => !prev)}
              className="lg:hidden ml-auto p-2.5 rounded-xl text-slate-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <HiX size={20} /> : <HiMenu size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-3 right-3 z-30 glass-strong rounded-2xl overflow-hidden shadow-2xl lg:hidden"
            style={{ top: '110px', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            <div className="px-3 py-4 space-y-0.5">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.035 }}
                  onClick={() => scrollTo(href)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-150"
                >
                  {label}
                </motion.button>
              ))}
              <div className="pt-3 mt-2 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="btn-outline px-4 py-3 text-sm font-medium text-center text-slate-300 hover:text-white rounded-xl transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary px-4 py-3 text-sm font-semibold text-center text-white rounded-xl"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
