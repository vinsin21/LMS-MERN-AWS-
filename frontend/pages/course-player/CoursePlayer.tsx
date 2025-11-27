import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockUser, Course, Lesson, Module } from '../../data/mockData';
import { VideoPlayer } from '../../components/player/VideoPlayer';
import { PlayerSidebar } from '../../components/player/PlayerSidebar';

export const CoursePlayer: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();

    const [course, setCourse] = useState<Course | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Auto-scroll to top when lesson changes (for mobile)
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentLesson?.id]);

    useEffect(() => {
        // Simulate fetching course data
        const foundCourse = mockUser.enrolledCourses.find(c => c.id === courseId);
        if (foundCourse) {
            setCourse(foundCourse);
            // Smart Resume: Find the first incomplete lesson
            if (foundCourse.modules && foundCourse.modules.length > 0) {
                const allLessons = foundCourse.modules.flatMap(m => m.lessons);
                const firstIncompleteLesson = allLessons.find(l => !l.isCompleted);

                if (firstIncompleteLesson) {
                    setCurrentLesson(firstIncompleteLesson);
                } else {
                    // If all completed, start from the beginning
                    setCurrentLesson(foundCourse.modules[0].lessons[0]);
                }
            }
        } else {
            // Handle course not found
            navigate('/dashboard/courses');
        }
    }, [courseId, navigate]);

    if (!course || !currentLesson) {
        return <div className="min-h-screen bg-[#171717] flex items-center justify-center text-white">Loading...</div>;
    }

    // Helper to flatten lessons for navigation
    const allLessons = course.modules?.flatMap(m => m.lessons) || [];
    const currentLessonIndex = allLessons.findIndex(l => l.id === currentLesson.id);
    const isFirst = currentLessonIndex === 0;
    const isLast = currentLessonIndex === allLessons.length - 1;

    const handleNext = () => {
        if (!isLast) {
            setCurrentLesson(allLessons[currentLessonIndex + 1]);
        }
    };

    const handlePrevious = () => {
        if (!isFirst) {
            setCurrentLesson(allLessons[currentLessonIndex - 1]);
        }
    };

    const handleComplete = (forceComplete: boolean = false) => {
        // In a real app, this would call an API
        // For now, we just toggle the local state (optimistically)
        // Note: This won't persist in mockData across reloads unless we mutate it directly (which is fine for mock)

        if (forceComplete) {
            currentLesson.isCompleted = true;
        } else {
            currentLesson.isCompleted = !currentLesson.isCompleted;
        }

        // Force re-render
        setCourse({ ...course });
    };



    return (
        <div className="flex flex-col h-screen bg-white dark:bg-[#0a0a0a] overflow-hidden">
            {/* Header */}
            <header className="h-16 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard/courses" className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="font-bold text-zinc-900 dark:text-white text-sm md:text-base line-clamp-1">{course.title}</h1>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 hidden md:block">
                            {course.completedLessons} / {course.totalLessons} Lessons Completed
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div
                ref={containerRef}
                className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden relative"
            >
                {/* Video Area */}
                <main className="w-full lg:flex-1 p-4 md:p-6 lg:p-8 order-1 h-auto lg:h-full lg:overflow-y-auto">
                    <div className="max-w-5xl mx-auto">
                        <VideoPlayer
                            lesson={currentLesson}
                            onComplete={(force) => handleComplete(force)}
                            onNext={handleNext}
                            onPrevious={handlePrevious}
                            isFirst={isFirst}
                            isLast={isLast}
                        />
                    </div>
                </main>

                {/* Sidebar (Desktop: Right, Mobile: Bottom) */}
                <aside className="w-full lg:w-80 bg-white dark:bg-[#18181b] border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 order-2 h-auto lg:h-full lg:overflow-y-auto">
                    <PlayerSidebar
                        modules={course.modules}
                        currentLesson={currentLesson}
                        onLessonSelect={(lesson) => {
                            setCurrentLesson(lesson);
                            // No need to close sidebar anymore
                        }}
                    />
                </aside>
            </div>
        </div>
    );
};
