import { motion } from 'framer-motion';

export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12', xl: 'w-16 h-16' };
  return (
    <svg className={`animate-spin ${sizes[size]} ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="3" />
      <path className="opacity-80" fill="#10B981" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
};

export const PageLoader = () => (
  <div className="fixed inset-0 bg-slate-900/95 flex items-center justify-center z-50">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-white font-semibold text-lg">GymFlow</span>
        <span className="text-slate-400 text-sm">Loading your dashboard...</span>
      </div>
    </div>
  </div>
);

export const SkeletonCard = () => (
  <div className="glass rounded-2xl p-6 space-y-4">
    <div className="shimmer h-4 w-24 rounded-lg bg-slate-700/50" />
    <div className="shimmer h-8 w-32 rounded-lg bg-slate-700/50" />
    <div className="shimmer h-3 w-full rounded-lg bg-slate-700/50" />
    <div className="shimmer h-3 w-3/4 rounded-lg bg-slate-700/50" />
  </div>
);

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) return <PageLoader />;
  return (
    <div className="flex items-center justify-center p-8">
      <Spinner size="lg" />
    </div>
  );
};

export default Loader;
