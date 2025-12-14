import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
    allowedRoles?: ('user' | 'instructor' | 'admin')[];
    children?: React.ReactNode;
}

/**
 * Protected Route Component
 * - Redirects to login if not authenticated
 * - Shows loading spinner while checking auth
 * - Optional role-based access control
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    allowedRoles,
    children
}) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-3 border-brand-yellow/30 border-t-brand-yellow rounded-full animate-spin" />
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        // Save the attempted URL for redirect after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role-based access if roles are specified
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // User doesn't have required role - redirect to dashboard with error
        return <Navigate to="/dashboard" replace />;
    }

    // Render children or Outlet for nested routes
    return children ? <>{children}</> : <Outlet />;
};
