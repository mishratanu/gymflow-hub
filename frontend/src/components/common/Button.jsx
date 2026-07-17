import { motion } from 'framer-motion';

const variants = {
  primary: 'btn-primary text-white font-semibold',
  secondary: 'bg-slate-700/60 hover:bg-slate-600/80 text-white border border-slate-600/50 hover:border-slate-500 transition-all duration-200',
  outline: 'border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all duration-200',
  ghost: 'text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200',
  danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-400 transition-all duration-200',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
  xl: 'px-9 py-4 text-lg rounded-2xl',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  onClick,
  type = 'button',
  fullWidth = false,
}) => {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
      {iconRight && !loading && <span className="flex-shrink-0">{iconRight}</span>}
    </motion.button>
  );
};

export default Button;
