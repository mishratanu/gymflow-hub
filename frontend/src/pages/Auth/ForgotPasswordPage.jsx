import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiArrowLeft,
  HiArrowRight,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineClipboardCopy,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

const ForgotPasswordPage = () => {
  const { forgotPassword, loading } = useAuth();
  const [sent, setSent]             = useState(false);
  const [email, setEmail]           = useState('');
  const [serverError, setServerError] = useState('');
  const [debugToken, setDebugToken] = useState('');
  const [copied, setCopied]         = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const res = await forgotPassword(data.email);
      setEmail(data.email);
      // Backend returns debug_token in non-production for easy testing
      if (res?.debug_token) setDebugToken(res.debug_token);
      setSent(true);
    } catch (err) {
      setServerError(err.message || 'Failed to send reset link. Please try again.');
    }
  };

  const handleCopy = () => {
    if (!debugToken) return;
    navigator.clipboard.writeText(
      `${window.location.origin}/reset-password?token=${debugToken}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2.5 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <HiOutlineLightningBolt className="text-white" size={18} />
          </div>
          <span className="font-bold text-white text-xl tracking-tight">GymFlow</span>
        </Link>

        <AnimatePresence mode="wait">
          {/* ── Request form ─────────────────────────────────────────────── */}
          {!sent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl p-8"
            >
              <div className="mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-5">
                  <HiOutlineMail className="text-emerald-400" size={28} />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Enter your email address and we'll send you a link to reset your password. The link expires in 1 hour.
                </p>
              </div>

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

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  iconRight={!loading ? <HiArrowRight size={18} /> : null}
                >
                  {loading ? 'Sending reset link...' : 'Send Reset Link'}
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

          ) : (
            /* ── Success state ──────────────────────────────────────────── */
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

              <h2 className="text-2xl font-bold text-white mb-3">Check your email</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-2">
                We sent a password reset link to
              </p>
              <p className="text-emerald-400 font-medium text-sm mb-6">{email}</p>
              <p className="text-slate-500 text-xs mb-6">
                Didn't receive it? Check your spam folder, or{' '}
                <button
                  onClick={() => { setSent(false); setDebugToken(''); }}
                  className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
                >
                  try again
                </button>
                .
              </p>

              {/* Dev helper — shows the reset link so you can test without email */}
              {debugToken && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left"
                >
                  <p className="text-amber-400 text-xs font-semibold mb-2 uppercase tracking-wide">
                    Dev mode — reset link
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed break-all mb-3">
                    {window.location.origin}/reset-password?token={debugToken}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {copied ? (
                      <><HiOutlineClipboardCheck size={14} /> Copied!</>
                    ) : (
                      <><HiOutlineClipboardCopy size={14} /> Copy link</>
                    )}
                  </button>
                </motion.div>
              )}

              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <HiArrowLeft size={16} />
                Back to sign in
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
