/**
 * ProtectedRoute.jsx
 *
 * Phase 0 stub — full implementation in Phase 3.
 *
 * Will redirect unauthenticated users to Sign In.
 * Will optionally restrict by role (Admin-only routes).
 * Usage (Phase 3+):
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/employees" element={<EmployeesPage />} />
 *   </Route>
 *   <Route element={<ProtectedRoute requiredRole="admin" />}>
 *     <Route path="/admin/..." element={<AdminPage />} />
 *   </Route>
 */
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * @param {string} [requiredRole] - If provided, also checks that the user
 *   has this role; otherwise 403s by redirecting to '/'.
 *   Roles: 'admin' | 'employee'.
 */
function ProtectedRoute({ requiredRole }) {
  const { isAuthenticated, role } = useAuth();

  // Phase 3 TODO: replace stub with real redirect to '/signin'.
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Unauthorized role — redirect to dashboard root.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
