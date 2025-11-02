interface InstructionProps {
  lines: string[];
  title: string;
}

export const Instruction = ({ lines, title }: InstructionProps) => {
  return (
    <div className="mx-auto w-full max-w-xl space-y-4 text-center">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <div className="space-y-2">
        {lines.map((line, index) => (
          <p key={index} className="text-base text-muted-foreground leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};
