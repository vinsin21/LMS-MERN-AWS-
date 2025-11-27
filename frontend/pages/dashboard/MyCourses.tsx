import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MoreHorizontal } from 'lucide-react';
import { mockUser } from '../../data/mockData';

export const MyCourses: React.FC = () => {
    return (
        <div className="space-y-8">

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUser.enrolledCourses.map(course => (
                    <Link key={course.id} to={`/learning/${course.id}`} className="bg-white dark:bg-[#27272a] rounded-xl overflow-hidden group flex flex-col h-full hover:bg-zinc-50 dark:hover:bg-[#3f3f46] transition-all cursor-pointer border border-zinc-200 dark:border-zinc-800">

                        {/* Thumbnail */}
                        <div className="aspect-video relative overflow-hidden bg-zinc-100 dark:bg-[#18181b]">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 flex items-center gap-1">
                                <Clock size={10} className="text-zinc-500 dark:text-zinc-400" />
                                {course.totalLessons} Lessons
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <h4 className="text-zinc-900 dark:text-white font-bold text-base leading-snug line-clamp-2 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors">{course.title}</h4>
                                <button className="text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-white transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>

                            <p className="text-xs text-zinc-500 mb-6 font-medium">By {course.instructor}</p>

                            <div className="mt-auto">
                                <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 mb-2 uppercase tracking-wider">
                                    <span className={course.progress === 100 ? 'text-green-500 dark:text-green-400' : 'text-zinc-400'}>
                                        {course.progress === 100 ? 'Completed' : `${course.progress}% Done`}
                                    </span>
                                    <span>{course.completedLessons}/{course.totalLessons}</span>
                                </div>
                                <div className="w-full bg-zinc-100 dark:bg-[#18181b] h-1 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${course.progress === 100 ? 'bg-green-500 dark:bg-green-400' : 'bg-zinc-900 dark:bg-white'}`}
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
};
