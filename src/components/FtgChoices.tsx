import { useState } from 'react';

interface FtgChoicesProps {
  choices: string[];
  onSelect: (index: number) => void;
  disabled?: boolean;
}

export const FtgChoices = ({ choices, onSelect, disabled }: FtgChoicesProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (disabled) return;
    setSelected(index);
    onSelect(index);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleSelect(index)}
          disabled={disabled}
          className={`rounded-xl border-2 px-6 py-3 text-lg font-medium transition-all ${
            selected === index
              ? 'border-primary bg-primary/10 text-primary scale-105'
              : 'border-border bg-card text-foreground hover:border-primary/50 hover:scale-105'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};
