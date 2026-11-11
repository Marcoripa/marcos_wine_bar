'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Pedigree from '../components/Pedigree';
import SommelierPitch from '../components/SommelierPitch';
import PrivateEvents from '../components/PrivateEvents';
import Partners from '../components/Partners';
import WineBarTeaser from '../components/WineBarTeaser';
import LeadForm from '../components/LeadForm';
import ConsultationModal from '../components/ConsultationModal';
import Footer from '../components/Footer';
import { Wine, Calendar } from 'lucide-react';

export default function Home() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: "Marco's Wine Bar",
    url: 'https://marcoswinebar.com.au/',
    image: 'https://marcoswinebar.com.au/og-image.jpg',
    description:
      'Visiting Sommelier: customised private wine tastings, wine classes and venue partnerships across Victoria.',
    areaServed: 'Mornington Peninsula, Melbourne, Victoria (Australia)',
    founder: {
      '@type': 'Person',
      name: 'Marco Ripa',
      jobTitle: 'Wine Strategist & Sommelier',
    },
    sameAs: [
      'https://www.instagram.com/marcos.mornington/',
      'https://www.facebook.com/1449287474935370',
    ],
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-cream-100 font-sans selection:bg-gold-500 selection:text-charcoal-950">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <Navbar
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      <main>
        {/* Dynamic Dual-Pillar Hero */}
        <Hero
          onOpenConsultation={() => setIsConsultationModalOpen(true)}
          onScrollToSection={scrollToSection}
        />

        {/* Section 1: Visiting Sommelier (Immediate CTA) */}
        <SommelierPitch
          onOpenConsultation={() => setIsConsultationModalOpen(true)}
        />

        {/* Section 2: Private Events */}
        <PrivateEvents
          onOpenConsultation={() => setIsConsultationModalOpen(true)}
        />

        {/* Section 3: Partners (Property & Event Managers) */}
        <Partners
          onOpenConsultation={() => setIsConsultationModalOpen(true)}
        />

        {/* Section 4: My Terroir */}
        <Pedigree />

        {/* In-Page Consultation Section for deep scrollers */}
        <section id="consultation" className="py-24 bg-charcoal-950 border-t border-white/5 relative">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif text-cream-50 font-light mb-3">
                Let's Talk
              </h2>
              <p className="text-sm text-cream-400 font-light max-w-lg mx-auto">
                Only Marco on the other side. No bots, no assistants, no middlemen.
              </p>
            </div>

            <div className="bg-charcoal-900/90 border border-gold-500/20 p-6 sm:p-10 rounded-sm shadow-xl">
              <LeadForm onSuccess={() => {}} />
            </div>
          </div>
        </section>

        {/* Section 2: Marco's Wine Bar (The Teaser & 2027 Guestlist) */}
        {/* <WineBarTeaser /> */}
      </main>

      {/* Footer */}
      <Footer onOpenConsultation={() => setIsConsultationModalOpen(true)} />

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </div>
  );
}
