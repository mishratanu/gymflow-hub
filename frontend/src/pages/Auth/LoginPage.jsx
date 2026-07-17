import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiArrowRight,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import gymImg from '../../assets/gym_equipment_weights.jpg';

const REMEMBER_KEY = 'gymflow_remember_email';

const LoginPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login, loading, isAuthenticated } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError]   = useState('');
  const [rememberMe, setRememberMe]     = useState(false);

  // Redirect back to the page the user tried to visit, or fall back to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Pre-fill email from localStorage if remember-me was previously checked
  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) {
      setValue('email', saved);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    setServerError('');
    try {
      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, data.email);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }
      await login({ email: data.email, password: data.password });
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* ── Left Panel — Form ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto"
        >
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <HiOutlineLightningBolt className="text-white" size={18} />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">GymFlow</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome back</h1>
            <p className="text-slate-400">Sign in to your GymFlow dashboard</p>
          </div>

          {/* Server-side error banner */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2"
            >
              <HiOutlineExclamationCircle size={16} className="flex-shrink-0 mt-0.5" />
              {serverError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="jordan@gymflow.io"
              icon={<HiOutlineMail size={16} />}
              error={errors.email?.message}
              required
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
              })}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              icon={<HiOutlineLockClosed size={16} />}
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="text-slate-400 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                </button>
              }
              error={errors.password?.message}
              required
              autoComplete="current-password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              iconRight={!loading ? <HiArrowRight size={18} /> : null}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-700/50" />
            <span className="text-slate-500 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-slate-700/50" />
          </div>

          {/* Social logins (UI only — OAuth not yet wired) */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Google',    icon: 'G' },
              { name: 'Microsoft', icon: 'M' },
            ].map(({ name, icon }) => (
              <button
                key={name}
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-700/60 hover:border-slate-600 transition-all"
              >
                <span className="w-4 h-4 rounded-sm bg-slate-600 flex items-center justify-center text-xs font-bold">
                  {icon}
                </span>
                {name}
              </button>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm mt-8">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              Start free trial
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── Right Panel — Image ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-[45%] relative overflow-hidden"
      >
        <img src={gymImg} alt="Gym" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-900/40 to-slate-900" />

        {/* Floating testimonial card */}
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass rounded-2xl p-6 max-w-sm border border-white/10"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-white text-sm leading-relaxed mb-4">
              "GymFlow reduced our admin work by 80% and helped us grow membership by 40% in just 6 months."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                MT
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Marcus Thompson</p>
                <p className="text-slate-400 text-xs">Owner, IronFit Gym · Chicago, IL</p>
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4 mt-4"
          >
            {[
              { value: '2,400+', label: 'Gyms' },
              { value: '180K+', label: 'Members managed' },
              { value: '99.9%', label: 'Uptime SLA' },
            ].map(({ value, label }) => (
              <div key={label} className="glass rounded-xl px-4 py-3 flex-1 text-center border border-white/10">
                <div className="text-white font-bold text-sm">{value}</div>
                <div className="text-slate-400 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
