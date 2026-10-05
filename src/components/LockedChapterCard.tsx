import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';

interface LockedChapterCardProps {
  chapterNumber: number;
  title: string;
  tagline: string;
  previousChapterTitle: string;
}

export const LockedChapterCard: React.FC<LockedChapterCardProps> = ({
  chapterNumber,
  title,
  tagline,
  previousChapterTitle,
}) => {
  return (
    <div className="py-20 px-4 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="doppelrand-shell w-full max-w-xl group hover:ring-rose-400/20 transition-all"
      >
        <div className="doppelrand-core py-12 px-6 sm:px-10 flex flex-col items-center bg-black/40 border border-white/[0.05] relative overflow-hidden">
          {/* Subtle lock pulse glow */}
          <div className="relative mb-4">
            <div className="absolute -inset-2 rounded-full bg-rose-400/20 blur-md animate-pulse" />
            <div className="relative w-12 h-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-cream/40">
              <Lock className="w-5 h-5 text-rose-300/80" />
            </div>
          </div>

          <span className="eyebrow-badge bg-white/[0.03] border-white/10 text-cream/40 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-gold-champagne/50" />
            <span>Locked Chapter 0{chapterNumber}</span>
          </span>

          <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white/60 mb-2">
            {title}
          </h3>

          <p className="text-xs font-mono text-cream/35 uppercase tracking-widest mb-6">
            {tagline}
          </p>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-serif text-cream/60 italic max-w-sm">
            ✦ Complete “{previousChapterTitle}” above to unlock this chapter.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

