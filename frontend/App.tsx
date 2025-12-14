import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { GuestRoute } from './components/auth/GuestRoute';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { CodingLabs } from './pages/CodingLabs';
import { Membership } from './pages/Membership';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetail';
import { Testimonials } from './pages/Testimonials';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { MyCourses } from './pages/dashboard/MyCourses';
import { Certificates } from './pages/dashboard/Certificates';
import { Settings } from './pages/dashboard/Settings';
// Instructor Dashboard Pages
import { ManageCourses } from './pages/dashboard/instructor/ManageCourses';
import { InstructorAnalytics } from './pages/dashboard/instructor/InstructorAnalytics';
// Admin Dashboard Pages
import { UserManagement } from './pages/dashboard/admin/UserManagement';
import { UserDetail } from './pages/dashboard/admin/UserDetail';
import { CourseManagement } from './pages/dashboard/admin/CourseManagement';
import { AdminAnalytics } from './pages/dashboard/admin/AdminAnalytics';
import { CoursePlayer } from './pages/course-player/CoursePlayer';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { VerifyEmail } from './pages/VerifyEmail';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        {/* Removed overflow-x-hidden from here and moved to body in index.html to fix sticky sidebar */}
        <div className="min-h-screen bg-[#171717] font-sans text-white selection:bg-brand-yellow selection:text-black">
          <Routes>
            {/* Public Routes wrapped in MainLayout (Navbar + Footer) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/coding-labs" element={<CodingLabs />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/testimonials" element={<Testimonials />} />
            </Route>

            {/* Protected Dashboard Routes - All authenticated users */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="courses" element={<MyCourses />} />
                <Route path="certificates" element={<Certificates />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Protected Course Player Route */}
              <Route path="/learning/:courseId" element={<CoursePlayer />} />
            </Route>

            {/* Instructor-only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
              <Route path="/dashboard/instructor" element={<DashboardLayout />}>
                <Route path="courses" element={<ManageCourses />} />
                <Route path="analytics" element={<InstructorAnalytics />} />
              </Route>
            </Route>

            {/* Admin-only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/dashboard/admin" element={<DashboardLayout />}>
                <Route path="users" element={<UserManagement />} />
                <Route path="users/:userId" element={<UserDetail />} />
                <Route path="courses" element={<CourseManagement />} />
                <Route path="analytics" element={<AdminAnalytics />} />
              </Route>
            </Route>

            {/* Auth Routes - Guest Only (redirect if logged in) */}
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Catch all route ensures Home renders if no other route matches */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;

