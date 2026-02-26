
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Download, Volume2, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
    url: string;
    title?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, title }) => {
    const [playing, setPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [loading, setLoading] = useState(true);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (playing) {
            audio.play().catch(err => {
                console.error("Playback failed:", err);
                setPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, [playing]);

    const handlePlayPause = () => setPlaying(!playing);

    const onTimeUpdate = () => {
        if (!seeking && audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            if (total > 0) {
                setPlayed(current / total);
            }
        }
    };

    const onLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setLoading(false);
        }
    };

    const handleSeekMouseDown = () => {
        setSeeking(true);
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayed(parseFloat(e.target.value));
    };

    const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
        setSeeking(false);
        const value = parseFloat((e.target as HTMLInputElement).value);
        if (audioRef.current && !isNaN(value)) {
            const time = value * audioRef.current.duration;
            audioRef.current.currentTime = time;
            setPlayed(value);
        }
    };

    const formatTime = (seconds: number) => {
        if (typeof seconds !== 'number' || isNaN(seconds)) return '0:00';

        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, '0');
        if (hh) {
            return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = title ? `${title}.m4a` : 'kirtan-lesson.m4a';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            window.open(url, '_blank');
        }
    };

    return (
        <div className="w-full bg-stone-800/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
            {loading && (
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-shimmer"></div>
            )}

            <audio
                ref={audioRef}
                src={url}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={() => setPlaying(false)}
                onWaiting={() => setLoading(true)}
                onPlaying={() => setLoading(false)}
                preload="auto"
            />

            <div className="flex flex-col gap-6">
                {/* Progress Bar Section */}
                <div className="space-y-2">
                    <div className="relative h-2 w-full bg-stone-700 rounded-full cursor-pointer group">
                        <input
                            type="range"
                            min={0}
                            max={0.999999}
                            step="any"
                            value={played || 0}
                            onMouseDown={handleSeekMouseDown}
                            onChange={handleSeekChange}
                            onMouseUp={handleSeekMouseUp}
                            onTouchStart={handleSeekMouseDown}
                            onTouchEnd={(e) => handleSeekMouseUp(e as any)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div
                            className="absolute top-0 left-0 h-full bg-orange-500 rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${(played || 0) * 100}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
                        </div>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-stone-400 uppercase tracking-widest">
                        <span>{formatTime(duration * (played || 0))}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; setPlayed(0); }}
                            className="p-2 text-stone-400 hover:text-white transition-colors"
                            title="Restart"
                        >
                            <RotateCcw size={20} />
                        </button>

                        <button
                            onClick={handlePlayPause}
                            className="w-14 h-14 bg-orange-600 hover:bg-orange-500 text-white rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/20 disabled:opacity-50"
                            disabled={loading && played === 0}
                        >
                            {loading && played === 0 ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : playing ? (
                                <Pause fill="white" size={24} />
                            ) : (
                                <Play fill="white" className="ml-1" size={24} />
                            )}
                        </button>

                        <div className="flex items-center gap-2 group ml-2">
                            <Volume2 size={18} className="text-stone-400" />
                            <div className="w-16 h-1 bg-stone-700 rounded-full relative overflow-hidden">
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step="any"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div
                                    className="absolute top-0 left-0 h-full bg-stone-400"
                                    style={{ width: `${volume * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full text-sm font-semibold transition-all border border-white/10 group"
                    >
                        <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        <span>Download</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
