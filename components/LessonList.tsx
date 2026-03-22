import React, { useState, useMemo } from 'react';
import { Resource, NavItem } from '../types';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonListProps {
    resources: Resource[];
    onView: (resource: Resource) => void;
    selectedLanguage: string;
    navItems: NavItem[];
}

const LessonList: React.FC<LessonListProps> = ({ resources, onView, selectedLanguage, navItems }) => {
    const getTranslation = (resource: Resource, lang: string) => {
        return resource.translations.find(t => t.language_code === lang) || 
               resource.translations.find(t => t.language_code === 'ta') || 
               resource.translations[0];
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(resources.length / itemsPerPage);

    const paginatedResources = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return resources.slice(startIndex, startIndex + itemsPerPage);
    }, [resources, currentPage]);

    // Reset to page 1 when resources change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [resources]);

    return (
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden transition-colors duration-300">
            {/* Header info */}
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex justify-between items-center px-6">
                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Audio List</span>
                <span className="text-sm text-stone-500 dark:text-stone-400 font-medium">
                    Showing {resources.length} Kirtans
                </span>
            </div>

            {/* List */}
            <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {paginatedResources.length > 0 ? (
                    paginatedResources.map((resource) => (
                        <div
                            key={resource.id}
                            onClick={() => onView(resource)}
                            className="group hover:bg-orange-50/40 dark:hover:bg-orange-950/20 p-4 px-6 cursor-pointer transition-all duration-200 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-xl bg-stone-100 dark:bg-stone-800 flex-shrink-0 overflow-hidden relative border border-stone-200 dark:border-stone-700 shadow-sm transition-transform group-hover:scale-105">
                                    <img
                                        src={resource.imagePath || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400'}
                                        alt={getTranslation(resource, selectedLanguage)?.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                        <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md fill-white" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors text-lg line-clamp-1">
                                        {getTranslation(resource, selectedLanguage)?.title}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-tighter bg-orange-50 dark:bg-orange-950/40 px-2 py-0.5 rounded">
                                            {navItems.find(item => item.id.toLowerCase() === resource.category.toLowerCase())?.label || resource.category}
                                        </span>
                                        {getTranslation(resource, selectedLanguage)?.authorName && (
                                            <span className="text-xs text-stone-400 dark:text-stone-500 font-medium">
                                                👤 {getTranslation(resource, selectedLanguage)?.authorName}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-800 text-stone-400 dark:text-stone-500 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-16 text-center text-stone-500 dark:text-stone-400">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl mb-4">📿</span>
                            <p className="font-medium text-lg">No lessons match the criteria.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-6 py-5 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/50 flex items-center justify-between">
                    <button
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.max(prev - 1, 1)); }}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Prev
                    </button>

                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrentPage(i + 1); }}
                                className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${currentPage === i + 1
                                    ? 'bg-stone-800 dark:bg-orange-600 text-white shadow-md scale-110'
                                    : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.min(prev + 1, totalPages)); }}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default LessonList;
