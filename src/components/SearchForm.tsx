"use client";

import { useState, useRef } from "react";

const EXAMPLES = [
  "Stainless steel kitchen knife set",
  "Lithium-ion battery pack for electric vehicles",
  "Wireless noise-cancelling headphones",
  "Organic cotton t-shirts",
  "Industrial hydraulic pump",
];

interface Props {
  onSubmit: (description: string) => void;
  loading: boolean;
}

export function SearchForm({ onSubmit, loading }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !loading) onSubmit(value.trim());
  };

  const fillExample = (ex: string) => {
    setValue(ex);
    textareaRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`
          relative rounded-2xl border-2 bg-white transition-all duration-200
          ${loading ? "border-amber-glow/60" : "border-paper-muted focus-within:border-amber-glow/80"}
        `}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Describe your product in plain English…&#10;e.g. Stainless steel kitchen knife set with wooden handles"
          rows={3}
          maxLength={500}
          disabled={loading}
          className="w-full resize-none bg-transparent px-5 pt-4 pb-2 font-sans text-sm text-ink placeholder-ink/30 disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (value.trim() && !loading) onSubmit(value.trim());
            }
          }}
        />
        <div className="flex items-center justify-between px-4 pb-3">
          <span className="font-mono text-xs text-ink/25">
            {value.length}/500
          </span>
          <button
            type="submit"
            disabled={!value.trim() || loading}
            className={`
              flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-150
              ${loading || !value.trim()
                ? "bg-paper-muted text-ink/30 cursor-not-allowed"
                : "bg-ink text-paper hover:bg-ink/80 active:scale-95"
              }
            `}
          >
            {loading ? (
              <>
                <span className="inline-block w-3.5 h-3.5 border-2 border-paper/40 border-t-paper rounded-full animate-spin" />
                Classifying…
              </>
            ) : (
              <>
                Find HS Code
                <span className="font-mono text-paper/40 text-xs">↵</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Example pills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => fillExample(ex)}
            disabled={loading}
            className="rounded-full border border-paper-muted bg-white px-3 py-1 text-xs text-ink/50 hover:text-ink hover:border-amber-glow/60 transition-all duration-150 disabled:opacity-40"
          >
            {ex}
          </button>
        ))}
      </div>
    </form>
  );
}
