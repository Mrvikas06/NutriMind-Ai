"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-zinc-100 p-4 font-sans selection:bg-rose-500/30 selection:text-rose-200">
      <div className="relative z-10 max-w-md w-full border border-rose-500/20 rounded-3xl bg-white/[0.02] shadow-2xl p-8 text-center backdrop-blur-xl">
        <div className="w-16 h-16 mx-auto mb-6 p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.15)] flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-rose-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          An unexpected error occurred while running the NutriMind AI application.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-full transition-colors shadow-[0_0_20px_rgba(244,63,94,0.3)] text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </main>
  );
}
