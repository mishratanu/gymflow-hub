import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHome, HiOutlineArrowLeft, HiOutlineLightningBolt } from 'react-icons/hi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 grid-pattern flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-12">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <HiOutlineLightningBolt className="text-white" size={18} />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">GymFlow</span>
        </div>

        {/* 404 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-[120px] sm:text-[180px] font-black leading-none mb-4"
        >
          <span className="gradient-text">404</span>
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 btn-primary text-white font-semibold rounded-xl text-sm"
          >
            <HiOutlineHome size={18} />
            Back to Home
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 hover:border-slate-600 text-white font-semibold rounded-xl text-sm transition-all duration-200"
          >
            <HiOutlineArrowLeft size={18} />
            Go to Dashboard
          </Link>
        </div>

        {/* Decorative */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-emerald-500/10 hidden sm:block"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full border border-emerald-500/5 hidden sm:block"
        />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
