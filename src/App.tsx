import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './components/ParticleBackground';
import { MusicToggle } from './components/MusicToggle';
import { Hero } from './sections/Hero';
import { StoryTimeline } from './sections/StoryTimeline';
import { UpsAndDowns } from './sections/UpsAndDowns';
import { MemoryGallery } from './sections/MemoryGallery';
import { AppreciationCards } from './sections/AppreciationCards';
import { FinalMessage } from './sections/FinalMessage';
import { BirthdaySurprise } from './sections/BirthdaySurprise';
import { EasterEggs } from './components/EasterEggs';
import { LockedChapterCard } from './components/LockedChapterCard';
import { useChapterProgress } from './hooks/useChapterProgress';

export const App: React.FC = () => {
  const {
    unlockedLevel,
    unlockNext,
    isUnlocked,
  } = useChapterProgress();

  const [fiveYearsUnlocked, setFiveYearsUnlocked] = useState(false);
  const [secretButtonTriggered, setSecretButtonTriggered] = useState(false);

  return (
    <div className="relative min-h-[100dvh] bg-[#07070a] text-[#fbfaf7] overflow-x-hidden selection:bg-rose-500/30 selection:text-white">
      {/* Background Stardust & Radial Glows */}
      <ParticleBackground />

      {/* Film Grain Texture Overlay */}
      <div className="noise-overlay" />

      {/* Discreet Floating Ambient Music Toggle in Top-Right */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-40">
        <MusicToggle />
      </div>

      {/* Main Content Sections with Sequential Progressive Unlocking */}
      <main className="relative flex flex-col items-center w-full">
        {/* Chapter 00: Cinematic Intro (Always Unlocked) */}
        <Hero
          onUnlockFiveYearEgg={() => setFiveYearsUnlocked(true)}
          onEnterStory={() => unlockNext(0)}
        />

        {/* Chapter 01: Our Story (5-Year Timeline) */}
        <AnimatePresence>
          {isUnlocked(1) ? (
            <motion.div
              key="chapter-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              <StoryTimeline
                onUnlockNext={() => unlockNext(1)}
                isNextUnlocked={isUnlocked(2)}
              />
            </motion.div>
          ) : unlockedLevel === 0 ? (
            <LockedChapterCard
              chapterNumber={1}
              title="Our Story: Five Years of Us"
              tagline="A Chronicle of Half a Decade"
              previousChapterTitle="Cinematic Intro"
            />
          ) : null}
        </AnimatePresence>

        {/* Chapter 02: Through the Ups & Downs */}
        <AnimatePresence>
          {isUnlocked(2) ? (
            <motion.div
              key="chapter-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              <UpsAndDowns
                onUnlockNext={() => unlockNext(2)}
                isNextUnlocked={isUnlocked(3)}
              />
            </motion.div>
          ) : unlockedLevel === 1 ? (
            <LockedChapterCard
              chapterNumber={2}
              title="Through the Ups & Downs"
              tagline="Steadfast Companionship"
              previousChapterTitle="Chapter 01: Our Story"
            />
          ) : null}
        </AnimatePresence>

        {/* Chapter 03: Memory Vault (Polaroids & Lightbox) */}
        <AnimatePresence>
          {isUnlocked(3) ? (
            <motion.div
              key="chapter-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              <MemoryGallery
                onUnlockNext={() => unlockNext(3)}
                isNextUnlocked={isUnlocked(4)}
              />
            </motion.div>
          ) : unlockedLevel === 2 ? (
            <LockedChapterCard
              chapterNumber={3}
              title="Memory Vault"
              tagline="Snapshots of Shared Adventures"
              previousChapterTitle="Chapter 02: Ups & Downs"
            />
          ) : null}
        </AnimatePresence>

        {/* Chapter 04: 5 Things I Appreciate About You */}
        <AnimatePresence>
          {isUnlocked(4) ? (
            <motion.div
              key="chapter-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              <AppreciationCards
                onUnlockNext={() => unlockNext(4)}
                isNextUnlocked={isUnlocked(5)}
              />
            </motion.div>
          ) : unlockedLevel === 3 ? (
            <LockedChapterCard
              chapterNumber={4}
              title="5 Things I Appreciate About You"
              tagline="A Few Reasons Why You're Irreplaceable"
              previousChapterTitle="Chapter 03: Memory Vault"
            />
          ) : null}
        </AnimatePresence>

        {/* Chapter 05: The Little Message (Typewriter Letter) */}
        <AnimatePresence>
          {isUnlocked(5) ? (
            <motion.div
              key="chapter-5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              <FinalMessage
                onUnlockNext={() => unlockNext(5)}
                isNextUnlocked={isUnlocked(6)}
              />
            </motion.div>
          ) : unlockedLevel === 4 ? (
            <LockedChapterCard
              chapterNumber={5}
              title="The Little Message"
              tagline="A Note From The Heart"
              previousChapterTitle="Chapter 04: 5 Things"
            />
          ) : null}
        </AnimatePresence>

        {/* Chapter 06: Final Birthday Surprise & Video Premiere */}
        <AnimatePresence>
          {isUnlocked(6) ? (
            <motion.div
              key="chapter-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className="w-full"
            >
              <BirthdaySurprise />
            </motion.div>
          ) : unlockedLevel === 5 ? (
            <LockedChapterCard
              chapterNumber={6}
              title="Final Surprise"
              tagline="One Last Thing..."
              previousChapterTitle="Chapter 05: The Little Message"
            />
          ) : null}
        </AnimatePresence>
      </main>

      {/* Easter Eggs Modals & Triggers */}
      <EasterEggs
        fiveYearsUnlocked={fiveYearsUnlocked}
        onCloseFiveYears={() => setFiveYearsUnlocked(false)}
        secretButtonTriggered={secretButtonTriggered}
        onCloseSecretButton={() => setSecretButtonTriggered(false)}
        onOpenSecretButton={() => setSecretButtonTriggered(true)}
      />
    </div>
  );
};

export default App;
