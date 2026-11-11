import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-cream-100 flex flex-col justify-between font-sans selection:bg-gold-500 selection:text-charcoal-950">
      {/* Top branding bar */}
      <header className="border-b border-white/5 py-6 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-serif tracking-[0.2em] text-cream-50 uppercase hover:text-gold-400 transition-colors"
          >
            Marco<span className="text-gold-500 font-bold">.</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400/80 font-light hidden sm:inline">
            Visiting Sommelier
          </span>
        </div>
      </header>

      {/* Main 404 content */}
      <main className="flex-grow flex items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-md mx-auto space-y-6 relative z-10">
          <div className="text-xs uppercase tracking-[0.3em] text-gold-400 font-medium">
            Error 404
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-cream-50 leading-tight">
            Page not found
          </h1>
          <p className="text-sm sm:text-base text-cream-400 font-light leading-relaxed">
            The vintage or page you are looking for isn&apos;t here. Let&apos;s guide you back to the cellar.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow rounded-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to homepage</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer minimal bar */}
      <footer className="border-t border-white/5 py-6 px-6 text-center text-xs text-cream-500 font-light">
        © {new Date().getFullYear()} Marco&apos;s Wine Bar. All rights reserved.
      </footer>
    </div>
  );
}
