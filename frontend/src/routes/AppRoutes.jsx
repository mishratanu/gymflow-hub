import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/Landing/LandingPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage';
import UnauthorizedPage from '../pages/Auth/UnauthorizedPage';
import DashboardHome from '../pages/Dashboard/DashboardHome';
import MembersPage from '../pages/Dashboard/MembersPage';
import TrainersPage from '../pages/Dashboard/TrainersPage';
import AttendancePage from '../pages/Dashboard/AttendancePage';
import PlansPage from '../pages/Dashboard/PlansPage';
import PaymentsPage from '../pages/Dashboard/PaymentsPage';
import ReportsPage from '../pages/Dashboard/ReportsPage';
import NotificationsPage from '../pages/Dashboard/NotificationsPage';
import SettingsPage from '../pages/Dashboard/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Role constants — keep in sync with backend model/user.go
const ADMIN_ROLES       = ['super_admin', 'gym_owner'];
const STAFF_ROLES       = ['super_admin', 'gym_owner', 'trainer', 'receptionist'];
const ALL_AUTH_ROLES    = ['super_admin', 'gym_owner', 'trainer', 'receptionist', 'member'];

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Dashboard — all authenticated users */}
      <Route path="/dashboard" element={
        <ProtectedRoute roles={ALL_AUTH_ROLES}><DashboardHome /></ProtectedRoute>
      } />
      <Route path="/dashboard/notifications" element={
        <ProtectedRoute roles={ALL_AUTH_ROLES}><NotificationsPage /></ProtectedRoute>
      } />

      {/* Staff and above: trainers, receptionists, owners, super admins */}
      <Route path="/dashboard/attendance" element={
        <ProtectedRoute roles={STAFF_ROLES}><AttendancePage /></ProtectedRoute>
      } />
      <Route path="/dashboard/members" element={
        <ProtectedRoute roles={STAFF_ROLES}><MembersPage /></ProtectedRoute>
      } />
      <Route path="/dashboard/trainers" element={
        <ProtectedRoute roles={STAFF_ROLES}><TrainersPage /></ProtectedRoute>
      } />

      {/* Admin only: gym owners and super admins */}
      <Route path="/dashboard/plans" element={
        <ProtectedRoute roles={ADMIN_ROLES}><PlansPage /></ProtectedRoute>
      } />
      <Route path="/dashboard/payments" element={
        <ProtectedRoute roles={ADMIN_ROLES}><PaymentsPage /></ProtectedRoute>
      } />
      <Route path="/dashboard/reports" element={
        <ProtectedRoute roles={ADMIN_ROLES}><ReportsPage /></ProtectedRoute>
      } />
      <Route path="/dashboard/settings" element={
        <ProtectedRoute roles={ADMIN_ROLES}><SettingsPage /></ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
