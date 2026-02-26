import React, { useState, useMemo } from 'react';
import { Resource, Level } from '../types';
import { Play, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonListProps {
    resources: Resource[];
    onView: (resource: Resource) => void;
}

const LessonList: React.FC<LessonListProps> = ({ resources, onView }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [levelFilter, setLevelFilter] = useState<string>('all');
    const itemsPerPage = 10;

    const levels = ['all', 'beginner', 'intermediate', 'advanced'];

    const filteredResources = useMemo(() => {
        if (levelFilter === 'all') return resources;
        return resources.filter(res => res.level?.toLowerCase() === levelFilter);
    }, [resources, levelFilter]);

    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

    const paginatedResources = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredResources.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredResources, currentPage]);

    const getLevelColor = (level?: string) => {
        if (!level) return 'bg-gray-100 text-gray-800';
        const normalizedLevel = level.toLowerCase();
        if (normalizedLevel === 'beginner') return 'bg-green-100 text-green-800';
        if (normalizedLevel === 'intermediate' || normalizedLevel === 'medium') return 'bg-yellow-100 text-yellow-800';
        if (normalizedLevel === 'advanced') return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    // Reset to page 1 when filter changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [levelFilter, resources]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            {/* Filter Header */}
            <div className="p-4 border-b border-stone-200 bg-stone-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-stone-500" />
                    <span className="text-sm font-medium text-stone-700">Filter by Level:</span>
                    <select
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                        className="text-sm border-stone-200 rounded-lg bg-white px-3 py-1.5 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all cursor-pointer"
                    >
                        {levels.map(level => (
                            <option key={level} value={level}>
                                {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-sm text-stone-500">
                    Showing {filteredResources.length} items
                </div>
            </div>

            {/* List / Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-stone-50 border-b border-stone-200 text-xs uppercase text-stone-500 font-semibold tracking-wider">
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Instrument</th>
                            <th className="px-6 py-4">Level</th>
                            <th className="px-6 py-4 hidden md:table-cell">Raga/Tala</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                        {paginatedResources.length > 0 ? (
                            paginatedResources.map((resource) => (
                                <tr
                                    key={resource.id}
                                    onClick={() => onView(resource)}
                                    className="group hover:bg-orange-50/50 cursor-pointer transition-colors duration-200"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden relative border border-stone-200 shadow-sm">
                                                <img
                                                    src={resource.thumbnailUrl || (resource.referenceUrl?.includes('youtube.com') || resource.referenceUrl?.includes('youtu.be')
                                                        ? `https://img.youtube.com/vi/${resource.referenceUrl.includes('v=') ? resource.referenceUrl.split('v=')[1].split('&')[0] : resource.referenceUrl.split('/').pop()}/hqdefault.jpg`
                                                        : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400')}
                                                    alt={resource.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                    <Play className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md fill-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-stone-900 group-hover:text-orange-700 transition-colors mb-0.5">
                                                    {resource.title}
                                                </div>
                                                <div className="text-xs text-stone-500 line-clamp-1 max-w-md">
                                                    {resource.description}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                                            {resource.instrument || resource.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getLevelColor(resource.level)}`}>
                                            {resource.level || 'Unknown'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        {resource.ragaTala ? (
                                            <div className="flex items-center gap-1.5 text-sm text-stone-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                                                {resource.ragaTala}
                                            </div>
                                        ) : (
                                            <span className="text-stone-400 text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                            <Play className="w-4 h-4 fill-current ml-0.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-3xl mb-3">📿</span>
                                        <p>No lessons match the selected filter.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {
                totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
                        <button
                            onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.max(prev - 1, 1)); }}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={(e) => { e.stopPropagation(); setCurrentPage(i + 1); }}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1
                                        ? 'bg-orange-600 text-white shadow-sm'
                                        : 'text-stone-600 hover:bg-stone-200'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.min(prev + 1, totalPages)); }}
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div >
                )}
        </div >
    );
};

export default LessonList;
