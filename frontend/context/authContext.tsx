import React, { createContext, useCallback, useEffect, useState, useRef } from 'react';
import api, { setAccessToken, clearAccessToken, getAccessToken } from '../lib/api';
import type { User, AuthState, LoginCredentials, RegisterData, ApiResponse, LoginResponse, RefreshTokenResponse } from '../types/auth';

// === CONTEXT TYPE ===
interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (data: RegisterData) => Promise<{ email: string }>;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// === PROVIDER COMPONENT ===
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start with loading to check auth
    const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // === PROACTIVE TOKEN REFRESH (Issue 8 fix) ===
    const scheduleTokenRefresh = useCallback((token: string) => {
        // Clear any existing timer
        if (refreshTimerRef.current) {
            clearTimeout(refreshTimerRef.current);
        }

        try {
            // Decode JWT to get expiry (access token is NOT HttpOnly so we can decode it)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiresAt = payload.exp * 1000; // Convert to ms
            const now = Date.now();
            const refreshAt = expiresAt - 60000; // Refresh 1 minute before expiry

            if (refreshAt > now) {
                const delay = refreshAt - now;
                refreshTimerRef.current = setTimeout(async () => {
                    try {
                        await refreshAuth();
                    } catch (error) {
                        console.error('Proactive token refresh failed:', error);
                    }
                }, delay);
            }
        } catch (error) {
            console.error('Failed to decode token for refresh scheduling:', error);
        }
    }, []);

    // === REFRESH AUTH ===
    const refreshAuth = useCallback(async (): Promise<boolean> => {
        try {
            // Call refresh endpoint - HttpOnly cookie sent automatically (Issue 0)
            const response = await api.post<ApiResponse<RefreshTokenResponse>>('/users/refresh-token');

            const { accessToken } = response.data.data;
            setAccessToken(accessToken);

            // Get current user data
            const userResponse = await api.get<ApiResponse<User>>('/users/current-user');
            setUser(userResponse.data.data);

            // Schedule next refresh
            scheduleTokenRefresh(accessToken);

            return true;
        } catch (error) {
            // Refresh failed - user needs to login again
            clearAccessToken();
            setUser(null);
            return false;
        }
    }, [scheduleTokenRefresh]);

    // === LOGIN ===
    const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
        // Sanitize inputs (Issue 4 fix)
        const sanitizedCredentials = {
            ...credentials,
            email: credentials.email?.trim().toLowerCase(),
            username: credentials.username?.trim().toLowerCase(),
        };

        const response = await api.post<ApiResponse<LoginResponse>>('/users/login', sanitizedCredentials);

        const { user: userData, accessToken } = response.data.data;
        // NOTE: refreshToken is in response but we IGNORE it (Issue 0 - HttpOnly cookie handles it)

        setAccessToken(accessToken);
        setUser(userData);
        scheduleTokenRefresh(accessToken);
    }, [scheduleTokenRefresh]);

    // === REGISTER ===
    const register = useCallback(async (data: RegisterData): Promise<{ email: string }> => {
        // Sanitize inputs (Issue 4 fix)
        const sanitizedData = {
            fullName: data.fullName.trim(),
            email: data.email.trim().toLowerCase(),
            username: data.username.trim().toLowerCase(),
            password: data.password, // Don't trim password
        };

        await api.post<ApiResponse<User>>('/users/register', sanitizedData);

        // Return email for redirect to verify page
        return { email: sanitizedData.email };
    }, []);

    // === LOGOUT (Issue 5 fix - Complete logout) ===
    const logout = useCallback(async (): Promise<void> => {
        try {
            // 1. Call backend logout endpoint
            await api.post('/users/logout');
        } catch (error) {
            // Continue with logout even if backend call fails
            console.error('Backend logout failed:', error);
        } finally {
            // 2. Clear proactive refresh timer
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
                refreshTimerRef.current = null;
            }

            // 3. Clear in-memory access token
            clearAccessToken();

            // 4. Clear auth context state
            setUser(null);
        }
    }, []);

    // === INITIAL AUTH CHECK ===
    useEffect(() => {
        const initAuth = async () => {
            setIsLoading(true);
            // Try to refresh on mount - if HttpOnly cookie exists, this will work
            await refreshAuth();
            setIsLoading(false);
        };

        initAuth();

        // Listen for forced logout (from api.ts interceptor)
        const handleForcedLogout = () => {
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
            }
            clearAccessToken();
            setUser(null);
        };

        window.addEventListener('auth:logout', handleForcedLogout);

        return () => {
            window.removeEventListener('auth:logout', handleForcedLogout);
            if (refreshTimerRef.current) {
                clearTimeout(refreshTimerRef.current);
            }
        };
    }, [refreshAuth]);

    // === CONTEXT VALUE ===
    const value: AuthContextType = {
        user,
        accessToken: getAccessToken(),
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export type { AuthContextType };
