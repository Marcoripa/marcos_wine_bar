'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassWater, Users, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function PrivateEvents({ onOpenConsultation }) {
  const eventFormats = [
    {
      id: 'dinner-parties',
      title: 'Celebrations',
      description:
        'Hosting a birthday, anniversary, or intimate dinner at home? I curate the wine flight around your menu, pour table-side, and bring the stories behind every bottle directly to your dining room.',
      perks: [
        'Bespoke wine pairings tailored to your menu',
        'Flexible budgets',
      ],
      icon: GlassWater,
    },
    {
      id: 'weekends-away',
      title: 'Weekends Away & Hens',
      description:
        'Turn an afternoon or evening at your holiday house into an interactive, fun, and completely unpretentious guided tasting.',
      perks: [
        'Interactive tasting games & sensory discovery',
        'I come directly to your accommodation or venue',
      ],
      icon: Sparkles,
    },
    {
      id: 'collector-flights',
      title: 'Deep-Dive',
      description:
        'For curious palates ready to explore deeper. Comparative tastings — Barolo vs. Burgundy, Old World vs. New World, or rare back-vintage verticals — poured and unpacked in private.',
      perks: [
        'Access to rare allocations and library vintages',
        'Side-by-side terroir and vintage comparisons',
      ],
      icon: Users,
    },
  ];

  return (
    <section id="private-events" className="py-24 bg-charcoal-950 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-copper-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-charcoal-900/60 mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold">
              Private Tastings
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-cream-50 leading-tight mb-6">
            Your table, your crowd, <br className="hidden sm:block" />
            <span className="gold-text-gradient italic">your private sommelier</span>.
          </h2>
          <p className="text-base sm:text-lg text-cream-400 font-light leading-relaxed mb-4">
            Whether it’s a milestone dinner party, a hens weekend on the coast, or a long lunch with friends, a great wine tasting shouldn’t feel like a classroom lecture.
          </p>
          <p className="text-base sm:text-lg text-cream-300 font-light leading-relaxed">
            You are either a wine enthusiast or you are about to become one. <strong className="text-gold-400 font-normal">Tailored to your taste and budget.</strong>
          </p>
        </div>

        {/* 3 Modular Event Cards */}
        {/* <div className="grid md:grid-cols-3 gap-8 mb-16">
          {eventFormats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-charcoal-900/60 border border-white/5 hover:border-gold-500/40 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 rounded-sm group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-full bg-charcoal-950 border border-gold-500/20 group-hover:border-gold-500 flex items-center justify-center transition-colors">
                      <Icon className="w-7 h-7 text-gold-500" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif text-cream-50 mb-2 group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream-400 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/5">
                    {item.perks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-cream-300 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div> */}

        {/* Section Bottom Banner */}
        <div className="p-8 sm:p-12 bg-charcoal-900 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm">
          <div>
            <h4 className="text-2xl font-serif text-cream-50 mb-2">
              Planning a dinner party, hens, or weekend away?
            </h4>
            <p className="text-sm text-cream-400 font-light">
              Tell me about your group, your occasion, and what you love to drink — I’ll design the flight.
            </p>
          </div>
          <Link
            href="/private-tastings"
            className="w-full md:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow flex items-center justify-center gap-2 whitespace-nowrap rounded-sm"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
