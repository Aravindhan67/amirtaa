import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_DATA, DayCategory } from '../data/content';
import { HeartHandshake, Shield, Plus, Check, Sparkles } from 'lucide-react';
import { ChapterUnlockButton } from '../components/ChapterUnlockButton';

interface UpsAndDownsProps {
  onUnlockNext?: () => void;
  isNextUnlocked?: boolean;
}

export const UpsAndDowns: React.FC<UpsAndDownsProps> = ({ onUnlockNext, isNextUnlocked }) => {
  const [selectedId, setSelectedId] = useState<string>(BIRTHDAY_DATA.upsAndDowns.categories[0].id);

  return (
    <section id="ups-and-downs" className="relative py-28 sm:py-36 px-4 sm:px-6 w-full max-w-6xl mx-auto">
      {/* Emotional Narrative Intro */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex mb-4"
        >
          <span className="eyebrow-badge bg-gold-champagne/10 border-gold-champagne/20 text-gold-champagne">
            <HeartHandshake className="w-3.5 h-3.5 text-gold-champagne" />
            <span>Chapter 02</span>
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
        >
          {BIRTHDAY_DATA.upsAndDowns.heading}
        </motion.h2>

        <div className="space-y-3 font-serif">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="text-xl sm:text-2xl text-cream/70 font-light"
          >
            “{BIRTHDAY_DATA.upsAndDowns.primaryQuote}”
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-gold-champagne font-medium"
          >
            “{BIRTHDAY_DATA.upsAndDowns.secondaryQuote}”
          </motion.p>
        </div>
      </div>

      {/* Cards Grid: Bento Layout with Doppelrand Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {BIRTHDAY_DATA.upsAndDowns.categories.map((category: DayCategory, idx: number) => {
          const isSelected = selectedId === category.id;
          const isSpanTwo = idx === 4; // "Everything in between" spans across on desktop

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.32, 0.72, 0, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedId(category.id)}
              className={`doppelrand-shell cursor-pointer group ${
                isSpanTwo ? 'md:col-span-2 lg:col-span-2' : ''
              } ${isSelected ? 'ring-2 ring-rose-400/80 shadow-[0_0_35px_rgba(244,114,182,0.28)]' : 'hover:ring-white/35'}`}
            >
              <div
                className={`doppelrand-core h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${category.color} backdrop-blur-xl transition-all duration-500`}
              >
                {/* Subtle top indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-3xl inline-block"
                    >
                      {category.emoji}
                    </motion.span>
                    <div>
                      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cream/50 uppercase block">
                        {category.subtitle}
                      </span>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide group-hover:text-rose-200 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                        : 'bg-white/5 text-cream/40 group-hover:text-cream group-hover:bg-white/10'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Quote in card */}
                <p className="font-serif italic text-sm sm:text-base text-cream/90 mb-4 leading-relaxed">
                  “{category.quote}”
                </p>

                {/* Detailed description */}
                <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-light mb-4">
                  {category.description}
                </p>

                {/* Bottom decorative bar */}
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-cream/40">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-champagne/70" />
                    <span>UNCONDITIONAL FRIENDSHIP</span>
                  </span>
                  <span className="text-rose-300/90 font-bold">#0{idx + 1}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Emotional Final Climax Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="doppelrand-shell max-w-3xl mx-auto hover:ring-gold-champagne/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
      >
        <div className="doppelrand-core text-center py-8 px-6 sm:px-10 bg-gradient-to-r from-rose-950/30 via-surface to-amber-950/30">
          <Shield className="w-8 h-8 text-gold-champagne mx-auto mb-4 opacity-90 animate-pulse" />
          <p className="text-lg sm:text-2xl font-serif text-white leading-relaxed">
            “{BIRTHDAY_DATA.upsAndDowns.conclusion}”
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold-champagne/50" />
            <span className="text-xs font-mono tracking-widest text-gold-champagne/90 uppercase">
              5 Years of Steadfast Trust
            </span>
            <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold-champagne/50" />
          </div>
        </div>
      </motion.div>

      {/* Chapter Unlock Button to Chapter 3 */}
      {onUnlockNext && (
        <ChapterUnlockButton
          currentChapterNum={2}
          nextChapterTitle="Memory Vault"
          nextChapterTagline="Snapshots of Shared Adventures"
          onUnlock={onUnlockNext}
          isNextAlreadyUnlocked={isNextUnlocked}
        />
      )}
    </section>
  );
};

