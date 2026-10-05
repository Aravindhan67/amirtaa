import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BIRTHDAY_DATA } from '../data/content';
import {
  Gift,
  Sparkles,
  X,
  Heart,
  Code2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Upload,
  Film,
  PartyPopper
} from 'lucide-react';

export const BirthdaySurprise: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState(BIRTHDAY_DATA.surprise.video.url);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [durationTime, setDurationTime] = useState('0:00');
  const [showControls, setShowControls] = useState(true);
  const [customVideoUploaded, setCustomVideoUploaded] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hideControlsTimerRef = useRef<number | null>(null);

  const triggerLuxuryConfetti = () => {
    const count = 240;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#f5dfa8', '#d4af37', '#ffffff']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 35, startVelocity: 60 });
    fire(0.2, { spread: 70 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.85 });
    fire(0.1, { spread: 130, startVelocity: 35, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 135, startVelocity: 55 });
  };

  const handleOpenSurprise = () => {
    setIsOpen(true);
    triggerLuxuryConfetti();
    setTimeout(() => triggerLuxuryConfetti(), 900);

    // Try to auto-play video smoothly
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Browser requires user gesture or mute
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
      }
    }, 400);
  };

  const handleCloseSurprise = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setIsOpen(false);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);

    const format = (secs: number) => {
      const m = Math.floor(secs / 60);
      const s = Math.floor(secs % 60);
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    setCurrentTime(format(current));
    setDurationTime(format(total));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekPercentage = parseFloat(e.target.value);
    const seekTime = (seekPercentage / 100) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = seekTime;
    setProgress(seekPercentage);
  };

  const handleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoContainerRef.current.requestFullscreen();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setVideoSrc(objectUrl);
      setCustomVideoUploaded(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 200);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    hideControlsTimerRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  useEffect(() => {
    return () => {
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
  }, []);

  return (
    <section id="surprise" className="relative py-28 sm:py-36 px-4 sm:px-6 w-full max-w-4xl mx-auto text-center">
      {/* Hidden file input for uploading custom friend video */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="video/mp4,video/webm,video/ogg,video/quicktime"
        className="hidden"
      />

      {/* Teaser Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="doppelrand-shell max-w-2xl mx-auto hover:ring-rose-400/30 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      >
        <div className="doppelrand-core py-12 px-6 sm:px-12 bg-gradient-to-b from-[#13131c] to-[#0a0a0f] text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500/25 to-gold-champagne/25 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <Gift className="w-6 h-6 text-gold-champagne" />
          </motion.div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-3">
            Before You Go...
          </h2>

          <p className="text-sm sm:text-base text-cream/70 font-light max-w-md mx-auto mb-8">
            One final gesture to close this 5-year milestone with the celebration it truly deserves.
          </p>

          {/* Modernized Luxury Surprise CTA with Ambient Glow Aura */}
          <div className="relative inline-block">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 opacity-60 blur-xl animate-pulse" />
            <button
              onClick={handleOpenSurprise}
              id="surprise-trigger-btn"
              className="relative inline-flex items-center gap-2.5 px-9 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 hover:from-rose-600 hover:to-amber-500 text-white font-serif text-base tracking-wide shadow-[0_0_40px_rgba(244,63,94,0.45)] hover:shadow-[0_0_60px_rgba(244,63,94,0.7)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{BIRTHDAY_DATA.surprise.buttonPrompt}</span>
              <Sparkles className="w-4 h-4 text-gold-light animate-pulse" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Screen-Darkening Grand Surprise Modal with Cinematic Video Theater */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-[#07070a]/98 backdrop-blur-3xl overflow-y-auto"
          >
            {/* Ambient Cinema Lighting Glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-rose-500/10 blur-[120px] sm:blur-[160px]" />
              <div className="w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-gold-champagne/10 blur-[100px] sm:blur-[140px]" />
            </div>

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="relative max-w-3xl w-full bg-[#0d0d16] border border-white/20 rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.98)] my-auto max-h-[95vh] overflow-y-auto z-10"
            >
              {/* Top Header & Close Button */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-rose-400 animate-ping shrink-0" />
                  <span className="eyebrow-badge bg-rose-500/10 border-rose-500/20 text-rose-300 text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:px-3 sm:py-1">
                    <Film className="w-3 h-3 text-gold-champagne shrink-0" />
                    <span>Birthday Premiere</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload or change the video for Amirtaa"
                    className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[10px] sm:text-[11px] font-mono text-cream/70 hover:text-white transition-all"
                  >
                    <Upload className="w-3 h-3 text-gold-champagne shrink-0" />
                    <span>{customVideoUploaded ? 'Change' : 'Upload'}</span>
                  </button>

                  <button
                    onClick={handleCloseSurprise}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-cream flex items-center justify-center border border-white/10 transition-transform hover:scale-105"
                    aria-label="Close surprise window"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CINEMATIC VIDEO PLAYER THEATER (Uncropped, Full Frame) */}
              <div
                ref={videoContainerRef}
                onMouseMove={handleMouseMove}
                className="relative w-full max-h-[48vh] sm:max-h-[58vh] min-h-[200px] sm:min-h-[260px] rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.9)] group mb-4 sm:mb-6 flex items-center justify-center"
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                  playsInline
                  className="max-h-[46vh] sm:max-h-[56vh] max-w-full w-auto h-auto object-contain mx-auto cursor-pointer block rounded-lg sm:rounded-xl"
                />

                {/* Big Center Play/Pause Overlay Button when hovered or paused */}
                {(!isPlaying || showControls) && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/25 flex items-center justify-center text-white transition-all transform hover:scale-110 shadow-2xl z-20 pointer-events-auto"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 sm:w-7 sm:h-7 text-rose-300" />
                    ) : (
                      <Play className="w-5 h-5 sm:w-7 sm:h-7 text-gold-champagne translate-x-0.5" />
                    )}
                  </button>
                )}

                {/* Video Controls Bar Overlay */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-30 ${
                    showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {/* Progress Scrubber */}
                  <div className="relative mb-2 sm:mb-3 flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.1"
                      value={progress || 0}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose-400 hover:accent-rose-300"
                    />
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between text-xs font-mono text-cream/80">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={togglePlay}
                        className="hover:text-white transition-colors"
                        aria-label="Play/Pause"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="hover:text-white transition-colors"
                        aria-label="Mute/Unmute"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-rose-400" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>

                      <span className="text-[10px] sm:text-[11px] text-cream/60">
                        {currentTime} / {durationTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-[10px] uppercase tracking-wider text-gold-champagne/80 font-sans hidden sm:inline">
                        {BIRTHDAY_DATA.surprise.video.title}
                      </span>

                      <button
                        onClick={handleFullscreen}
                        className="hover:text-white transition-colors"
                        aria-label="Fullscreen"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Celebration Title & Tagline */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-2 leading-tight">
                  {BIRTHDAY_DATA.surprise.title}
                </h2>
                <p className="text-base sm:text-xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-gold-champagne font-light">
                  “{BIRTHDAY_DATA.surprise.tagline}”
                </p>
              </div>

              {/* Wishes List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left max-w-2xl mx-auto">
                {BIRTHDAY_DATA.surprise.wishes.map((wish, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-rose-400/30 transition-all"
                  >
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm font-light text-cream/90">{wish}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Throw Confetti & Replay */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  onClick={triggerLuxuryConfetti}
                  className="px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs font-mono text-gold-champagne transition-all active:scale-95 flex items-center gap-2"
                >
                  <PartyPopper className="w-3.5 h-3.5" />
                  <span>Throw More Confetti 🎉</span>
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className="px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs font-mono text-cream transition-all active:scale-95 flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Video 🎬</span>
                </button>

                <button
                  onClick={handleCloseSurprise}
                  className="px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-mono transition-all active:scale-95"
                >
                  <span>Close Premiere</span>
                </button>
              </div>

              {/* Developer Joke Note */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-center gap-2 text-xs font-mono text-cream/40 text-center">
                <Code2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>{BIRTHDAY_DATA.surprise.devJoke}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

