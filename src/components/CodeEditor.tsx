import { useState, useEffect } from 'react';

interface CodeEditorProps {
  starter: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}

export const CodeEditor = ({ starter, onChange, disabled }: CodeEditorProps) => {
  const [code, setCode] = useState(starter);

  useEffect(() => {
    setCode(starter);
  }, [starter]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange(newCode);
  };

  return (
    <div className="w-full rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-secondary px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/50" />
          <div className="h-3 w-3 rounded-full bg-warning/50" />
          <div className="h-3 w-3 rounded-full bg-success/50" />
        </div>
        <span className="ml-2 text-sm font-medium text-muted-foreground">script.py</span>
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        disabled={disabled}
        className="w-full resize-none bg-card p-4 font-mono text-sm text-foreground focus:outline-none disabled:opacity-50"
        rows={12}
        spellCheck={false}
      />
    </div>
  );
};
