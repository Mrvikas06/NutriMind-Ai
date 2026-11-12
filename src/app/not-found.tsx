import Link from "next/link";
import { Apple, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-zinc-100 p-4 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-teal-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-md w-full border border-white/10 rounded-3xl bg-white/[0.02] shadow-2xl p-8 text-center backdrop-blur-xl">
        <div className="w-16 h-16 mx-auto mb-6 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex items-center justify-center">
          <Apple className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-2">
          404
        </h1>
        <h2 className="text-lg font-semibold text-white mb-3">Page Not Found</h2>
        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
          The page or nutrition resource you are looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to NutriMind
        </Link>
      </div>
    </main>
  );
}
