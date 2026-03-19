import React from 'react';
import { Share2 } from 'lucide-react';
import { Resource } from '../types';
import ReactMarkdown from 'react-markdown';

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
        <div className="mt-12">
            <div className="flex flex-wrap gap-2 p-1 bg-stone-100 rounded-2xl mb-6 w-fit border border-stone-200">
                {resource.translations.map((translation) => {
                    const langInfo = LANGUAGE_LABELS[translation.language_code] || { label: translation.language_code, emoji: '🕉️' };
                    return (
                        <button
                            key={translation.language_code}
                            onClick={() => setActiveLang(translation.language_code)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${activeLang === translation.language_code
                                ? 'bg-white text-orange-800 shadow-sm'
                                : 'text-stone-500 hover:text-stone-800'
                                }`}
                        >
                            {langInfo.emoji} {langInfo.label}
                        </button>
                    );
                })}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTranslation?.lyrics && (
                    <div className="bg-white p-4 sm:p-8 md:p-10 rounded-3xl border border-orange-100 shadow-sm">
                        <h3 className="text-xl sm:text-2xl font-bold text-orange-900 mb-4 sm:mb-6 flex items-center gap-2">
                            {(LANGUAGE_LABELS[activeLang] || { emoji: '🕉️' }).emoji} {(LANGUAGE_LABELS[activeLang] || { label: activeLang }).label} Lyrics
                        </h3>
                        <div className="markdown-content">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => (
                                        <p className="text-xl md:text-2xl leading-relaxed text-stone-800 font-medium break-words mb-4 last:mb-0">
                                            {children}
                                        </p>
                                    ),
                                    h1: ({ children }) => <h4 className="text-2xl font-bold text-stone-900 mb-4 mt-6 first:mt-0">{children}</h4>,
                                    h2: ({ children }) => <h5 className="text-xl font-bold text-stone-800 mb-3 mt-5">{children}</h5>,
                                    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-lg text-stone-700">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-lg text-stone-700">{children}</ol>,
                                    li: ({ children }) => <li className="mb-1">{children}</li>,
                                    strong: ({ children }) => <strong className="font-bold text-orange-950">{children}</strong>,
                                    em: ({ children }) => <em className="italic text-stone-600">{children}</em>,
                                }}
                            >
                                {activeTranslation.lyrics}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Share Button */}
            <div className="mt-8 pt-8 border-t border-stone-100">
                <button
                    onClick={onShare}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-orange-50 hover:bg-orange-100 text-orange-900 rounded-2xl font-bold transition-all group"
                >
                    <Share2 size={20} className="group-hover:scale-110 transition-transform" />
                    {showCopied ? 'Link Copied to Clipboard!' : 'Share this Lesson with Others'}
                </button>
            </div>
        </div>
    );
};

export default TranslationsSection;
