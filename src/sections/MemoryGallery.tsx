import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_DATA, MemoryItem } from '../data/content';
import {
  Camera,
  X,
  ZoomIn,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wand2,
  Film,
  SunMedium,
  Palette,
  Layers
} from 'lucide-react';
import { ChapterUnlockButton } from '../components/ChapterUnlockButton';
import confetti from 'canvas-confetti';

interface MemoryGalleryProps {
  onUnlockNext?: () => void;
  isNextUnlocked?: boolean;
}

type PhotoEffect = 'cinematic' | 'vintage' | 'rose' | 'noir' | 'vivid';

interface EffectPreset {
  id: PhotoEffect;
  name: string;
  icon: React.ReactNode;
  cssClass: string;
  description: string;
}

const EFFECT_PRESETS: EffectPreset[] = [
  {
    id: 'cinematic',
    name: 'Cinematic Warmth',
    icon: <SunMedium className="w-3.5 h-3.5" />,
    cssClass: 'contrast-[1.08] saturate-[1.18] sepia-[0.1] brightness-[1.02]',
    description: 'Golden hour warmth and rich cinematic contrast'
  },
  {
    id: 'rose',
    name: 'Dreamy Rose',
    icon: <Sparkles className="w-3.5 h-3.5" />,
    cssClass: 'contrast-[1.06] saturate-[1.25] hue-rotate-[12deg] brightness-[1.04]',
    description: 'Soft pastel rose bloom with ethereal highlights'
  },
  {
    id: 'vintage',
    name: 'Vintage Film',
    icon: <Film className="w-3.5 h-3.5" />,
    cssClass: 'sepia-[0.32] contrast-[1.12] brightness-[0.96] hue-rotate-[-8deg]',
    description: 'Nostalgic analog film tones and subtle grain'
  },
  {
    id: 'noir',
    name: 'Noir Luxury',
    icon: <Palette className="w-3.5 h-3.5" />,
    cssClass: 'grayscale contrast-[1.25] brightness-[0.98]',
    description: 'Timeless dramatic monochrome with deep blacks'
  },
  {
    id: 'vivid',
    name: 'Vivid Glow',
    icon: <Wand2 className="w-3.5 h-3.5" />,
    cssClass: 'saturate-[1.38] contrast-[1.15] brightness-[1.03]',
    description: 'Vibrant pop of rich colors and crisp clarity'
  },
];

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ onUnlockNext, isNextUnlocked }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);
  const [currentEffect, setCurrentEffect] = useState<PhotoEffect>('cinematic');
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const activeEffectClass =
    EFFECT_PRESETS.find((e) => e.id === currentEffect)?.cssClass || '';

  // Filter memories if a category is selected
  const filteredMemories = BIRTHDAY_DATA.memories.filter((m) => {
    if (activeFilter === 'all') return true;
    return m.tag.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const currentIndex = selectedPhoto
    ? BIRTHDAY_DATA.memories.findIndex((m) => m.id === selectedPhoto.id)
    : -1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setSelectedPhoto(BIRTHDAY_DATA.memories[currentIndex - 1]);
    } else {
      setSelectedPhoto(BIRTHDAY_DATA.memories[BIRTHDAY_DATA.memories.length - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < BIRTHDAY_DATA.memories.length - 1) {
      setSelectedPhoto(BIRTHDAY_DATA.memories[currentIndex + 1]);
    } else {
      setSelectedPhoto(BIRTHDAY_DATA.memories[0]);
    }
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));

    if (!likedPhotos[id]) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#fb7185', '#fda4af', '#f43f5e', '#ffffff']
      });
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setSelectedPhoto(BIRTHDAY_DATA.memories[currentIndex - 1]);
        } else {
          setSelectedPhoto(BIRTHDAY_DATA.memories[BIRTHDAY_DATA.memories.length - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < BIRTHDAY_DATA.memories.length - 1) {
          setSelectedPhoto(BIRTHDAY_DATA.memories[currentIndex + 1]);
        } else {
          setSelectedPhoto(BIRTHDAY_DATA.memories[0]);
        }
      } else if (e.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentIndex]);

  return (
    <section id="memories" className="relative py-28 sm:py-36 px-4 sm:px-6 w-full max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex mb-4"
        >
          <span className="eyebrow-badge bg-rose-500/10 border-rose-500/20 text-rose-300">
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>Chapter 03</span>
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
        >
          Memory Vault
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="text-base sm:text-lg text-cream/70 font-light"
        >
          Unscripted moments, genuine laughs, and memories that stay timeless across 18 captured snapshots.
        </motion.p>

        {/* Category Filter Pills & Mood Filter Palette */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: `All Memories (${BIRTHDAY_DATA.memories.length})` },
              { id: 'vibes', label: '✦ Vibes' },
              { id: 'chaos', label: '✦ Chaos & Fun' },
              { id: 'milestone', label: '✦ Milestones' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                  activeFilter === cat.id
                    ? 'bg-rose-500/20 border border-rose-400/60 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                    : 'bg-white/[0.03] border border-white/10 text-cream/60 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cinematic Filter Palette Controls */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cream/50">
              <Wand2 className="w-3.5 h-3.5 text-gold-champagne" />
              <span>LIVE MOOD FILTERS:</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              {EFFECT_PRESETS.map((effect) => {
                const isActive = currentEffect === effect.id;
                return (
                  <button
                    key={effect.id}
                    onClick={() => setCurrentEffect(effect.id)}
                    title={effect.description}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-500/90 to-amber-600/90 text-white shadow-[0_4px_16px_rgba(244,63,94,0.35)] scale-105'
                        : 'text-cream/60 hover:text-cream hover:bg-white/[0.06]'
                    }`}
                  >
                    {effect.icon}
                    <span>{effect.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Polaroid Gallery Grid (No Year Labels, Rich Cinematic Effects, Tape Accent) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredMemories.map((item, idx) => {
          const rotations = [-1.5, 1.2, -0.8, 1.5, -1.2, 0.8];
          const rotation = rotations[idx % rotations.length];
          const isLiked = !!likedPhotos[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 6) * 0.08, ease: [0.32, 0.72, 0, 1] }}
              style={{ rotate: `${rotation}deg` }}
              whileHover={{ rotate: 0, scale: 1.04, y: -8 }}
              onClick={() => setSelectedPhoto(item)}
              className="cursor-pointer group relative"
            >
              {/* Chic Vintage Tape Accent at Top Center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/15 backdrop-blur-md rounded-sm border border-white/20 z-30 opacity-70 group-hover:opacity-90 shadow-sm pointer-events-none transform -rotate-2" />

              {/* Polaroid Double Bezel Frame with Ambient Glow */}
              <div className="bg-[#111118] p-3 sm:p-4 rounded-2xl polaroid-card border border-white/10 group-hover:border-rose-400/50 group-hover:shadow-[0_20px_50px_rgba(244,114,182,0.22)] transition-all duration-500">
                {/* Photo Container with Shimmer Light Beam and Vignette */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black/80">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 ${activeEffectClass}`}
                  />

                  {/* Corner Vignette & Ambient Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20 opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />

                  {/* Cinematic Diagonal Light Shimmer Sweep on Hover */}
                  <div className="absolute -inset-full top-0 w-1/2 h-full z-10 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-25deg] group-hover:translate-x-[420%] transition-transform duration-1000 ease-out pointer-events-none" />

                  {/* Top Tag Badge (No Year Mention) */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-cream/90 shadow">
                    <span>✦ {item.tag}</span>
                  </div>

                  {/* Heart Reaction Button */}
                  <button
                    onClick={(e) => toggleLike(e, item.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-center z-20 ${
                      isLiked
                        ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.6)] scale-110'
                        : 'bg-black/60 text-white/70 hover:text-rose-300 border-white/15 hover:scale-105'
                    }`}
                    aria-label="Like photo"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                  </button>

                  {/* Zoom indicator on hover */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white shadow pointer-events-none">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Caption & Title */}
                <div className="pt-4 pb-2 px-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-white tracking-wide font-sans group-hover:text-rose-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs font-serif italic text-gold-champagne/90 line-clamp-1">
                    “{item.caption}”
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Fullscreen Modal with Filmstrip Carousel Navigation */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#101018] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Top Controls: Close & Counter */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-cream/80">
                  {currentIndex + 1} / {BIRTHDAY_DATA.memories.length}
                </span>

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-9 h-9 rounded-full bg-black/75 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105"
                  aria-label="Close photo preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Prev / Next Arrow Overlay */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110 active:scale-95"
                aria-label="Previous memory"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/70 hover:bg-black/95 text-white flex items-center justify-center border border-white/20 transition-all hover:scale-110 active:scale-95"
                aria-label="Next memory"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[72vh] overflow-y-auto">
                {/* Photo Display with Active Filter Applied */}
                <div className="md:col-span-7 bg-black flex items-center justify-center overflow-hidden min-h-[350px] p-3">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className={`max-h-[58vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all duration-500 ${activeEffectClass}`}
                  />
                </div>

                {/* Narrative Details (No Year Mention) */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#0e0e15]">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="eyebrow-badge bg-rose-500/10 border-rose-500/20 text-rose-300">
                        {selectedPhoto.tag}
                      </span>
                      <span className="text-xs font-mono text-gold-champagne/80">
                        Amirtaa's Vault
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      {selectedPhoto.title}
                    </h3>

                    <p className="text-sm font-serif italic text-gold-champagne mb-6">
                      “{selectedPhoto.caption}”
                    </p>

                    {selectedPhoto.note && (
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <span className="text-[10px] font-mono tracking-wider uppercase text-cream/50 block mb-1">
                          Backstory
                        </span>
                        <p className="text-xs text-cream/80 leading-relaxed font-light">
                          {selectedPhoto.note}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-xs text-cream/40">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
                      <span>Best Friends Forever</span>
                    </span>

                    <span className="font-mono text-[11px] text-cream/50">
                      ← / → keys
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Filmstrip Thumbnails Bar for Quick Navigation */}
              <div className="p-3 bg-[#09090e] border-t border-white/10 flex items-center gap-2 overflow-x-auto">
                <span className="text-[10px] font-mono text-cream/40 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-gold-champagne" />
                  <span>ALL PHOTOS:</span>
                </span>
                {BIRTHDAY_DATA.memories.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedPhoto(m)}
                    className={`relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border transition-all duration-200 ${
                      m.id === selectedPhoto.id
                        ? 'border-rose-400 ring-2 ring-rose-400/50 scale-105'
                        : 'border-white/15 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Unlock Trigger to Chapter 4 */}
      {onUnlockNext && (
        <ChapterUnlockButton
          currentChapterNum={3}
          nextChapterTitle="5 Things"
          nextChapterTagline="5 Things I Appreciate About You"
          onUnlock={onUnlockNext}
          isNextAlreadyUnlocked={isNextUnlocked}
        />
      )}
    </section>
  );
};

