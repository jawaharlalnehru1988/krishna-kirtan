
import React from 'react';
import { Resource } from '../types';

interface LessonCardProps {
  resource: Resource;
  onView: (resource: Resource) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ resource, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => onView(resource)}>
        <img
          src={resource.imagePath || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400'}
          alt={resource.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400';
          }}
        />

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
            {resource.category}
          </span>
        </div>

        {resource.authorName && (
          <div className="text-xs text-orange-600 font-semibold mb-3 flex items-center gap-1">
            <span>👤</span> {resource.authorName}
          </div>
        )}

        <p className="text-stone-600 text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onView(resource)}
            className="flex-1 bg-stone-800 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-stone-900 transition-colors"
          >
            Explore Kirtan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
