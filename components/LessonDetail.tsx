
import React from 'react';
import _ReactPlayer from 'react-player';
const ReactPlayer = _ReactPlayer as any;
import { Resource } from '../types';
import AudioPlayer from './AudioPlayer';

interface LessonDetailProps {
    resource: Resource;
    onBack: () => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ resource, onBack }) => {
    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header / Back Button */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-stone-200 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-stone-600 hover:text-orange-600 transition-colors font-medium"
                >
                    ← Back to Library
                </button>
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
                                        alt={resource.title}
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
                                        <img src={resource.imagePath} alt={resource.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <h2 className="text-2xl font-bold text-white mb-2">Kirtan Audio</h2>
                                <p className="text-stone-400 mb-8 italic text-sm">Listen and practice this devotional kirtan.</p>

                                <div className="w-full">
                                    <AudioPlayer
                                        url={resource.audioPath || ''}
                                        title={resource.title}
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
                                    <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {resource.category}
                                    </span>
                                </div>

                                <h1 className="text-4xl font-bold text-stone-900 mb-2 leading-tight">
                                    {resource.title}
                                </h1>

                                {resource.authorName && (
                                    <div className="flex items-center gap-2 text-orange-700 font-semibold mb-6">
                                        <span className="text-xl">👤By </span>
                                        <span className="text-lg">{resource.authorName}</span>
                                    </div>
                                )}

                                <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line mb-8">
                                    {resource.description}
                                </p>
                            </div>

                            {/* Lyrics Section */}
                            {(resource.tamilLyrics || resource.englishLyrics) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                    {resource.tamilLyrics && (
                                        <div className="bg-white p-8 rounded-3xl border border-orange-100 shadow-sm">
                                            <h3 className="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2">
                                                🕉️ தமிழ் வரிகள்
                                            </h3>
                                            <p className="text-xl leading-relaxed text-stone-800 whitespace-pre-line font-medium break-words">
                                                {resource.tamilLyrics}
                                            </p>
                                        </div>
                                    )}

                                    {resource.englishLyrics && (
                                        <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 shadow-sm">
                                            <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2">
                                                🙌 English Lyrics
                                            </h3>
                                            <p className="text-lg leading-relaxed text-stone-700 whitespace-pre-line break-words italic">
                                                {resource.englishLyrics}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Sidebar Metadata */}
                        <div className="space-y-6">
                            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                <h3 className="font-bold text-stone-900 mb-4 border-b border-stone-200 pb-2">
                                    Details
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <span className="text-xs text-stone-500 uppercase font-bold block mb-1">Category</span>
                                        <p className="font-medium text-stone-800 capitalize">{resource.category}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-stone-500 uppercase font-bold block mb-1">Last Updated</span>
                                        <p className="font-medium text-stone-800">
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
                                        <span className="text-xs text-stone-500 uppercase font-bold block mb-1">Published On</span>
                                        <p className="font-medium text-stone-800">
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
