import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChapterUnlockButtonProps {
  currentChapterNum: number;
  nextChapterTitle: string;
  nextChapterTagline: string;
  onUnlock: () => void;
  isNextAlreadyUnlocked?: boolean;
}

export const ChapterUnlockButton: React.FC<ChapterUnlockButtonProps> = ({
  currentChapterNum,
  nextChapterTitle,
  nextChapterTagline,
  onUnlock,
  isNextAlreadyUnlocked,
}) => {
  const handleClick = () => {
    if (!isNextAlreadyUnlocked) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#fb7185', '#fae8b2', '#ffffff', '#f43f5e']
      });

      // Play soft chime if sound enabled
      try {
        const isSoundOn = localStorage.getItem('amirtaa_music_enabled') === 'true';
        if (isSoundOn) {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.85);
        }
      } catch {
        // Audio error or blocked
      }
    }
    onUnlock();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 sm:mt-24 pt-8 border-t border-white/[0.08] flex flex-col items-center text-center cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 text-xs font-mono text-gold-champagne mb-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
        <span>CHAPTER 0{currentChapterNum} COMPLETED</span>
      </div>

      <p className="text-xs font-mono text-cream/40 uppercase tracking-widest mb-4">
        {nextChapterTagline}
      </p>

      {/* Sleek, Modern Editorial Trigger with Ambient Glow */}
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500/30 to-amber-500/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
        <div className="relative px-7 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-rose-400/50 transition-all duration-300 flex items-center gap-3 text-cream/90 group-hover:text-white group-hover:scale-[1.02] active:scale-[0.98] shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-gold-champagne group-hover:rotate-12 transition-transform" />
          <span className="font-serif text-sm sm:text-base tracking-wide font-medium">
            {isNextAlreadyUnlocked
              ? `Continue to Chapter 0${currentChapterNum + 1}: ${nextChapterTitle}`
              : `Unlock Chapter 0${currentChapterNum + 1}: ${nextChapterTitle}`}
          </span>
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-rose-400 group-hover:text-rose-300"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

