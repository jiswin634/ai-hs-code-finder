"use client";

import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { HSCard } from "@/components/HSCard";
import { ClassifyResponse, ApiError } from "@/lib/types";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClassifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (description: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError((json as ApiError).error ?? "Something went wrong.");
        return;
      }

      setData(json as ClassifyResponse);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-paper px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-glow/30 bg-amber-pale px-3 py-1 text-xs font-mono text-amber-glow mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-glow animate-pulse-slow" />
            AI-Powered · HS 2022 Nomenclature
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-ink leading-tight mb-3">
            HS Code Finder
          </h1>
          <p className="text-base text-ink/50 max-w-md mx-auto leading-relaxed">
            Describe any product in plain English. Get the most likely{" "}
            <abbr title="Harmonized System" className="underline decoration-dotted cursor-help">
              HS tariff codes
            </abbr>{" "}
            ranked by confidence — in seconds.
          </p>
        </header>

        {/* Search */}
        <SearchForm onSubmit={handleSearch} loading={loading} />

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 animate-fade-up">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-8 space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-paper-warm animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        )}

        {/* Results */}
        {data && !loading && (
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-mono text-xs uppercase tracking-widest text-ink/40">
                {data.results.length} result{data.results.length !== 1 ? "s" : ""} for
              </h2>
              <span className="text-xs text-ink/60 italic truncate max-w-xs">
                "{data.query}"
              </span>
            </div>

            <div className="space-y-3">
              {data.results.map((result, i) => (
                <HSCard
                  key={result.code}
                  result={result}
                  rank={i}
                  style={{ animationDelay: `${i * 80}ms` }}
                />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-6 rounded-xl border border-paper-muted bg-paper-warm px-4 py-3 text-xs text-ink/40 leading-relaxed">
              ⚠️ {data.disclaimer}
            </div>

            {/* FAQ / SEO content */}
            <div className="mt-10 space-y-5 border-t border-paper-muted pt-8">
              <h2 className="font-semibold text-sm text-ink/60">
                What is an HS Code?
              </h2>
              <p className="text-sm text-ink/50 leading-relaxed">
                A Harmonized System (HS) code is a standardized numerical method
                of classifying traded products, maintained by the World Customs
                Organization (WCO). It&apos;s used by customs authorities in 200+
                countries to identify products for tariff, trade statistics, and
                compliance purposes.
              </p>
              <h2 className="font-semibold text-sm text-ink/60">
                How accurate are these results?
              </h2>
              <p className="text-sm text-ink/50 leading-relaxed">
                Results are AI-generated from GPT-4o with HS 2022 nomenclature
                knowledge. Confidence scores reflect classification certainty.
                Always verify high-stakes classifications with a licensed customs
                broker or freight forwarder.
              </p>
            </div>
          </section>
        )}

        {/* Empty state */}
        {!data && !loading && !error && (
          <div className="mt-16 text-center text-ink/25 font-mono text-xs uppercase tracking-widest">
            Enter a product description above
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center font-mono text-xs text-ink/25">
          HS Code Finder · Research tool only · Not legal or customs advice
        </footer>
      </div>
    </main>
  );
}
