import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface GuestRouteProps {
    children?: React.ReactNode;
}

/**
 * Guest Route Component
 * - Wrapper for login/signup pages
 * - Redirects authenticated users to dashboard (or intended destination)
 * - Shows loading spinner while checking auth
 */
export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
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

    // If authenticated, redirect to dashboard or the page they came from
    if (isAuthenticated) {
        const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
        return <Navigate to={from} replace />;
    }

    // Render guest pages
    return children ? <>{children}</> : <Outlet />;
};
