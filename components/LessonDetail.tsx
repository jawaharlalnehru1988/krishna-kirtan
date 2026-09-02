
import React, { useState } from 'react';
import _ReactPlayer from 'react-player';
const ReactPlayer = _ReactPlayer as any;
import { ChevronLeft, ChevronRight, Share2, Check, FileDown } from 'lucide-react';
import { Resource, NavItem } from '../types';
import AudioPlayer from './AudioPlayer';
import TranslationsSection from './TranslationsSection';
import { generatePdf } from '../utils/pdfExport';
import { getTranslation } from '../lib/translations';

interface LessonDetailProps {
    resource: Resource;
    onBack: () => void;
    onNext: () => void;
    onPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
    isPlaying: boolean;
    setIsPlaying: (playing: boolean) => void;
    selectedLanguage: string;
    navItems: NavItem[];
}

const LessonDetail: React.FC<LessonDetailProps> = ({
    resource,
    onBack,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
    isPlaying,
    setIsPlaying,
    selectedLanguage,
    navItems
}) => {
    const t = getTranslation(selectedLanguage);
    const [activeLang, setActiveLang] = useState<string>(selectedLanguage);
    const [showCopied, setShowCopied] = useState(false);
    const translations = resource?.translations || [];
    const activeTranslation = translations.find(t => t?.language_code === activeLang) || translations[0] || {
        title: resource?.title || '',
        authorName: resource?.authorName || '',
        description: resource?.description || '',
        lyrics: resource?.englishLyrics || resource?.tamilLyrics || '',
    };

    // Sync activeLang with selectedLanguage if user hasn't manually switched in this view
    React.useEffect(() => {
        if (translations.some(t => t?.language_code === selectedLanguage)) {
            setActiveLang(selectedLanguage);
        }
    }, [selectedLanguage, resource, translations]);

    // Update document metadata for social sharing previews
    React.useEffect(() => {
        const title = activeTranslation?.title || resource?.title || '';
        const description = activeTranslation?.description || resource?.description || 'Discover divine kirtans, lyrics, and translations.';
        const categoryItem = navItems.find(item => item?.id?.toLowerCase() === (resource?.category || '').toLowerCase());
        const rawImagePath = resource.imagePath || categoryItem?.image;
        const imageUrl = rawImagePath 
            ? (rawImagePath.startsWith('http') ? rawImagePath : window.location.origin + rawImagePath) 
            : `${window.location.origin}/lord caitanya.jpeg`;

        document.title = `${title} | Sri Krishna Kirtan`;

        // Helper to update or create meta tags
        const updateMeta = (property: string, content: string, attr: 'property' | 'name' = 'property') => {
            let element = document.querySelector(`meta[${attr}="${property}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, property);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        updateMeta('og:title', title);
        updateMeta('og:description', description);
        updateMeta('og:image', imageUrl);
        updateMeta('og:url', window.location.href);
        updateMeta('twitter:title', title, 'name');
        updateMeta('twitter:description', description, 'name');
        updateMeta('twitter:image', imageUrl, 'name');
    }, [resource, activeTranslation]);

    const handleShare = async () => {
        const title = activeTranslation?.title || resource.title;
        const text = `Check out this lesson: ${title}`;
        const url = window.location.href;
        
        const shareData: any = {
            title,
            text,
            url,
        };

        // Attempt to include image file for better WhatsApp/Social previews if supported
        if (resource?.imagePath && navigator.canShare) {
            try {
                const rawImagePath = resource.imagePath || navItems.find(item => (item?.id || '').toString().toLowerCase() === (resource?.category || '').toString().toLowerCase())?.image;
                const imageUrl = (rawImagePath && rawImagePath.startsWith('http')) 
                    ? rawImagePath 
                    : window.location.origin + (rawImagePath || '/lord caitanya.jpeg');
                
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                const file = new File([blob], 'lesson-thumbnail.jpg', { type: blob.type });
                
                if (navigator.canShare({ files: [file] })) {
                    shareData.files = [file];
                }
            } catch (err) {
                console.warn('Metadata: Image fetch for share failed (likely CORS). Falling back to URL-only share.', err);
            }
        }

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
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
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> {t.nav.backToLibrary}
                </button>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onPrevious}
                        disabled={!hasPrevious}
                        className="p-2 rounded-full border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 hover:text-orange-600 dark:hover:text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title={t.nav.previousLesson}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={onNext}
                        disabled={!hasNext}
                        className="p-2 rounded-full border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 hover:text-orange-600 dark:hover:text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        title={t.nav.nextLesson}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto px-6 py-8">

                    {/* Main Media Section */}
                    {(() => {
                        const categoryItem = navItems.find(item => (item?.id || '').toString().toLowerCase() === (resource?.category || '').toString().toLowerCase());
                        const displayImage = resource?.imagePath || categoryItem?.image;
                        
                        if (resource.videoPath) {
                            return (
                                <div className="aspect-video w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl mb-8 relative border border-stone-800">
                                    {(ReactPlayer as any) && (
                                        <ReactPlayer
                                            url={resource.videoPath || ''}
                                            width="100%"
                                            height="100%"
                                            controls={true}
                                            playing={isPlaying}
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
                            );
                        }

                        return (
                            <div className="w-full bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl overflow-hidden shadow-2xl mb-8 relative min-h-[320px] flex items-center justify-center p-8 border border-stone-800">
                                {displayImage ? (
                                    <div className="absolute inset-0">
                                        <img
                                            src={displayImage}
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
                                    {displayImage && (
                                        <div className="mb-6 inline-flex items-center justify-center w-40 h-40 rounded-2xl overflow-hidden border-2 border-orange-500/50 shadow-[0_0_30px_rgba(234,88,12,0.3)] bg-stone-800">
                                            <img src={displayImage} alt={activeTranslation?.title || resource.title} className="w-full h-full object-cover" />
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
                                            playing={isPlaying}
                                            setPlaying={setIsPlaying}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Primary Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {navItems.find(item => (item?.id || '').toString().toLowerCase() === (resource?.category || '').toString().toLowerCase())?.label || resource?.category}
                                    </span>
                                </div>

                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
                                        {activeTranslation?.title || resource.title}
                                    </h1>
                                    <button
                                        onClick={handleShare}
                                        className="mt-1 p-2 text-stone-400 dark:text-stone-500 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-full transition-all relative group"
                                        title="Share Lyrics"
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
                                        <span className="text-xl">👤 </span>
                                        <span className="text-lg">{activeTranslation?.authorName || resource.authorName}</span>
                                    </div>
                                )}

                                <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line mb-8">
                                    {activeTranslation?.description || resource.description}
                                </p>

                                {/* Action Buttons - Moved to top near title as requested */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                    <button
                                        onClick={() => {
                                            const fileName = resource.title.replace(/\s+/g, '_').toLowerCase();
                                            generatePdf('pdf-export-content', fileName);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-4 py-5 px-8 bg-orange-100/50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-900 dark:text-orange-400 rounded-[1.5rem] font-bold transition-all duration-300 group border border-orange-200 dark:border-orange-800/40 hover:shadow-lg hover:scale-[1.01]"
                                    >
                                        <FileDown size={22} className="group-hover:-translate-y-1 transition-transform duration-300" />
                                        <span className="text-lg">{t.nav.downloadPdf}</span>
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="flex-1 flex items-center justify-center gap-4 py-5 px-8 bg-stone-100/50 dark:bg-stone-900/20 hover:bg-stone-100 dark:hover:bg-stone-900/40 text-stone-900 dark:text-stone-400 rounded-[1.5rem] font-bold transition-all duration-300 group border border-stone-200 dark:border-stone-800/40 hover:shadow-lg hover:scale-[1.01]"
                                    >
                                        <Share2 size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                                        <span className="text-lg">
                                            {showCopied ? t.nav.copied : t.nav.share}
                                        </span>
                                    </button>
                                </div>
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
                                        <p className="font-medium text-stone-800 dark:text-stone-200 capitalize">
                                            {navItems.find(item => (item?.id || '').toString().toLowerCase() === (resource?.category || '').toString().toLowerCase())?.label || resource?.category}
                                        </p>
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
