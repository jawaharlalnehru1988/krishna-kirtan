import React, { useState, useMemo } from 'react';
import { Resource } from '../types';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonListProps {
    resources: Resource[];
    onView: (resource: Resource) => void;
}

const LessonList: React.FC<LessonListProps> = ({ resources, onView }) => {
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
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            {/* Header info */}
            <div className="p-4 border-b border-stone-100 bg-stone-50 flex justify-between items-center px-6">
                <span className="text-sm font-semibold text-stone-700 uppercase tracking-wider">Lesson Name</span>
                <span className="text-sm text-stone-500 font-medium">
                    Showing {resources.length} lessons
                </span>
            </div>

            {/* List */}
            <div className="divide-y divide-stone-100">
                {paginatedResources.length > 0 ? (
                    paginatedResources.map((resource) => (
                        <div
                            key={resource.id}
                            onClick={() => onView(resource)}
                            className="group hover:bg-orange-50/40 p-4 px-6 cursor-pointer transition-all duration-200 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-xl bg-stone-100 flex-shrink-0 overflow-hidden relative border border-stone-200 shadow-sm transition-transform group-hover:scale-105">
                                    <img
                                        src={resource.imagePath || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400'}
                                        alt={resource.title}
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
                                    <div className="font-bold text-stone-900 group-hover:text-orange-700 transition-colors text-lg">
                                        {resource.title}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-orange-600 uppercase tracking-tighter bg-orange-50 px-2 py-0.5 rounded">
                                            {resource.category}
                                        </span>
                                        {resource.authorName && (
                                            <span className="text-xs text-stone-400 font-medium">
                                                👤 {resource.authorName}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-50 text-stone-400 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                                <Play className="w-5 h-5 fill-current ml-0.5" />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="px-6 py-16 text-center text-stone-500">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-4xl mb-4">📿</span>
                            <p className="font-medium text-lg">No lessons match the criteria.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-6 py-5 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between">
                    <button
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.max(prev - 1, 1)); }}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-stone-600 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
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
                                    ? 'bg-stone-800 text-white shadow-md scale-110'
                                    : 'text-stone-500 hover:bg-stone-100'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.min(prev + 1, totalPages)); }}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-stone-600 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95"
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
