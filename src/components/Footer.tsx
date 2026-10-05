import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 border-t border-white/[0.08] text-center max-w-6xl mx-auto z-10">
      <div className="flex flex-col items-center gap-6">
        {/* Monogram */}
        <div className="w-12 h-12 rounded-full bg-surface-elevated border border-white/10 flex items-center justify-center">
          <span className="font-serif font-bold text-lg gold-shimmer-text">A</span>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
            Amirtaa's Birthday Edition
          </h3>
          <p className="text-xs font-mono tracking-widest text-cream/40 uppercase">
            5 Years of Pure Friendship & Unbreakable Memories
          </p>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-cream/70 hover:text-white transition-all active:scale-95"
        >
          <ArrowUp className="w-3.5 h-3.5 text-rose-300" />
          <span>RETURN TO THE BEGINNING</span>
        </button>

        <div className="text-[11px] font-mono text-cream/30 pt-4 flex flex-col sm:flex-row items-center gap-2">
          <span>Crafted specifically for Amirtaa</span>
          <span className="hidden sm:inline">•</span>
          <span>Half a decade down, forever to go</span>
        </div>
      </div>
    </footer>
  );
};
