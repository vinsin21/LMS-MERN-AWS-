import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { getSafeErrorMessage, ApiResponse } from '../types/auth';
import { AxiosError } from 'axios';

export const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await api.post<ApiResponse>('/users/forgot-password', { email: email.trim().toLowerCase() });
            setSuccess(true);
        } catch (err) {
            // Backend always returns success to prevent email enumeration
            // But if there's an actual error (network, rate limit), show it
            const axiosError = err as AxiosError<{ message: string }>;
            if (axiosError.response?.status === 429) {
                setError('Too many attempts. Please try again later.');
            } else {
                setSuccess(true); // Pretend success for security
            }
        } finally {
            setIsLoading(false);
        }
    };

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
                    <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Forgot password?</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                        No worries, we'll send you reset instructions.
                    </p>
                </div>

                {/* Success Message */}
                {success ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-start gap-3">
                            <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-green-700 dark:text-green-300">Check your email</p>
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                    If an account exists for <span className="font-medium">{email}</span>, you'll receive a password reset link shortly.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <ArrowLeft size={16} />
                            Back to login
                        </button>
                    </motion.div>
                ) : (
                    <>
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

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Email address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all shadow-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-sm py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                                ) : (
                                    'Reset password'
                                )}
                            </button>
                        </form>
                    </>
                )}

                {/* Back to login */}
                {!success && (
                    <p className="text-center mt-8 text-xs text-zinc-500">
                        Remember your password?{' '}
                        <Link to="/login" className="text-zinc-900 dark:text-white font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                )}
            </motion.div>
        </div>
    );
};
