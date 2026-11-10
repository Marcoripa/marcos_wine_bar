'use client';

import { ArrowRight } from 'lucide-react';

export default function Partners({ onOpenConsultation }) {

  return (
    <section id="partners" className="py-24 bg-charcoal-900 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-copper-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-charcoal-950/60 mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold">
              Partnerships
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-cream-50 leading-tight mb-6">
            Elevate every guest stay <br className="hidden sm:block" />
            with <span className="gold-text-gradient italic">an exclusive cellar experience</span>.
          </h2>
          <p className="text-base sm:text-lg text-cream-400 font-light leading-relaxed mb-4">
            Guests booking premium accommodation or bespoke retreats aren’t just looking for a place to sleep — they’re looking for unforgettable local experiences.
          </p>
          <p className="text-base sm:text-lg text-cream-300 font-light leading-relaxed">
            I partner with luxury hosts and event planners to deliver private in-house wine tastings. <strong className="text-gold-400 font-normal">Zero admin for you, unforgettable hospitality for your guests.</strong>
          </p>
        </div>

        {/* Section Bottom Banner */}
        <div className="p-8 sm:p-12 bg-charcoal-950 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm">
          <div>
            <h4 className="text-2xl font-serif text-cream-50 mb-2">
              Manage properties or curate events in Victoria?
            </h4>
            <p className="text-sm text-cream-400 font-light">
              Let’s create a custom wine offering for your guests and clients.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="w-full md:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow flex items-center justify-center gap-2 whitespace-nowrap rounded-sm"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
