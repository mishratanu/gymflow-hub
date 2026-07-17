const colors = [
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-violet-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-sky-600',
];

const getColor = (initials) => {
  const code = (initials || 'AB').charCodeAt(0) + ((initials || 'AB').charCodeAt(1) || 0);
  return colors[code % colors.length];
};

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const Avatar = ({ initials = 'AB', size = 'md', src, className = '', online = false }) => {
  const colorClass = getColor(initials);

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <div className={`
        ${sizes[size]}
        rounded-full bg-gradient-to-br ${colorClass}
        flex items-center justify-center
        font-bold text-white
        ring-2 ring-slate-700/50
      `}>
        {src ? (
          <img src={src} alt={initials} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-800 pulse-green" />
      )}
    </div>
  );
};

export default Avatar;
