import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Globe, ArrowUpRight } from 'lucide-react';

interface OtherSite {
    id: number;
    webUrl: string;
    purpose: string;
    featuresAvailable: string;
    created_at: string;
    updated_at: string;
}

export default function OtherWebsites() {
    const [sites, setSites] = useState<OtherSite[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await axios.get('https://api.askharekrishna.com/api/ourOtherSites/');
                setSites(response.data);
            } catch (error) {
                console.error('Error fetching other sites:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSites();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    if (sites.length === 0) return null;

    return (
        <section className="py-24 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                        Our Spiritual Network
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6 font-playfair">
                        Explore Our <span className="text-orange-600 dark:text-orange-500 italic font-playfair">Extended Services</span>
                    </h2>
                    <p className="text-stone-500 dark:text-stone-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Beyond kirtan, connect with our diverse ecosystem of spiritual tools, articles, and community initiatives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sites.map((site) => {
                        // Extract hostname for a clean label
                        let hostname = '';
                        try {
                            hostname = new URL(site.webUrl).hostname.replace('www.', '');
                        } catch {
                            hostname = site.webUrl;
                        }

                        return (
                            <a
                                key={site.id}
                                href={site.webUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-200 dark:border-stone-800 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-200/50 dark:hover:shadow-orange-900/40 hover:-translate-y-2 relative overflow-hidden"
                            >
                                {/* Decorative Gradient Layer */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-950/10 -mr-16 -mt-16 rounded-full transition-transform duration-700 group-hover:scale-[3] opacity-60"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-14 h-14 bg-orange-600 dark:bg-orange-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform duration-500">
                                            <Globe size={28} />
                                        </div>
                                        <div className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors font-playfair">
                                            {hostname}
                                        </h3>
                                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                                            {site.purpose}
                                        </p>
                                    </div>

                                    <div className="mt-auto space-y-4">
                                        <div className="h-px bg-stone-100 dark:bg-stone-800 w-full"></div>
                                        <div className="flex flex-wrap gap-2">
                                            {site.featuresAvailable.split(';').map((feature, i) => (
                                                feature.trim() && (
                                                    <span key={i} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 rounded-lg group-hover:bg-orange-50 dark:group-hover:bg-orange-900 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">
                                                        {feature.trim()}
                                                    </span>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
