import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Play, Loader2 } from 'lucide-react';
import { Lesson } from '../../data/mockData';

interface VideoPlayerProps {
    lesson: Lesson;
    onComplete: (force?: boolean) => void;
    onNext: () => void;
    onPrevious: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    lesson,
    onComplete,
    onNext,
    onPrevious,
    isFirst,
    isLast
}) => {
    const [showAutoPlay, setShowAutoPlay] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Reset state when lesson changes
    useEffect(() => {
        setShowAutoPlay(false);
        setCountdown(5);
        if (timerRef.current) clearInterval(timerRef.current);
    }, [lesson.id]);

    // Handle countdown
    useEffect(() => {
        if (showAutoPlay && countdown > 0) {
            timerRef.current = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0 && showAutoPlay) {
            handleAutoNext();
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [showAutoPlay, countdown]);

    const handleVideoEnded = () => {
        if (!isLast) {
            setShowAutoPlay(true);
        } else {
            // Just mark as complete if it's the last video
            onComplete();
        }
    };

    const handleAutoNext = () => {
        setShowAutoPlay(false);
        // Mark current as complete AND move to next
        onComplete();
        onNext();
    };

    const cancelAutoPlay = () => {
        setShowAutoPlay(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Video Container */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800 group">
                {lesson.videoUrl ? (
                    <video
                        key={lesson.id}
                        src={lesson.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                        poster="https://picsum.photos/seed/video/1920/1080"
                        onEnded={handleVideoEnded}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                        <div className="text-center">
                            <Play size={48} className="mx-auto mb-4 opacity-50" />
                            <p>Video source not available</p>
                        </div>
                    </div>
                )}

                {/* Auto-play Overlay */}
                {showAutoPlay && (
                    <div className="absolute inset-0 bg-black/80 z-10 flex flex-col items-center justify-center text-white backdrop-blur-sm transition-all animate-in fade-in duration-300">
                        <div className="text-center space-y-4">
                            <p className="text-zinc-400 font-medium">Up Next</p>
                            <div className="relative inline-flex items-center justify-center">
                                <Loader2 size={48} className="animate-spin text-brand-yellow" />
                                <span className="absolute text-xl font-bold">{countdown}</span>
                            </div>
                            <h3 className="text-xl font-bold">Playing next lesson...</h3>

                            <div className="flex items-center gap-3 mt-4">
                                <button
                                    onClick={cancelAutoPlay}
                                    className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAutoNext}
                                    className="px-4 py-2 rounded-lg bg-brand-yellow text-black font-bold hover:bg-brand-yellow/90 transition-colors flex items-center gap-2"
                                >
                                    Play Now <Play size={16} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Lesson Info & Controls */}
            <div className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{lesson.title}</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                            Lesson {lesson.id} • {lesson.duration}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onPrevious}
                            disabled={isFirst}
                            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Previous Lesson"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            onClick={() => onComplete()}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${lesson.isCompleted
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800'
                                : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90'
                                }`}
                        >
                            <CheckCircle size={18} />
                            {lesson.isCompleted ? 'Completed' : 'Mark as Complete'}
                        </button>

                        <button
                            onClick={onNext}
                            disabled={isLast}
                            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Next Lesson"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Description / Resources (Placeholder) */}
                {/* Description / Resources */}
                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* About Section */}
                    <div className="lg:col-span-2 p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-brand-yellow block"></span>
                            About this lesson
                        </h3>
                        <div className="text-zinc-600 dark:text-zinc-400 space-y-4 leading-relaxed">
                            <p>
                                In this lesson, we will dive deep into <strong className="text-zinc-900 dark:text-white">{lesson.title}</strong>.
                                We'll cover the core concepts, implementation details, and best practices.
                            </p>
                            <p>
                                Make sure to follow along with the code examples and complete the exercises at the end to reinforce your learning.
                            </p>
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 h-fit">
                        <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors group">
                                    <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-brand-yellow transition-colors">
                                        <Loader2 size={16} className="group-hover:animate-spin" />
                                        {/* Using Loader2 as placeholder icon, normally would use FileCode or Link */}
                                    </div>
                                    <span>Source Code</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-brand-yellow dark:hover:text-brand-yellow transition-colors group">
                                    <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 group-hover:border-brand-yellow transition-colors">
                                        <Play size={16} />
                                    </div>
                                    <span>Documentation</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
