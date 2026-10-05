import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_DATA } from '../data/content';
import { Sparkles, ChevronDown, Clock, Star } from 'lucide-react';

interface HeroProps {
  onUnlockFiveYearEgg: () => void;
  onEnterStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onUnlockFiveYearEgg, onEnterStory }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleFiveClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount === 5) {
      onUnlockFiveYearEgg();
      setClickCount(0);
    }
  };

  const handleProceed = () => {
    onEnterStory();
  };

  return (
    <section
      id="intro"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between text-center px-4 sm:px-6 pt-24 pb-12 overflow-hidden"
    >
      {/* Background Soft Lighting Flare */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[340px] sm:w-[750px] h-[340px] sm:h-[750px] rounded-full bg-gradient-to-b from-rose-500/25 via-gold-champagne/20 to-transparent blur-[150px] -z-10"
        />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center z-10 my-auto">
        {/* Eyebrow badge with glowing pulse dot */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="mb-6 flex flex-col sm:flex-row items-center gap-2.5"
        >
          <div className="eyebrow-badge bg-white/[0.04] border-white/10 text-cream/90 shadow-[0_0_25px_rgba(244,114,182,0.18)] hover:border-rose-400/50 hover:bg-white/[0.07] transition-all">
            <Sparkles className="w-3.5 h-3.5 text-gold-champagne animate-pulse" />
            <span>A Celebration of 5 Years</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
          </div>

          {/* Golden Milestone Time Counter Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-champagne/10 border border-gold-champagne/20 text-[10px] sm:text-[11px] font-mono text-gold-champagne tracking-wider">
            <Clock className="w-3 h-3 text-gold-champagne/80" />
            <span>1,825+ Days • Infinite Memories</span>
          </div>
        </motion.div>

        {/* Cinematic Opening Quote */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="space-y-3 mb-12 sm:mb-14"
        >
          <p className="font-serif italic text-lg sm:text-2xl text-cream/75 font-light tracking-wide">
            “{BIRTHDAY_DATA.intro.quotePart1}”
          </p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.32, 0.72, 0, 1] }}
            className="font-serif text-xl sm:text-3xl lg:text-4xl text-cream font-normal tracking-wide"
          >
            “{BIRTHDAY_DATA.intro.quotePart2}”
          </motion.p>
        </motion.div>

        {/* 3 Pillar Stats / Staggered Big Reveal with 3D Float Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 w-full max-w-3xl mb-12"
        >
          {/* Stat 1: 5 YEARS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -8, scale: 1.03 }}
            onClick={handleFiveClick}
            title="Click 5 times for a secret"
            className="doppelrand-shell cursor-pointer group hover:ring-gold-champagne/50 hover:shadow-[0_20px_45px_rgba(212,175,55,0.22)]"
          >
            <div className="doppelrand-core flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gold-light to-gold-champagne group-hover:scale-108 transition-transform duration-300">
                5
              </span>
              <span className="mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/70 group-hover:text-gold-champagne transition-colors uppercase flex items-center gap-1">
                <Star className="w-3 h-3 text-gold-champagne/60 group-hover:text-gold-champagne transition-colors" />
                YEARS
              </span>
              {clickCount > 0 && clickCount < 5 && (
                <span className="text-[10px] font-mono text-rose-300 mt-1.5 animate-pulse bg-rose-500/20 px-2 py-0.5 rounded-full">
                  {clickCount}/5 clicks
                </span>
              )}
            </div>
          </motion.div>

          {/* Stat 2: COUNTLESS MEMORIES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="doppelrand-shell group hover:ring-rose-400/50 hover:shadow-[0_20px_45px_rgba(244,114,182,0.22)]"
          >
            <div className="doppelrand-core flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-200 to-rose-400 group-hover:scale-105 transition-transform duration-300">
                COUNTLESS
              </span>
              <span className="mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/70 group-hover:text-rose-300 transition-colors uppercase flex items-center gap-1">
                MEMORIES ✨
              </span>
            </div>
          </motion.div>

          {/* Stat 3: ONE AMAZING FRIEND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="doppelrand-shell group hover:ring-white/40 hover:shadow-[0_20px_45px_rgba(255,255,255,0.15)]"
          >
            <div className="doppelrand-core flex flex-col items-center justify-center py-6 px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-cream to-gold-champagne group-hover:scale-105 transition-transform duration-300">
                ONE AMAZING
              </span>
              <span className="mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/70 group-hover:text-cream transition-colors uppercase flex items-center gap-1">
                FRIEND ❤️
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Grand Wish */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.3, ease: [0.32, 0.72, 0, 1] }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-semibold tracking-tight text-white mb-3">
            Happy Birthday,{' '}
            <span className="rose-shimmer-text relative inline-block">
              {BIRTHDAY_DATA.friend.name}
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block ml-1"
              >
                ❤️
              </motion.span>
            </span>
          </h1>
          <p className="text-cream/75 text-sm sm:text-base font-light tracking-wide max-w-lg mx-auto leading-relaxed">
            A digital celebration dedicated to half a decade of laughter, trust, and irreplaceable companionship.
          </p>
        </motion.div>
      </div>

      {/* Elegant, Radiant Scroll Prompt at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ delay: 2.8, duration: 1 }}
        onClick={handleProceed}
        className="flex flex-col items-center gap-2.5 cursor-pointer group py-4 pointer-events-auto select-none"
      >
        <span className="text-[11px] font-mono tracking-[0.25em] text-cream/60 group-hover:text-cream transition-colors uppercase flex items-center gap-1.5">
          <span>{BIRTHDAY_DATA.intro.scrollHint}</span>
        </span>
        <div className="relative">
          <span className="absolute -inset-1 rounded-full bg-rose-400/30 blur-sm group-hover:bg-rose-400/50 transition-all animate-pulse" />
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-9 h-9 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-rose-400 group-hover:text-rose-300 group-hover:border-rose-400/50 group-hover:scale-105 transition-all shadow-lg"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

