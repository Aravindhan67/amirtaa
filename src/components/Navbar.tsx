import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MusicToggle } from './MusicToggle';
import { Sparkles, Heart, Lock, CheckCircle2, RotateCcw } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/content';

interface NavbarProps {
  unlockedLevel: number;
  totalChapters: number;
  progressPercentage: number;
  onResetProgress: () => void;
  onUnlockAll: () => void;
  onSecretClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  unlockedLevel,
  totalChapters,
  progressPercentage,
  onResetProgress,
  onUnlockAll,
  onSecretClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Story', href: '#story', level: 1 },
    { name: 'Ups & Downs', href: '#ups-and-downs', level: 2 },
    { name: 'Memories', href: '#memories', level: 3 },
    { name: '5 Things', href: '#appreciation', level: 4 },
    { name: 'Message', href: '#message', level: 5 },
    { name: 'Surprise', href: '#surprise', level: 6 },
  ];

  const scrollTo = (href: string, level: number) => {
    setIsOpen(false);
    if (level > unlockedLevel) {
      // If locked, scroll to the highest currently unlocked section
      const fallbackTarget = navLinks.find((l) => l.level === unlockedLevel) || { href: '#intro' };
      const el = document.querySelector(fallbackTarget.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-5 px-4 py-2.5 md:px-5 md:py-2.5 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-[#0f0f16]/90 backdrop-blur-2xl border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.7)]'
              : 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]'
          }`}
        >
          {/* Logo / Friend monogram */}
          <a
            href="#intro"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500/30 to-gold-champagne/30 p-[1px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#0e0e15] flex items-center justify-center">
                <span className="font-serif font-bold text-xs gold-shimmer-text">A</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider text-cream/90 flex items-center gap-1">
                {BIRTHDAY_DATA.friend.name}
                <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400/50 inline" />
              </span>
              <span className="text-[9px] font-mono tracking-widest text-cream/40 uppercase">
                {unlockedLevel === totalChapters ? 'Completed ✨' : `Ch. 0${unlockedLevel} / 0${totalChapters}`}
              </span>
            </div>
          </a>

          {/* Desktop Links with Lock/Check Status */}
          <div className="hidden lg:flex items-center gap-1 text-xs">
            {navLinks.map((link) => {
              const isItemUnlocked = unlockedLevel >= link.level;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href, link.level)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 tracking-wide font-medium flex items-center gap-1.5 ${
                    isItemUnlocked
                      ? 'text-cream/80 hover:text-white hover:bg-white/[0.06]'
                      : 'text-cream/30 hover:text-cream/40 cursor-not-allowed'
                  }`}
                  title={isItemUnlocked ? `Jump to ${link.name}` : `${link.name} is locked`}
                >
                  <span>{link.name}</span>
                  {isItemUnlocked ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                  ) : (
                    <Lock className="w-3 h-3 text-cream/30" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Journey Progress Bar Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-cream/60">
            <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-400 to-gold-champagne rounded-full"
                initial={false}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span>{progressPercentage}%</span>
          </div>

          {/* Right Controls: Secret, Reset/Unlock All & Music Toggle */}
          <div className="flex items-center gap-2">
            {/* Quick Unlock All (if not full) */}
            {unlockedLevel < totalChapters ? (
              <button
                onClick={onUnlockAll}
                className="hidden xl:inline text-[10px] font-mono text-gold-champagne/60 hover:text-gold-champagne px-2 py-1 rounded bg-white/[0.02] hover:bg-white/[0.06] transition-colors"
                title="Preview all chapters immediately"
              >
                Unlock All
              </button>
            ) : (
              <button
                onClick={onResetProgress}
                className="hidden xl:flex items-center gap-1 text-[10px] font-mono text-rose-300/60 hover:text-rose-300 px-2 py-1 rounded bg-white/[0.02] hover:bg-white/[0.06] transition-colors"
                title="Restart progressive unlock journey"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Replay</span>
              </button>
            )}

            {onSecretClick && (
              <button
                onClick={onSecretClick}
                title="A tiny hidden whisper"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] text-[11px] font-mono text-cream/50 hover:text-gold-champagne transition-all border border-transparent hover:border-gold-glow"
              >
                <Sparkles className="w-3 h-3 text-gold-champagne/70" />
                <span className="hidden xl:inline">Secret</span>
              </button>
            )}

            <MusicToggle />

            {/* Mobile Hamburger Morph */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-8 h-8 rounded-full flex flex-col items-center justify-center gap-1.5 bg-white/[0.05] border border-white/10 text-cream/90"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`w-4 h-[1.5px] bg-cream/90 transition-transform duration-300 origin-center ${
                  isOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                }`}
              />
              <span
                className={`w-4 h-[1.5px] bg-cream/90 transition-transform duration-300 origin-center ${
                  isOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
                }`}
              />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Staggered Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#08080c]/98 backdrop-blur-3xl flex flex-col justify-center px-8 lg:hidden"
          >
            <div className="flex flex-col gap-6 max-w-sm mx-auto w-full">
              <div className="flex items-center justify-between">
                <span className="eyebrow-badge border-rose-500/20 text-rose-300/80">
                  Chapters Journey
                </span>
                <span className="text-xs font-mono text-gold-champagne">
                  {progressPercentage}% Unlocked
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => {
                  const isItemUnlocked = unlockedLevel >= link.level;
                  return (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07, duration: 0.4 }}
                      onClick={() => scrollTo(link.href, link.level)}
                      className={`text-left py-3 text-xl font-serif font-light flex items-center justify-between border-b border-white/[0.06] ${
                        isItemUnlocked ? 'text-cream/90' : 'text-cream/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-rose-300/60">0{idx + 1}</span>
                        <span>{link.name}</span>
                      </div>
                      {isItemUnlocked ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-cream/30" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-cream/40 font-mono">
                <button
                  onClick={() => {
                    onUnlockAll();
                    setIsOpen(false);
                  }}
                  className="text-gold-champagne underline"
                >
                  Unlock All Chapters
                </button>
                <button
                  onClick={() => {
                    onResetProgress();
                    setIsOpen(false);
                  }}
                  className="text-rose-300 underline"
                >
                  Restart Story
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
