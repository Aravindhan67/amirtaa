import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Load user preference on mount
  useEffect(() => {
    const savedPref = localStorage.getItem('amirtaa_music_enabled');
    if (savedPref === 'true') {
      // User previously opted in, but browsers block sound before user gesture
      // So we show indicator ready
    }
  }, []);

  // Ambient chord progression in gentle harmonic series (Fmaj9, Dm9, Bbmaj7, Csus2)
  const playAmbientArpeggio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // F frequencies: F3, A3, C4, E4, G4, D4, Bb3, etc.
    const chordSequences = [
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
      [146.83, 220.00, 261.63, 349.23, 440.00], // Dm9
      [116.54, 174.61, 233.08, 293.66, 349.23], // Bbmaj7
      [130.81, 196.00, 261.63, 293.66, 392.00], // Csus2/9
    ];

    let currentChordIndex = 0;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!ctx || ctx.state === 'closed') return;

      const chord = chordSequences[currentChordIndex];
      const freq = chord[noteIndex];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm sound with low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 2.8);

      // Sine wave with slight harmonics for a music-box/celeste bell tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.3);

      noteIndex++;
      if (noteIndex >= chord.length) {
        noteIndex = 0;
        currentChordIndex = (currentChordIndex + 1) % chordSequences.length;
      }

      const nextInterval = 450 + Math.random() * 250;
      timerRef.current = window.setTimeout(playNextNote, nextInterval);
    };

    playNextNote();
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
      localStorage.setItem('amirtaa_music_enabled', 'false');
    } else {
      playAmbientArpeggio();
      setIsPlaying(true);
      localStorage.setItem('amirtaa_music_enabled', 'true');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative group">
      <button
        onClick={toggleMusic}
        id="music-toggle-btn"
        aria-label={isPlaying ? "Mute ambient music" : "Play cinematic ambient soundtrack"}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 backdrop-blur-xl transition-all duration-300 text-xs font-medium text-cream/80 hover:text-cream shadow-lg active:scale-95"
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-[2px] h-3.5 w-3.5 mr-0.5">
              <span className="w-[2px] bg-rose-400 rounded-full animate-[shimmer_0.8s_ease-in-out_infinite] h-2"></span>
              <span className="w-[2px] bg-gold-champagne rounded-full animate-[shimmer_1.1s_ease-in-out_infinite_0.2s] h-3.5"></span>
              <span className="w-[2px] bg-rose-300 rounded-full animate-[shimmer_0.9s_ease-in-out_infinite_0.4s] h-1.5"></span>
            </div>
            <Volume2 className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden sm:inline text-rose-200/90 font-mono text-[11px] tracking-wider">SOUND ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-cream/50 group-hover:text-cream/80" />
            <span className="hidden sm:inline font-mono text-[11px] tracking-wider text-cream/60 group-hover:text-cream/80">SOUND OFF</span>
          </>
        )}
      </button>

      {/* Floating tooltip on first visit */}
      {!hasInteracted && !isPlaying && (
        <div className="absolute top-full mt-2 right-0 w-44 p-2 rounded-xl bg-surface-elevated/95 border border-white/10 shadow-2xl backdrop-blur-2xl pointer-events-none text-[11px] text-cream/70 text-center animate-pulse-subtle">
          <div className="flex items-center justify-center gap-1 text-gold-champagne font-medium mb-0.5">
            <Sparkles className="w-3 h-3" />
            <span>Best with sound</span>
          </div>
          Click to enable ambient music
        </div>
      )}
    </div>
  );
};
