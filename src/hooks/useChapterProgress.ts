import { useState, useEffect } from 'react';

export const TOTAL_CHAPTERS = 6; // 0: Intro, 1: Story, 2: Ups & Downs, 3: Memories, 4: Appreciation, 5: Letter, 6: Surprise

export interface ChapterMeta {
  id: string;
  number: number;
  title: string;
  tagline: string;
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 'intro', number: 0, title: 'Cinematic Intro', tagline: 'The Beginning of Our Story' },
  { id: 'story', number: 1, title: 'Our Story', tagline: 'Five Years of Us' },
  { id: 'ups-and-downs', number: 2, title: 'Ups & Downs', tagline: 'Steadfast Companionship' },
  { id: 'memories', number: 3, title: 'Memory Vault', tagline: 'Snapshots of Pure Joy' },
  { id: 'appreciation', number: 4, title: '5 Things', tagline: 'Why You Are Irreplaceable' },
  { id: 'message', number: 5, title: 'The Little Message', tagline: 'Words From The Heart' },
  { id: 'surprise', number: 6, title: 'Final Surprise', tagline: 'Happy Birthday Amirtaa' },
];

export const useChapterProgress = () => {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('amirtaa_unlocked_level');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        return isNaN(parsed) ? 0 : Math.min(Math.max(parsed, 0), TOTAL_CHAPTERS);
      }
    } catch {
      // ignore
    }
    return 0; // Starts at 0 (Only Intro visible)
  });

  useEffect(() => {
    try {
      localStorage.setItem('amirtaa_unlocked_level', unlockedLevel.toString());
    } catch {
      // ignore
    }
  }, [unlockedLevel]);

  const unlockChapter = (chapterNum: number) => {
    setUnlockedLevel((prev) => {
      const nextLevel = Math.max(prev, chapterNum);
      return Math.min(nextLevel, TOTAL_CHAPTERS);
    });
  };

  const unlockNext = (fromChapterNum: number) => {
    const nextChapter = fromChapterNum + 1;
    unlockChapter(nextChapter);

    // Smoothly scroll once to the newly unlocked chapter
    requestAnimationFrame(() => {
      const targetMeta = CHAPTERS[nextChapter];
      if (targetMeta) {
        const el = document.getElementById(targetMeta.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  };

  const isUnlocked = (chapterNum: number) => unlockedLevel >= chapterNum;

  const resetProgress = () => {
    setUnlockedLevel(0);
    localStorage.removeItem('amirtaa_unlocked_level');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unlockAll = () => {
    setUnlockedLevel(TOTAL_CHAPTERS);
  };

  return {
    unlockedLevel,
    unlockChapter,
    unlockNext,
    isUnlocked,
    resetProgress,
    unlockAll,
    totalChapters: TOTAL_CHAPTERS,
    progressPercentage: Math.round((unlockedLevel / TOTAL_CHAPTERS) * 100),
  };
};
