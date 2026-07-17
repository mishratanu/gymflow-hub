import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  icon,
  iconRight,
  type = 'text',
  placeholder,
  className = '',
  helper,
  required,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
          {required && <span className="text-emerald-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full bg-slate-800/60 border rounded-xl px-4 py-2.5 text-sm text-white
            placeholder-slate-500 input-focus
            ${icon ? 'pl-10' : ''}
            ${iconRight ? 'pr-10' : ''}
            ${error
              ? 'border-red-500/60 focus:border-red-400'
              : 'border-slate-700/60 focus:border-emerald-500'
            }
          `}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {iconRight}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-400 mt-0.5">{error}</p>}
      {helper && !error && <p className="text-xs text-slate-500">{helper}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
