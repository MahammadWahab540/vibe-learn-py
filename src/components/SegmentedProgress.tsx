interface SegmentedProgressProps {
  total: number;
  current: number;
}

export const SegmentedProgress = ({ total, current }: SegmentedProgressProps) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-1 w-8 rounded-full transition-all duration-300 ${
            index <= current
              ? 'bg-primary shadow-glow'
              : 'bg-muted'
          }`}
        />
      ))}
    </div>
  );
};
