import { create } from 'zustand';
import { getUser, saveUser, getProgress, saveProgress, updateStreak, User, PathProgress, LessonProgress } from '@/lib/storage';

interface ProgressState {
  user: User;
  progress: PathProgress;
  currentLessonIndex: number;
  userId: string | null;
  
  // Actions
  initializeFromStorage: (userId: string) => void;
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
  userId: null,

  initializeFromStorage: (userId: string) => {
    const user = getUser(userId);
    const progress = getProgress(userId);
    const updatedUser = updateStreak(user);
    
    if (updatedUser.lastActiveISO !== user.lastActiveISO || updatedUser.streak !== user.streak) {
      saveUser(userId, updatedUser);
    }
    
    set({ user: updatedUser, progress, userId });
  },

  setCurrentLesson: (index: number) => {
    set({ currentLessonIndex: index });
  },

  markLessonPassed: (lessonId: string, xpGained: number) => {
    const { user, progress, userId } = get();
    if (!userId) return;
    
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
    
    saveUser(userId, updatedUser);
    saveProgress(userId, updatedProgress);
    set({ user: updatedUser, progress: updatedProgress });
  },

  incrementAttempts: (lessonId: string) => {
    const { progress, userId } = get();
    if (!userId) return;
    
    const updatedProgress = {
      ...progress,
      [lessonId]: {
        passed: progress[lessonId]?.passed || false,
        attempts: (progress[lessonId]?.attempts || 0) + 1,
      },
    };
    
    saveProgress(userId, updatedProgress);
    set({ progress: updatedProgress });
  },

  decrementHeart: () => {
    const { user, userId } = get();
    if (!userId) return;
    
    const updatedUser = {
      ...user,
      hearts: Math.max(0, user.hearts - 1),
    };
    saveUser(userId, updatedUser);
    set({ user: updatedUser });
  },

  saveCode: (lessonId: string, code: string) => {
    const { progress, userId } = get();
    if (!userId) return;
    
    const updatedProgress = {
      ...progress,
      [lessonId]: {
        ...progress[lessonId],
        passed: progress[lessonId]?.passed || false,
        attempts: progress[lessonId]?.attempts || 0,
        lastCode: code,
      },
    };
    
    saveProgress(userId, updatedProgress);
    set({ progress: updatedProgress });
  },
}));
