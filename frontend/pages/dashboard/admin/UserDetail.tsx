import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft, Mail, Calendar, Shield, UserCheck, UserX,
    Loader2, MoreVertical, Edit, Key, Ban, CheckCircle,
    BookOpen, Award, Clock
} from 'lucide-react';
import api from '../../../lib/api';
import type { ApiResponse } from '../../../types/auth';

// User interface matching backend response
interface UserDetail {
    _id: string;
    fullName: string;
    email: string;
    username: string;
    role: 'user' | 'instructor' | 'admin';
    isActive: boolean;
    isEmailVerified: boolean;
    isSuperAdmin?: boolean;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * User Detail Page (Admin Only)
 * Shows detailed information about a specific user
 * Connected to /api/v1/users/admin/users/:userId
 */
export const UserDetail: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();

    const [user, setUser] = useState<UserDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showActions, setShowActions] = useState(false);

    // Fetch user details
    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await api.get<ApiResponse<UserDetail>>(
                    `/users/admin/users/${userId}`
                );
                setUser(response.data.data);
            } catch (err: any) {
                console.error('Failed to fetch user:', err);
                setError(err.response?.data?.message || 'Failed to fetch user details');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    // Toggle user active status
    const toggleUserStatus = async () => {
        if (!user) return;

        setIsUpdating(true);
        try {
            const response = await api.patch<ApiResponse<UserDetail>>(
                `/users/admin/users/${userId}/status`,
                { isActive: !user.isActive }
            );
            setUser(response.data.data);
            setShowActions(false);
        } catch (err: any) {
            console.error('Failed to update user status:', err);
            alert(err.response?.data?.message || 'Failed to update user status');
        } finally {
            setIsUpdating(false);
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-24">
                <Loader2 size={32} className="text-brand-yellow animate-spin" />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="space-y-4">
                <button
                    onClick={() => navigate('/dashboard/admin/users')}
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Users
                </button>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard/admin/users')}
                        className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-zinc-500" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">User Details</h2>
                        <p className="text-zinc-500 dark:text-zinc-400">View and manage user account</p>
                    </div>
                </div>

                {/* Actions Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowActions(!showActions)}
                        className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <MoreVertical size={20} className="text-zinc-500" />
                    </button>

                    {showActions && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg py-1 z-10">
                            <button
                                onClick={toggleUserStatus}
                                disabled={isUpdating || user.isSuperAdmin}
                                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {user.isActive ? (
                                    <>
                                        <Ban size={16} className="text-red-500" />
                                        <span className="text-red-500">Deactivate User</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle size={16} className="text-green-500" />
                                        <span className="text-green-500">Activate User</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* User Profile Card */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                {/* Cover/Header */}
                <div className="h-24 bg-gradient-to-r from-brand-yellow/20 to-brand-yellow/5" />

                {/* Profile Info */}
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
                        {/* Avatar */}
                        {user.avatar ? (
                            <img
                                src={`${import.meta.env.VITE_CLOUDFRONT_URL}/${user.avatar}`}
                                alt={user.fullName}
                                className="w-24 h-24 rounded-xl border-4 border-white dark:border-zinc-800 object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-xl border-4 border-white dark:border-zinc-800 bg-brand-yellow/20 flex items-center justify-center">
                                <span className="text-3xl font-bold text-brand-yellow">
                                    {user.fullName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}

                        {/* Name and badges */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                                    {user.fullName}
                                </h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${user.role === 'admin'
                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                        : user.role === 'instructor'
                                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                            : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                                    }`}>
                                    {user.role}
                                </span>
                                {user.isSuperAdmin && (
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                                        Super Admin
                                    </span>
                                )}
                            </div>
                            <p className="text-zinc-500">@{user.username}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Information */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Account Information</h4>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Mail size={18} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500">Email</p>
                                <p className="text-zinc-900 dark:text-white">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <Shield size={18} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500">Role</p>
                                <p className="text-zinc-900 dark:text-white capitalize">{user.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${user.isActive
                                    ? 'bg-green-100 dark:bg-green-900/30'
                                    : 'bg-red-100 dark:bg-red-900/30'
                                }`}>
                                {user.isActive
                                    ? <UserCheck size={18} className="text-green-600 dark:text-green-400" />
                                    : <UserX size={18} className="text-red-600 dark:text-red-400" />
                                }
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500">Account Status</p>
                                <p className={user.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                    {user.isActive ? 'Active' : 'Deactivated'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${user.isEmailVerified
                                    ? 'bg-green-100 dark:bg-green-900/30'
                                    : 'bg-yellow-100 dark:bg-yellow-900/30'
                                }`}>
                                <Mail size={18} className={
                                    user.isEmailVerified
                                        ? 'text-green-600 dark:text-green-400'
                                        : 'text-yellow-600 dark:text-yellow-400'
                                } />
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500">Email Verification</p>
                                <p className={user.isEmailVerified ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                                    {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Information */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Activity</h4>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                                <Calendar size={18} className="text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500">Joined</p>
                                <p className="text-zinc-900 dark:text-white">{formatDate(user.createdAt)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg">
                                <Clock size={18} className="text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-sm text-zinc-500">Last Updated</p>
                                <p className="text-zinc-900 dark:text-white">{formatDate(user.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Future Sections Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Enrolled Courses - Placeholder */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                            <BookOpen size={18} className="text-brand-yellow" />
                            Enrolled Courses
                        </h4>
                        <span className="text-sm text-zinc-400">Coming soon</span>
                    </div>
                    <div className="text-center py-8 text-zinc-400">
                        <BookOpen size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Course enrollment data will appear here</p>
                    </div>
                </div>

                {/* Certificates - Placeholder */}
                <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                            <Award size={18} className="text-brand-yellow" />
                            Certificates
                        </h4>
                        <span className="text-sm text-zinc-400">Coming soon</span>
                    </div>
                    <div className="text-center py-8 text-zinc-400">
                        <Award size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Certificate data will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
