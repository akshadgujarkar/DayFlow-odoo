/**
 * AuthContext.jsx
 *
 * Phase 0 stub — full implementation in Phase 3.
 *
 * Will store: JWT token, decoded role, and logged-in user identity.
 * The axiosClient request interceptor will read the token from here
 * to attach the Authorization header (Rules.md §6, §20).
 */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

/**
 * AuthProvider wraps the app so any component can access auth state.
 * Phase 3 will implement login(), logout(), token refresh, and role checks.
 */
export function AuthProvider({ children }) {
  // Stub state — replace with real JWT parsing / storage in Phase 3.
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    role: null, // 'admin' | 'employee'
  });

  const value = {
    ...auth,
    setAuth,
    isAuthenticated: Boolean(auth.token),
    isAdmin: auth.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Convenience hook for consuming auth state in any component. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export default AuthContext;
