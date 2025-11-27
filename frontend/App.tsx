import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
import { CoursePlayer } from './pages/course-player/CoursePlayer';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
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

          {/* Dashboard Routes (Sidebar + Header only) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Auth Routes (Standalone) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Course Player Route (Standalone) */}
          <Route path="/learning/:courseId" element={<CoursePlayer />} />

          {/* Catch all route ensures Home renders if no other route matches */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;