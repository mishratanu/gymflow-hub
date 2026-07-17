import { motion } from 'framer-motion';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';
import { useCounter, useAnimateOnScroll } from '../../hooks/useAnimateOnScroll';

const StatsCard = ({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon,
  color = '#10B981',
  prefix = '',
  suffix = '',
  format = 'number',
}) => {
  const { ref, isVisible } = useAnimateOnScroll(0.2);
  const numericValue = typeof value === 'number' ? value : parseInt(value?.toString().replace(/[^0-9]/g, ''), 10) || 0;
  const count = useCounter(numericValue, 1800, isVisible);

  const formatValue = (v) => {
    if (format === 'currency') return `$${v.toLocaleString()}`;
    if (format === 'percent') return `${v}%`;
    return v.toLocaleString();
  };

  const isPositive = change >= 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${color}20`, color }}
        >
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
          }`}>
            {isPositive ? <HiArrowUp size={12} /> : <HiArrowDown size={12} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white">
          {prefix}{isVisible ? formatValue(count) : '0'}{suffix}
        </p>
        {changeLabel && change !== undefined && (
          <p className="text-xs text-slate-500">{changeLabel}</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
