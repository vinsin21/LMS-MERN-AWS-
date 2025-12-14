import React, { useState } from 'react';
import { User, Shield, Bell, CreditCard, Save, Upload, Mail, Smartphone, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import api from '../../lib/api';
import axios from 'axios';
import type { ApiResponse } from '../../types/auth';

export const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { user, refreshAuth } = useAuth();

    // Construct avatar URL from S3 key or use null
    const avatarUrl = user?.avatar
        ? `${import.meta.env.VITE_CLOUDFRONT_URL || ''}/${user.avatar}`
        : null;

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'account', label: 'Account', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Settings</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Manage your account preferences and profile.</p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-sm font-medium transition-all relative
                            ${activeTab === tab.id
                                ? 'text-zinc-900 dark:text-white'
                                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-white/5'
                            }
                        `}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-yellow"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'profile' && <ProfileSettings user={user} avatarUrl={avatarUrl} onAvatarUpdate={refreshAuth} />}
                        {activeTab === 'account' && <AccountSettings user={user} />}
                        {activeTab === 'notifications' && <NotificationSettings />}
                        {activeTab === 'billing' && <BillingSettings />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

/* --- Sub-Components --- */

const ProfileSettings = ({ user, avatarUrl, onAvatarUpdate }: { user: any; avatarUrl: string | null; onAvatarUpdate: () => void }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = React.useState(false);
    const [uploadError, setUploadError] = React.useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setUploadError('Please upload a JPG, PNG, or WebP image');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image must be less than 5MB');
            return;
        }

        setUploadError(null);
        setIsUploading(true);

        // Show preview immediately
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        try {
            // 1. Get presigned URL from backend
            const presignResponse = await api.post<ApiResponse<{ uploadUrl: string; key: string }>>('/users/presign-avatar', {
                mimeType: file.type
            });

            const { uploadUrl, key } = presignResponse.data.data;

            // 2. Upload file directly to S3
            await axios.put(uploadUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });

            // 3. Update backend with S3 key
            await api.post('/users/update-avatar-key', { key });

            // 4. Refresh auth to get updated user data
            onAvatarUpdate();

            setPreviewUrl(null); // Clear preview, real avatar will show
        } catch (error) {
            console.error('Avatar upload failed:', error);
            setUploadError('Failed to upload avatar. Please try again.');
            setPreviewUrl(null);
        } finally {
            setIsUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const displayedAvatar = previewUrl || avatarUrl;

    return (
        <div className="space-y-8 max-w-2xl">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
                <div className="relative">
                    {displayedAvatar ? (
                        <img
                            src={displayedAvatar}
                            alt="Profile"
                            className={`w-24 h-24 rounded-full object-cover ring-4 ring-zinc-50 dark:ring-[#27272a] ${isUploading ? 'opacity-50' : ''}`}
                        />
                    ) : (
                        <div className={`w-24 h-24 rounded-full bg-brand-yellow/20 flex items-center justify-center ring-4 ring-zinc-50 dark:ring-[#27272a] ${isUploading ? 'opacity-50' : ''}`}>
                            <span className="text-brand-yellow font-bold text-2xl">
                                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        </div>
                    )}

                    {/* Upload button with loading spinner */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute bottom-0 right-0 p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors disabled:cursor-not-allowed"
                    >
                        {isUploading ? (
                            <div className="w-3.5 h-3.5 border-2 border-zinc-300 dark:border-zinc-600 border-t-zinc-900 dark:border-t-white rounded-full animate-spin" />
                        ) : (
                            <Upload size={14} className="text-zinc-600 dark:text-zinc-300" />
                        )}
                    </button>

                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleAvatarUpload}
                        className="hidden"
                    />
                </div>
                <div>
                    <h3 className="font-medium text-zinc-900 dark:text-white">Profile Photo</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Recommended: 400x400px, JPG, PNG, or WebP.</p>
                    {uploadError && (
                        <p className="text-sm text-red-500 mt-1">{uploadError}</p>
                    )}
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                    <input
                        type="text"
                        defaultValue={user?.fullName || ''}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#27272a] border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow outline-none transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Username</label>
                    <input
                        type="text"
                        defaultValue={user?.username || ''}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#27272a] border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow outline-none transition-all"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                    <input
                        type="email"
                        defaultValue={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#27272a] border border-zinc-200 dark:border-zinc-700 text-zinc-500 cursor-not-allowed"
                    />
                </div>
            </div>

            <div className="pt-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-medium hover:opacity-90 transition-opacity">
                    <Save size={18} />
                    Save Changes
                </button>
            </div>
        </div>
    );
};

const AccountSettings = ({ user }: { user: any }) => (
    <div className="space-y-8 max-w-2xl">
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                <Mail size={20} /> Email Address
            </h3>
            <div className="flex gap-4">
                <input
                    type="email"
                    defaultValue={user?.email || ''}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-[#27272a] border border-zinc-200 dark:border-zinc-700 text-zinc-500 cursor-not-allowed"
                    disabled
                />
                <button className="px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl transition-colors">
                    Update Email
                </button>
            </div>
        </div>

        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="px-6 py-2.5 border border-red-200 dark:border-red-900/30 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                Delete Account
            </button>
        </div>
    </div>
);

const NotificationSettings = () => {
    const [toggles, setToggles] = useState({
        email: true,
        marketing: false,
        security: true,
        community: true
    });

    const Toggle = ({ label, desc, checked, onChange }: any) => (
        <div className="flex items-start justify-between py-4 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
            <div>
                <h4 className="font-medium text-zinc-900 dark:text-white">{label}</h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{desc}</p>
            </div>
            <button
                onClick={onChange}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-brand-yellow' : 'bg-zinc-200 dark:bg-zinc-700'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );

    return (
        <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">Email Preferences</h3>
            <div className="space-y-2">
                <Toggle
                    label="Course Updates"
                    desc="Receive emails about your progress and new lesson releases."
                    checked={toggles.email}
                    onChange={() => setToggles({ ...toggles, email: !toggles.email })}
                />
                <Toggle
                    label="Community Comments"
                    desc="Notify me when someone replies to my comments."
                    checked={toggles.community}
                    onChange={() => setToggles({ ...toggles, community: !toggles.community })}
                />
                <Toggle
                    label="Security Alerts"
                    desc="Get notified about new logins and security updates."
                    checked={toggles.security}
                    onChange={() => setToggles({ ...toggles, security: !toggles.security })}
                />
                <Toggle
                    label="Marketing & Offers"
                    desc="Receive updates about new courses and special discounts."
                    checked={toggles.marketing}
                    onChange={() => setToggles({ ...toggles, marketing: !toggles.marketing })}
                />
            </div>
        </div>
    );
};

const BillingSettings = () => (
    <div className="space-y-8 max-w-3xl">
        {/* Current Plan */}
        <div className="bg-zinc-50 dark:bg-[#27272a] rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Pro Plan</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow text-xs font-bold border border-brand-yellow/20">ACTIVE</span>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Billed annually. Next payment due on Nov 27, 2025.</p>
            </div>
            <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded-lg transition-colors">
                    Cancel Plan
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
                    Update Method
                </button>
            </div>
        </div>

        {/* Payment Method */}
        <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Payment Method</h3>
            <div className="flex items-center gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                <div className="w-12 h-8 bg-zinc-100 dark:bg-zinc-800 rounded flex items-center justify-center">
                    <CreditCard size={20} className="text-zinc-500" />
                </div>
                <div className="flex-1">
                    <p className="font-medium text-zinc-900 dark:text-white">Visa ending in 4242</p>
                    <p className="text-sm text-zinc-500">Expiry 12/2028</p>
                </div>
                <button className="text-sm text-brand-yellow font-medium hover:underline">Edit</button>
            </div>
        </div>

        {/* Invoice History */}
        <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Invoice History</h3>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
                {[
                    { date: 'Nov 27, 2024', amount: '$120.00', status: 'Paid' },
                    { date: 'Oct 27, 2024', amount: '$120.00', status: 'Paid' },
                    { date: 'Sep 27, 2024', amount: '$120.00', status: 'Paid' },
                ].map((invoice, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                <Smartphone size={16} className="text-zinc-500" />
                            </div>
                            <div>
                                <p className="font-medium text-zinc-900 dark:text-white">Invoice #{1000 + i}</p>
                                <p className="text-xs text-zinc-500">{invoice.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-medium text-zinc-900 dark:text-white">{invoice.amount}</p>
                            <span className="text-xs text-green-500 font-medium flex items-center justify-end gap-1">
                                <Check size={10} /> {invoice.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
