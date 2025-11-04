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

const getUserKey = (userId: string) => `vc:user:${userId}`;
const getProgressKey = (userId: string) => `vc:progress:${userId}:python_basics_v1`;

export const getUser = (userId: string): User => {
  try {
    const stored = localStorage.getItem(getUserKey(userId));
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

export const saveUser = (userId: string, user: User): void => {
  try {
    localStorage.setItem(getUserKey(userId), JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user', e);
  }
};

export const getProgress = (userId: string): PathProgress => {
  try {
    const stored = localStorage.getItem(getProgressKey(userId));
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to read progress', e);
  }
  return {};
};

export const saveProgress = (userId: string, progress: PathProgress): void => {
  try {
    localStorage.setItem(getProgressKey(userId), JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

export const updateStreak = (user: User): User => {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = new Date(user.lastActiveISO);
  const todayDate = new Date(today);
  
  // Calculate difference in days
  const diffTime = todayDate.getTime() - lastActive.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    // Same day, no change
    return user;
  } else if (diffDays === 1) {
    // Next day, increment streak
    return {
      ...user,
      streak: user.streak + 1,
      lastActiveISO: today,
    };
  } else {
    // Missed a day or more, reset streak to 1
    return {
      ...user,
      streak: 1,
      lastActiveISO: today,
    };
  }
};
