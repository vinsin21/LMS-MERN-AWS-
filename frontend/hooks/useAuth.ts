import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/authContext';

/**
 * Custom hook to access authentication context
 * Provides type-safe access to auth state and actions
 * 
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
