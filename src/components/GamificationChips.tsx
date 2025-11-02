import { Flame, Heart, Zap } from 'lucide-react';

interface GamificationChipsProps {
  streak: number;
  hearts: number;
  xp: number;
}

export const GamificationChips = ({ streak, hearts, xp }: GamificationChipsProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5">
        <Flame className="h-4 w-4 text-warning" />
        <span className="text-sm font-semibold">{streak}</span>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5">
        <Heart className="h-4 w-4 text-destructive" />
        <span className="text-sm font-semibold">{hearts}</span>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5">
        <Zap className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">{xp}</span>
      </div>
    </div>
  );
};
