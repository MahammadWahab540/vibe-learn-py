import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code2, Zap, Target, Trophy } from 'lucide-react';
import { useEffect } from 'react';
import { useProgress } from '@/store/useProgress';

export default function Index() {
  const navigate = useNavigate();
  const { user, initializeFromStorage } = useProgress();

  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Hero Section */}
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
              <Code2 className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              VibeCoding
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Master Python through bite-sized lessons. Learn by doing with instant feedback and gamified progress.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="h-14 bg-gradient-primary px-8 text-lg font-semibold shadow-glow hover:opacity-90"
              >
                {user.xp > 0 ? 'Continue Learning' : 'Start Learning'}
              </Button>
              {user.xp > 0 && (
                <div className="text-sm text-muted-foreground">
                  {user.xp} XP • {user.streak} day streak
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-3 rounded-xl border border-border bg-card p-6">
              <div className="inline-flex rounded-lg bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Bite-Sized Lessons</h3>
              <p className="text-muted-foreground">
                Learn Python in 5-12 minute lessons. Perfect for busy schedules.
              </p>
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-card p-6">
              <div className="inline-flex rounded-lg bg-success/10 p-3">
                <Target className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Write real code and get immediate validation. Learn by doing.
              </p>
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-card p-6">
              <div className="inline-flex rounded-lg bg-warning/10 p-3">
                <Trophy className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-xl font-semibold">Gamified Progress</h3>
              <p className="text-muted-foreground">
                Earn XP, maintain streaks, and track your learning journey.
              </p>
            </div>
          </div>

          {/* Path Preview */}
          <div className="space-y-4 rounded-xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold">Python Starter Path</h2>
            <p className="text-muted-foreground">
              15 lessons covering Python fundamentals: variables, control flow, functions, and collections.
            </p>
            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  A
                </div>
                <div>
                  <div className="font-medium">Foundations</div>
                  <div className="text-sm text-muted-foreground">Variables & Types</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  B
                </div>
                <div>
                  <div className="font-medium">Control Flow</div>
                  <div className="text-sm text-muted-foreground">Loops & Logic</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                  C
                </div>
                <div>
                  <div className="font-medium">Collections</div>
                  <div className="text-sm text-muted-foreground">Lists & Dicts</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-secondary p-4 opacity-50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted font-bold text-muted-foreground">
                  D+
                </div>
                <div>
                  <div className="font-medium">Coming Soon</div>
                  <div className="text-sm text-muted-foreground">More modules</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
