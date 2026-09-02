import React, { useState, useMemo } from 'react';
import { Resource, NavItem } from '../types';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTranslation as getUiTranslation } from '../lib/translations';

interface LessonListProps {
    resources: Resource[];
    onView: (resource: Resource) => void;
    selectedLanguage: string;
    navItems: NavItem[];
}

const LessonList: React.FC<LessonListProps> = ({ resources, onView, selectedLanguage, navItems }) => {
    const tUi = getUiTranslation(selectedLanguage);
    const getTranslation = (resource: Resource, lang: string) => {
        if (!resource) return null;
        const translations = resource.translations;
        if (Array.isArray(translations) && translations.length > 0) {
            return translations.find(t => t?.language_code === lang) || 
                   translations.find(t => t?.language_code === 'ta') || 
                   translations[0] || null;
        }
        return {
            title: resource.title || `Kirtan ${resource.id}`,
            authorName: resource.authorName || '',
            description: resource.description || '',
            lyrics: resource.englishLyrics || resource.tamilLyrics || '',
        };
    };
    const getAuthorName = (resource: Resource, lang: string): string => {
        if (!resource) return 'Traditional';
        const translations = resource.translations;
        if (Array.isArray(translations) && translations.length > 0) {
            const match = translations.find(t => t?.language_code === lang);
            if (match && match.authorName && match.authorName.trim()) {
                return match.authorName.trim();
            }
            const anyAuth = translations.find(t => t?.authorName && t.authorName.trim());
            if (anyAuth) return anyAuth.authorName.trim();
        }
        return resource.authorName?.trim() || 'Traditional';
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
    const itemsPerPage = 25;

    // Reset author filter & page when category/resources change
    React.useEffect(() => {
        setSelectedAuthor('all');
        setCurrentPage(1);
    }, [resources]);

    // Extract unique non-empty authors from resources
    const authors = useMemo(() => {
        const set = new Set<string>();
        resources.forEach(resource => {
            const author = getAuthorName(resource, selectedLanguage);
            if (author) set.add(author);
        });
        return Array.from(set).sort();
    }, [resources, selectedLanguage]);

    // Filter resources by selected author
    const filteredResources = useMemo(() => {
        if (!selectedAuthor || selectedAuthor === 'all') return resources;
        return resources.filter(resource => {
            const author = getAuthorName(resource, selectedLanguage);
            return author === selectedAuthor;
        });
    }, [resources, selectedAuthor, selectedLanguage]);

    const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

    const paginatedResources = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredResources.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredResources, currentPage]);

    return (
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden transition-colors duration-300">
            {/* Header info & Author Filter */}
            <div className="p-4 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">{tUi.nav.exploreSongs}</span>
                    <span className="text-sm text-stone-500 dark:text-stone-400 font-medium">
                        ({filteredResources.length})
                    </span>
                </div>

                {/* Author Filter Dropdown - Always visible */}
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center gap-1">
                        👤 {tUi.nav.author}:
                    </span>
                    <select
                        value={selectedAuthor}
                        onChange={(e) => {
                            setSelectedAuthor(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all shadow-sm cursor-pointer min-w-[180px]"
                    >
                        <option value="all">
                            {selectedLanguage === 'ta' ? 'அனைத்து ஆசிரியர்கள்' : selectedLanguage === 'hi' ? 'सभी रचयिता' : selectedLanguage === 'kn' ? 'ಎಲ್ಲಾ ರಚನೆಕಾರರು' : selectedLanguage === 'ml' ? 'എല്ലാ രചയിതാക്കളും' : selectedLanguage === 'bn' ? 'সকল রচয়িতা' : selectedLanguage === 'te' ? 'అందరు రచయితలు' : 'All Authors'} ({resources.length})
                        </option>
                        {authors.map((author) => {
                            const count = resources.filter(r => getAuthorName(r, selectedLanguage) === author).length;
                            return (
                                <option key={author} value={author}>
                                    {author} ({count})
                                </option>
                            );
                        })}
                    </select>
                </div>
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
                                        src={resource.imagePath || navItems.find(item => item?.id?.toLowerCase() === (resource.category || '').toLowerCase())?.image || '/lord caitanya.jpeg'}
                                        alt={getTranslation(resource, selectedLanguage)?.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/lord caitanya.jpeg';
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
                                            {navItems.find(item => item?.id?.toLowerCase() === (resource.category || '').toLowerCase())?.label || resource.category || ''}
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
