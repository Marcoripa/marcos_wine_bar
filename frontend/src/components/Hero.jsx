'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownRight, Sparkles, Wine, Home, ChevronDown } from 'lucide-react';

export default function Hero({ onOpenConsultation, onScrollToSection }) {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[500px] bg-gold-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-copper-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative vertical lines for speakeasy architectural feel */}
      <div className="absolute inset-0 max-w-7xl mx-auto px-6 pointer-events-none flex justify-between opacity-10">
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent hidden md:block" />
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full text-center">
        {/* Dynamic Main Title */}
        <div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-cream-50 tracking-tight leading-[1.08] mb-8">
            Serious wine. <br className="hidden sm:block" />
            <span className="italic font-normal gold-text-gradient">Minus the ego.</span>
          </h1>
        </div>

        {/* Lead statement */}
        <p className="text-base sm:text-lg md:text-xl text-cream-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          Bringing destination wine culture to your dining rooms. We strip away the elitism and keep the wonder, turning every glass into an invitation to travel, discover, learn and, most importantly, enjoy.
        </p>

        {/* Three-Pillar Interactive Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12 text-left"
        >
          {/* Pillar 1: For Venues */}
          <div className="relative group p-6 sm:p-8 bg-charcoal-850/80 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 backdrop-blur-sm rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold px-2 py-0.5 bg-gold-500/10 border border-gold-500/20">
                  For Restaurants & Cafes
                </span>
                <Wine className="w-5 h-5 text-gold-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-cream-50 mb-2">
                For Venues
              </h3>
              <p className="text-sm text-cream-400 font-light leading-relaxed mb-6">
                You cook, I pour. <br />
                Turn quiet nights into high-margin destination services. Zero upfront capital.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center text-xs uppercase tracking-widest font-semibold px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 transition-colors rounded-sm"
              >
                <span>Book Consultation</span>
                <ArrowDownRight className="w-3.5 h-3.5 ml-1" />
              </button>
              <button
                onClick={() => onScrollToSection('sommelier')}
                className="text-xs uppercase tracking-wider text-cream-400 hover:text-gold-400 transition-colors py-2 px-2"
              >
                Takeover Formats
              </button>
            </div>
          </div>

          {/* Pillar 2: Private Events */}
          <div className="relative group p-6 sm:p-8 bg-charcoal-850/80 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 backdrop-blur-sm rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold px-2 py-0.5 bg-gold-500/10 border border-gold-500/20">
                  For Hosts
                </span>
                <Sparkles className="w-5 h-5 text-gold-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-cream-50 mb-2">
                Private Events
              </h3>
              <p className="text-sm text-cream-400 font-light leading-relaxed mb-6">
                Dinner parties, birthdays, hens and weekends away: a private tasting, tailored to your crowd.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/private-tastings"
                className="inline-flex items-center text-xs uppercase tracking-widest font-semibold px-4 py-2.5 border border-gold-500/50 hover:bg-gold-500/10 text-gold-400 transition-colors rounded-sm"
              >
                <span>Plan your event</span>
                <ArrowDownRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Property Managers */}
          <div className="relative group p-6 sm:p-8 bg-charcoal-850/80 border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 backdrop-blur-sm rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold px-2 py-0.5 bg-gold-500/10 border border-gold-500/20">
                  For Property Managers
                </span>
                <Home className="w-5 h-5 text-gold-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-cream-50 mb-2">
                Partners
              </h3>
              <p className="text-sm text-cream-400 font-light leading-relaxed mb-6">
                Accommodation hosts, event managers. Give your guests an exclusive sommelier tasting as part of their stay or event.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onScrollToSection('partners')}
                className="inline-flex items-center text-xs uppercase tracking-widest font-semibold px-4 py-2.5 border border-gold-500/50 hover:bg-gold-500/10 text-gold-400 transition-colors rounded-sm"
              >
                <span>Let's talk</span>
                <ArrowDownRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
