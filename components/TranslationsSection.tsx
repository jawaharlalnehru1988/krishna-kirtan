import React from 'react';
import { Share2, Check } from 'lucide-react';
import { Resource } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

export const LANGUAGE_LABELS: Record<string, { label: string; emoji: string }> = {
    en: { label: 'English', emoji: '🇺🇸' },
    ta: { label: 'தமிழ்', emoji: '🕉️' },
    hi: { label: 'हिंदी', emoji: '🚩' },
    kn: { label: 'ಕನ್ನಡ', emoji: '🕉️' },
    te: { label: 'తెలుగు', emoji: '🕉️' },
};

interface TranslationsSectionProps {
    resource: Resource;
    activeLang: string;
    setActiveLang: (lang: string) => void;
    onShare: () => void;
    showCopied: boolean;
}

const TranslationsSection: React.FC<TranslationsSectionProps> = ({
    resource,
    activeLang,
    setActiveLang,
    onShare,
    showCopied
}) => {
    const activeTranslation = resource.translations.find(t => t.language_code === activeLang) || resource.translations[0];

    if (resource.translations.length === 0) return null;

    return (
        <div className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Language Selector Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-stone-100 dark:bg-stone-900/50 rounded-2xl w-fit border border-stone-200 dark:border-stone-800 transition-all duration-300">
                {resource.translations.map((translation) => {
                    const langInfo = LANGUAGE_LABELS[translation.language_code] || { label: translation.language_code, emoji: '🕉️' };
                    const isActive = activeLang === translation.language_code;
                    return (
                        <button
                            key={translation.language_code}
                            onClick={() => setActiveLang(translation.language_code)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isActive
                                ? 'bg-white dark:bg-stone-800 text-orange-800 dark:text-orange-400 shadow-md scale-[1.02]'
                                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-white/50 dark:hover:bg-stone-800/30'
                                }`}
                        >
                            <span>{langInfo.emoji}</span>
                            <span>{langInfo.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Lyrics Content Area */}
            {activeTranslation?.lyrics && (
                <div className="bg-white dark:bg-stone-900/40 p-6 sm:p-10 md:p-12 rounded-[2rem] border border-orange-100 dark:border-stone-800 shadow-sm transition-all duration-300 relative overflow-hidden group">
                    {/* Decorative element for dark mode */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-orange-950 dark:text-orange-400 mb-8 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-sm">
                            {(LANGUAGE_LABELS[activeLang] || { emoji: '🕉️' }).emoji}
                        </span>
                        {(LANGUAGE_LABELS[activeLang] || { label: activeLang }).label} Lyrics
                    </h3>

                    <div className="markdown-content">
                        <ReactMarkdown
                            remarkPlugins={[remarkBreaks]}
                            components={{
                                p: ({ children }) => (
                                    <p className="text-xl md:text-2xl leading-relaxed text-stone-800 dark:text-stone-300 font-medium break-words mb-6 last:mb-0">
                                        {children}
                                    </p>
                                ),
                                h1: ({ children }) => (
                                    <h4 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-6 mt-10 shadow-sm border-b-2 border-orange-100 dark:border-stone-800 pb-3 first:mt-0 font-playfair">
                                        {children}
                                    </h4>
                                ),
                                h2: ({ children }) => (
                                    <h5 className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-5 mt-8 flex items-center gap-3 font-playfair">
                                        <span className="text-orange-600 dark:text-orange-500">✨</span> {children}
                                    </h5>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-8 border-orange-300 dark:border-orange-900/50 pl-8 py-6 my-8 italic text-stone-700 dark:text-stone-300 bg-orange-50/30 dark:bg-stone-900/50 rounded-r-[2rem] text-xl md:text-2xl leading-relaxed font-serif shadow-inner">
                                        {children}
                                    </blockquote>
                                ),
                                ul: ({ children }) => <ul className="list-disc pl-8 mb-6 space-y-3 text-lg text-stone-700 dark:text-stone-400">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-8 mb-6 space-y-3 text-lg text-stone-700 dark:text-stone-400">{children}</ol>,
                                li: ({ children }) => <li className="pl-2">{children}</li>,
                                strong: ({ children }) => <strong className="font-extrabold text-orange-950 dark:text-orange-400">{children}</strong>,
                                em: ({ children }) => <em className="italic text-stone-600 dark:text-stone-500 font-serif">{children}</em>,
                                hr: () => <hr className="my-10 border-t-2 border-dashed border-orange-100 dark:border-stone-800" />,
                            }}
                        >
                            {activeTranslation.lyrics}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {/* Bottom Share Section */}
            <div className="pt-8 border-t border-stone-100 dark:border-stone-800 group/share">
                <button
                    onClick={onShare}
                    className="w-full flex items-center justify-center gap-4 py-5 px-8 bg-orange-100/50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-900 dark:text-orange-400 rounded-[1.5rem] font-bold transition-all duration-300 group border border-orange-200 dark:border-orange-800/40 hover:shadow-lg hover:scale-[1.01]"
                >
                    <Share2 size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-lg">
                        {showCopied ? 'Link Copied to Clipboard!' : 'Share this Lesson with Others'}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default TranslationsSection;
