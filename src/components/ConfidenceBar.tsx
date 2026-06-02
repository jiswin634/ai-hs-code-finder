"use client";

interface Props {
  value: number; // 0–100
}

export function ConfidenceBar({ value }: Props) {
  const color =
    value >= 80
      ? "bg-amber-glow"
      : value >= 60
      ? "bg-amber-soft"
      : "bg-paper-muted";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-paper-warm rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <span className="font-mono text-xs text-ink/50 w-8 text-right">
        {value}%
      </span>
    </div>
  );
}
