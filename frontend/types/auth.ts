// Auth Types for Frontend

export interface User {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    avatar: string | null;
    role: 'user' | 'instructor' | 'admin';
    isSuperAdmin?: boolean; // True for coaching owner, false/undefined for regular admins
    isActive: boolean;
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface LoginCredentials {
    email?: string;
    username?: string;
    password: string;
}

export interface RegisterData {
    fullName: string;
    email: string;
    username: string;
    password: string;
}

export interface VerifyEmailData {
    email: string;
    otp: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    email: string;
    token: string;
    newPassword: string;
}

// API Response types
export interface ApiResponse<T = unknown> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string; // Exists in response but MUST be ignored - handled by HttpOnly cookie
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string; // IGNORED - cookie handles it
}

// Error messages mapping for XSS protection
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
    'User with email or username already exists': 'An account with this email or username already exists',
    'User does not exist': 'Invalid email or password',
    'Invalid user credentials': 'Invalid email or password',
    'Please verify your email before logging in': 'Please verify your email before logging in',
    'Unauthorized request': 'Your session has expired. Please login again',
    'Invalid Access Token': 'Your session has expired. Please login again',
    'Email is already verified': 'Your email is already verified',
    'Invalid OTP': 'The verification code is incorrect',
    'OTP has expired': 'The verification code has expired. Please request a new one',
    'Too many failed attempts. Account locked for 1 hour.': 'Too many failed attempts. Please try again later',
    'Invalid or expired reset token': 'This reset link has expired. Please request a new one',
};

// Helper to get safe error message
export const getSafeErrorMessage = (backendMessage: string): string => {
    return AUTH_ERROR_MESSAGES[backendMessage] || 'An unexpected error occurred. Please try again.';
};
