import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { apiPost, apiGet, API_ENDPOINTS } from '../config/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'gymflow_token';
const USER_KEY  = 'gymflow_user';

// Role hierarchy — higher index = more permissions
export const ROLES = {
  SUPER_ADMIN:   'super_admin',
  GYM_OWNER:     'gym_owner',
  TRAINER:       'trainer',
  RECEPTIONIST:  'receptionist',
  MEMBER:        'member',
};

export const AuthProvider = ({ children }) => {
  const [token, setToken]     = useState(() => localStorage.getItem(TOKEN_KEY) || null);
  const [user, setUser]       = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading]         = useState(false);
  const [initialising, setInitialising] = useState(true); // true while we verify the stored token
  const [error, setError]             = useState(null);
  const didValidate = useRef(false);

  // ─── Persist token + user ───────────────────────────────────────────────────
  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else        localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else       localStorage.removeItem(USER_KEY);
  }, [user]);

  // ─── On mount: silently validate the stored JWT against /api/auth/me ────────
  useEffect(() => {
    if (didValidate.current) return;
    didValidate.current = true;

    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (!storedToken) {
      setInitialising(false);
      return;
    }

    apiGet(API_ENDPOINTS.ME)
      .then((profile) => {
        setUser(profile);
      })
      .catch(() => {
        // Token is expired or invalid — clear everything
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setInitialising(false);
      });
  }, []);

  // ─── Parse server error messages ────────────────────────────────────────────
  const parseServerError = (err, fallback) => {
    try {
      // The error message from apiPost looks like "401 Unauthorized: {"error":"..."}"
      const jsonStart = err.message.indexOf('{');
      if (jsonStart !== -1) {
        const body = JSON.parse(err.message.slice(jsonStart));
        if (body?.error) return body.error;
      }
    } catch { /* ignore */ }
    return err.message || fallback;
  };

  // ─── Login ───────────────────────────────────────────────────────────────────
  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiPost(API_ENDPOINTS.LOGIN, { email, password });
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      const msg = parseServerError(err, 'Login failed. Please check your credentials.');
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Signup ──────────────────────────────────────────────────────────────────
  const signup = useCallback(async ({ firstName, lastName, gymName, email, password, plan, role }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiPost(API_ENDPOINTS.SIGNUP, {
        first_name: firstName,
        last_name:  lastName,
        gym_name:   gymName,
        email,
        password,
        plan: plan || 'Pro',
        role: role || 'gym_owner',
      });
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      const msg = parseServerError(err, 'Registration failed. Please try again.');
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Forgot password ─────────────────────────────────────────────────────────
  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiPost(API_ENDPOINTS.FORGOT_PASSWORD, { email });
      return data;
    } catch (err) {
      const msg = parseServerError(err, 'Failed to send reset link. Please try again.');
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Reset password ───────────────────────────────────────────────────────────
  const resetPassword = useCallback(async ({ token: resetToken, newPassword }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiPost(API_ENDPOINTS.RESET_PASSWORD, {
        token:        resetToken,
        new_password: newPassword,
      });
      return data;
    } catch (err) {
      const msg = parseServerError(err, 'Password reset failed. The link may have expired.');
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // ─── Logout ───────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  }, []);

  const clearError = useCallback(() => setError(null), []);

  // ─── Role helpers ─────────────────────────────────────────────────────────────
  const hasRole = useCallback((...roles) => {
    if (!user?.role) return false;
    return roles.includes(user.role);
  }, [user]);

  const isAdmin = useCallback(() => {
    return hasRole(ROLES.SUPER_ADMIN, ROLES.GYM_OWNER);
  }, [hasRole]);

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider value={{
      token,
      user,
      loading,
      initialising,
      error,
      isAuthenticated,
      login,
      signup,
      forgotPassword,
      resetPassword,
      logout,
      clearError,
      hasRole,
      isAdmin,
      ROLES,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
