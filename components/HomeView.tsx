import React from 'react';
import { Category, NavItem } from '../types';
import OtherWebsites from './OtherWebsites';
import { getTranslation } from '../lib/translations';

interface HomeViewProps {
  onStart: (category: Category) => void;
  categories: NavItem[];
  selectedLanguage: string;
}

const HIDE_OTHER_SITES = true;

const HomeView: React.FC<HomeViewProps> = ({ onStart, categories, selectedLanguage }) => {
  const t = getTranslation(selectedLanguage);

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-stone-900">
        <img
          src="/banner.jpg"
          alt="Temple Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/40"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-orange-200 font-medium italic mb-8 drop-shadow">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onStart(categories[2]?.id || 'kirtan')}
              className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all hover:scale-105 shadow-xl"
            >
              {t.hero.startBtn}
            </button>
            <button
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              {t.hero.exploreBtn}
            </button>
          </div>
        </div>
      </section>

      {/* Quote & Prabhupada Section */}
      <section id="about" className="py-20 px-6 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-400 rounded-full text-sm font-bold uppercase tracking-widest">
              {t.about.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
              {t.about.heading}
            </h2>
            <blockquote className="border-l-4 border-orange-500 pl-6 italic text-2xl text-stone-700 dark:text-stone-300 font-medium">
              {t.about.quote}
            </blockquote>
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              {t.about.description}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <img
                src="/parbhupada.png"
                alt="Srila Prabhupada"
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-200 dark:border-orange-800 p-0.5 shadow-sm"
              />
              <div>
                <p className="font-bold text-stone-900 dark:text-stone-100">{t.about.author}</p>
                <p className="text-sm text-stone-500 dark:text-stone-400">{t.about.authorTitle}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="/Prabhupadamritanga.jpg"
                alt="Radha Krishna"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
              />
              <img
                src="/lord caitanya.jpeg"
                alt="Kirtan"
                className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
              />
            </div>
            <div className="pt-8 space-y-4">
              <img
                src="/lordcaitanya.jpg"
                alt="Harmonium"
                className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
              />
              <img
                src="/lordcaitanyamahaprabu.jpg"
                alt="Karatal"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instruments */}
      <section id="categories" className="py-20 px-6 bg-stone-50 dark:bg-stone-50/50 dark:bg-stone-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">{t.categories.heading}</h2>
            <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">{t.categories.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onStart(cat.id as Category)}
                className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-stone-100 dark:border-stone-800 text-left"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600'}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-orange-950/90 transition-colors"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative h-full p-8 flex flex-col justify-end">

                  <h3 className="text-2xl font-bold text-white mb-2 capitalize">{cat.label}</h3>
                  <p className="text-stone-300 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {t.categoryFallback[(cat?.id || '').toString().toLowerCase()] || t.categoryFallback.default}
                  </p>
                  <span className="text-orange-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t.categories.startLink}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Other Ecosystem Sites */}
      {!HIDE_OTHER_SITES && <OtherWebsites />}
    </div>
  );
};

export default HomeView;
