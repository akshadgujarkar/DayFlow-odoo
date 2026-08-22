import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Layout } from './modules/layout/Layout';
import { SignIn } from './modules/auth/SignIn';
import { SignUp } from './modules/auth/SignUp';
import { Dashboard } from './modules/employees/Dashboard';
import { Profile } from './modules/profile/Profile';
import { AttendanceModule } from './modules/attendance/AttendanceModule';
import { TimeOffModule } from './modules/timeoff/TimeOffModule';
import { LandingPage } from './modules/landing/LandingPage';
import { useAuth } from './context/AuthContext';

function ProfileRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/profile/${user.id}`} replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/attendance" element={<AttendanceModule />} />
              <Route path="/timeoff" element={<TimeOffModule />} />
              <Route path="/profile" element={<ProfileRedirect />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
