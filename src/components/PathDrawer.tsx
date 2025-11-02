import { CheckCircle2, Lock } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';

interface Lesson {
  id: string;
  title: string;
}

interface PathDrawerProps {
  open: boolean;
  onClose: () => void;
  lessons: Lesson[];
  currentIndex: number;
  progress: Record<string, { passed: boolean }>;
  onSelectLesson: (index: number) => void;
}

export const PathDrawer = ({
  open,
  onClose,
  lessons,
  currentIndex,
  progress,
  onSelectLesson,
}: PathDrawerProps) => {
  const canAccessLesson = (index: number) => {
    if (index === 0) return true;
    const prevLesson = lessons[index - 1];
    return progress[prevLesson.id]?.passed || false;
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Python Starter Path</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {lessons.map((lesson, index) => {
            const isPassed = progress[lesson.id]?.passed || false;
            const isCurrent = index === currentIndex;
            const canAccess = canAccessLesson(index);

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  if (canAccess) {
                    onSelectLesson(index);
                    onClose();
                  }
                }}
                disabled={!canAccess}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  isCurrent
                    ? 'border-primary bg-primary/10'
                    : isPassed
                    ? 'border-success/30 bg-success/5'
                    : canAccess
                    ? 'border-border bg-card hover:border-primary/50'
                    : 'border-border bg-muted cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-muted-foreground">
                      Lesson {index + 1}
                    </div>
                    <div className="mt-1 font-medium">{lesson.title}</div>
                  </div>
                  {isPassed ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : !canAccess ? (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};
