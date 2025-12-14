import {
    LayoutDashboard,
    BookOpen,
    Award,
    Settings,
    Users,
    FolderKanban,
    BarChart3,
    GraduationCap,
    type LucideIcon
} from 'lucide-react';

// ============================================
// ROLE-BASED NAVIGATION CONFIGURATION
// ============================================
// This file defines which navigation items are visible to each user role.
// NOTE: This is for UI/UX only - backend enforces actual authorization.
// ============================================

export type UserRole = 'user' | 'instructor' | 'admin';

export interface NavItem {
    icon: LucideIcon;
    label: string;
    path: string;
    roles: UserRole[];       // Which roles can see this item
    count?: number | null;   // Optional badge count
    mobileVisible?: boolean; // Show in mobile bottom nav (max 4 items)
}

/**
 * Navigation items configuration
 * Order matters - items appear in the order defined here
 */
export const navigationItems: NavItem[] = [
    // ========== COMMON (All Roles) ==========
    {
        icon: LayoutDashboard,
        label: 'Overview',
        path: '/dashboard',
        roles: ['user', 'instructor', 'admin'],
        mobileVisible: true
    },

    // ========== USER ONLY (Student Features) ==========
    {
        icon: BookOpen,
        label: 'My Courses',
        path: '/dashboard/courses',
        roles: ['user'],  // Students only - instructors create courses, not take them
        mobileVisible: true
    },
    {
        icon: Award,
        label: 'Certificates',
        path: '/dashboard/certificates',
        roles: ['user'],  // Students only
        mobileVisible: true
    },

    // ========== INSTRUCTOR ONLY ==========
    {
        icon: GraduationCap,
        label: 'Manage Courses',
        path: '/dashboard/instructor/courses',
        roles: ['instructor'],
        mobileVisible: false
    },
    {
        icon: BarChart3,
        label: 'Analytics',
        path: '/dashboard/instructor/analytics',
        roles: ['instructor'],
        mobileVisible: false
    },

    // ========== ADMIN ONLY ==========
    {
        icon: Users,
        label: 'Users',
        path: '/dashboard/admin/users',
        roles: ['admin'],
        mobileVisible: true
    },
    {
        icon: FolderKanban,
        label: 'All Courses',
        path: '/dashboard/admin/courses',
        roles: ['admin'],
        mobileVisible: true
    },
    {
        icon: BarChart3,
        label: 'Analytics',
        path: '/dashboard/admin/analytics',
        roles: ['admin'],
        mobileVisible: false
    },

    // ========== COMMON - Settings (Last) ==========
    {
        icon: Settings,
        label: 'Settings',
        path: '/dashboard/settings',
        roles: ['user', 'instructor', 'admin'],
        mobileVisible: true
    },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get navigation items filtered by user role
 * @param role - The user's role
 * @returns Array of navigation items the user can access
 */
export const getNavigationForRole = (role: UserRole): NavItem[] => {
    return navigationItems.filter(item => item.roles.includes(role));
};

/**
 * Get mobile-friendly navigation items (max 4) for bottom nav
 * @param role - The user's role  
 * @returns Array of up to 4 navigation items marked as mobile visible
 */
export const getMobileNavigationForRole = (role: UserRole): NavItem[] => {
    return navigationItems
        .filter(item => item.roles.includes(role) && item.mobileVisible)
        .slice(0, 4); // Max 4 items for mobile bottom nav
};
