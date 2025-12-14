import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { getSafeErrorMessage, ApiResponse } from '../types/auth';
import { AxiosError } from 'axios';

export const VerifyEmail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from navigation state (Issue 1 - don't expose in URL)
    const email = (location.state as { email?: string })?.email;

    // OTP state - 6 separate inputs for better UX
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Resend OTP state
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    // Redirect if no email in state
    useEffect(() => {
        if (!email) {
            navigate('/signup', { replace: true });
        }
    }, [email, navigate]);

    // Countdown timer for resend cooldown
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
        setOtp(newOtp.slice(0, 6));

        // Focus last filled input or last input
        const lastIndex = Math.min(pastedData.length - 1, 5);
        inputRefs.current[lastIndex]?.focus();
    };

    // Handle backspace
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Verify OTP
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter the complete 6-digit code');
            setIsLoading(false);
            return;
        }

        try {
            await api.post<ApiResponse>('/users/verify-email', {
                email,
                otp: otpString,
            });

            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login', {
                    state: { message: 'Email verified successfully! Please sign in.' }
                });
            }, 2000);
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const backendMessage = axiosError.response?.data?.message || 'Verification failed';
            setError(getSafeErrorMessage(backendMessage));
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP
    const handleResend = async () => {
        if (resendCooldown > 0 || isResending) return;

        setIsResending(true);
        setError(null);

        try {
            await api.post<ApiResponse>('/users/resend-otp', { email });
            setResendCooldown(60); // 60 second cooldown
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            const backendMessage = axiosError.response?.data?.message || 'Failed to resend OTP';
            setError(getSafeErrorMessage(backendMessage));
        } finally {
            setIsResending(false);
        }
    };

    if (!email) return null;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Home Button */}
            <Link
                to="/"
                className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all shadow-sm group"
            >
                <Home size={16} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm font-medium hidden sm:inline">Home</span>
            </Link>

            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-yellow/10 dark:bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Modern Dot Background */}
            <div className="absolute inset-0 h-full w-full dark:bg-black/0 bg-white/0 dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-[400px] bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 shadow-xl relative z-10"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-yellow/10 mb-4">
                        <div className="w-5 h-5 bg-brand-yellow rounded-md rotate-45"></div>
                    </div>
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Verify your email</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        We sent a 6-digit code to<br />
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{email}</span>
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-2"
                    >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-600 dark:text-green-400">Email verified! Redirecting to login...</p>
                    </motion.div>
                )}

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-2"
                    >
                        <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </motion.div>
                )}

                {/* OTP Form */}
                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="flex gap-2 justify-center">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                disabled={success}
                                className="w-11 h-12 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl text-center text-lg font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all shadow-sm disabled:opacity-50"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || success}
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                        ) : success ? (
                            <>
                                <CheckCircle size={16} />
                                Verified
                            </>
                        ) : (
                            'Verify email'
                        )}
                    </button>
                </form>

                {/* Resend OTP */}
                <div className="text-center mt-6">
                    <p className="text-xs text-zinc-500">
                        Didn't receive the code?{' '}
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resendCooldown > 0 || isResending || success}
                            className="text-zinc-900 dark:text-white font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1"
                        >
                            {isResending ? (
                                <RefreshCw size={12} className="animate-spin" />
                            ) : resendCooldown > 0 ? (
                                `Resend in ${resendCooldown}s`
                            ) : (
                                'Resend code'
                            )}
                        </button>
                    </p>
                </div>

                {/* Back to signup */}
                <p className="text-center mt-6 text-xs text-zinc-500">
                    Wrong email?{' '}
                    <Link to="/signup" className="text-zinc-900 dark:text-white font-medium hover:underline">
                        Go back
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};
