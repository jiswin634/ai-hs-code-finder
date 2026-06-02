"use client";

import { HSResult } from "@/lib/types";
import { ConfidenceBar } from "./ConfidenceBar";

interface Props {
  result: HSResult;
  rank: number;
  style?: React.CSSProperties;
}

export function HSCard({ result, rank, style }: Props) {
  const isTop = rank === 0;

  return (
    <div
      className={`
        relative rounded-xl border transition-all duration-200
        ${isTop
          ? "border-amber-glow/60 bg-amber-pale shadow-sm shadow-amber-glow/10"
          : "border-paper-muted bg-white/60 hover:border-paper-muted/80"
        }
        p-5 opacity-0 animate-fade-up
      `}
      style={style}
    >
      {isTop && (
        <span className="absolute -top-2.5 left-4 bg-amber-glow text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
          Best Match
        </span>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="font-mono text-xl font-semibold tracking-tight text-ink">
            {result.code}
          </div>
          <div className="text-xs font-mono text-ink/40 mt-0.5">
            {result.chapter}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div
            className={`font-mono text-sm font-medium ${
              result.confidence >= 80
                ? "text-amber-glow"
                : "text-ink/40"
            }`}
          >
            {Math.round(result.confidence * 100)}%
          </div>
          <div className="text-[10px] text-ink/30 uppercase tracking-wider">
            confidence
          </div>
        </div>
      </div>

      <p className="text-sm text-ink/80 leading-relaxed mb-3">
        {result.description}
      </p>

      <ConfidenceBar value={result.confidence} />

      {result.notes && (
        <div className="mt-3 pt-3 border-t border-paper-warm">
          <p className="text-xs text-ink/50 leading-relaxed">
            <span className="font-semibold text-ink/60">Note: </span>
            {result.notes}
          </p>
        </div>
      )}
    </div>
  );
}
