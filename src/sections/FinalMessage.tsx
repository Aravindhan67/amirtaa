import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_DATA } from '../data/content';
import { Mail, Heart, RefreshCw, CheckCheck } from 'lucide-react';
import { ChapterUnlockButton } from '../components/ChapterUnlockButton';
import confetti from 'canvas-confetti';

interface FinalMessageProps {
  onUnlockNext?: () => void;
  isNextUnlocked?: boolean;
}

export const FinalMessage: React.FC<FinalMessageProps> = ({ onUnlockNext, isNextUnlocked }) => {
  const fullText = BIRTHDAY_DATA.letter.paragraphs.join('\n\n');
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [heartStampCount, setHeartStampCount] = useState(0);

  // Soft typewriter audio click
  const playTypeSound = () => {
    try {
      const isSoundOn = localStorage.getItem('amirtaa_music_enabled') === 'true';
      if (isSoundOn) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320 + Math.random() * 80, ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch {
      // Audio not supported or blocked
    }
  };

  // Typewriter effect triggered when scrolled into view
  useEffect(() => {
    if (!hasStarted) return;
    if (!isTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      index += 2; // smooth 2-char typing speed
      if (index >= fullText.length) {
        setDisplayedText(fullText);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(fullText.slice(0, index));
        if (index % 6 === 0) {
          playTypeSound();
        }
      }
    }, 24);

    return () => clearInterval(interval);
  }, [hasStarted, isTyping, fullText]);

  const handleSkipOrComplete = () => {
    setDisplayedText(fullText);
    setIsTyping(false);
  };

  const handleReplay = () => {
    setDisplayedText('');
    setIsTyping(true);
    setHasStarted(true);
  };

  const handleHeartStamp = () => {
    setHeartStampCount((prev) => prev + 1);
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#fb7185', '#f43f5e', '#fda4af', '#e7cb8a']
    });
  };

  return (
    <section id="message" className="relative py-20 sm:py-36 px-3 sm:px-6 w-full max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex mb-4"
        >
          <span className="eyebrow-badge bg-rose-500/10 border-rose-500/20 text-rose-300">
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span>Chapter 05</span>
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-2xl sm:text-5xl font-serif font-bold text-white mb-2 sm:mb-3"
        >
          {BIRTHDAY_DATA.letter.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="text-[11px] sm:text-sm font-mono tracking-widest text-gold-champagne/90 uppercase"
        >
          {BIRTHDAY_DATA.letter.tagline}
        </motion.p>
      </div>

      {/* Letter Container with Doppelrand Double-Bezel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
        }}
        viewport={{ once: true, amount: 0.3 }}
        onViewportEnter={() => setHasStarted(true)}
        className="doppelrand-shell hover:ring-gold-champagne/30 transition-all shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
      >
        <div className="doppelrand-core bg-[#0d0d16] p-5 sm:p-8 md:p-12 relative overflow-hidden border border-white/10">
          {/* Subtle watermark monogram */}
          <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 text-[110px] sm:text-[160px] font-serif font-bold text-white/[0.02] pointer-events-none select-none">
            A
          </div>

          {/* Letter Head with Wax Seal */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-600 via-rose-600 to-amber-500 p-[1.5px] shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer shrink-0"
                title="Monogram Wax Seal"
              >
                <div className="w-full h-full rounded-full bg-[#12121c] flex items-center justify-center font-serif font-bold text-xs sm:text-sm gold-shimmer-text">
                  A
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-cream/90 tracking-wider">
                  TO: AMIRTAA ❤️
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-cream/40">
                  FOR MY BEST FRIEND OF 5 YEARS
                </span>
              </div>
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-gold-champagne/80 bg-white/[0.04] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/[0.08]">
              {BIRTHDAY_DATA.letter.date}
            </div>
          </div>

          {/* Typewriter text body */}
          <div className="min-h-[220px] sm:min-h-[280px] font-serif text-sm sm:text-xl text-cream/90 leading-relaxed space-y-4 sm:space-y-6">
            {displayedText ? (
              displayedText.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    paragraph.includes('Happy Birthday')
                      ? 'text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-white to-gold-champagne my-6'
                      : 'font-light'
                  }
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-cream/30 italic">Unfolding letter...</p>
            )}

            {isTyping && (
              <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Signoff & Interactive Heart Stamp */}
          <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono tracking-wider text-cream/40 uppercase mb-1">
                Warmest Wishes,
              </p>
              <p className="text-lg font-serif italic text-white flex items-center gap-2">
                {BIRTHDAY_DATA.letter.signoff}
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </p>
            </div>

            {/* Controls & Heart Stamp Button */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleHeartStamp}
                className="px-3.5 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 text-xs font-mono text-rose-300 transition-all flex items-center gap-1.5 active:scale-95"
                title="Send a heart stamp"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                <span>Stamp Love {heartStampCount > 0 ? `(${heartStampCount})` : ''}</span>
              </button>

              {isTyping ? (
                <button
                  onClick={handleSkipOrComplete}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-cream/70 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-gold-champagne" />
                  <span>Reveal All</span>
                </button>
              ) : (
                <button
                  onClick={handleReplay}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-cream/70 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replay</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chapter Unlock Button to Chapter 6 (Surprise) */}
      {onUnlockNext && (
        <ChapterUnlockButton
          currentChapterNum={5}
          nextChapterTitle="The Grand Surprise"
          nextChapterTagline="One Last Thing..."
          onUnlock={onUnlockNext}
          isNextAlreadyUnlocked={isNextUnlocked}
        />
      )}
    </section>
  );
};

