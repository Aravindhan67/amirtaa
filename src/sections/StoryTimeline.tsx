import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_DATA } from '../data/content';
import { Calendar, ChevronRight, Bookmark, Sparkles, ChevronLeft, Star } from 'lucide-react';
import { ChapterUnlockButton } from '../components/ChapterUnlockButton';

interface StoryTimelineProps {
  onUnlockNext?: () => void;
  isNextUnlocked?: boolean;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ onUnlockNext, isNextUnlocked }) => {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const activeYear = BIRTHDAY_DATA.story.timeline[activeYearIndex];

  // Optional subtle audio chime when switching timeline years
  const playChime = (index: number) => {
    try {
      const isSoundOn = localStorage.getItem('amirtaa_music_enabled') === 'true';
      if (isSoundOn) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
        osc.frequency.setValueAtTime(notes[index % notes.length], ctx.currentTime);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.65);
      }
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  const handleSelectYear = (idx: number) => {
    setActiveYearIndex(idx);
    playChime(idx);
  };

  return (
    <section id="story" className="relative py-28 sm:py-36 px-4 sm:px-6 w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex mb-4"
        >
          <span className="eyebrow-badge bg-rose-500/10 border-rose-500/20 text-rose-300">
            <Calendar className="w-3.5 h-3.5 text-rose-400" />
            <span>Chapter 01</span>
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
        >
          {BIRTHDAY_DATA.story.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="text-base sm:text-xl font-light text-cream/80 leading-relaxed font-serif italic max-w-2xl mx-auto"
        >
          “{BIRTHDAY_DATA.story.leadText}”
        </motion.p>
      </div>

      {/* Interactive Year Stepper Bar with Glowing Constellation Track */}
      <div className="mb-14">
        <div className="flex items-center justify-between relative max-w-3xl mx-auto px-4">
          {/* Connecting track line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-white/[0.08] -z-0" />
          <motion.div
            className="absolute top-1/2 left-8 -translate-y-1/2 h-[2px] bg-gradient-to-r from-rose-400 via-rose-300 to-gold-champagne -z-0 transition-all duration-500 shadow-[0_0_15px_rgba(244,114,182,0.7)]"
            style={{
              width: `${(activeYearIndex / (BIRTHDAY_DATA.story.timeline.length - 1)) * 90}%`
            }}
          />

          {BIRTHDAY_DATA.story.timeline.map((item, idx) => {
            const isActive = idx === activeYearIndex;
            const isPassed = idx <= activeYearIndex;

            return (
              <button
                key={item.yearLabel}
                onClick={() => handleSelectYear(idx)}
                className="relative z-10 flex flex-col items-center group focus:outline-none cursor-pointer"
                aria-label={`Select ${item.yearLabel} - ${item.title}`}
              >
                <div
                  className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center text-xs sm:text-sm font-mono font-bold transition-all duration-500 relative ${
                    isActive
                      ? 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-[0_0_30px_rgba(244,114,182,0.6)] scale-115 ring-4 ring-rose-500/25'
                      : isPassed
                      ? 'bg-[#151522] text-gold-champagne border border-gold-champagne/40 group-hover:scale-105'
                      : 'bg-[#101018] text-cream/40 border border-white/10 group-hover:border-white/30 group-hover:scale-105'
                  }`}
                >
                  0{item.yearNumber}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-gold-champagne border-2 border-[#101018] animate-ping" />
                  )}
                </div>
                <span
                  className={`mt-2.5 text-[10px] sm:text-xs font-mono tracking-wider transition-colors uppercase ${
                    isActive ? 'text-cream font-bold' : 'text-cream/40 group-hover:text-cream/70'
                  }`}
                >
                  {item.yearLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cinematic Timeline Card (Active Year Details) */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear.yearNumber}
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="doppelrand-shell hover:ring-rose-400/40 transition-all shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
          >
            <div className="doppelrand-core bg-gradient-to-br from-[#13131e] via-[#0e0e16] to-[#15131e] relative overflow-hidden">
              {/* Subtle ambient light pool in background */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-500/10 blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left: Year Badge, Title and Key Memory */}
                <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="eyebrow-badge bg-gold-champagne/10 border-gold-champagne/30 text-gold-champagne">
                        <Sparkles className="w-3 h-3 text-gold-champagne" />
                        <span>{activeYear.badge}</span>
                      </span>
                      <span className="text-xs font-mono text-cream/50 tracking-wider">
                        {activeYear.yearLabel} of 5
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-2">
                      {activeYear.title}
                    </h3>

                    <p className="text-sm font-sans text-rose-300 font-medium mb-6">
                      {activeYear.tagline}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-inner">
                    <div className="flex items-center gap-2 text-xs font-mono text-gold-champagne mb-1.5">
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>KEY MEMORY</span>
                    </div>
                    <p className="text-xs sm:text-sm text-cream/95 italic font-serif leading-relaxed">
                      “{activeYear.highlight}”
                    </p>
                  </div>
                </div>

                {/* Right: Rich Narrative & Stepper Controls */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <p className="text-base sm:text-lg text-cream/90 leading-relaxed font-light">
                    {activeYear.story}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-white/10">
                    <button
                      onClick={() =>
                        handleSelectYear(
                          activeYearIndex > 0 ? activeYearIndex - 1 : BIRTHDAY_DATA.story.timeline.length - 1
                        )
                      }
                      className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-cream/60 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>PREV</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {BIRTHDAY_DATA.story.timeline.map((_, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelectYear(i)}
                          className={`cursor-pointer h-1.5 rounded-full transition-all duration-300 ${
                            i === activeYearIndex
                              ? 'w-7 bg-gradient-to-r from-rose-400 to-gold-champagne'
                              : 'w-1.5 bg-white/20 hover:bg-white/40'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        handleSelectYear(
                          activeYearIndex < BIRTHDAY_DATA.story.timeline.length - 1 ? activeYearIndex + 1 : 0
                        )
                      }
                      className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-rose-300 hover:text-rose-200 transition-all flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>NEXT</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative timeline summary quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center flex items-center justify-center gap-2"
      >
        <Star className="w-3 h-3 text-gold-champagne/60" />
        <span className="text-xs font-mono tracking-widest text-cream/50 uppercase">
          1,825+ Days of Shared Life
        </span>
        <Star className="w-3 h-3 text-gold-champagne/60" />
      </motion.div>

      {/* Chapter Unlock Trigger to Chapter 2 */}
      {onUnlockNext && (
        <ChapterUnlockButton
          currentChapterNum={1}
          nextChapterTitle="Ups & Downs"
          nextChapterTagline="Through the Good and the Difficult Days"
          onUnlock={onUnlockNext}
          isNextAlreadyUnlocked={isNextUnlocked}
        />
      )}
    </section>
  );
};

