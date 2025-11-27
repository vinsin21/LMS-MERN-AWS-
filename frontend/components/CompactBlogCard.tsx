import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CompactBlogCardProps {
    slug: string;
    category: string;
    title: string;
    description: string;
    categoryColor?: string;
}

export const CompactBlogCard: React.FC<CompactBlogCardProps> = ({
    slug,
    category,
    title,
    description,
    categoryColor = "text-brand-yellow"
}) => {
    return (
        <Link to={`/articles/${slug}`} className="group block w-full h-full">
            <div className="h-full bg-[#1e1e1e]/50 border border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-brand-yellow/30 hover:bg-[#1e1e1e] hover:-translate-y-1 flex flex-col">

                {/* Category Tag */}
                <div className={`text-xs font-bold tracking-wider uppercase mb-3 ${categoryColor}`}>
                    {category}
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors leading-snug">
                    {title}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2 flex-grow">
                    {description}
                </p>

                {/* Bottom Link */}
                <div className="flex items-center gap-2 text-sm font-medium text-white mt-auto">
                    <span>Read Article</span>
                    <ArrowRight size={16} className="text-brand-yellow transform group-hover:translate-x-1 transition-transform" />
                </div>

            </div>
        </Link>
    );
};
