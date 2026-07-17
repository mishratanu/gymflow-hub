const variants = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
  info: 'badge-info',
  default: 'bg-slate-700/60 text-slate-300',
  premium: 'bg-amber-500/15 text-amber-400',
  elite: 'bg-purple-500/15 text-purple-400',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
};

const Badge = ({ children, variant = 'default', size = 'md', className = '', dot = false }) => {
  return (
    <span className={`
      inline-flex items-center gap-1.5 font-medium rounded-full
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          variant === 'success' ? 'bg-emerald-400' :
          variant === 'warning' ? 'bg-amber-400' :
          variant === 'danger' ? 'bg-red-400' :
          variant === 'info' ? 'bg-blue-400' : 'bg-slate-400'
        }`} />
      )}
      {children}
    </span>
  );
};

export default Badge;
