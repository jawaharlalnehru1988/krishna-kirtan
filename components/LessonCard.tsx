
import React from 'react';
import { Resource, Level } from '../types';

interface LessonCardProps {
  resource: Resource;
  onView: (resource: Resource) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ resource, onView }) => {
  const getLevelColor = (level: Level | string) => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel === 'beginner') return 'bg-green-100 text-green-800';
    if (normalizedLevel === 'intermediate' || normalizedLevel === 'medium') return 'bg-yellow-100 text-yellow-800';
    if (normalizedLevel === 'advanced') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onView(resource)}>
        <img
          src={resource.thumbnailUrl || (resource.referenceUrl?.includes('youtube.com') || resource.referenceUrl?.includes('youtu.be')
            ? `https://img.youtube.com/vi/${resource.referenceUrl.includes('v=') ? resource.referenceUrl.split('v=')[1].split('&')[0] : resource.referenceUrl.split('/').pop()}/hqdefault.jpg`
            : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400')}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback if youtube thumbnail fails or URL is different format
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getLevelColor(resource.level)}`}>
            {resource.level}
          </span>
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
            <span className="ml-1 text-stone-900 text-xl">▶</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-stone-800 leading-tight cursor-pointer hover:text-orange-700 transition-colors" onClick={() => onView(resource)}>
            {resource.title}
          </h3>
          <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded">
            {resource.instrument || resource.category}
          </span>
        </div>

        <p className="text-stone-600 text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>

        {resource.mantra && (
          <div className="mb-4 p-2 bg-orange-50 rounded border border-orange-100 italic text-sm text-orange-900 font-mono">
            {resource.mantra}
          </div>
        )}

        {resource.ragaTala && (
          <div className="flex items-center gap-2 text-xs font-medium text-stone-500 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
            {resource.ragaTala}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onView(resource)}
            className="flex-1 bg-stone-800 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-stone-900 transition-colors"
          >
            Watch Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;

