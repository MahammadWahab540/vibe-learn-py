import { create } from 'zustand';
import { getUser, saveUser, getProgress, saveProgress, updateStreak, User, PathProgress, LessonProgress } from '@/lib/storage';

interface ProgressState {
  user: User;
  progress: PathProgress;
  currentLessonIndex: number;
  
  // Actions
  initializeFromStorage: () => void;
  setCurrentLesson: (index: number) => void;
  markLessonPassed: (lessonId: string, xpGained: number) => void;
  incrementAttempts: (lessonId: string) => void;
  decrementHeart: () => void;
  saveCode: (lessonId: string, code: string) => void;
}

export const useProgress = create<ProgressState>((set, get) => ({
  user: {
    name: 'Learner',
    xp: 0,
    hearts: 5,
    streak: 1,
    lastActiveISO: new Date().toISOString().split('T')[0],
  },
  progress: {},
  currentLessonIndex: 0,

  initializeFromStorage: () => {
    const user = getUser();
    const progress = getProgress();
    const updatedUser = updateStreak(user);
    
    if (updatedUser.lastActiveISO !== user.lastActiveISO) {
      saveUser(updatedUser);
    }
    
    set({ user: updatedUser, progress });
  },

  setCurrentLesson: (index: number) => {
    set({ currentLessonIndex: index });
  },

  markLessonPassed: (lessonId: string, xpGained: number) => {
    const { user, progress } = get();
    
    const updatedUser = {
      ...user,
      xp: user.xp + xpGained,
    };
    
    const updatedProgress = {
      ...progress,
      [lessonId]: {
        passed: true,
        attempts: (progress[lessonId]?.attempts || 0) + 1,
      },
    };
    
    saveUser(updatedUser);
    saveProgress(updatedProgress);
    set({ user: updatedUser, progress: updatedProgress });
  },

  incrementAttempts: (lessonId: string) => {
    const { progress } = get();
    
    const updatedProgress = {
      ...progress,
      [lessonId]: {
        passed: progress[lessonId]?.passed || false,
        attempts: (progress[lessonId]?.attempts || 0) + 1,
      },
    };
    
    saveProgress(updatedProgress);
    set({ progress: updatedProgress });
  },

  decrementHeart: () => {
    const { user } = get();
    const updatedUser = {
      ...user,
      hearts: Math.max(0, user.hearts - 1),
    };
    saveUser(updatedUser);
    set({ user: updatedUser });
  },

  saveCode: (lessonId: string, code: string) => {
    const { progress } = get();
    
    const updatedProgress = {
      ...progress,
      [lessonId]: {
        ...progress[lessonId],
        passed: progress[lessonId]?.passed || false,
        attempts: progress[lessonId]?.attempts || 0,
        lastCode: code,
      },
    };
    
    saveProgress(updatedProgress);
    set({ progress: updatedProgress });
  },
}));
