import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { TopBar } from '@/components/TopBar';
import { Instruction } from '@/components/Instruction';
import { FtgChoices } from '@/components/FtgChoices';
import { CodeEditor } from '@/components/CodeEditor';
import { BottomCheckBar } from '@/components/BottomCheckBar';
import { PathDrawer } from '@/components/PathDrawer';
import { LottieCharacter } from '@/components/LottieCharacter';
import { useProgress } from '@/store/useProgress';
import { runChecks } from '@/lib/checks';
import { toast } from 'sonner';
import pathData from '@/content/python_path_v1.json';

type Lesson = {
  id: string;
  type: 'ftg' | 'code';
  title: string;
  instructions: string[];
  xp: number;
  choices?: string[];
  correctIndex?: number;
  starter?: string;
  checks?: any[];
};

export default function Learn() {
  const navigate = useNavigate();
  const { isLoaded, user: clerkUser } = useUser();
  const { user, progress, currentLessonIndex, initializeFromStorage, setCurrentLesson, markLessonPassed, incrementAttempts, decrementHeart, saveCode } = useProgress();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checking, setChecking] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [userCode, setUserCode] = useState('');
  const [lottieState, setLottieState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  
  const lessons = pathData.lessons as Lesson[];
  const currentLesson = lessons[currentLessonIndex];

  useEffect(() => {
    if (isLoaded && clerkUser?.id) {
      initializeFromStorage(clerkUser.id);
    }
  }, [isLoaded, clerkUser?.id, initializeFromStorage]);

  useEffect(() => {
    if (currentLesson?.type === 'code' && currentLesson.starter) {
      const savedCode = progress[currentLesson.id]?.lastCode;
      setUserCode(savedCode || currentLesson.starter);
    }
    setSelectedChoice(null);
  }, [currentLessonIndex, currentLesson, progress]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const handleCheck = async () => {
    if (!currentLesson) return;

    setChecking(true);
    incrementAttempts(currentLesson.id);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (currentLesson.type === 'ftg') {
      const correct = selectedChoice === currentLesson.correctIndex;
      if (correct) {
        setLottieState('correct');
        markLessonPassed(currentLesson.id, currentLesson.xp);
        toast.success(`+${currentLesson.xp} XP! Great job!`, {
          duration: 2000,
        });
        setTimeout(() => {
          if (currentLessonIndex < lessons.length - 1) {
            setCurrentLesson(currentLessonIndex + 1);
          } else {
            toast.success('🎉 Path completed!');
          }
        }, 1500);
      } else {
        setLottieState('wrong');
        decrementHeart();
        toast.error('Not quite right. Try again!');
      }
    } else if (currentLesson.type === 'code') {
      const result = runChecks(userCode, currentLesson.checks || []);
      if (result.passed) {
        setLottieState('correct');
        markLessonPassed(currentLesson.id, currentLesson.xp);
        saveCode(currentLesson.id, userCode);
        toast.success(`+${currentLesson.xp} XP! Perfect code!`, {
          duration: 2000,
        });
        setTimeout(() => {
          if (currentLessonIndex < lessons.length - 1) {
            setCurrentLesson(currentLessonIndex + 1);
          } else {
            toast.success('🎉 Path completed!');
          }
        }, 1500);
      } else {
        setLottieState('wrong');
        decrementHeart();
        toast.error(
          <div className="space-y-1">
            <div className="font-semibold">Not quite right:</div>
            {result.messages.map((msg, i) => (
              <div key={i} className="text-sm">• {msg}</div>
            ))}
          </div>,
          { duration: 4000 }
        );
      }
    }

    setChecking(false);
  };

  const canCheck = currentLesson?.type === 'ftg' 
    ? selectedChoice !== null 
    : userCode.trim().length > 0;

  if (!currentLesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar
        onBack={() => navigate('/')}
        onMenuClick={() => setDrawerOpen(true)}
        totalLessons={lessons.length}
        currentIndex={currentLessonIndex}
        streak={user.streak}
        hearts={user.hearts}
        xp={user.xp}
      />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <Instruction lines={currentLesson.instructions} title={currentLesson.title} />

          <div className="flex justify-center">
            {currentLesson.type === 'ftg' ? (
              <FtgChoices
                choices={currentLesson.choices || []}
                onSelect={setSelectedChoice}
                disabled={checking}
              />
            ) : (
              <div className="w-full max-w-2xl">
                <CodeEditor
                  starter={userCode}
                  onChange={setUserCode}
                  disabled={checking}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomCheckBar
        onCheck={handleCheck}
        disabled={!canCheck}
        checking={checking}
      />

      <PathDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        lessons={lessons}
        currentIndex={currentLessonIndex}
        progress={progress}
        onSelectLesson={setCurrentLesson}
      />

      <LottieCharacter 
        state={lottieState} 
        onAnimationComplete={() => setLottieState('idle')}
      />
    </div>
  );
}
