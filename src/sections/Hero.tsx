import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_DATA } from '../data/content';
import { Sparkles, ChevronDown, Clock, Star, Heart, Crown, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

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

interface FloatingSpark {
  id: number;
  text: string;
}

const YEAR_MILESTONES = [
  '✨ Year 1: First Spark & College Beginnings',
  '😂 Year 2: Inside Jokes & Nonstop Rants',
  '💛 Year 3: Unshakable Trust & Real Support',
  '🌟 Year 4: Ride or Die Through Every Storm',
  '🎉 Year 5 & Forever: Lifelong Best Friends Forever!',
];

const MEMORY_SNIPPETS = [
  '💖 10,000+ Shared Laughs!',
  '☕ Endless Chai & Gossip Sessions',
  '📸 A Million Candid Snaps',
  '🚀 The Best Late-Night Phone Calls',
  '✨ Priceless Memories We Cherish',
];

const FRIEND_SNIPPETS = [
  '👑 The Most Genuine Human Being',
  '💎 Rare, Pure & Irreplaceable',
  '❤️ A Friend Who Became Family',
  '🌟 Always Standing In My Corner',
  '🕊️ 5 Years Down, Forever To Go',
];

// Audio chime generator using Web Audio API (zero external assets, works seamlessly)
const playChime = (pitchIndex: number, toneType: 'gold' | 'rose' | 'cream' = 'gold') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (toneType === 'gold' && pitchIndex >= 5) {
      // Fanfare celebratory arpeggio for 5th tap
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.2, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
      return;
    }

    const freqs = toneType === 'rose'
      ? [440, 554.37, 659.25, 880]
      : [523.25, 587.33, 659.25, 783.99, 880];
    const baseFreq = freqs[(pitchIndex - 1 + freqs.length) % freqs.length];

    [baseFreq, baseFreq * 2].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(idx === 0 ? 0.22 : 0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    });
  } catch {
    // AudioContext blocked or not supported
  }
};

interface HeroProps {
  onUnlockFiveYearEgg: () => void;
  onEnterStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onUnlockFiveYearEgg, onEnterStory }) => {
  const [clickCount, setClickCount] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(1); // Default to the traditional milestone photo
  const containerRef = useRef<HTMLElement | null>(null);

  // 5 YEARS Button Effects State
  const fiveButtonRef = useRef<HTMLDivElement | null>(null);
  const [floatingSparks, setFloatingSparks] = useState<FloatingSpark[]>([]);
  const [ripples, setRipples] = useState<number[]>([]);
  const [isBumping, setIsBumping] = useState(false);

  // Other Stat Cards interactive effects
  const memoryCardRef = useRef<HTMLDivElement | null>(null);
  const [floatingMemory, setFloatingMemory] = useState<FloatingSpark[]>([]);
  const [memoryClickCount, setMemoryClickCount] = useState(0);

  const friendCardRef = useRef<HTMLDivElement | null>(null);
  const [floatingFriend, setFloatingFriend] = useState<FloatingSpark[]>([]);
  const [friendClickCount, setFriendClickCount] = useState(0);

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

  const handleFiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    // Audio chime
    playChime(nextCount, 'gold');

    // Trigger bump animation
    setIsBumping(true);
    setTimeout(() => setIsBumping(false), 450);

    // Trigger ripple
    setRipples((prev) => [...prev.slice(-2), Date.now()]);

    // Floating year milestone text
    const sparkText = YEAR_MILESTONES[(nextCount - 1) % YEAR_MILESTONES.length];
    const newSpark: FloatingSpark = {
      id: Date.now() + Math.random(),
      text: sparkText,
    };
    setFloatingSparks((prev) => [...prev.slice(-2), newSpark]);
    setTimeout(() => {
      setFloatingSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 1800);

    // Confetti particles at button position
    const rect = fiveButtonRef.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.6 };

    if (nextCount < 5) {
      confetti({
        particleCount: 22 + nextCount * 6,
        spread: 50 + nextCount * 8,
        origin,
        colors: ['#FAE8B2', '#D4AF37', '#FFFFFF', '#FB7185', '#F59E0B'],
        ticks: 65,
        gravity: 0.85,
        scalar: 0.85,
      });
    } else {
      // 5th click grand celebration!
      confetti({
        particleCount: 110,
        spread: 90,
        origin,
        colors: ['#FAE8B2', '#D4AF37', '#FFFFFF', '#FB7185', '#F59E0B', '#E11D48'],
        ticks: 120,
        gravity: 0.65,
        scalar: 1.15,
      });

      // Unlock modal after short celebratory moment
      setTimeout(() => {
        onUnlockFiveYearEgg();
        setClickCount(0);
      }, 400);
    }
  };

  const handleMemoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = memoryClickCount + 1;
    setMemoryClickCount(next);
    playChime(next, 'rose');

    const rect = memoryCardRef.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.6 };

    confetti({
      particleCount: 25,
      spread: 60,
      origin,
      colors: ['#F472B6', '#FB7185', '#FDA4AF', '#FFFFFF'],
      ticks: 60,
      gravity: 0.9,
      scalar: 0.9,
    });

    const text = MEMORY_SNIPPETS[(next - 1) % MEMORY_SNIPPETS.length];
    const newSpark: FloatingSpark = { id: Date.now() + Math.random(), text };
    setFloatingMemory((prev) => [...prev.slice(-1), newSpark]);
    setTimeout(() => {
      setFloatingMemory((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 1600);
  };

  const handleFriendClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = friendClickCount + 1;
    setFriendClickCount(next);
    playChime(next, 'cream');

    const rect = friendCardRef.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.6 };

    confetti({
      particleCount: 25,
      spread: 60,
      origin,
      colors: ['#FAE8B2', '#FFFFFF', '#D4AF37', '#FDE047'],
      ticks: 60,
      gravity: 0.9,
      scalar: 0.9,
    });

    const text = FRIEND_SNIPPETS[(next - 1) % FRIEND_SNIPPETS.length];
    const newSpark: FloatingSpark = { id: Date.now() + Math.random(), text };
    setFloatingFriend((prev) => [...prev.slice(-1), newSpark]);
    setTimeout(() => {
      setFloatingFriend((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 1600);
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
          {/* Stat 1: 5 YEARS (Interactive Button with Click Effects) */}
          <motion.div
            ref={fiveButtonRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleFiveClick}
            title="Click 5 times to unlock our 5-year secret!"
            className={`doppelrand-shell cursor-pointer group relative select-none transition-all duration-300 ${
              clickCount > 0
                ? 'ring-2 ring-gold-champagne/60 shadow-[0_0_35px_rgba(212,175,55,0.4)]'
                : 'hover:ring-gold-champagne/50 hover:shadow-[0_20px_45px_rgba(212,175,55,0.25)]'
            }`}
          >
            {/* Floating Milestone Badge on Click */}
            <AnimatePresence>
              {floatingSparks.map((spark) => (
                <motion.div
                  key={spark.id}
                  initial={{ opacity: 0, y: 12, scale: 0.8 }}
                  animate={{ opacity: 1, y: -46, scale: 1.05 }}
                  exit={{ opacity: 0, y: -68, scale: 0.9 }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-full border border-gold-champagne/60 bg-[#101018]/95 px-3 py-1 text-[11px] font-mono font-medium text-gold-champagne shadow-[0_4px_30px_rgba(212,175,55,0.5)] backdrop-blur-md flex items-center gap-1.5"
                >
                  <span>{spark.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="doppelrand-core flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              {/* Expanding Ripple Rings on Click */}
              {ripples.map((ripId) => (
                <motion.span
                  key={ripId}
                  initial={{ scale: 0.45, opacity: 0.9 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-2xl border-2 border-gold-champagne/80 pointer-events-none"
                />
              ))}

              {/* Dynamic Aura Glow behind Number */}
              <div
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, rgba(212,175,55,${0.08 + clickCount * 0.1}) 0%, transparent 75%)`,
                  opacity: clickCount > 0 ? 1 : 0.4,
                }}
              />

              {/* Bouncing Animated 5 */}
              <motion.span
                animate={
                  isBumping
                    ? {
                        scale: [1, 1.38, 0.92, 1.15, 1],
                        rotate: [0, -8, 8, -4, 0],
                        filter: [
                          'drop-shadow(0 0 0px #fae8b2)',
                          'drop-shadow(0 0 25px #fae8b2)',
                          'drop-shadow(0 0 8px #fae8b2)',
                        ],
                      }
                    : { scale: 1 }
                }
                transition={{ duration: 0.45 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gold-light to-gold-champagne select-none"
              >
                5
              </motion.span>

              {/* Label */}
              <span className="mt-1 sm:mt-1.5 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/80 group-hover:text-gold-champagne transition-colors uppercase flex items-center gap-1.5 font-semibold">
                <Star
                  className={`w-3.5 h-3.5 transition-all duration-300 ${
                    clickCount > 0
                      ? 'text-gold-champagne fill-gold-champagne scale-110'
                      : 'text-gold-champagne/70 group-hover:text-gold-champagne'
                  }`}
                />
                YEARS
              </span>

              {/* 5-Step Gem Progress Tracker */}
              <div className="flex items-center gap-1.5 mt-2.5">
                {[1, 2, 3, 4, 5].map((step) => {
                  const isFilled = clickCount >= step;
                  return (
                    <motion.div
                      key={step}
                      animate={
                        isFilled
                          ? { scale: [1, 1.5, 1.1], rotate: [0, 90, 0] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isFilled
                          ? 'bg-gradient-to-br from-gold-champagne to-amber-400 shadow-[0_0_10px_#fae8b2] scale-110 ring-1 ring-gold-champagne'
                          : 'bg-white/10 border border-white/20'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Interactive Feedback Pill */}
              <div className="mt-2 flex items-center justify-center min-h-[20px]">
                <span
                  className={`text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full transition-all duration-300 flex items-center gap-1 ${
                    clickCount === 0
                      ? 'text-cream/50 group-hover:text-gold-champagne/90 group-hover:bg-gold-champagne/10'
                      : clickCount === 4
                      ? 'bg-rose-500/25 text-rose-300 border border-rose-400/40 animate-bounce'
                      : 'bg-gold-champagne/15 text-gold-champagne border border-gold-champagne/30'
                  }`}
                >
                  {clickCount === 0 && '✨ Tap to celebrate'}
                  {clickCount === 1 && '1/5 • Year 1 locked in'}
                  {clickCount === 2 && '2/5 • Laughs & rants'}
                  {clickCount === 3 && '3/5 • Getting warmer! 🔥'}
                  {clickCount === 4 && '⚡ 4/5 • ONE MORE TAP!'}
                  {clickCount >= 5 && '🎉 Unlocking Secret...'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Stat 2: COUNTLESS MEMORIES */}
          <motion.div
            ref={memoryCardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleMemoryClick}
            title="Click for memory sparks!"
            className="doppelrand-shell cursor-pointer group hover:ring-rose-400/50 hover:shadow-[0_20px_45px_rgba(244,114,182,0.25)] relative select-none"
          >
            <AnimatePresence>
              {floatingMemory.map((spark) => (
                <motion.div
                  key={spark.id}
                  initial={{ opacity: 0, y: 12, scale: 0.8 }}
                  animate={{ opacity: 1, y: -46, scale: 1.05 }}
                  exit={{ opacity: 0, y: -68, scale: 0.9 }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-full border border-rose-400/60 bg-[#140e16]/95 px-3 py-1 text-[11px] font-mono font-medium text-rose-300 shadow-[0_4px_30px_rgba(244,114,182,0.45)] backdrop-blur-md flex items-center gap-1.5"
                >
                  <span>{spark.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="doppelrand-core flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-rose-200 to-rose-400 group-hover:scale-105 transition-transform duration-300">
                COUNTLESS
              </span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/70 group-hover:text-rose-300 transition-colors uppercase flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400/70 group-hover:text-rose-300 transition-colors fill-rose-400/20" />
                MEMORIES ✨
              </span>
              <div className="mt-2 text-[10px] font-mono tracking-wider text-rose-300/60 group-hover:text-rose-300 transition-colors">
                {memoryClickCount > 0 ? `${memoryClickCount} moments tapped 💖` : '✨ Tap for memories'}
              </div>
            </div>
          </motion.div>

          {/* Stat 3: ONE AMAZING FRIEND */}
          <motion.div
            ref={friendCardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            onClick={handleFriendClick}
            title="Click to celebrate our bond!"
            className="doppelrand-shell cursor-pointer group hover:ring-white/40 hover:shadow-[0_20px_45px_rgba(255,255,255,0.2)] relative select-none"
          >
            <AnimatePresence>
              {floatingFriend.map((spark) => (
                <motion.div
                  key={spark.id}
                  initial={{ opacity: 0, y: 12, scale: 0.8 }}
                  animate={{ opacity: 1, y: -46, scale: 1.05 }}
                  exit={{ opacity: 0, y: -68, scale: 0.9 }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap rounded-full border border-gold-champagne/40 bg-[#16141c]/95 px-3 py-1 text-[11px] font-mono font-medium text-cream shadow-[0_4px_30px_rgba(255,255,255,0.3)] backdrop-blur-md flex items-center gap-1.5"
                >
                  <span>{spark.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="doppelrand-core flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 bg-gradient-to-b from-[#14141f] to-[#0c0c14] relative overflow-hidden">
              <span className="text-xl sm:text-3xl lg:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-cream to-gold-champagne group-hover:scale-105 transition-transform duration-300">
                ONE AMAZING
              </span>
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-mono tracking-[0.25em] text-cream/70 group-hover:text-cream transition-colors uppercase flex items-center gap-1">
                <Crown className="w-3 h-3 text-gold-champagne/70 group-hover:text-gold-champagne transition-colors" />
                FRIEND ❤️
              </span>
              <div className="mt-2 text-[10px] font-mono tracking-wider text-cream/50 group-hover:text-cream/90 transition-colors">
                {friendClickCount > 0 ? `${friendClickCount} cheers sent 👑` : '✨ Tap to celebrate'}
              </div>
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


