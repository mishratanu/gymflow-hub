import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  HiOutlineLightningBolt,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiArrowRight,
  HiCheck,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import gymImg from '../../assets/personal_trainer_coaching.jpg';

// Password strength calculator
const calcStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'Weak',        color: 'bg-red-500' };
  if (score <= 2) return { score, label: 'Fair',        color: 'bg-amber-500' };
  if (score <= 3) return { score, label: 'Good',        color: 'bg-yellow-400' };
  if (score <= 4) return { score, label: 'Strong',      color: 'bg-emerald-400' };
  return              { score, label: 'Very Strong', color: 'bg-emerald-500' };
};

const BENEFITS = [
  '14-day free trial, no credit card required',
  'Import existing member data in minutes',
  'Setup in under 30 minutes',
  'Cancel anytime, no lock-in',
];

const PLANS = [
  { id: 'Starter',    price: '$29',  desc: 'Up to 100 members' },
  { id: 'Pro',        price: '$79',  desc: 'Up to 500 members' },
  { id: 'Enterprise', price: 'Custom', desc: 'Unlimited members' },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [serverError, setServerError]     = useState('');
  const [selectedPlan, setSelectedPlan]   = useState('Pro');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { plan: 'Pro' } });

  const watchedPassword = watch('password', '');
  const strength = calcStrength(watchedPassword);

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await signup({
        firstName: data.firstName,
        lastName:  data.lastName,
        gymName:   data.gymName,
        email:     data.email,
        password:  data.password,
        plan:      selectedPlan,
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* ── Left Panel — Image + benefits ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex w-[45%] relative overflow-hidden"
      >
        <img src={gymImg} alt="Trainer coaching" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/50 to-slate-900" />
        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-center p-14">
          <div className="max-w-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Trusted by 2,400+ gyms worldwide
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 leading-snug">
              Everything your gym needs to grow
            </h3>
            <div className="space-y-4">
              {BENEFITS.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HiCheck className="text-emerald-400" size={12} />
                  </div>
                  <span className="text-slate-300 text-sm">{b}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="mt-10 pt-8 border-t border-slate-700/50">
              <div className="flex -space-x-2 mb-3">
                {['MT', 'SL', 'KR', 'AJ'].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full border-2 border-slate-900 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold"
                    style={{ zIndex: 4 - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-xs">
                Join <span className="text-white font-medium">2,400+</span> gym owners already using GymFlow
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Right Panel — Form ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-14 py-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto"
        >
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <HiOutlineLightningBolt className="text-white" size={18} />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">GymFlow</span>
          </Link>

          <div className="mb-7">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Start your free trial</h1>
            <p className="text-slate-400">14 days free · No credit card required · Cancel anytime</p>
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="Jordan"
                icon={<HiOutlineUser size={16} />}
                error={errors.firstName?.message}
                required
                {...register('firstName', {
                  required: 'Required',
                  minLength: { value: 1, message: 'Required' },
                })}
              />
              <Input
                label="Last Name"
                placeholder="Blake"
                error={errors.lastName?.message}
                required
                {...register('lastName', { required: 'Required' })}
              />
            </div>

            {/* Gym name */}
            <Input
              label="Gym / Business Name"
              placeholder="IronFit Gym"
              icon={<HiOutlineOfficeBuilding size={16} />}
              error={errors.gymName?.message}
              required
              {...register('gymName', {
                required: 'Gym name is required',
                minLength: { value: 2, message: 'At least 2 characters' },
              })}
            />

            {/* Email */}
            <Input
              label="Work Email"
              type="email"
              placeholder="jordan@ironfit.com"
              icon={<HiOutlineMail size={16} />}
              error={errors.email?.message}
              required
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
              })}
            />

            {/* Password + strength */}
            <div>
              <Input
                label="Password"
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
              {/* Strength meter */}
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
              label="Confirm Password"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repeat your password"
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
                validate: (val) => val === watchedPassword || 'Passwords do not match',
              })}
            />

            {/* Plan selection */}
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">
                Choose Your Plan <span className="text-emerald-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PLANS.map(({ id, price, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSelectedPlan(id);
                      setValue('plan', id);
                    }}
                    className={`rounded-xl px-3 py-2.5 text-center border transition-all ${
                      selectedPlan === id
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-700/60 text-slate-400 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    <div className="text-sm font-semibold">{id}</div>
                    <div className="text-xs mt-0.5 opacity-70">{price}/mo</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                {PLANS.find(p => p.id === selectedPlan)?.desc} · All plans include a 14-day free trial
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-0.5 rounded border-slate-600 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                {...register('terms', { required: 'You must accept the terms to continue' })}
              />
              <label htmlFor="terms" className="text-sm text-slate-400 leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors">Privacy Policy</a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-400 -mt-2">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              iconRight={!loading ? <HiArrowRight size={18} /> : null}
              className="mt-2"
            >
              {loading ? 'Creating your account...' : 'Start Free Trial'}
            </Button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
