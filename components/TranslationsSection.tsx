import React from 'react';
import { Share2, FileDown, Check } from 'lucide-react';
import { Resource } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { generatePdf } from '../utils/pdfExport';

export const LANGUAGE_LABELS: Record<string, { label: string; emoji: string }> = {
    en: { label: 'English', emoji: '🇺🇸' },
    ta: { label: 'தமிழ்', emoji: '🕉️' },
    hi: { label: 'हिंदी', emoji: '🚩' },
    kn: { label: 'ಕನ್ನಡ', emoji: '🕉️' },
    ml: { label: 'മലയാളം', emoji: '🕉️' },
    bn: { label: 'বাংলা', emoji: '🕉️' },
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
                        {(LANGUAGE_LABELS[activeLang] || { label: activeLang }).label}
                    </h3>

                    <div className="markdown-content prose dark:prose-invert max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkBreaks]}
                            components={{
                                p: ({ children }) => {
                                    // If children is empty or only whitespace, don't render an empty paragraph
                                    if (React.Children.count(children) === 0) return null;
                                    return (
                                        <p className="text-base md:text-lg leading-relaxed text-stone-800 dark:text-stone-300 font-medium break-words mb-6 last:mb-0">
                                            {children}
                                        </p>
                                    );
                                },
                                h1: ({ children }) => (
                                    <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 mt-10 pb-3 border-b-2 border-orange-100 dark:border-stone-800 font-playfair first:mt-0">
                                        {children}
                                    </h4>
                                ),
                                h2: ({ children }) => (
                                    <h5 className="text-xl font-bold text-orange-900 dark:text-orange-300 mb-5 mt-8 flex items-center gap-3 font-playfair bg-orange-50/50 dark:bg-stone-800/30 p-3 rounded-xl border-l-4 border-orange-500">
                                        {children}
                                    </h5>
                                ),
                                h3: ({ children }) => (
                                    <h6 className="text-lg font-bold text-orange-800 dark:text-orange-400 mb-3 mt-6 font-playfair flex items-center gap-2">
                                         {children}
                                    </h6>
                                ),
                                h4: ({ children }) => (
                                    <h6 className="text-base font-bold text-stone-700 dark:text-stone-300 mb-2 mt-4 font-playfair">
                                        {children}
                                    </h6>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-[8px] border-orange-400/30 dark:border-orange-900/40 pl-6 py-6 my-8 bg-orange-50/20 dark:bg-stone-900/40 rounded-r-2xl text-base md:text-lg leading-loose italic text-stone-700 dark:text-stone-200 font-serif relative transition-all hover:bg-orange-50/30 dark:hover:bg-stone-900/60 shadow-inner">
                                        <span className="absolute -top-3 -left-1 text-4xl text-orange-200/50 dark:text-orange-900/20 font-serif select-none">"</span>
                                        {children}
                                    </blockquote>
                                ),
                                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-stone-700 dark:text-stone-400">{children}</ul>,
                                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-base text-stone-700 dark:text-stone-400">{children}</ol>,
                                li: ({ children }) => <li className="pl-2">{children}</li>,
                                strong: ({ children }) => <strong className="font-extrabold text-orange-950 dark:text-orange-400">{children}</strong>,
                                em: ({ children }) => <em className="italic text-stone-600 dark:text-stone-500 font-serif">{children}</em>,
                                hr: () => <hr className="my-10 border-t-2 border-dashed border-orange-100 dark:border-stone-800" />,
                            }}
                        >
                            {(() => {
                                // 1. Initial cleanup: replace literal \n strings and normalize all line endings to LF
                                let lyrics = (activeTranslation?.lyrics || '')
                                    .replace(/\\n/g, '\n')
                                    .replace(/\r\n/g, '\n')
                                    .replace(/\r/g, '\n');

                                // 2. Aggressive Unicode Sanitization
                                // This handles invisible characters and non-standard symbols that break markdown parsers
                                lyrics = lyrics
                                    .replace(/\uFEFF/g, '')     // Remove Byte Order Mark (BOM)
                                    .replace(/\u200B/g, '')     // Remove Zero-Width Space
                                    .replace(/\u00A0/g, ' ')    // Replace Non-Breaking Space with regular space
                                    .replace(/\uFF03/g, '#')    // Replace Full-width Hash (＃) with standard hash
                                    .replace(/\uFF1E/g, '>');   // Replace Full-width Quote (＞) with standard quote

                                // 3. Robust cleaning: Trim each line to prevent accidental indentation-based 
                                // markdown code blocks (which often causes raw markdown tags to be displayed)
                                lyrics = lyrics.split('\n').map(line => line.trim()).join('\n');

                                // 4. Reliability: Ensure a blank line exists before headers, rules, and blockquotes
                                // and explicitly force them to the start of the line.
                                lyrics = lyrics
                                    .replace(/\n(#{1,6}\s|---|--|==|>)/g, '\n\n$1')
                                    .trim();

                                // 5. DEBUG: Log the result for inspection in browser console
                                console.log("DEBUG [Markdown Fix]:", JSON.stringify(lyrics));

                                return lyrics;
                            })()}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {/* Hidden PDF Template (Rendered off-screen for capturing) */}
            <div 
                id="pdf-export-content" 
                style={{ 
                    position: 'absolute', 
                    left: '-9999px', 
                    top: 0, 
                    width: '800px', 
                    backgroundColor: 'white',
                    color: '#000',
                }}
                className="p-16"
            >
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-orange-900 mb-2">{resource.title}</h1>
                    <div className="h-1 w-24 bg-orange-300 mx-auto"></div>
                </div>

                <div className="pdf-markdown-content prose max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkBreaks]}
                        components={{
                            p: ({ children }) => {
                                if (React.Children.count(children) === 0) return null;
                                return (
                                    <p className="text-base leading-relaxed text-stone-800 font-medium mb-4 text-center">
                                        {children}
                                    </p>
                                );
                            },
                            h1: ({ children }) => (
                                <h1 className="text-2xl font-bold text-orange-900 mb-6 mt-8 pb-3 border-b-2 border-orange-100 text-center">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-xl font-bold text-orange-800 mb-4 mt-6 p-3 bg-orange-50 rounded-xl border-l-4 border-orange-500">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-lg font-bold text-orange-700 mb-3 mt-6 text-center">
                                     {children}
                                </h3>
                            ),
                            blockquote: ({ children }) => (
                                <div className="my-6 py-4 px-8 border-y border-stone-100 bg-stone-50/30 font-serif italic text-lg leading-relaxed text-stone-700 text-center">
                                    {children}
                                </div>
                            ),
                            hr: () => <hr className="my-10 border-t-2 border-dashed border-orange-100" />,
                        }}
                    >
                        {(() => {
                            let lyrics = (activeTranslation?.lyrics || '')
                                .replace(/\\n/g, '\n')
                                .replace(/\r\n/g, '\n')
                                .replace(/\r/g, '\n');
                            lyrics = lyrics
                                .replace(/\uFEFF/g, '')
                                .replace(/\u200B/g, '')
                                .replace(/\u00A0/g, ' ')
                                .replace(/\uFF03/g, '#')
                                .replace(/\uFF1E/g, '>');
                            lyrics = lyrics.split('\n').map(line => line.trim()).join('\n');
                            lyrics = lyrics
                                .replace(/\n(#{1,6}\s|---|--|==|>)/g, '\n\n$1')
                                .trim();
                            return lyrics;
                        })()}
                    </ReactMarkdown>
                </div>

                <div className="mt-20 pt-8 border-t border-stone-100 text-center text-stone-400 text-sm italic">
                    Downloaded from Sri Kirtan Academy
                </div>
            </div>
        </div>
    );
};

export default TranslationsSection;
