import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  HiOutlineLightningBolt,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiArrowRight,
} from 'react-icons/hi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

// Password strength calculator
const calcStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'Weak',   color: 'bg-red-500' };
  if (score <= 2) return { score, label: 'Fair',   color: 'bg-amber-500' };
  if (score <= 3) return { score, label: 'Good',   color: 'bg-yellow-400' };
  if (score <= 4) return { score, label: 'Strong', color: 'bg-emerald-400' };
  return { score, label: 'Very Strong', color: 'bg-emerald-500' };
};

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, loading } = useAuth();

  const [showPassword, setShowPassword]        = useState(false);
  const [showConfirm, setShowConfirm]          = useState(false);
  const [serverError, setServerError]          = useState('');
  const [success, setSuccess]                  = useState(false);
  const [tokenMissing, setTokenMissing]        = useState(false);
  const [passwordValue, setPasswordValue]      = useState('');

  const token = searchParams.get('token') || '';

  useEffect(() => {
    if (!token) setTokenMissing(true);
  }, [token]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const watchedPassword = watch('password', '');

  const strength = calcStrength(watchedPassword);

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await resetPassword({ token, newPassword: data.password });
      setSuccess(true);
      setTimeout(() => navigate('/login', { replace: true }), 3000);
    } catch (err) {
      setServerError(err.message || 'Password reset failed. The link may have expired.');
    }
  };

  // ── Missing token state ─────────────────────────────────────────────────────
  if (tokenMissing) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Link to="/" className="inline-flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <HiOutlineLightningBolt className="text-white" size={18} />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">GymFlow</span>
          </Link>
          <div className="glass rounded-2xl p-8 text-center border border-red-500/20">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-5">
              <HiOutlineExclamationCircle className="text-red-400" size={36} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Invalid Reset Link</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              This password reset link is missing or malformed. Please request a new one from the forgot password page.
            </p>
            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/30 transition-all text-sm font-medium"
            >
              Request a new link
              <HiArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <HiOutlineLightningBolt className="text-white" size={18} />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">GymFlow</span>
        </Link>

        <AnimatePresence mode="wait">
          {/* ── Success state ─────────────────────────────────────────────── */}
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5, delay: 0.1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
              >
                <HiOutlineCheckCircle className="text-emerald-400" size={36} />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-3">Password updated!</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-2">
                Your password has been reset successfully.
              </p>
              <p className="text-slate-500 text-xs mb-8">
                Redirecting you to sign in automatically...
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/30 transition-all text-sm font-medium"
              >
                Sign in now
                <HiArrowRight size={16} />
              </Link>
            </motion.div>

          ) : (
            /* ── Form state ─────────────────────────────────────────────── */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl p-8"
            >
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-5">
                  <HiOutlineLockClosed className="text-emerald-400" size={28} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Set new password</h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Choose a strong password. It must be at least 8 characters and ideally include uppercase letters, numbers, and symbols.
                </p>
              </div>

              {/* Server error */}
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
                {/* New password */}
                <div>
                  <Input
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
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
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'At least 8 characters required' },
                    })}
                  />
                  {/* Password strength bar */}
                  {watchedPassword && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2"
                    >
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength.score ? strength.color : 'bg-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-xs ${
                        strength.score <= 1 ? 'text-red-400' :
                        strength.score <= 2 ? 'text-amber-400' :
                        strength.score <= 3 ? 'text-yellow-400' :
                        'text-emerald-400'
                      }`}>
                        {strength.label} password
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Confirm password */}
                <Input
                  label="Confirm New Password"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat your new password"
                  icon={<HiOutlineLockClosed size={16} />}
                  iconRight={
                    <button
                      type="button"
                      onClick={() => setShowConfirm(p => !p)}
                      className="text-slate-400 hover:text-white transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirm ? <HiOutlineEyeOff size={16} /> : <HiOutlineEye size={16} />}
                    </button>
                  }
                  error={errors.confirmPassword?.message}
                  required
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (val) =>
                      val === watchedPassword || 'Passwords do not match',
                  })}
                />

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  iconRight={!loading ? <HiArrowRight size={18} /> : null}
                  className="mt-2"
                >
                  {loading ? 'Updating password...' : 'Reset Password'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <HiArrowLeft size={16} />
                  Back to sign in
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
