// ============================================================
// GymFlow – Realistic Dummy Data
// ============================================================

export const STATS = {
  totalMembers: 1284,
  todayAttendance: 347,
  monthlyRevenue: 48650,
  activeMemberships: 1102,
  upcomingRenewals: 89,
  trainerCount: 24,
  memberGrowth: 12.4,
  revenueGrowth: 8.7,
  attendanceGrowth: -3.2,
  membershipGrowth: 5.1,
};

export const REVENUE_DATA = [
  { month: 'Jan', revenue: 38200, expenses: 22000, profit: 16200 },
  { month: 'Feb', revenue: 41500, expenses: 23500, profit: 18000 },
  { month: 'Mar', revenue: 39800, expenses: 21800, profit: 18000 },
  { month: 'Apr', revenue: 43200, expenses: 24200, profit: 19000 },
  { month: 'May', revenue: 45600, expenses: 25100, profit: 20500 },
  { month: 'Jun', revenue: 44100, expenses: 24800, profit: 19300 },
  { month: 'Jul', revenue: 47300, expenses: 26000, profit: 21300 },
  { month: 'Aug', revenue: 46800, expenses: 25500, profit: 21300 },
  { month: 'Sep', revenue: 48200, expenses: 26800, profit: 21400 },
  { month: 'Oct', revenue: 47500, expenses: 26200, profit: 21300 },
  { month: 'Nov', revenue: 49100, expenses: 27000, profit: 22100 },
  { month: 'Dec', revenue: 48650, expenses: 26500, profit: 22150 },
];

export const ATTENDANCE_DATA = [
  { day: 'Mon', checkins: 312, checkouts: 298 },
  { day: 'Tue', checkins: 278, checkouts: 265 },
  { day: 'Wed', checkins: 389, checkouts: 371 },
  { day: 'Thu', checkins: 354, checkouts: 340 },
  { day: 'Fri', checkins: 421, checkouts: 408 },
  { day: 'Sat', checkins: 487, checkouts: 472 },
  { day: 'Sun', checkins: 347, checkouts: 331 },
];

export const MEMBERSHIP_DISTRIBUTION = [
  { name: 'Basic', value: 412, color: '#64748B' },
  { name: 'Standard', value: 389, color: '#3B82F6' },
  { name: 'Premium', value: 301, color: '#10B981' },
  { name: 'Elite', value: 182, color: '#F59E0B' },
];

export const MEMBERS = [
  { id: 'M001', name: 'Alex Johnson', email: 'alex.j@email.com', plan: 'Premium', status: 'Active', joined: '2024-01-15', avatar: 'AJ', renewalDate: '2025-01-15', attendance: 87 },
  { id: 'M002', name: 'Sarah Mitchell', email: 'sarah.m@email.com', plan: 'Elite', status: 'Active', joined: '2023-11-20', avatar: 'SM', renewalDate: '2024-11-20', attendance: 94 },
  { id: 'M003', name: 'Marcus Williams', email: 'marcus.w@email.com', plan: 'Standard', status: 'Active', joined: '2024-03-08', avatar: 'MW', renewalDate: '2025-03-08', attendance: 62 },
  { id: 'M004', name: 'Emma Davis', email: 'emma.d@email.com', plan: 'Basic', status: 'Expired', joined: '2023-08-12', avatar: 'ED', renewalDate: '2024-08-12', attendance: 45 },
  { id: 'M005', name: 'James Rodriguez', email: 'james.r@email.com', plan: 'Premium', status: 'Active', joined: '2024-02-28', avatar: 'JR', renewalDate: '2025-02-28', attendance: 78 },
  { id: 'M006', name: 'Olivia Chen', email: 'olivia.c@email.com', plan: 'Elite', status: 'Active', joined: '2024-04-10', avatar: 'OC', renewalDate: '2025-04-10', attendance: 91 },
  { id: 'M007', name: 'Daniel Brown', email: 'daniel.b@email.com', plan: 'Standard', status: 'Suspended', joined: '2023-12-01', avatar: 'DB', renewalDate: '2024-12-01', attendance: 23 },
  { id: 'M008', name: 'Sophia Lee', email: 'sophia.l@email.com', plan: 'Premium', status: 'Active', joined: '2024-05-22', avatar: 'SL', renewalDate: '2025-05-22', attendance: 85 },
  { id: 'M009', name: 'Ryan Thompson', email: 'ryan.t@email.com', plan: 'Basic', status: 'Active', joined: '2024-06-14', avatar: 'RT', renewalDate: '2025-06-14', attendance: 55 },
  { id: 'M010', name: 'Isabella Martinez', email: 'isabella.m@email.com', plan: 'Elite', status: 'Active', joined: '2024-01-30', avatar: 'IM', renewalDate: '2025-01-30', attendance: 96 },
];

export const TRAINERS = [
  { id: 'T001', name: 'Coach Derek Stone', email: 'derek.s@gymflow.com', specialty: 'Strength & Conditioning', clients: 28, rating: 4.9, status: 'Active', schedule: 'Mon-Fri', experience: '8 years', avatar: 'DS' },
  { id: 'T002', name: 'Coach Priya Sharma', email: 'priya.s@gymflow.com', specialty: 'Yoga & Flexibility', clients: 22, rating: 4.8, status: 'Active', schedule: 'Tue-Sat', experience: '5 years', avatar: 'PS' },
  { id: 'T003', name: 'Coach Mike Torres', email: 'mike.t@gymflow.com', specialty: 'HIIT & Cardio', clients: 31, rating: 4.7, status: 'Active', schedule: 'Mon-Sat', experience: '6 years', avatar: 'MT' },
  { id: 'T004', name: 'Coach Lisa Park', email: 'lisa.p@gymflow.com', specialty: 'Nutrition & Weight Loss', clients: 19, rating: 4.9, status: 'Active', schedule: 'Wed-Sun', experience: '4 years', avatar: 'LP' },
  { id: 'T005', name: 'Coach Andre Jackson', email: 'andre.j@gymflow.com', specialty: 'Boxing & MMA', clients: 25, rating: 4.6, status: 'On Leave', schedule: 'Mon-Fri', experience: '10 years', avatar: 'AJ' },
  { id: 'T006', name: 'Coach Nina Volkov', email: 'nina.v@gymflow.com', specialty: 'Pilates & Core', clients: 18, rating: 4.8, status: 'Active', schedule: 'Tue-Sat', experience: '7 years', avatar: 'NV' },
];

export const TRAINER_PERFORMANCE = [
  { name: 'D. Stone', clients: 28, sessions: 112, rating: 4.9, revenue: 8400 },
  { name: 'P. Sharma', clients: 22, sessions: 88, rating: 4.8, revenue: 6600 },
  { name: 'M. Torres', clients: 31, sessions: 124, rating: 4.7, revenue: 9300 },
  { name: 'L. Park', clients: 19, sessions: 76, rating: 4.9, revenue: 5700 },
  { name: 'A. Jackson', clients: 25, sessions: 100, rating: 4.6, revenue: 7500 },
  { name: 'N. Volkov', clients: 18, sessions: 72, rating: 4.8, revenue: 5400 },
];

export const MEMBERSHIP_PLANS = [
  { id: 'P001', name: 'Basic', price: 29, duration: 'Monthly', features: ['Gym Access', 'Locker Room', 'Basic Equipment'], members: 412, color: '#64748B' },
  { id: 'P002', name: 'Standard', price: 49, duration: 'Monthly', features: ['All Basic', 'Group Classes', 'Fitness Assessment', 'App Access'], members: 389, color: '#3B82F6' },
  { id: 'P003', name: 'Premium', price: 79, duration: 'Monthly', features: ['All Standard', '2 PT Sessions/mo', 'Nutrition Plan', 'Priority Booking'], members: 301, color: '#10B981' },
  { id: 'P004', name: 'Elite', price: 129, duration: 'Monthly', features: ['All Premium', 'Unlimited PT', 'Meal Planning', 'Recovery Suite', 'Guest Passes'], members: 182, color: '#F59E0B' },
];

export const PAYMENTS = [
  { id: 'PAY001', member: 'Alex Johnson', plan: 'Premium', amount: 79, date: '2024-12-01', status: 'Paid', method: 'Card' },
  { id: 'PAY002', member: 'Sarah Mitchell', plan: 'Elite', amount: 129, date: '2024-12-01', status: 'Paid', method: 'Bank Transfer' },
  { id: 'PAY003', member: 'Marcus Williams', plan: 'Standard', amount: 49, date: '2024-12-02', status: 'Paid', method: 'Card' },
  { id: 'PAY004', member: 'Emma Davis', plan: 'Basic', amount: 29, date: '2024-12-03', status: 'Failed', method: 'Card' },
  { id: 'PAY005', member: 'James Rodriguez', plan: 'Premium', amount: 79, date: '2024-12-03', status: 'Paid', method: 'Card' },
  { id: 'PAY006', member: 'Olivia Chen', plan: 'Elite', amount: 129, date: '2024-12-04', status: 'Pending', method: 'Bank Transfer' },
  { id: 'PAY007', member: 'Sophia Lee', plan: 'Premium', amount: 79, date: '2024-12-05', status: 'Paid', method: 'Card' },
  { id: 'PAY008', member: 'Ryan Thompson', plan: 'Basic', amount: 29, date: '2024-12-05', status: 'Paid', method: 'Cash' },
  { id: 'PAY009', member: 'Isabella Martinez', plan: 'Elite', amount: 129, date: '2024-12-06', status: 'Paid', method: 'Card' },
  { id: 'PAY010', member: 'Daniel Brown', plan: 'Standard', amount: 49, date: '2024-12-06', status: 'Refunded', method: 'Card' },
];

export const RECENT_ACTIVITY = [
  { id: 1, type: 'checkin', message: 'Alex Johnson checked in', time: '2 min ago', icon: 'login' },
  { id: 2, type: 'payment', message: 'Payment received from Sarah Mitchell ($129)', time: '8 min ago', icon: 'payment' },
  { id: 3, type: 'new_member', message: 'New member registered: Chris Evans', time: '15 min ago', icon: 'user' },
  { id: 4, type: 'renewal', message: 'Membership renewed: Marcus Williams', time: '32 min ago', icon: 'refresh' },
  { id: 5, type: 'checkout', message: 'Olivia Chen checked out', time: '45 min ago', icon: 'logout' },
  { id: 6, type: 'plan_change', message: 'Emma Davis upgraded to Premium', time: '1 hr ago', icon: 'upgrade' },
  { id: 7, type: 'payment', message: 'Payment received from James Rodriguez ($79)', time: '1.5 hr ago', icon: 'payment' },
  { id: 8, type: 'trainer', message: 'Coach Derek Stone completed 4 sessions', time: '2 hr ago', icon: 'trainer' },
];

export const NOTIFICATIONS = [
  { id: 1, title: 'Membership Expiring Soon', message: '23 memberships expire within 7 days', type: 'warning', time: '10 min ago', read: false },
  { id: 2, title: 'Payment Failed', message: 'Emma Davis payment of $29 failed', type: 'error', time: '1 hr ago', read: false },
  { id: 3, title: 'New Member Registered', message: 'Chris Evans joined the Basic plan', type: 'success', time: '2 hr ago', read: false },
  { id: 4, title: 'Monthly Report Ready', message: 'November 2024 report is available', type: 'info', time: '3 hr ago', read: true },
  { id: 5, title: 'Trainer On Leave', message: 'Coach Andre Jackson on leave until Dec 15', type: 'warning', time: '5 hr ago', read: true },
  { id: 6, title: 'Revenue Milestone', message: 'Monthly revenue exceeded $48K target!', type: 'success', time: '1 day ago', read: true },
];

export const UPCOMING_RENEWALS = [
  { member: 'Emma Davis', plan: 'Basic', date: '2024-12-10', daysLeft: 4 },
  { member: 'Tom Harris', plan: 'Standard', date: '2024-12-12', daysLeft: 6 },
  { member: 'Amy Wilson', plan: 'Premium', date: '2024-12-14', daysLeft: 8 },
  { member: 'Kevin Park', plan: 'Elite', date: '2024-12-15', daysLeft: 9 },
  { member: 'Rachel Green', plan: 'Basic', date: '2024-12-18', daysLeft: 12 },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Marcus T.',
    role: 'Owner, IronFit Gym, New York',
    avatar: 'MT',
    rating: 5,
    text: 'GymFlow completely transformed how we manage our 800+ members. The AI-powered attendance tracking alone saved us 3 hours a day. Revenue is up 34% since we switched.',
  },
  {
    id: 2,
    name: 'Jennifer K.',
    role: 'Director, FitLife Studios, LA',
    avatar: 'JK',
    rating: 5,
    text: 'The automated payment system and renewal reminders reduced our churn by 28%. The dashboard gives me a real-time view of everything — it\'s like having a business analyst on staff 24/7.',
  },
  {
    id: 3,
    name: 'David R.',
    role: 'Founder, PowerZone, Chicago',
    avatar: 'DR',
    rating: 5,
    text: 'We went from spreadsheets to GymFlow in one weekend. The migration was seamless and the team was incredibly supportive. Our trainers love the performance tracking features.',
  },
  {
    id: 4,
    name: 'Aisha M.',
    role: 'GM, Elevate Fitness, Miami',
    avatar: 'AM',
    rating: 5,
    text: 'The AI insights helped us identify peak hours and optimize our class schedule. Member satisfaction scores jumped from 7.2 to 9.1 in just three months.',
  },
  {
    id: 5,
    name: 'Carlos V.',
    role: 'Owner, CrossCore Gym, Houston',
    avatar: 'CV',
    rating: 5,
    text: 'Best investment I\'ve made for my gym. The reporting features are incredibly detailed. I can see exactly which trainers are performing and which plans are most profitable.',
  },
  {
    id: 6,
    name: 'Rachel S.',
    role: 'CEO, Wellness Hub, Seattle',
    avatar: 'RS',
    rating: 5,
    text: 'GymFlow\'s member portal has dramatically reduced front desk inquiries. Members can self-manage everything. Our staff now focuses on what matters — delivering great experiences.',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Starter',
    price: 49,
    period: 'month',
    description: 'Perfect for small gyms getting started with digital management.',
    features: [
      'Up to 200 members',
      'Basic attendance tracking',
      'Payment processing',
      'Member portal',
      'Email notifications',
      'Standard reports',
      '5 staff accounts',
      'Email support',
    ],
    notIncluded: ['AI insights', 'Advanced analytics', 'Custom branding', 'API access'],
    cta: 'Start Free Trial',
    popular: false,
    color: '#64748B',
  },
  {
    name: 'Pro',
    price: 99,
    period: 'month',
    description: 'The complete solution for growing fitness businesses.',
    features: [
      'Up to 1,000 members',
      'AI-powered attendance',
      'Advanced payment suite',
      'Trainer management',
      'Custom member portal',
      'Advanced analytics',
      'Automated renewals',
      'SMS & Email alerts',
      '20 staff accounts',
      'Priority support',
    ],
    notIncluded: ['Custom branding', 'API access'],
    cta: 'Start Free Trial',
    popular: true,
    color: '#10B981',
  },
  {
    name: 'Enterprise',
    price: 249,
    period: 'month',
    description: 'For large gym chains and franchise operations.',
    features: [
      'Unlimited members',
      'AI insights & predictions',
      'Multi-location support',
      'Custom branding',
      'Full API access',
      'White-label option',
      'Dedicated account manager',
      'SLA guarantee',
      'Unlimited staff accounts',
      '24/7 phone support',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
    color: '#F59E0B',
  },
];

export const FEATURES = [
  {
    icon: 'brain',
    title: 'AI-Powered Insights',
    description: 'Machine learning algorithms analyze member behavior, predict churn, and recommend personalized retention strategies before members even consider leaving.',
    color: '#10B981',
  },
  {
    icon: 'users',
    title: 'Smart Member Management',
    description: 'Comprehensive member profiles with attendance history, fitness goals, payment records, and trainer assignments — all in one intelligent dashboard.',
    color: '#3B82F6',
  },
  {
    icon: 'chart',
    title: 'Real-Time Analytics',
    description: 'Live revenue tracking, attendance patterns, membership distribution, and trainer performance metrics updated in real-time across all your locations.',
    color: '#F59E0B',
  },
  {
    icon: 'payment',
    title: 'Automated Payments',
    description: 'Seamless recurring billing, failed payment recovery, automated renewal reminders, and multi-currency support with zero manual intervention.',
    color: '#8B5CF6',
  },
  {
    icon: 'trainer',
    title: 'Trainer Performance Hub',
    description: 'Track trainer schedules, client assignments, session completion rates, and revenue contribution. Reward top performers with data-driven incentives.',
    color: '#EF4444',
  },
  {
    icon: 'mobile',
    title: 'Member Mobile App',
    description: 'Branded member portal for class bookings, attendance check-in via QR code, payment management, and direct trainer communication.',
    color: '#06B6D4',
  },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Set Up Your Gym Profile',
    description: 'Import your existing member database or start fresh. Configure your membership plans, pricing, and trainer roster in under 30 minutes.',
    icon: 'setup',
  },
  {
    step: '02',
    title: 'Automate Your Operations',
    description: 'Let GymFlow handle billing cycles, attendance tracking, renewal reminders, and trainer scheduling. Reduce admin work by up to 80%.',
    icon: 'automate',
  },
  {
    step: '03',
    title: 'Grow With AI Insights',
    description: 'Use predictive analytics to identify at-risk members, optimize class schedules, and maximize revenue per member across your entire operation.',
    icon: 'grow',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'How long does it take to set up GymFlow?',
    answer: 'Most gyms are fully operational within 24-48 hours. Our onboarding team assists with data migration from your existing system, and our intuitive setup wizard guides you through configuration. For Enterprise clients, we provide dedicated white-glove onboarding.',
  },
  {
    question: 'Can I migrate data from my current gym software?',
    answer: 'Yes. GymFlow supports data import from all major gym management platforms including Mindbody, Zen Planner, ClubReady, and custom Excel/CSV files. Our migration team handles the entire process with zero data loss guaranteed.',
  },
  {
    question: 'How does the AI-powered churn prediction work?',
    answer: 'Our ML model analyzes 40+ behavioral signals including attendance frequency, class booking patterns, payment history, and engagement metrics. When a member shows early signs of disengagement, GymFlow automatically triggers personalized retention campaigns and alerts your team.',
  },
  {
    question: 'Is my member data secure?',
    answer: 'Absolutely. GymFlow is SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We perform daily automated backups and maintain 99.9% uptime SLA. Your member data is never shared or sold.',
  },
  {
    question: 'Can GymFlow handle multiple gym locations?',
    answer: 'Yes — our Pro plan supports up to 3 locations and Enterprise supports unlimited locations. Each location has its own dashboard while giving you a unified view across your entire operation. Members can access any location with a single membership.',
  },
  {
    question: 'What payment methods does GymFlow support?',
    answer: 'GymFlow integrates with Stripe, PayPal, and Square to support credit/debit cards, ACH bank transfers, digital wallets (Apple Pay, Google Pay), and cash payments. We support 135+ currencies for international operations.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 14-day free trial on all plans with no credit card required. You get full access to all features in your selected plan. After the trial, you can choose to subscribe or export your data — no lock-in.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'Starter plans include email support with 24-hour response time. Pro plans get priority email and chat support with 4-hour response. Enterprise clients receive 24/7 phone support, a dedicated account manager, and guaranteed 2-hour SLA.',
  },
];
