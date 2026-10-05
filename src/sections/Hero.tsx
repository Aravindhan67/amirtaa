import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { BIRTHDAY_DATA } from '../data/content';
import { Sparkles, ChevronDown, Clock, Star, Heart, Crown, ChevronLeft, ChevronRight } from 'lucide-react';

interface LandingMemory {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  badge: string;
  tag: string;
  caption: string;
}

const LANDING_MEMORIES: LandingMemory[] = [
  {
    id: 'casual',
    src: '/landing-1.jpeg',
    title: 'College Days • Casual Vibes',
    subtitle: 'Where every casual hangout became a lifelong memory',
    badge: 'Campus Days ✨',
    tag: 'Look 01',
    caption: '“Unfiltered laughs & constant support”'
  },
  {
    id: 'traditional',
    src: '/landing-2.jpeg',
    title: 'Ethnic Day • Traditional Pride',
    subtitle: 'Red & Silk • Half a decade of standing tall together',
    badge: 'Ethnic Milestone ❤️',
    tag: 'Look 02 (Featured)',
    caption: '“5 Years of Grace & Friendship”'
  },
  {
    id: 'festive',
    src: '/landing-3.jpeg',
    title: 'Festive Bond • Blue & Peacock',
    subtitle: 'Through festivals, celebrations, and countless milestones',
    badge: 'Festive Smiles 🌟',
    tag: 'Look 03',
    caption: '“Together through every season of life”'
  },
];

interface HeroProps {
  onUnlockFiveYearEgg: () => void;
  onEnterStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onUnlockFiveYearEgg, onEnterStory }) => {
  const [clickCount, setClickCount] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(1); // Default to the traditional milestone photo
  const containerRef = useRef<HTMLElement | null>(null);

  // Smooth Parallax Scroll Tracking (Responsive & Gentle)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001
  });

  // Staggered parallax transformations for the 3 images and text
  const imageYCenter = useTransform(smoothProgress, [0, 1], ['0%', '14%']);
  const imageYLeft = useTransform(smoothProgress, [0, 1], ['0%', '9%']);
  const imageYRight = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.05]);
  const textY = useTransform(smoothProgress, [0, 1], ['0%', '-8%']);
  const bgGlowOpacity = useTransform(smoothProgress, [0, 0.7, 1], [0.25, 0.38, 0.1]);

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

  const currentMemory = LANDING_MEMORIES[activePhotoIdx];

  const handleNextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % LANDING_MEMORIES.length);
  };

  const handlePrevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + LANDING_MEMORIES.length) % LANDING_MEMORIES.length);
  };

  return (
    <section
      ref={containerRef}
      id="intro"
      className="relative min-h-[140vh] sm:min-h-[175vh] w-full flex flex-col items-center justify-between text-center px-3 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Background Soft Lighting Flares with Parallax Glow */}
      <motion.div
        style={{ opacity: bgGlowOpacity }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10"
      >
        <div className="w-[320px] sm:w-[850px] h-[320px] sm:h-[850px] rounded-full bg-gradient-to-b from-emerald-500/20 via-rose-500/20 to-gold-champagne/20 blur-[120px] sm:blur-[160px]" />
      </motion.div>

      {/* ======================================================== */}
      {/* PHASE 1: FULL-SCREEN CINEMATIC LANDING COVER (0 - 100vh) */}
      {/* ======================================================== */}
      <div className="min-h-[85vh] sm:min-h-[90vh] w-full max-w-6xl mx-auto flex flex-col items-center justify-center relative z-10 my-auto py-4 sm:py-8">
        {/* Top Floating Eyebrow Tags */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="mb-6 sm:mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          <div className="eyebrow-badge bg-white/[0.05] border-white/15 text-cream/90 shadow-[0_0_30px_rgba(244,114,182,0.2)] hover:border-rose-400/50 transition-all text-[10px] sm:text-[11px] py-0.5 sm:py-1 px-3 sm:px-3.5">
            <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-champagne shrink-0" />
            <span>5 Years of Friendship</span>
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] sm:text-[11px] font-mono text-emerald-300 tracking-wider">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400 shrink-0" />
            <span>என் தோழியே • Amirtaa's Birthday</span>
          </div>

          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] sm:text-[11px] font-mono text-gold-champagne tracking-wider">
            <span>3 Captured Moments Together</span>
          </div>
        </motion.div>

        {/* Central Parallax Portrait & Grand Title Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full mb-8 sm:mb-12">
          {/* Left Column: Grand Typography Reveal */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-6 text-center lg:text-left space-y-4 sm:space-y-5"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-gold-champagne/10 border border-gold-champagne/20 text-[11px] sm:text-xs font-mono text-gold-champagne">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-champagne shrink-0" />
              <span>OCTOBER 2026 • 5-YEAR SPECIAL</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.08]">
              Happy Birthday,{' '}
              <span className="rose-shimmer-text block mt-1">
                {BIRTHDAY_DATA.friend.name}
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-block ml-2 text-2xl sm:text-5xl"
                >
                  ❤️
                </motion.span>
              </span>
            </h1>

            <p className="text-cream/80 text-sm sm:text-lg lg:text-xl font-light leading-relaxed max-w-xl mx-auto lg:mx-0 font-serif italic">
              “To the girl who turned 5 years into a lifetime of trust, laughter, and unbreakable memories.”
            </p>

            {/* Quick Highlights Tag Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-1 sm:pt-2">
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono text-cream/70">
                ✦ 1,825+ Days
              </span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono text-cream/70">
                ✦ Infinite Laughs
              </span>
              <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono text-cream/70">
                ✦ Best Friend Forever
              </span>
            </div>

            {/* Interactive Photo Selector Tabs for 3 Images */}
            <div className="pt-2 flex flex-col items-center lg:items-start gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cream/50 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold-champagne" />
                <span>CHOOSE A MOMENT:</span>
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
                {LANDING_MEMORIES.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      activePhotoIdx === idx
                        ? 'bg-rose-500/20 border border-rose-400/70 text-white shadow-[0_0_15px_rgba(244,63,94,0.35)] scale-105'
                        : 'bg-white/[0.03] border border-white/10 text-cream/60 hover:text-white hover:bg-white/[0.07]'
                    }`}
                  >
                    <span className="text-[10px] text-gold-champagne font-bold">0{idx + 1}</span>
                    <span>{m.badge}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3-Photo Interactive Parallax Fan & Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            {/* Ambient Multi-Layer Backlight Glow */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-gold-champagne/15 to-rose-500/20 blur-3xl opacity-75 animate-pulse -z-10" />

            {/* Desktop 3-Card Fanned Parallax View */}
            <div className="hidden sm:flex items-center justify-center relative w-full h-[460px] max-w-lg mx-auto">
              {/* Left Fanned Card (img 1: Casual) */}
              <motion.div
                style={{ y: imageYLeft }}
                onClick={() => setActivePhotoIdx(0)}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className={`absolute left-0 cursor-pointer transition-all duration-500 transform -rotate-6 origin-bottom-left ${
                  activePhotoIdx === 0
                    ? 'z-25 scale-105 ring-2 ring-rose-400 shadow-[0_20px_50px_rgba(244,63,94,0.4)]'
                    : 'z-10 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl w-[170px] lg:w-[190px]">
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black">
                    <img
                      src="/landing-1.jpeg"
                      alt="College Days Together"
                      loading="eager"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-mono text-cream/90 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                      College Days
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Fanned Card (img 3: Festive) */}
              <motion.div
                style={{ y: imageYRight }}
                onClick={() => setActivePhotoIdx(2)}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className={`absolute right-0 cursor-pointer transition-all duration-500 transform rotate-6 origin-bottom-right ${
                  activePhotoIdx === 2
                    ? 'z-25 scale-105 ring-2 ring-gold-champagne shadow-[0_20px_50px_rgba(229,203,138,0.4)]'
                    : 'z-10 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl w-[170px] lg:w-[190px]">
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-black">
                    <img
                      src="/landing-3.jpeg"
                      alt="Festive Days Together"
                      loading="eager"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-mono text-cream/90 bg-black/60 px-2 py-0.5 rounded-full border border-white/10">
                      Festive Bond
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Center Spotlight Card (img 2: Traditional Ethnic Day or Active Selection) */}
              <motion.div
                style={{ y: imageYCenter, scale: imageScale }}
                className="relative z-20 cursor-pointer group"
                onClick={() => setActivePhotoIdx((prev) => (prev + 1) % 3)}
              >
                <div className="p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/25 via-white/10 to-white/15 border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.95)] w-[210px] lg:w-[240px]">
                  <div className="relative aspect-[3/4] sm:aspect-[9/16] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-inner">
                    <img
                      src={currentMemory.src}
                      alt={currentMemory.title}
                      loading="eager"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle vignette gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                    {/* Floating Corner Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cream/90 flex items-center gap-1.5 shadow-lg">
                      <Sparkles className="w-3 h-3 text-gold-champagne" />
                      <span>{currentMemory.badge}</span>
                    </div>

                    {/* Bottom Photo Caption */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2 sm:p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-left">
                      <p className="text-[11px] sm:text-xs font-serif italic text-white font-medium">
                        {currentMemory.caption}
                      </p>
                      <p className="text-[9px] sm:text-[10px] font-mono text-gold-champagne/90">
                        Amirtaa & Aravindhan ❤️
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile Touch-Friendly Card View with Next/Prev Swiper */}
            <div className="sm:hidden flex flex-col items-center w-full max-w-[270px] relative">
              <motion.div
                style={{ y: imageYCenter }}
                className="w-full relative"
              >
                <div className="p-2 rounded-2xl bg-gradient-to-b from-white/20 via-white/5 to-white/10 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] w-full">
                  <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black shadow-inner">
                    <img
                      src={currentMemory.src}
                      alt={currentMemory.title}
                      loading="eager"
                      className="w-full h-full object-cover object-top"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                    {/* Corner Tag */}
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono text-cream/90 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-gold-champagne" />
                      <span>{currentMemory.badge}</span>
                    </div>

                    {/* Bottom Caption */}
                    <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-left">
                      <p className="text-[11px] font-serif italic text-white font-medium leading-tight">
                        {currentMemory.caption}
                      </p>
                      <p className="text-[9px] font-mono text-gold-champagne/90 mt-0.5">
                        Amirtaa & Aravindhan ❤️
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile Carousel Navigation Arrows & Indicators */}
              <div className="flex items-center justify-between w-full mt-3 px-1">
                <button
                  onClick={handlePrevPhoto}
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 flex items-center justify-center text-white active:scale-95"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* 3 Dot Indicators */}
                <div className="flex items-center gap-2">
                  {LANDING_MEMORIES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhotoIdx(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activePhotoIdx
                          ? 'w-6 bg-gradient-to-r from-rose-400 to-gold-champagne'
                          : 'w-1.5 bg-white/20'
                      }`}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextPhoto}
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 flex items-center justify-center text-white active:scale-95"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Quick Selector Bar for all 3 images */}
            <div className="flex items-center gap-2 sm:gap-3 mt-4 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {LANDING_MEMORIES.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`relative w-12 sm:w-14 h-12 sm:h-14 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                    activePhotoIdx === idx
                      ? 'border-rose-400 ring-2 ring-rose-400/50 scale-105 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                      : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                  }`}
                  title={m.title}
                >
                  <img src={m.src} alt={m.title} className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/75 text-[8px] font-mono text-center text-white/90">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Parallax Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer group pt-4"
          onClick={() => {
            const nextElem = document.getElementById('milestone-stats');
            nextElem?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[11px] font-mono tracking-[0.25em] text-cream/60 group-hover:text-cream transition-colors uppercase flex items-center gap-1.5">
            <span>Scroll To Reveal Our Story</span>
          </span>
          <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/15 flex items-center justify-center text-rose-400 group-hover:text-rose-300 group-hover:border-rose-400/50 group-hover:scale-105 transition-all shadow-md">
            <ChevronDown className="w-4 h-4" />
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* PHASE 2: THE 5-YEAR MILESTONE & PILLARS REVEAL ON SCROLL  */}
      {/* ======================================================== */}
      <div id="milestone-stats" className="w-full max-w-4xl mx-auto flex flex-col items-center z-10 pt-16 sm:pt-24">
        {/* Cinematic Opening Quote */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="space-y-3 mb-12 sm:mb-14"
        >
          <p className="font-serif italic text-lg sm:text-2xl text-cream/75 font-light tracking-wide">
            “{BIRTHDAY_DATA.intro.quotePart1}”
          </p>
          <p className="font-serif text-xl sm:text-3xl lg:text-4xl text-cream font-normal tracking-wide">
            “{BIRTHDAY_DATA.intro.quotePart2}”
          </p>
        </motion.div>

        {/* 3 Pillar Stats / Staggered Big Reveal with 3D Float Hover */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6 w-full max-w-3xl mb-10 sm:mb-12">
          {/* Stat 1: 5 YEARS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={handleFiveClick}
            title="Click 5 times for a secret"
            className="doppelrand-shell cursor-pointer group hover:ring-gold-champagne/50 hover:shadow-[0_20px_45px_rgba(212,175,55,0.22)]"
          >
            <div className="doppelrand-core flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gold-light to-gold-champagne group-hover:scale-108 transition-transform duration-300">
                5
              </span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/70 group-hover:text-gold-champagne transition-colors uppercase flex items-center gap-1">
                <Star className="w-3 h-3 text-gold-champagne/60 group-hover:text-gold-champagne transition-colors" />
                YEARS
              </span>
              {clickCount > 0 && clickCount < 5 && (
                <span className="text-[10px] font-mono text-rose-300 mt-1 animate-pulse bg-rose-500/20 px-2 py-0.5 rounded-full">
                  {clickCount}/5 clicks
                </span>
              )}
            </div>
          </motion.div>

          {/* Stat 2: COUNTLESS MEMORIES */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="doppelrand-shell group hover:ring-rose-400/50 hover:shadow-[0_20px_45px_rgba(244,114,182,0.22)]"
          >
            <div className="doppelrand-core flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-200 to-rose-400 group-hover:scale-105 transition-transform duration-300">
                COUNTLESS
              </span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/70 group-hover:text-rose-300 transition-colors uppercase flex items-center gap-1">
                MEMORIES ✨
              </span>
            </div>
          </motion.div>

          {/* Stat 3: ONE AMAZING FRIEND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="doppelrand-shell group hover:ring-white/40 hover:shadow-[0_20px_45px_rgba(255,255,255,0.15)]"
          >
            <div className="doppelrand-core flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-cream to-gold-champagne group-hover:scale-105 transition-transform duration-300">
                ONE AMAZING
              </span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/70 group-hover:text-cream transition-colors uppercase flex items-center gap-1">
                FRIEND ❤️
              </span>
            </div>
          </motion.div>
        </div>

        {/* Enter Chapter 01 Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
      </div>
    </section>
  );
};


