import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineShieldExclamation, HiArrowLeft } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const UnauthorizedPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6, delay: 0.1 }}
          className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6"
        >
          <HiOutlineShieldExclamation className="text-red-400" size={40} />
        </motion.div>

        <h1 className="text-3xl font-bold text-white mb-3">Access Denied</h1>
        <p className="text-slate-400 mb-2">
          Your account role does not have permission to view this page.
        </p>
        {user?.role && (
          <p className="text-slate-500 text-sm mb-8">
            Signed in as: <span className="text-slate-300 font-medium capitalize">{user.role.replace('_', ' ')}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-medium transition-colors"
          >
            <HiArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl text-sm font-medium transition-colors"
          >
            Sign out
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;
