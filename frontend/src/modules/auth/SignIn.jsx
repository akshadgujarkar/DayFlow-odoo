import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginApi } from '../../api/authApi';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { SectionLabel } from '../../components/ui/SectionLabel';

export function SignIn() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const isEmail = identifier.includes('@');
      const credentials = {
        password,
        ...(isEmail ? { email: identifier } : { login_id: identifier })
      };
      
      const data = await loginApi(credentials);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">DayFlow</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account</p>
        </div>
        
        <Card elevated accentTop className="mt-8">
          <SectionLabel>Secure Login</SectionLabel>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-200">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-foreground mb-1">
                Login ID or Email
              </label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. OIJODO20230001"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/signup" className="text-accent hover:text-accent-secondary font-medium">
              Sign Up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
