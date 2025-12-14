import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// === CONFIGURATION ===
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// === TOKEN MANAGEMENT ===
// Access token stored in memory only (most secure - Issue 0)
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
    accessToken = null;
};

// === REFRESH TOKEN QUEUE (Issue 3 fix - Race Condition) ===
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

const onTokenRefreshed = (newToken: string) => {
    refreshSubscribers.forEach(callback => callback(newToken));
    refreshSubscribers = [];
};

const onRefreshFailed = () => {
    refreshSubscribers = [];
};

// === AXIOS INSTANCE ===
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // CRITICAL: Sends HttpOnly cookies automatically
    headers: {
        'Content-Type': 'application/json',
    },
});

// === REQUEST INTERCEPTOR ===
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Attach access token from memory (NOT from localStorage)
        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// === RESPONSE INTERCEPTOR ===
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Auth endpoints that should NOT trigger token refresh on 401
        // These endpoints return 401 for validation errors (wrong password, etc.)
        const authEndpoints = [
            '/users/login',
            '/users/register',
            '/users/verify-email',
            '/users/resend-otp',
            '/users/forgot-password',
            '/users/reset-password',
            '/users/refresh-token', // Don't retry refresh on refresh failure
        ];

        const isAuthEndpoint = authEndpoints.some(endpoint =>
            originalRequest.url?.includes(endpoint)
        );

        // Handle 401 - Attempt token refresh (SKIP for auth endpoints)
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;

            // If already refreshing, queue this request
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((newToken: string) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        }
                        resolve(api(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                // Call refresh endpoint - browser sends HttpOnly cookie automatically
                // We DON'T send refreshToken in body (Issue 0 - security)
                const response = await axios.post(
                    `${API_BASE_URL}/users/refresh-token`,
                    {}, // Empty body - cookie handles it
                    { withCredentials: true }
                );

                const newAccessToken = response.data.data.accessToken;
                setAccessToken(newAccessToken);
                onTokenRefreshed(newAccessToken);

                // Retry original request with new token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - clear everything and redirect to login
                onRefreshFailed();
                clearAccessToken();

                // Dispatch custom event for AuthContext to handle logout
                window.dispatchEvent(new CustomEvent('auth:logout'));

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Handle 429 - Rate limit (Issue 6 fix)
        if (error.response?.status === 429) {
            const retryAfter = error.response.headers['retry-after'];
            const message = retryAfter
                ? `Too many attempts. Please try again in ${retryAfter} seconds.`
                : 'Too many attempts. Please try again later.';

            // Attach user-friendly message to error
            (error as AxiosError & { userMessage?: string }).userMessage = message;
        }

        return Promise.reject(error);
    }
);

export default api;
