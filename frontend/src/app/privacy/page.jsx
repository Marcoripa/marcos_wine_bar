'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ConsultationModal from '../../components/ConsultationModal';

export default function PrivacyPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  const handleNavbarSectionClick = (sectionId) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-900 text-cream-100 font-sans selection:bg-gold-500 selection:text-charcoal-950 flex flex-col">
      {/* Header */}
      <Navbar
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onScrollToSection={handleNavbarSectionClick}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-32 sm:pt-36 pb-24 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Header Title */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to home</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-serif text-cream-50 font-light tracking-tight">
              Privacy policy
            </h1>
            <p className="text-xs uppercase tracking-widest text-cream-400 font-light">
              Last updated 6 November 2026
            </p>
          </div>

          {/* Copy Body */}
          <div className="space-y-10 text-cream-200 text-base sm:text-lg font-light leading-relaxed">
            <p>
              Marco&apos;s Wine Bar is run by me, Marco Ripa. I respect your privacy, and this page explains what this website collects and what I do with it.
            </p>

            <section className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 font-light text-gold-400">
                What I collect
              </h2>
              <p>
                When you send an enquiry, through the private tastings form or the venue form, I collect what you type in: your name, email, phone number and details about your event or venue, such as the occasion, date, number of guests, suburb or postcode, wine budget and any notes. When you visit the website, I use the Meta Pixel, a small piece of code from Meta. It uses cookies to record things like which pages you visit and wheather you sent an enquiry. This helps me understand wheather my ads are working and show them to people who might be interested. I don&apos;t send your name, email, phone number or enquiry details to Meta. I also note which ad or link brought you to the site, if any.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 font-light text-gold-400">
                How I use it
              </h2>
              <ul className="space-y-2.5 list-disc list-inside text-cream-200 pl-2">
                <li>To reply to your enquiry and plan your tasting or venue event.</li>
                <li>To understand which ads and pages work, so I can improve them.</li>
              </ul>
              <p className="pt-2">
                That&apos;s it. I don&apos;t sell your details and I don&apos;t add you to a mailing list without asking first.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 font-light text-gold-400">
                Where it&apos;s stored
              </h2>
              <p>
                Enquiries are stored securely using Google Firebase, and I receive a copy by email. These services might store data on services outside Australia. I keep enquires only as long as I need them for my business and records.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 font-light text-gold-400">
                Cookies
              </h2>
              <p>
                You can block or delete cookies in your browser settings, and you can control the ads you see on Facebook and Instagram in your Meta &quot;Ad preferences&quot;. The website still works if you block cookies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 font-light text-gold-400">
                Your choices
              </h2>
              <p>
                You can ask me what details I hold about you, ask me to correct them, or ask me to delete them. Just email{' '}
                <a
                  href="mailto:marco@marcoswinebar.com.au"
                  className="text-gold-400 underline underline-offset-4 hover:text-gold-300"
                >
                  marco@marcoswinebar.com.au
                </a>{' '}
                and I&apos;ll sort it out.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 font-light text-gold-400">
                Questions or complaints
              </h2>
              <p>
                Email me at{' '}
                <a
                  href="mailto:marco@marcoswinebar.com.au"
                  className="text-gold-400 underline underline-offset-4 hover:text-gold-300"
                >
                  marco@marcoswinebar.com.au
                </a>
                . If you are not happy with my answer, you can contact the Office of the Australian Information Commissioner at{' '}
                <a
                  href="https://www.oaic.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 underline underline-offset-4 hover:text-gold-300"
                >
                  oaic.gov.au
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onOpenConsultation={() => setIsConsultationModalOpen(true)} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </div>
  );
}
