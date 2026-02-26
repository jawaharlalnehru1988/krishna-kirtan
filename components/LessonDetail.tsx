
import React from 'react';
import ReactPlayer from 'react-player';
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
                <div className="text-sm text-stone-400 font-mono">
                    ID: {resource.id}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto px-6 py-8">

                    {/* Main Media Section */}
                    {resource.videoPath ? (
                        <div className="aspect-video w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl mb-8 relative border border-stone-800">
                            <ReactPlayer
                                src={resource.videoPath}
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
                        </div>
                    ) : (
                        <div className="w-full bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl overflow-hidden shadow-2xl mb-8 relative min-h-[320px] flex items-center justify-center p-8 border border-stone-800">
                            <div className="absolute inset-0 opacity-30">
                                <div className="absolute top-0 -left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 -right-10 w-72 h-72 bg-stone-500/10 rounded-full blur-3xl"></div>
                            </div>

                            <div className="relative z-10 w-full max-w-xl text-center">
                                <div className="mb-6 inline-flex items-center justify-center w-24 h-24 bg-orange-600/10 rounded-full border border-orange-500/30 text-orange-500 text-5xl animate-pulse shadow-[0_0_30px_rgba(234,88,12,0.2)]">
                                    {resource.instrument?.toLowerCase().includes('mridanga') ? '🥁' :
                                        resource.instrument?.toLowerCase().includes('harmonium') ? '🎹' :
                                            resource.instrument?.toLowerCase().includes('karatal') ? '🔔' : '🎵'}
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">Audio Lesson</h2>
                                <p className="text-stone-400 mb-8 italic text-sm">Follow the rhythm and practice along with this high-quality recording.</p>

                                <div className="w-full">
                                    <AudioPlayer
                                        url={resource.audioPath || resource.referenceUrl}
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
                                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {resource.level}
                                    </span>
                                    <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                        {resource.instrument}
                                    </span>
                                </div>

                                <h1 className="text-4xl font-bold text-stone-900 mb-4 leading-tight">
                                    {resource.title}
                                </h1>

                                <p className="text-lg text-stone-600 leading-relaxed whitespace-pre-line">
                                    {resource.description}
                                </p>
                            </div>

                            {resource.mantra && (
                                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
                                    <h3 className="text-orange-900 font-bold mb-2 flex items-center gap-2">
                                        📜 Mantra / Beat Swara
                                    </h3>
                                    <p className="text-xl font-mono text-orange-800 font-medium">
                                        {resource.mantra}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Metadata */}
                        <div className="space-y-6">
                            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                <h3 className="font-bold text-stone-900 mb-4 border-b border-stone-200 pb-2">
                                    Lesson Details
                                </h3>

                                <div className="space-y-4">
                                    {resource.ragaTala && (
                                        <div>
                                            <span className="text-xs text-stone-500 uppercase font-bold block mb-1">Raga / Tala</span>
                                            <p className="font-medium text-stone-800">{resource.ragaTala}</p>
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-xs text-stone-500 uppercase font-bold block mb-1">Category</span>
                                        <p className="font-medium text-stone-800 capitalize">{resource.category}</p>
                                    </div>

                                    <div>
                                        <span className="text-xs text-stone-500 uppercase font-bold block mb-1">Last Updated</span>
                                        <p className="font-medium text-stone-800">
                                            {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-2xl text-white">
                                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                                <p className="text-stone-300 text-sm mb-4">
                                    Practice this lesson slowly. Focus on clarity before speed.
                                </p>
                                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors">
                                    View Related Lessons
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonDetail;
