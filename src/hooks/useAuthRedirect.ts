import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useAuthRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated && user) {
      const from = location.state?.from?.pathname || getDefaultRoute(user.role);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const getDefaultRoute = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'commercial':
        return '/commercial';
      default:
        return '/dashboard';
    }
  };
};