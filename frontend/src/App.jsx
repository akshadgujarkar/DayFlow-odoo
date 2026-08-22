import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Layout } from './modules/layout/Layout';
import { SignIn } from './modules/auth/SignIn';
import { SignUp } from './modules/auth/SignUp';
import { Dashboard } from './modules/employees/Dashboard';
import { Profile } from './modules/profile/Profile';
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
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={
                <div className="flex justify-center items-center h-64 text-muted-foreground font-serif text-2xl">
                  Attendance Module Placeholder
                </div>
              } />
              <Route path="/timeoff" element={
                <div className="flex justify-center items-center h-64 text-muted-foreground font-serif text-2xl">
                  Time Off Module Placeholder
                </div>
              } />
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
