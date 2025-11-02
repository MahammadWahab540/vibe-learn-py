import { ArrowLeft, Menu } from 'lucide-react';
import { SegmentedProgress } from './SegmentedProgress';
import { GamificationChips } from './GamificationChips';

interface TopBarProps {
  onBack: () => void;
  onMenuClick: () => void;
  totalLessons: number;
  currentIndex: number;
  streak: number;
  hearts: number;
  xp: number;
}

export const TopBar = ({
  onBack,
  onMenuClick,
  totalLessons,
  currentIndex,
  streak,
  hearts,
  xp,
}: TopBarProps) => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="rounded-lg p-2 transition-colors hover:bg-secondary"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition-colors hover:bg-secondary"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden md:block">
          <SegmentedProgress total={totalLessons} current={currentIndex} />
        </div>

        <GamificationChips streak={streak} hearts={hearts} xp={xp} />
      </div>
      
      <div className="block px-4 pb-3 md:hidden">
        <SegmentedProgress total={totalLessons} current={currentIndex} />
      </div>
    </header>
  );
};
