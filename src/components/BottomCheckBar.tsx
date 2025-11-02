import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface BottomCheckBarProps {
  onCheck: () => void;
  disabled: boolean;
  checking: boolean;
}

export const BottomCheckBar = ({ onCheck, disabled, checking }: BottomCheckBarProps) => {
  return (
    <div className="sticky bottom-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-4">
        <Button
          onClick={onCheck}
          disabled={disabled || checking}
          className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90 disabled:opacity-50 h-14 text-lg font-semibold rounded-xl"
        >
          {checking ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Checking...
            </>
          ) : (
            'Check'
          )}
        </Button>
      </div>
    </div>
  );
};
