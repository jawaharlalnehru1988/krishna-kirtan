
import React from 'react';
import { Category } from '../types';

interface HomeViewProps {
  onStart: (category: Category) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-stone-900">
        <img
          src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=1200"
          alt="Temple Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-stone-900/40"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
            Sri Krishna Kirtan
          </h1>
          <p className="text-xl md:text-2xl text-orange-200 font-medium italic mb-8 drop-shadow">
            "Kirtan is the call of the soul for the Supreme Soul."
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onStart('mridanga')}
              className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold text-lg hover:bg-orange-700 transition-all hover:scale-105 shadow-xl"
            >
              Start Learning
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
            >
              Explore Library
            </button>
          </div>
        </div>
      </section>

      {/* Quote & Prabhupada Section */}
      <section id="about" className="py-20 px-6 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-bold uppercase tracking-widest">
              Divine Inspiration
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
              Teachings of His Divine Grace
            </h2>
            <blockquote className="border-l-4 border-orange-500 pl-6 italic text-2xl text-stone-700 font-medium">
              "Simply by chanting this holy name of Hari, one can become free from all the reactions of sinful life. This kirtan movement is the only way to realize God in this age."
            </blockquote>
            <p className="text-lg text-stone-600 leading-relaxed">
              Our academy is dedicated to preserving the traditional melodies and rhythms established by A.C. Bhaktivedanta Swami Prabhupada. Whether you are picking up a mridanga for the first time or perfecting a complex raga on the harmonium, we are here to support your devotional journey.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Bhaktivedanta_Swami_Prabhupada_2.jpg"
                alt="Srila Prabhupada"
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-200 p-0.5"
              />
              <div>
                <p className="font-bold text-stone-900">Srila Prabhupada</p>
                <p className="text-sm text-stone-500">Founder-Acharya of ISKCON</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=400"
                alt="Radha Krishna"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
              />
              <img
                src="https://images.unsplash.com/photo-1544211501-0c43057e0969?auto=format&fit=crop&q=80&w=400"
                alt="Kirtan"
                className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
              />
            </div>
            <div className="pt-8 space-y-4">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400"
                alt="Harmonium"
                className="w-full h-80 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
              />
              <img
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400"
                alt="Karatal"
                className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instruments */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Choose Your Instrument</h2>
            <p className="text-stone-500 max-w-2xl mx-auto">Select a path to begin your training with structured lessons, mantras, and reference guides.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'mridanga', name: 'Mridanga', desc: 'The King of instruments. Learn the rhythmic heartbeat of kirtan.', icon: '🥁' },
              { id: 'harmonium', name: 'Harmonium', desc: 'Master the melodies and ragas that evoke deep devotion.', icon: '🎹' },
              { id: 'karatal', name: 'Karatal', desc: 'The golden rhythm that keeps the pace of every congregational chant.', icon: '🔔' }
            ].map((inst) => (
              <button
                key={inst.id}
                onClick={() => onStart(inst.id as Category)}
                className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 text-left hover:shadow-xl transition-all group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{inst.icon}</div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">{inst.name}</h3>
                <p className="text-stone-600 mb-6">{inst.desc}</p>
                <span className="text-orange-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                  Start Learning ➔
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
