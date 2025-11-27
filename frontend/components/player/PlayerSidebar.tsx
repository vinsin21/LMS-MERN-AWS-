import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, FileText, CheckCircle, Circle, Lock } from 'lucide-react';
import { Module, Lesson } from '../../data/mockData';

interface PlayerSidebarProps {
    modules: Module[];
    currentLesson: Lesson;
    onLessonSelect: (lesson: Lesson) => void;
}

export const PlayerSidebar: React.FC<PlayerSidebarProps> = ({
    modules,
    currentLesson,
    onLessonSelect
}) => {
    // Find the module containing the current lesson
    const activeModuleId = modules.find(m => m.lessons.some(l => l.id === currentLesson.id))?.id;

    // Initialize with only the active module open
    const [openModules, setOpenModules] = useState<string[]>(activeModuleId ? [activeModuleId] : []);

    // Auto-expand module when currentLesson changes
    React.useEffect(() => {
        if (activeModuleId && !openModules.includes(activeModuleId)) {
            setOpenModules(prev => [...prev, activeModuleId]);
        }
    }, [activeModuleId]);

    const toggleModule = (moduleId: string) => {
        setOpenModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#18181b] border-l border-zinc-200 dark:border-zinc-800">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="font-bold text-zinc-900 dark:text-white">Course Content</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
                {modules.map((module) => (
                    <div key={module.id} className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0">
                        {/* Module Header */}
                        <button
                            onClick={() => toggleModule(module.id)}
                            className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-[#27272a]/50 hover:bg-zinc-100 dark:hover:bg-[#27272a] transition-colors text-left"
                        >
                            <div>
                                <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">{module.title}</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{module.lessons.length} Lessons</p>
                            </div>
                            {openModules.includes(module.id) ? (
                                <ChevronUp size={16} className="text-zinc-400" />
                            ) : (
                                <ChevronDown size={16} className="text-zinc-400" />
                            )}
                        </button>

                        {/* Lessons List */}
                        {openModules.includes(module.id) && (
                            <div className="bg-white dark:bg-[#18181b]">
                                {module.lessons.map((lesson) => {
                                    const isActive = currentLesson.id === lesson.id;
                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => onLessonSelect(lesson)}
                                            className={`w-full flex items-start gap-3 p-4 text-left transition-all border-l-2 ${isActive
                                                ? 'bg-zinc-50 dark:bg-zinc-900 border-brand-yellow'
                                                : 'border-transparent hover:bg-zinc-50 dark:hover:bg-white/5'
                                                }`}
                                        >
                                            <div className="mt-0.5 shrink-0">
                                                {lesson.isCompleted ? (
                                                    <CheckCircle size={16} className="text-green-500" />
                                                ) : isActive ? (
                                                    <PlayCircle size={16} className="text-brand-yellow fill-brand-yellow/20" />
                                                ) : (
                                                    <Circle size={16} className="text-zinc-300 dark:text-zinc-600" />
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <p className={`text-sm font-medium mb-1 ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-400'
                                                    }`}>
                                                    {lesson.title}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                    {lesson.type === 'video' ? <PlayCircle size={12} /> : <FileText size={12} />}
                                                    <span>{lesson.duration}</span>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
