import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

/**
 * ProtectedRoute — guards a route behind authentication and optional role checks.
 *
 * Props:
 *   children   — the page/component to render when access is granted
 *   roles      — optional array of allowed role strings (e.g. ['super_admin','gym_owner'])
 *                if omitted, any authenticated user may access the route
 *
 * Behaviour:
 *   1. While the token is being validated against /api/auth/me, shows a full-screen loader.
 *   2. If not authenticated, redirects to /login with the original path in state.
 *   3. If authenticated but the user's role is not in the allowed list, redirects to /unauthorized.
 *   4. Otherwise renders children.
 */
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, initialising, user } = useAuth();
  const location = useLocation();

  // Wait for the /me validation to complete before making an access decision
  if (initialising) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  // Not signed in → redirect to login, preserving intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based access control — only checked when roles prop is provided
  if (roles && roles.length > 0 && user?.role) {
    if (!roles.includes(user.role)) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
