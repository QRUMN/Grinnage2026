import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requirePermission?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requirePermission
}) => {
  const { isAuthenticated, isLoading, hasPermission } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  if (requirePermission && !hasPermission(requirePermission)) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-xl mb-4">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
              Access Denied
            </h2>
            <p className="text-red-600 dark:text-red-300">
              You don't have permission to access this page.
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};