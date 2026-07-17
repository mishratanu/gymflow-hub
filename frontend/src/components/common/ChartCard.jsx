import { motion } from 'framer-motion';

const ChartCard = ({ title, subtitle, children, actions, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass rounded-2xl p-6 ${className}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-base">{title}</h3>
          {subtitle && <p className="text-slate-400 text-sm mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </motion.div>
  );
};

export default ChartCard;
