'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wine, MapPin, Award, Sparkles, Lock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { joinWineBarGuestlist } from '../lib/firebase';

const teaserWines = [
  { label: 'G.D. Vajra Barolo Bricco delle Viole', region: 'Piedmont, Italy', style: 'Nebbiolo • Rare Library Vintage' },
  { label: 'Domaine Dujac Morey-Saint-Denis', region: 'Burgundy, France', style: 'Pinot Noir • Premier Cru' },
  { label: 'Tenuta San Guido Sassicaia', region: 'Bolgheri, Tuscany', style: 'Cabernet / Franc • Cult Icon' },
  { label: 'Main Ridge Estate The Acre', region: 'Mornington Peninsula', style: 'Pinot Noir • Old Vine Icon' },
];

export default function WineBarTeaser() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await joinWineBarGuestlist({ email, name });
      setSubmitted(true);
      setEmail('');
      setName('');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="winebar"
      className="py-32 bg-charcoal-950 border-t border-gold-500/20 relative overflow-hidden"
    >
      {/* Decorative radial lighting and speakeasy vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle 1920s geometric pattern overlay */}
      <div className="absolute inset-0 bg-ambient-grain opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        {/* Speakeasy emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-gold-500/40 bg-charcoal-900 shadow-gold-glow mb-8"
        >
          <Wine className="w-8 h-8 text-gold-500" />
        </motion.div>

        {/* Section subtitles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif text-cream-50 font-light mb-6 tracking-tight">
            Marco's Wine Bar
          </h2>

          <p className="text-gold-400 font-serif italic text-lg sm:text-xl mb-6">
            A wine sanctuary • Pouring Autumn 2027
          </p>
        </motion.div>

        {/* Credentials / Spec Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-cream-300 uppercase tracking-widest text-xs font-light mb-12">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-charcoal-900/80 border border-white/5 rounded-sm">
            <MapPin className="w-3.5 h-3.5 text-gold-500" /> Mornington Peninsula
          </span>
          <span className="flex items-center gap-2 px-3 py-1.5 bg-charcoal-900/80 border border-white/5 rounded-sm">
            <Award className="w-3.5 h-3.5 text-gold-500" /> Premium wines by the glass
          </span>
        </div>

        {/* Story copy */}
        <p className="text-base sm:text-lg text-cream-400 font-light max-w-2xl mx-auto mb-14 leading-relaxed">
          My dream coming true. A wine sanctuary where the best wines are poured by the glass, alongside a curated selection of small plates. A private, convivial space for wine lovers to gather, learn, and celebrate.
        </p>

        {/* Lead Capture Form Card (Firestore integration) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto bg-charcoal-900 border border-gold-500/30 p-8 sm:p-10 shadow-2xl rounded-sm relative"
        >
          {/* Subtle gold ribbon decoration */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold-500 text-charcoal-950 text-[10px] uppercase tracking-[0.2em] font-bold rounded-sm">
            Exclusive Access
          </div>

          <h3 className="text-2xl font-serif text-cream-50 mb-2 mt-1">
            Join the waitlist
          </h3>
          <p className="text-cream-400 text-xs sm:text-sm font-light mb-6 leading-relaxed">
            Opening night reservations and the secret venue location will be dispatched privately to our waitlist members in late 2026.
          </p>

          {submitted ? (
            <div className="p-6 bg-gold-500/10 border border-gold-500/40 text-cream-50 rounded-sm text-center">
              <CheckCircle2 className="w-10 h-10 text-gold-500 mx-auto mb-3" />
              <div className="font-serif text-xl text-gold-300 mb-1">Grazie & Benvenuto!</div>
              <p className="text-xs text-cream-400 font-light leading-relaxed">
                You have been registered for opening access. We will dispatch the confidential address and booking calendar before the public launch in February 2027.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-5 text-[11px] uppercase tracking-widest text-gold-400 underline hover:text-cream-50"
              >
                Register another guest
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
              {error && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 rounded-sm">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-cream-400 mb-1.5 font-medium">
                  Your Full Name <span className="text-neutral-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-cream-400 mb-1.5 font-medium">
                  Email Address <span className="text-gold-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full py-3.5 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow flex items-center justify-center gap-2 rounded-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-charcoal-950" />
                    <span>Reserving Place...</span>
                  </>
                ) : (
                  <>
                    <span>Join the waitlist</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-[10px] text-cream-400 font-light text-center mt-2 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 text-gold-500" />
                <span>Strictly confidential. No spam, I promise! Only launch alerts.</span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
