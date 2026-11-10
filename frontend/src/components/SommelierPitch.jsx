'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wine, GlassWater, TrendingUp, ArrowRight, CheckCircle2, HeartHandshake, Sparkles } from 'lucide-react';

export default function SommelierPitch({ onOpenConsultation }) {
  const serviceCards = [
    {
      id: 'takeovers',
      title: 'Floor Takeovers',
      subtitle: 'Zero upfront capital. Shared revenue model.',
      description:
        'I step directly onto your floor on a typically quiet night. I curate and pour an exceptional lineup of wines. Your kitchen shines with food pairings, while beverage revenue skyrockets.',
      perks: [
        'High-margin revenue-share model with zero inventory risk',
        'Warm, unpretentious table-side storytelling & pairing',
        'Attracts regional food lovers',
      ],
      icon: Wine,
    },
    {
      id: 'masterclasses',
      title: 'Masterclasses & Tastings',
      subtitle: 'Monetize off-peak hours and private dining spaces.',
      description:
        'Engage passionate locals with fun and insightful ticketed sessions. Themes like “Demystifying Barolos” or “Volcanic Terroirs”. We pre-sell tickets together to lock in venue profits before the doors open.',
      perks: [
        'Guaranteed advance ticket revenue',
        'Zero-snobbery education',
        'Seamless pairing collaboration with your chef',
      ],
      icon: GlassWater,
    },
    {
      id: 'consulting',
      title: 'Cellar Strategy',
      subtitle: 'Commercial cellar acumen meets floor psychology.',
      description:
        'Wine lists are not simply collections of bottles. They are puzzles where each piece leads to the next and tells its unique story, leaving your client excited to come back for the next chapter.',
      perks: [
        'Audit and monetize non-moving stock',
        'Healthy margin restructuring',
        'Staff empowerment: selling with warmth, not wine jargon',
      ],
      icon: TrendingUp,
    },
  ];

  return (
    <section id="services" className="py-8 bg-charcoal-900 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-copper-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div id="sommelier" className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-charcoal-950/60 mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-semibold">
              Everywhere in Victoria
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-cream-50 leading-tight mb-6">
            Turn slow nights <br className="hidden sm:block" />
            into <span className="gold-text-gradient italic">your most profitable evening</span>.
          </h2>
          <p className="text-base sm:text-lg text-cream-400 font-light leading-relaxed mb-4">
            Across Victoria, incredible chefs and welcoming bistros often operate without a dedicated sommelier.
          </p>
          <p className="text-base sm:text-lg text-cream-300 font-light leading-relaxed">
            I bring European winemaking terroir and infectious, down-to-earth hospitality to your floor. <strong className="text-gold-400 font-normal">You cook, I pour.</strong>
          </p>
        </div>

        {/* 3 Modular Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {serviceCards.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-charcoal-850/60 border border-white/5 hover:border-gold-500/40 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 rounded-sm group hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-full bg-charcoal-950 border border-gold-500/20 group-hover:border-gold-500 flex items-center justify-center transition-colors">
                      <Icon className="w-7 h-7 text-gold-500" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif text-cream-50 mb-2 group-hover:text-gold-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-cream-400 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/5 mb-8">
                    {service.perks.map((perk, i) => (
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
        </div>

        {/* Section Bottom Banner */}
        <div className="p-8 sm:p-12 bg-charcoal-950 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm">
          <div>
            <h4 className="text-2xl font-serif text-cream-50 mb-2">
              Ready to schedule your venue's first takeover?
            </h4>
            <p className="text-sm text-cream-400 font-light">
              Partnering with select dining rooms, cafes, bistros, and cellar doors. Everywhere in Victoria.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="w-full md:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow flex items-center justify-center gap-2 whitespace-nowrap rounded-sm"
          >
            <span>Book a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
