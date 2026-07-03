'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, Share2, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isSong = window.location.search.includes('lesson=');
  const shareText = isSong ? "Share the song" : "Share the list of songs";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sri Krishna Kirtan',
          text: isSong ? 'Listen to this beautiful kirtan!' : 'Check out this list of kirtans!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed z-[9999] bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-end gap-3">
      {/* Menu Popup */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-xl border border-orange-100 p-2 flex flex-col gap-1 w-56 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <a
            href="https://wa.me/916382043976?text=Hare%20Krishna%20Prabhu!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-orange-50 text-orange-900 rounded-lg transition-colors text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4 text-green-600 shrink-0" />
            Ask Questions
          </a>
          <button
            onClick={handleShare}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-orange-50 text-orange-900 rounded-lg transition-colors text-sm font-medium w-full text-left"
          >
            <Share2 className="w-4 h-4 text-blue-600 shrink-0" />
            {shareText}
          </button>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20b858] rounded-full shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105 text-white"
        aria-label="WhatsApp Options"
      >
        {isOpen ? (
          <X className="w-7 h-7 md:w-8 md:h-8" />
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            className="md:w-9 md:h-9"
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
          </svg>
        )}
      </button>
    </div>
  );
}
