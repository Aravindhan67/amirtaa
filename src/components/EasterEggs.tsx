import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_DATA } from '../data/content';
import { X, Coffee, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EasterEggsProps {
  fiveYearsUnlocked: boolean;
  onCloseFiveYears: () => void;
  secretButtonTriggered: boolean;
  onCloseSecretButton: () => void;
  onOpenSecretButton: () => void;
}

export const EasterEggs: React.FC<EasterEggsProps> = ({
  fiveYearsUnlocked,
  onCloseFiveYears,
  secretButtonTriggered,
  onCloseSecretButton,
  onOpenSecretButton,
}) => {
  // Console Easter Egg on Mount
  useEffect(() => {
    console.log(
      `%c🎉 HAPPY BIRTHDAY AMIRTAA! 🎉\n` +
      `%c5 Years of Unbreakable Friendship\n` +
      `-----------------------------------------\n` +
      `Hey Amirtaa! If you're a curious developer (or just inspected the page),\n` +
      `you found Easter Egg #1!\n` +
      `Here's to half a decade of laughter, late-night rants, and countless memories. ❤️\n` +
      `-----------------------------------------`,
      'font-size: 20px; font-weight: bold; color: #fb7185;',
      'font-size: 14px; font-style: italic; color: #fae8b2;'
    );
  }, []);

  // Trigger mini sparkles when 5 years unlocked
  useEffect(() => {
    if (fiveYearsUnlocked) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fae8b2', '#fb7185', '#ffffff']
      });
    }
  }, [fiveYearsUnlocked]);

  return (
    <>
      {/* Easter Egg #1: 5 Years 5 Clicks Modal */}
      <AnimatePresence>
        {fiveYearsUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={onCloseFiveYears}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#12121a] border border-gold-champagne/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl"
            >
              <button
                onClick={onCloseFiveYears}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-gold-champagne/10 border border-gold-champagne/30 flex items-center justify-center mx-auto mb-4 text-gold-champagne">
                <Coffee className="w-6 h-6" />
              </div>

              <span className="eyebrow-badge bg-gold-champagne/10 border-gold-champagne/30 text-gold-champagne mb-3">
                Easter Egg #1 Unlocked
              </span>

              <h3 className="text-xl font-serif font-bold text-white mb-3">
                5 Clicks For 5 Years! ☕
              </h3>

              <p className="text-sm text-cream/80 leading-relaxed font-light mb-6">
                {BIRTHDAY_DATA.easterEggs.fiveClicksMessage}
              </p>

              <button
                onClick={onCloseFiveYears}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-gold-champagne to-amber-500 text-black font-semibold text-xs font-mono uppercase tracking-wider"
              >
                Claim Coffee Pass ☕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg #2: Secret Button Reveal Modal */}
      <AnimatePresence>
        {secretButtonTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={onCloseSecretButton}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#12121a] border border-rose-500/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl"
            >
              <button
                onClick={onCloseSecretButton}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-4 text-rose-300">
                <Eye className="w-6 h-6" />
              </div>

              <span className="eyebrow-badge bg-rose-500/10 border-rose-500/30 text-rose-300 mb-3">
                Easter Egg #2 Unlocked
              </span>

              <h3 className="text-xl font-serif font-bold text-white mb-3">
                Curiosity Level: 100% 😂
              </h3>

              <p className="text-sm text-cream/80 leading-relaxed font-light mb-6">
                {BIRTHDAY_DATA.easterEggs.secretButtonReveal}
              </p>

              <button
                onClick={onCloseSecretButton}
                className="w-full py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs font-mono uppercase tracking-wider"
              >
                Guilty as Charged!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating or Footer Discreet Secret Button */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={onOpenSecretButton}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 backdrop-blur-md text-[11px] font-mono text-cream/40 hover:text-cream transition-all shadow-lg active:scale-95"
          title="Secret interaction"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 group-hover:animate-ping" />
          <span>{BIRTHDAY_DATA.easterEggs.secretButtonPrompt}</span>
        </button>
      </div>
    </>
  );
};
