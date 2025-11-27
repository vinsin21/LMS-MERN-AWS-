import React from 'react';
import { Award, Download, Share2, Linkedin, CheckCircle, ExternalLink, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockUser } from '../../data/mockData';

export const Certificates: React.FC = () => {
    // Filter courses that are 100% complete
    const earnedCertificates = mockUser.enrolledCourses.filter(course => course.progress === 100);

    // Filter courses that are close to completion (e.g., > 50% but < 100%)
    const inProgressCourses = mockUser.enrolledCourses.filter(course => course.progress >= 50 && course.progress < 100);

    // Mock skills derived from completed courses
    const skills = [
        "React.js", "TypeScript", "Tailwind CSS", "Node.js", "UI/UX Design", "AWS"
    ];

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">My Certificates</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Showcase your achievements and verify your skills.</p>
            </div>

            {/* 🏆 Earned Certificates Gallery */}
            <section>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                    <Award className="text-brand-yellow" /> Earned Certificates
                </h3>

                {earnedCertificates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {earnedCertificates.map((course) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group relative bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                {/* Certificate Preview (Mock Visual) */}
                                <div className="relative h-48 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center p-6 overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                    <div className="border-4 border-double border-zinc-300 dark:border-zinc-700 p-4 w-full h-full flex flex-col items-center justify-center text-center bg-white dark:bg-[#18181b] shadow-sm transform group-hover:scale-105 transition-transform duration-500">
                                        <Award size={32} className="text-brand-yellow mb-2" />
                                        <h4 className="font-serif font-bold text-zinc-900 dark:text-white text-sm leading-tight mb-1">CERTIFICATE OF COMPLETION</h4>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Presented to</p>
                                        <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm my-1">{mockUser.name}</p>
                                        <p className="text-[10px] text-zinc-400">For completing {course.title}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="p-5">
                                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1 line-clamp-1">{course.title}</h4>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Issued on Nov 27, 2024</p>

                                    <div className="flex items-center gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                                            <Download size={14} /> PDF
                                        </button>
                                        <button className="flex items-center justify-center gap-2 px-3 py-2 bg-[#0077b5] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                                            <Linkedin size={14} /> Share
                                        </button>
                                        <button className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors">
                                            <Share2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                        <Award size={48} className="mx-auto text-zinc-300 dark:text-zinc-600 mb-4" />
                        <h3 className="text-zinc-900 dark:text-white font-medium">No certificates earned yet</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Complete a course to unlock your first badge of honor.</p>
                    </div>
                )}
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 🚀 Almost There */}
                <section className="lg:col-span-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="text-green-500" /> Almost There
                    </h3>
                    <div className="space-y-4">
                        {inProgressCourses.map((course) => (
                            <div key={course.id} className="flex items-center gap-4 p-4 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-brand-yellow/50 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 overflow-hidden">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-zinc-900 dark:text-white truncate">{course.title}</h4>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-yellow rounded-full" style={{ width: `${course.progress}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{course.progress}%</span>
                                    </div>
                                </div>
                                <button className="p-2 text-zinc-400 hover:text-brand-yellow transition-colors">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        ))}
                        {inProgressCourses.length === 0 && (
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 italic">No courses currently in progress.</p>
                        )}
                    </div>
                </section>

                {/* Sidebar: Skills & Verification */}
                <div className="space-y-8">
                    {/* 🎖️ Skills Badges */}
                    <section>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Skills Earned</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-zinc-700 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-300">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* 🔍 Verification */}
                    <section className="bg-zinc-50 dark:bg-zinc-900/50 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <h3 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                            <Lock size={16} className="text-zinc-400" /> Verify Certificate
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                            Employers can verify your certificates using your unique ID.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value="CID-8923-4421"
                                readOnly
                                className="flex-1 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs font-mono text-zinc-600 dark:text-zinc-300"
                            />
                            <button className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
