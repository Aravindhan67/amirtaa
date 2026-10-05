import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_DATA } from '../data/content';
import { Award, Heart, Star } from 'lucide-react';
import { ChapterUnlockButton } from '../components/ChapterUnlockButton';

interface AppreciationCardsProps {
  onUnlockNext?: () => void;
  isNextUnlocked?: boolean;
}

// Distinctive luxury gradient themes for each appreciation pillar
const CARD_THEMES = [
  {
    bg: 'from-rose-950/40 via-surface to-rose-900/10',
    border: 'group-hover:ring-rose-400/50',
    glow: 'group-hover:shadow-[0_20px_45px_rgba(244,114,182,0.2)]',
    accent: 'text-rose-300',
  },
  {
    bg: 'from-amber-950/40 via-surface to-gold-amber/10',
    border: 'group-hover:ring-amber-400/50',
    glow: 'group-hover:shadow-[0_20px_45px_rgba(251,191,36,0.2)]',
    accent: 'text-gold-champagne',
  },
  {
    bg: 'from-emerald-950/40 via-surface to-teal-950/20',
    border: 'group-hover:ring-emerald-400/50',
    glow: 'group-hover:shadow-[0_20px_45px_rgba(52,211,153,0.2)]',
    accent: 'text-emerald-300',
  },
  {
    bg: 'from-orange-950/40 via-surface to-red-950/20',
    border: 'group-hover:ring-orange-400/50',
    glow: 'group-hover:shadow-[0_20px_45px_rgba(251,146,60,0.2)]',
    accent: 'text-orange-300',
  },
  {
    bg: 'from-violet-950/50 via-surface to-rose-950/40',
    border: 'group-hover:ring-purple-400/60',
    glow: 'group-hover:shadow-[0_25px_55px_rgba(192,132,252,0.25)]',
    accent: 'text-purple-300',
  },
];

export const AppreciationCards: React.FC<AppreciationCardsProps> = ({ onUnlockNext, isNextUnlocked }) => {
  return (
    <section id="appreciation" className="relative py-20 sm:py-36 px-3 sm:px-6 w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex mb-4"
        >
          <span className="eyebrow-badge bg-gold-champagne/10 border-gold-champagne/20 text-gold-champagne">
            <Award className="w-3.5 h-3.5 text-gold-champagne" />
            <span>Chapter 04</span>
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-2xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 sm:mb-6"
        >
          {BIRTHDAY_DATA.appreciation.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="text-sm sm:text-lg text-cream/70 font-light"
        >
          {BIRTHDAY_DATA.appreciation.subtitle}
        </motion.p>
      </div>

      {/* 5 Animated Cards with Curated Palette */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {BIRTHDAY_DATA.appreciation.items.map((item, idx) => {
          const isFifth = idx === 4;
          const theme = CARD_THEMES[idx % CARD_THEMES.length];

          return (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.32, 0.72, 0, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`doppelrand-shell group ${theme.border} ${theme.glow} ${
                isFifth ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div
                className={`doppelrand-core h-full flex flex-col justify-between bg-gradient-to-br ${theme.bg} relative overflow-hidden backdrop-blur-xl transition-all duration-500`}
              >
                <div>
                  {/* Header: Number & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                      {item.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <motion.span
                        whileHover={{ scale: 1.25, rotate: 12 }}
                        className="text-2xl cursor-default inline-block"
                      >
                        {item.emoji}
                      </motion.span>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-cream/60 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 group-hover:text-rose-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className={`text-sm font-sans font-medium ${theme.accent} mb-4`}>
                    “{item.subtitle}”
                  </p>

                  {/* Body description */}
                  <p className="text-sm text-cream/75 leading-relaxed font-light mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Detail Box */}
                <div className="mt-4 pt-4 border-t border-white/[0.08] text-xs font-serif italic text-cream/70 flex items-center justify-between">
                  <span>✦ {item.detail}</span>
                  <Heart className="w-3.5 h-3.5 text-rose-400/60 group-hover:text-rose-400 group-hover:fill-rose-400 transition-colors" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle Bottom Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center text-xs font-mono text-cream/40 flex items-center justify-center gap-2"
      >
        <Star className="w-3.5 h-3.5 text-gold-champagne/70" />
        <span>A tribute to an irreplaceable friend</span>
        <Star className="w-3.5 h-3.5 text-gold-champagne/70" />
      </motion.div>

      {/* Chapter Unlock Button to Chapter 5 */}
      {onUnlockNext && (
        <ChapterUnlockButton
          currentChapterNum={4}
          nextChapterTitle="The Little Message"
          nextChapterTagline="Words From The Heart"
          onUnlock={onUnlockNext}
          isNextAlreadyUnlocked={isNextUnlocked}
        />
      )}
    </section>
  );
};

