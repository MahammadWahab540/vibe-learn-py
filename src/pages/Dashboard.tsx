import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/store/useProgress';
import { useEffect, useState } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import pathData from '@/content/python_path_v1.json';
import { Lock, CheckCircle2, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { GamificationChips } from '@/components/GamificationChips';
import logo from '@/assets/logo.png';

const MODULES = [
  { id: '1', name: 'Introduction to Programming & Python', lessonCount: 4, range: [0, 3] },
  { id: '2', name: 'Python Fundamentals', lessonCount: 6, range: [4, 9] },
  { id: '3', name: 'Control Flow and Loops', lessonCount: 6, range: [10, 15] },
  { id: '4', name: 'Strings', lessonCount: 5, range: [16, 17] },
  { id: '5', name: 'Functions and Modules', lessonCount: 7, range: null },
  { id: '6', name: 'Data Structures in Python', lessonCount: 6, range: null },
  { id: '7', name: 'Object-Oriented Programming (OOP) in Python', lessonCount: 7, range: null },
  { id: '8', name: 'Advanced Python Concepts', lessonCount: 9, range: null },
  { id: '9', name: 'File IO – Working with Files & Related Modules', lessonCount: 5, range: null },
  { id: '10', name: 'Working with External Libraries', lessonCount: 4, range: null },
  { id: '11', name: 'Using AI as a Developer', lessonCount: 4, range: null },
  { id: '12', name: 'Hands-On Python Projects', lessonCount: 6, range: null },
  { id: '13', name: 'Building Web Applications using Flask', lessonCount: 12, range: null },
  { id: '14', name: 'Project VidSnapAI – An AI Powered TikTok/Reel Generator', lessonCount: 7, range: null },
  { id: '15', name: 'Version Control: Git for Developers', lessonCount: 16, range: null },
  { id: '16', name: 'Conclusion and Next Steps', lessonCount: 2, range: null },
  { id: '17', name: '🎓 Certificate', lessonCount: 1, range: null, isCertificate: true },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { isLoaded, user: clerkUser } = useUser();
  const { user, progress, initializeFromStorage } = useProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && clerkUser?.id) {
      initializeFromStorage(clerkUser.id);
    }
  }, [isLoaded, clerkUser?.id, initializeFromStorage]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const lessons = pathData.lessons;
  const totalLessons = lessons.length;
  const completedCount = Object.values(progress).filter((p) => p.passed).length;
  const overallProgress = (completedCount / totalLessons) * 100;

  const canAccessLesson = (index: number) => {
    if (index === 0) return true;
    const prevLesson = lessons[index - 1];
    return progress[prevLesson.id]?.passed || false;
  };

  // Find the current active module based on progress
  const getCurrentModule = () => {
    // Find the first incomplete lesson
    const firstIncompleteIndex = lessons.findIndex((l) => !progress[l.id]?.passed);
    if (firstIncompleteIndex === -1) return MODULES.length - 1; // All complete
    
    // Find which module contains this lesson
    return MODULES.findIndex((module) => {
      if (!module.range) return false;
      return firstIncompleteIndex >= module.range[0] && firstIncompleteIndex <= module.range[1];
    });
  };

  const activeModuleIndex = getCurrentModule();

  const handleStartLesson = (index: number) => {
    if (canAccessLesson(index)) {
      navigate(`/learn?lesson=${index}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="rounded-lg p-2 transition-colors hover:bg-secondary"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">Python Starter Path</h1>
          </div>
          <div className="flex items-center gap-2">
            <GamificationChips streak={user.streak} hearts={user.hearts} xp={user.xp} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/profile')}
              className="h-9 w-9"
              title="Profile"
            >
              <User className="h-4 w-4" />
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 top-14 z-40 w-72 transform border-r border-border bg-card transition-transform lg:relative lg:top-0 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6">
            <div className="mb-6">
              <div className="text-xs font-medium text-muted-foreground">CAREER PATH</div>
              <div className="mt-2 rounded-lg border border-border bg-secondary/50 p-4">
                <h2 className="font-semibold">Python Developer</h2>
                <div className="mt-2 text-sm text-muted-foreground">
                  {completedCount} of {totalLessons} Complete
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3 text-xs font-medium text-muted-foreground">SECTIONS</div>
              <div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
                {MODULES.map((module, moduleIndex) => {
                  const moduleCompleted = module.range
                    ? lessons.slice(module.range[0], module.range[1] + 1).every((l) => progress[l.id]?.passed)
                    : false;
                  const isComingSoon = !module.range && !module.isCertificate;
                  
                  // Find first incomplete lesson in this module
                  const firstIncompleteIndex = module.range 
                    ? lessons.slice(module.range[0], module.range[1] + 1).findIndex((l) => !progress[l.id]?.passed)
                    : -1;
                  const targetLessonIndex = firstIncompleteIndex >= 0 
                    ? module.range![0] + firstIncompleteIndex 
                    : module.range?.[0];
                  
                  const handleModuleClick = () => {
                    if (!isComingSoon && !module.isCertificate && targetLessonIndex !== undefined) {
                      const lessonElement = document.getElementById(`lesson-${targetLessonIndex}`);
                      if (lessonElement) {
                        lessonElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
                  };
                  
                  const isActive = moduleIndex === activeModuleIndex;
                  
                  return (
                    <button
                      key={module.id}
                      onClick={handleModuleClick}
                      disabled={isComingSoon || module.isCertificate}
                      className={`w-full rounded-lg border p-3 transition-colors text-left ${
                        module.isCertificate 
                          ? 'bg-primary/5 border-primary/20 cursor-default' 
                          : isActive
                          ? 'bg-primary/10 border-primary/50 hover:bg-primary/15'
                          : moduleCompleted 
                          ? 'bg-success/5 border-border hover:bg-success/10' 
                          : isComingSoon 
                          ? 'bg-muted/30 border-border cursor-not-allowed' 
                          : 'bg-card border-border hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">
                            {module.id}. {module.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {module.lessonCount} {module.lessonCount === 1 ? 'lesson' : 'lessons'}
                          </div>
                        </div>
                        {moduleCompleted && (
                          <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        )}
                        {isComingSoon && (
                          <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-12">
          <div className="mx-auto max-w-3xl">
            {/* Header with Progress */}
            <div className="mb-8 flex items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="mb-2 text-3xl font-bold">Python Developer Career Path</h1>
                <Progress value={overallProgress} className="h-2" />
                <div className="mt-2 text-sm text-muted-foreground">
                  {Math.round(overallProgress)}% Complete
                </div>
              </div>
              <div className="relative flex h-24 w-24 items-center justify-center">
                <svg className="h-full w-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - overallProgress / 100)}`}
                    className="text-primary transition-all"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{Math.round(overallProgress)}%</span>
                </div>
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-12">
              {MODULES.filter(m => m.range !== null || m.isCertificate).map((module, moduleIndex) => {
                if (module.isCertificate) {
                  return (
                    <section key={module.id}>
                      <div className="mb-4">
                        <div className="text-xs font-medium text-muted-foreground">
                          ACHIEVEMENT
                        </div>
                        <h2 className="mt-2 text-2xl font-bold">
                          {module.name}
                        </h2>
                      </div>
                      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6 text-center">
                        <div className="text-4xl mb-2">🎓</div>
                        <div className="font-medium mb-1">Course Certificate</div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Complete all sections to download your certificate
                        </div>
                        <Button disabled className="bg-gradient-primary">
                          Download Certificate
                        </Button>
                      </div>
                    </section>
                  );
                }

                const [start, end] = module.range!;
                const moduleLessons = lessons.slice(start, end + 1);
                const moduleCompleted = moduleLessons.filter((l) => progress[l.id]?.passed).length;

                return (
                  <section key={module.id}>
                    <div className="mb-4">
                      <div className="text-xs font-medium text-muted-foreground">
                        SECTION
                      </div>
                      <div className="mt-2 flex items-baseline justify-between">
                        <h2 className="text-2xl font-bold">
                          {module.id}. {module.name}
                        </h2>
                        <span className="text-sm text-muted-foreground">
                          {moduleCompleted}/{moduleLessons.length}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {moduleLessons.map((lesson, lessonIndex) => {
                        const globalIndex = start + lessonIndex;
                        const isPassed = progress[lesson.id]?.passed;
                        const canAccess = canAccessLesson(globalIndex);

                        return (
                          <div
                            id={`lesson-${globalIndex}`}
                            key={lesson.id}
                            className={`flex items-center justify-between rounded-xl border-2 p-4 transition-all ${
                              isPassed
                                ? 'border-success/30 bg-success/5'
                                : canAccess
                                ? 'border-border bg-card hover:border-primary/50'
                                : 'border-border bg-muted/50'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                                  isPassed
                                    ? 'bg-success/20 text-success'
                                    : 'bg-primary/10 text-primary'
                                }`}
                              >
                                {String(globalIndex + 1).padStart(2, '0')}
                              </div>
                              <div>
                                <div className="font-medium">{lesson.title}</div>
                                {lesson.type === 'code' && (
                                  <div className="text-xs text-muted-foreground">
                                    Code Exercise
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              {isPassed ? (
                                <CheckCircle2 className="h-5 w-5 text-success" />
                              ) : canAccess ? (
                                <Button
                                  size="sm"
                                  onClick={() => handleStartLesson(globalIndex)}
                                  className="bg-gradient-primary"
                                >
                                  LEARN
                                </Button>
                              ) : (
                                <Lock className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 top-14 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
