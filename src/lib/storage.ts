export interface User {
  name: string;
  xp: number;
  hearts: number;
  streak: number;
  lastActiveISO: string;
}

export interface LessonProgress {
  passed: boolean;
  attempts: number;
  lastCode?: string;
}

export interface PathProgress {
  [lessonId: string]: LessonProgress;
}

const STORAGE_KEYS = {
  USER: 'vc:user',
  PROGRESS: 'vc:progress:python_basics_v1',
  SETTINGS: 'vc:settings',
} as const;

export const getUser = (): User => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to read user from storage', e);
  }

  const today = new Date().toISOString().split('T')[0];
  return {
    name: 'Learner',
    xp: 0,
    hearts: 5,
    streak: 1,
    lastActiveISO: today,
  };
};

export const saveUser = (user: User): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user', e);
  }
};

export const getProgress = (): PathProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to read progress', e);
  }
  return {};
};

export const saveProgress = (progress: PathProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

export const updateStreak = (user: User): User => {
  const today = new Date().toISOString().split('T')[0];
  if (user.lastActiveISO !== today) {
    return {
      ...user,
      streak: user.streak + 1,
      lastActiveISO: today,
    };
  }
  return user;
};
