
import React, { useState } from 'react';
import _ReactPlayer from 'react-player';
const ReactPlayer = _ReactPlayer as any;
import { ChevronLeft, ChevronRight, Share2, Check } from 'lucide-react';
import { Resource } from '../types';
import AudioPlayer from './AudioPlayer';
import TranslationsSection from './TranslationsSection';

interface LessonDetailProps {
    resource: Resource;
    onBack: () => void;
    onNext: () => void;
    onPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

const LessonDetail: React.FC<LessonDetailProps> = ({
    resource,
    onBack,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious
}) => {
    const [activeLang, setActiveLang] = useState<string>(
        resource.translations.length > 0
            ? (resource.translations.find(t => t.language_code === 'ta') ? 'ta' : resource.translations[0].language_code)
            : 'en'
    );
    const [showCopied, setShowCopied] = useState(false);

    const activeTranslation = resource.translations.find(t => t.language_code === activeLang) || resource.translations[0];

    const handleShare = async () => {
        const shareData = {
            title: activeTranslation?.title || resource.title,
            text: `Check out this lesson: ${activeTranslation?.title || resource.title}`,
            url: window.location.href,
        };

        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy link:', err);
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-stone-950 relative transition-colors duration-300">
            {/* Header / Back Button */}
            <div className="sticky top-0 z-20 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Library
                </button>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onPrevious}
                        disabled={!hasPrevious}
                        className="p-2 rounded-full border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 hover:text-orange-600 dark:hover:text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Previous Lesson"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={onNext}
                        disabled={!hasNext}
                        className="p-2 rounded-full border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 hover:text-orange-600 dark:hover:text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title="Next Lesson"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto px-6 py-8">

                    {/* Main Media Section */}
                    {resource.videoPath ? (
                        <div className="aspect-video w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl mb-8 relative border border-stone-800">
                            {(ReactPlayer as any) && (
                                <ReactPlayer
                                    url={resource.videoPath || ''}
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                    playing={true}
                                    onEnded={onNext}
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                showinfo: 1,
                                                autoplay: 1
                                            }
                                        } as any
                                    }}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="w-full bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl overflow-hidden shadow-2xl mb-8 relative min-h-[320px] flex items-center justify-center p-8 border border-stone-800">
                            {resource.imagePath ? (
                                <div className="absolute inset-0">
                                    <img
                                        src={resource.imagePath}
                                        alt={activeTranslation?.title || resource.title}
                                        className="w-full h-full object-cover opacity-40 blur-[2px]"
                                    />
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                            ) : (
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-0 -left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl"></div>
                                    <div className="absolute bottom-0 -right-10 w-72 h-72 bg-stone-500/10 rounded-full blur-3xl"></div>
                                </div>
                            )}

                            <div className="relative z-10 w-full max-w-xl text-center">
                                {resource.imagePath && (
                                    <div className="mb-6 inline-flex items-center justify-center w-32 h-32 rounded-2xl overflow-hidden border-2 border-orange-500/50 shadow-[0_0_30px_rgba(234,88,12,0.3)]">
                                        <img src={resource?.imagePath} alt={activeTranslation?.title || resource.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <h2 className="text-2xl font-bold text-white mb-2">{activeTranslation?.title || resource?.title || 'Kirtan Audio'}</h2>
                                <p className="text-stone-400 mb-8 italic text-sm line-clamp-1">
                                    {activeTranslation?.description || resource?.description
                                        ? ((activeTranslation?.description || resource.description).length > 40
                                            ? `${(activeTranslation?.description || resource.description).substring(0, 40)}...`
                                            : (activeTranslation?.description || resource.description))
                                        : 'Listen and practice this devotional kirtan.'}
                                </p>

                                <div className="w-full">
                                    <AudioPlayer
                                        url={resource.audioPath || ''}
                                        title={activeTranslation?.title || resource.title}
                                        onEnded={onNext}
                                        onNext={onNext}
                                        onPrevious={onPrevious}
                                        resource={resource}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Primary Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {resource.category}
                                    </span>
                                </div>

                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
                                        {activeTranslation?.title || resource.title}
                                    </h1>
                                    <button
                                        onClick={handleShare}
                                        className="mt-1 p-2 text-stone-400 dark:text-stone-500 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-full transition-all relative group"
                                        title="Share lesson"
                                    >
                                        {showCopied ? <Check size={24} className="text-green-600" /> : <Share2 size={24} />}
                                        {showCopied && (
                                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-800 dark:bg-stone-700 text-white text-[10px] py-1 px-2 rounded opacity-100 transition-opacity">
                                                Copied!
                                            </span>
                                        )}
                                    </button>
                                </div>

                                {(activeTranslation?.authorName || resource.authorName) && (
                                    <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 font-semibold mb-6">
                                        <span className="text-xl">👤By </span>
                                        <span className="text-lg">{activeTranslation?.authorName || resource.authorName}</span>
                                    </div>
                                )}

                                <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line mb-8">
                                    {activeTranslation?.description || resource.description}
                                </p>
                            </div>

                            <TranslationsSection
                                resource={resource}
                                activeLang={activeLang}
                                setActiveLang={setActiveLang}
                                onShare={handleShare}
                                showCopied={showCopied}
                            />
                        </div>

                        {/* Sidebar Metadata */}
                        <div className="space-y-6">
                            <div className="bg-stone-50 dark:bg-stone-900 p-6 rounded-2xl border border-stone-100 dark:border-stone-800 shadow-sm transition-colors duration-300">
                                <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4 border-b border-stone-200 dark:border-stone-800 pb-2">
                                    Details
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-stone-500 dark:text-stone-400 uppercase font-bold block mb-1">Category</span>
                                        <p className="font-medium text-stone-800 dark:text-stone-200 capitalize">{resource.category}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-stone-500 dark:text-stone-400 uppercase font-bold block mb-1">Last Updated</span>
                                        <p className="font-medium text-stone-800 dark:text-stone-200">
                                            {resource.updated_at
                                                ? new Date(resource.updated_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : 'Recently'}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-stone-500 dark:text-stone-400 uppercase font-bold block mb-1">Published On</span>
                                        <p className="font-medium text-stone-800 dark:text-stone-200">
                                            {resource.created_at
                                                ? new Date(resource.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;
