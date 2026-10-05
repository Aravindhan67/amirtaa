import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Music, Upload, Play, Pause, Disc3, Settings2 } from 'lucide-react';

interface TamilTrack {
  id: string;
  title: string;
  movie: string;
  artist: string;
  tag: string;
}

const DEFAULT_TAMIL_TRACK: TamilTrack = {
  id: 'mustafa',
  title: 'Mustafa Mustafa / En Frienda Pola',
  movie: 'Kadhal Desam & Nanban',
  artist: 'A.R. Rahman & Harris Jayaraj',
  tag: 'Tamil Best Friend Anthem'
};

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.75);
  const [songTitle, setSongTitle] = useState<string>(DEFAULT_TAMIL_TRACK.title);
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Load user preference on mount
  useEffect(() => {
    const savedAudio = localStorage.getItem('amirtaa_custom_song_name');
    if (savedAudio) {
      setSongTitle(savedAudio);
    }
  }, []);

  // Built-in Synthesizer for "Mustafa Mustafa" (A.R. Rahman) & "En Frienda Pola"
  const playTamilFriendshipSynthesizer = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Melodic notes for "Mustafa Mustafa" (in A minor / C major) & "En Frienda Pola"
    // Notes format: [frequency in Hz, duration in seconds, pause in seconds]
    const mustafaMelody: [number, number, number][] = [
      // "Mus - ta - fa"
      [329.63, 0.28, 0.05], // E4
      [392.00, 0.28, 0.05], // G4
      [440.00, 0.65, 0.15], // A4

      // "Mus - ta - fa"
      [329.63, 0.28, 0.05], // E4
      [392.00, 0.28, 0.05], // G4
      [440.00, 0.65, 0.18], // A4

      // "Don't wor - ry Mus - ta - fa"
      [523.25, 0.28, 0.04], // C5
      [493.88, 0.28, 0.04], // B4
      [440.00, 0.28, 0.04], // A4
      [392.00, 0.28, 0.04], // G4
      [440.00, 0.90, 0.30], // A4

      // "Kaa - lam nam tho - zhan"
      [440.00, 0.28, 0.04], // A4
      [523.25, 0.28, 0.04], // C5
      [587.33, 0.38, 0.05], // D5
      [659.25, 0.38, 0.05], // E5
      [587.33, 0.38, 0.05], // D5

      // "Mus - ta - fa"
      [523.25, 0.28, 0.04], // C5
      [493.88, 0.28, 0.04], // B4
      [440.00, 0.95, 0.40], // A4

      // "En Friend-a po-la yaaru machan"
      [293.66, 0.26, 0.04], // D4
      [369.99, 0.26, 0.04], // F#4
      [440.00, 0.35, 0.05], // A4
      [493.88, 0.35, 0.05], // B4
      [440.00, 0.35, 0.05], // A4
      [369.99, 0.26, 0.04], // F#4
      [329.63, 0.26, 0.04], // E4
      [293.66, 0.85, 0.35], // D4
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!ctx || ctx.state === 'closed') return;

      const [freq, dur, pause] = mustafaMelody[noteIndex];

      // Dual oscillator for rich acoustic guitar/flute chime timbre
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + dur);

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, ctx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime); // 1 octave overtone

      const noteVolume = 0.045 * volume;
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(noteVolume, ctx.currentTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur + 0.15);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + dur + 0.2);
      osc2.stop(ctx.currentTime + dur + 0.2);

      noteIndex = (noteIndex + 1) % mustafaMelody.length;

      const nextInterval = (dur + pause) * 1000;
      synthTimerRef.current = window.setTimeout(playNextNote, nextInterval);
    };

    playNextNote();
  };

  const stopSynthesizer = () => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const startMusic = () => {
    setIsPlaying(true);
    localStorage.setItem('amirtaa_music_enabled', 'true');

    // If an MP3 audio source is loaded (either default file or user-uploaded), play it
    if (audioRef.current && (customAudioUrl || audioRef.current.src)) {
      audioRef.current.volume = volume;
      audioRef.current
        .play()
        .then(() => {
          stopSynthesizer();
        })
        .catch(() => {
          // Fallback to built-in acoustic Tamil friendship melody synthesizer
          playTamilFriendshipSynthesizer();
        });
    } else {
      playTamilFriendshipSynthesizer();
    }
  };

  const stopMusic = () => {
    setIsPlaying(false);
    localStorage.setItem('amirtaa_music_enabled', 'false');
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynthesizer();
  };

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      setCustomAudioUrl(objectUrl);
      setSongTitle(cleanName);
      localStorage.setItem('amirtaa_custom_song_name', cleanName);

      if (audioRef.current) {
        audioRef.current.src = objectUrl;
        audioRef.current.volume = volume;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          stopSynthesizer();
        }).catch(() => {});
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSynthesizer();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative group">
      {/* Hidden Audio Element for actual MP3 stream / file */}
      <audio
        ref={audioRef}
        src={customAudioUrl || '/audio/tamil-friendship-song.mp3'}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Hidden File Input for Custom Song Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/mp3,audio/mpeg,audio/wav,audio/m4a,audio/aac,audio/ogg"
        className="hidden"
      />

      {/* Main Floating Tamil Song Pill */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface-elevated/90 border border-white/15 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        {/* Toggle Sound Button */}
        <button
          onClick={toggleMusic}
          id="music-toggle-btn"
          aria-label={isPlaying ? "Mute Tamil background music" : "Play Tamil friendship background song"}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] transition-all text-xs font-medium text-cream active:scale-95"
        >
          {isPlaying ? (
            <>
              {/* Equalizer animation bars */}
              <div className="flex items-end gap-[2px] h-3.5 w-3.5 mr-0.5">
                <span className="w-[2.5px] bg-rose-400 rounded-full animate-[shimmer_0.7s_ease-in-out_infinite] h-2"></span>
                <span className="w-[2.5px] bg-gold-champagne rounded-full animate-[shimmer_1.0s_ease-in-out_infinite_0.15s] h-3.5"></span>
                <span className="w-[2.5px] bg-rose-300 rounded-full animate-[shimmer_0.8s_ease-in-out_infinite_0.35s] h-2.5"></span>
              </div>
              <Volume2 className="w-3.5 h-3.5 text-rose-300" />
              <div className="flex flex-col text-left leading-none max-w-[130px] sm:max-w-[180px]">
                <span className="text-[10px] font-mono text-gold-champagne tracking-wider truncate">
                  {songTitle}
                </span>
                <span className="text-[8px] font-mono text-cream/50 uppercase">
                  தமிழ் நட்பு பாடல்
                </span>
              </div>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-cream/50" />
              <span className="text-[11px] font-mono tracking-wider text-cream/70">
                PLAY TAMIL SONG
              </span>
            </>
          )}
        </button>

        {/* Settings / Upload Dropdown Toggle */}
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            showMenu
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-cream/50 hover:text-white hover:bg-white/[0.06]'
          }`}
          title="Song options & upload MP3"
          aria-label="Audio options"
        >
          <Settings2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Settings / Options Menu Drawer */}
      {showMenu && (
        <div className="absolute top-full mt-2.5 right-0 w-64 p-4 rounded-2xl bg-[#0e0e16]/98 border border-white/15 shadow-2xl backdrop-blur-3xl z-50 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-gold-champagne">
              <Disc3 className="w-3.5 h-3.5 animate-spin" />
              <span>TAMIL FRIENDSHIP BGM</span>
            </div>
            <span className="text-[9px] font-mono text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
              BEST FRIENDS
            </span>
          </div>

          {/* Currently Selected Track Info */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3 text-left">
            <span className="text-[9px] font-mono uppercase text-cream/40 block mb-0.5">
              Current Track
            </span>
            <p className="text-xs font-serif font-bold text-white truncate">
              {songTitle}
            </p>
            <p className="text-[10px] text-cream/60 font-light">
              Mustafa Mustafa • En Frienda Pola • Thozha
            </p>
          </div>

          {/* Volume Control */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-cream/60 mb-1">
              <span>VOLUME</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
          </div>

          {/* Upload Custom Tamil Song Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500/20 to-amber-500/20 hover:from-rose-500/30 hover:to-amber-500/30 border border-rose-400/30 text-xs font-mono text-cream hover:text-white transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Upload className="w-3.5 h-3.5 text-gold-champagne" />
            <span>Upload Your Song (MP3)</span>
          </button>
        </div>
      )}

      {/* Floating tooltip on first visit */}
      {!hasInteracted && !isPlaying && (
        <div className="absolute top-full mt-2.5 right-0 w-48 p-2.5 rounded-xl bg-surface-elevated/95 border border-white/15 shadow-2xl backdrop-blur-2xl pointer-events-none text-[11px] text-cream/80 text-center animate-pulse">
          <div className="flex items-center justify-center gap-1.5 text-gold-champagne font-medium mb-0.5">
            <Music className="w-3.5 h-3.5 text-rose-400" />
            <span>Tamil Friendship Song</span>
          </div>
          Click to play background anthem 🎵
        </div>
      )}
    </div>
  );
};

