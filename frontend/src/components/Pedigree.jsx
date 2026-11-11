'use client';

import { motion } from 'framer-motion';

export default function Pedigree() {
  return (
    <section id="terroir" className="py-28 bg-charcoal-950 border-y border-white/5 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-copper-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-gold-500 uppercase tracking-[0.35em] text-xs font-semibold block mb-3">
            About me
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-cream-50 font-light mb-6">
            Old World Roots, Poured in Victoria
          </h2>
        </div>

        {/* Headshot & Biography Feature */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 bg-charcoal-900/80 border border-gold-500/30 p-6 sm:p-10 lg:p-12 rounded-sm shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/5 rounded-full blur-[90px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Portrait Headshot */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-gold-600/20 via-gold-500/40 to-copper-500/20 rounded-sm blur-sm opacity-70 group-hover:opacity-100 transition duration-500" />
                <div className="relative overflow-hidden rounded-sm border border-gold-500/40 bg-charcoal-950 aspect-[3/4]">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="/web-20261026-Ripa-001-360w.webp 360w, /web-20261026-Ripa-001-720w.webp 720w, /web-20261026-Ripa-001-1080w.webp 1080w"
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 384px"
                    />
                    <source
                      type="image/jpeg"
                      srcSet="/web-20261026-Ripa-001-360w.jpg 360w, /web-20261026-Ripa-001-720w.jpg 720w, /web-20261026-Ripa-001.jpg 1080w"
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 384px"
                    />
                    <img
                      src="/web-20261026-Ripa-001-720w.jpg"
                      alt="Marco - Wine Strategist & Sommelier"
                      width={384}
                      height={512}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-95 group-hover:scale-102 transition duration-500"
                    />
                  </picture>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-sm font-serif text-cream-50 tracking-wider">Marco Ripa</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-light">
                  Wine Strategist & Sommelier
                </div>
              </div>
            </div>

            {/* Right: Biography Space (Ready for Marco to customize) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-cream-50 font-light leading-snug">
                <span className="italic gold-text-gradient">My Terroir</span>
              </h3>

              {/* Biography Body — Customize paragraphs below */}
              <div className="space-y-4 text-sm sm:text-base text-cream-300 font-light leading-relaxed">
                <p>
                  I wish I could tell you that I come from a dynasty of Italian winemakers. The truth? I enrolled in Winemaking as a 20-year-old politics student in Milan simply because I thought it was the best way to impress girls.
                </p>
                <p>
                  It didn’t turn out poorly at all — <i>professionally speaking</i>. Over the next decade, I worked harvests and cellars across Barolo, Champagne, Napa Valley, Marlborough, Tuscany, McLaren Vale... before realising I prefer to drink the wine than make it.
                </p>
                <p>
                  Wine is the only drink capable of bottling a landscape, and I believe everyone should enjoy it. Whether you’re already a wine enthusiast hunting your next rare allocation, or you genuinely wonder if Cabernet Sauvignon is a blend of <i>Cab</i> and <i>Sav</i>, I’m here to guide your journey—minus the ego.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-8 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <div>
            <div className="text-3xl sm:text-4xl font-serif text-gold-400 mb-1">0</div>
            <div className="text-xs uppercase tracking-widest text-cream-400 font-light">Ego & Wine Snobbery</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif text-gold-400 mb-1">12+</div>
            <div className="text-xs uppercase tracking-widest text-cream-400 font-light">Global Vintages</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-serif text-gold-400 mb-1">∞</div>
            <div className="text-xs uppercase tracking-widest text-cream-400 font-light">Wines Tasted</div>
          </div>
        </div>
      </div>
    </section>
  );
}
