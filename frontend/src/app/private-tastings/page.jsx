'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, Check, Loader2, AlertCircle, ExternalLink, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ConsultationModal from '../../components/ConsultationModal';
import { submitPrivateEventEnquiry } from '../../lib/firebase';
import { event as trackFbEvent } from '../../lib/fpixel';

// Dynamically import Cal.com embed to support SSR in Next.js
const Cal = dynamic(() => import('@calcom/embed-react'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[520px] flex flex-col items-center justify-center gap-3 bg-white text-[#4a4a4a]">
      <Loader2 className="w-6 h-6 animate-spin text-[#c5a059]" />
      <span className="text-xs uppercase tracking-wider">Loading booking calendar...</span>
    </div>
  ),
});

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'https://cal.com/marcoswinebar/private-tasting';

const OCCASION_OPTIONS = [
  "Friends' weekend",
  'Birthday',
  'Hens / Bucks',
  'Long Lunch',
  'Romantic date / proposal',
  'Something else',
];

const GROUP_SIZE_OPTIONS = [
  'Up to 6',
  '7 to 12',
  'More than 12',
  'Not sure yet',
];

const JOURNEY_OPTIONS = [
  {
    title: 'Italy in 6 Wines',
    description: 'From the Alps to Sicily. Glass by glass.',
  },
  {
    title: 'Sparkling of the World',
    description: "Champagne and beyond. As long as it's bubbly!",
  },
  {
    title: 'Australia vs the World',
    description: 'Aussie classics and their international benchmarks. Blind, side by side. Does the home team hold up?.',
  },
  {
    title: 'Every Side of Barolo',
    description: 'The king of wines, in all its crus. One famous wine, many villages.',
  },
  {
    title: 'On the Slopes of a Volcano',
    description: 'A volcanic soils comparison.',
  },
  {
    title: 'Surprise me',
    description: "Tell me what you like and I'll design it.",
  },
];

const BUDGET_OPTIONS = [
  { title: 'Easygoing', description: 'around $300 of wine' },
  { title: 'Something special', description: 'around $500 to $800' },
  { title: 'Go all out', description: 'up to around $1,000' },
  { title: 'Help me decide', description: '' },
];

function parseStepFromHash(hash) {
  if (!hash) return 0;
  if (hash === '#thank-you') return 7;
  if (hash === '#booking-options') return 6;
  const match = hash.match(/^#step-([1-6])$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 0;
}

export default function PrivateTastingsPage() {
  const prefersReducedMotion = useReducedMotion();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [isCalModalOpen, setIsCalModalOpen] = useState(false);
  const [calTargetUrl, setCalTargetUrl] = useState(CAL_LINK);

  const [step, setStep] = useState(0);
  const [utmParams, setUtmParams] = useState({});

  // Wizard state
  const [occasion, setOccasion] = useState('');
  const [occasionOther, setOccasionOther] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [journey, setJourney] = useState('');
  const [wineBudget, setWineBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [optionSelected, setOptionSelected] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Meta Pixel tracking refs
  const hasFiredInitiateCheckoutRef = useRef(false);
  const hasFiredLeadRef = useRef(false);

  // Capture UTM params and initial URL hash on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const capturedUtm = {};
    for (const [key, value] of params.entries()) {
      if (key.toLowerCase().startsWith('utm_') && value) {
        capturedUtm[key.toLowerCase()] = value;
      }
    }
    setUtmParams(capturedUtm);

    const initialStep = parseStepFromHash(window.location.hash);
    if (initialStep >= 1 && initialStep <= 6) {
      setStep(initialStep);
    }

    const handleHashChange = () => {
      const nextStep = parseStepFromHash(window.location.hash);
      setStep(nextStep);
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [prefersReducedMotion]);

  // Escape key closes modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsInfoPanelOpen(false);
        setIsCalModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const goToStep = (targetStep) => {
    setSubmitError('');
    setStep(targetStep);
    if (typeof window !== 'undefined') {
      const newHash =
        targetStep === 0
          ? window.location.pathname + window.location.search
          : targetStep === 7
          ? '#thank-you'
          : targetStep === 6
          ? '#booking-options'
          : `#step-${targetStep}`;

      if (targetStep === 0) {
        window.history.pushState(null, '', newHash);
      } else {
        window.location.hash = newHash;
      }
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleStartWizard = () => {
    if (!hasFiredInitiateCheckoutRef.current) {
      hasFiredInitiateCheckoutRef.current = true;
      trackFbEvent('InitiateCheckout', { content_name: 'private-tasting-wizard-started' });
    }
    goToStep(1);
  };

  const handleSelectOccasion = (selected) => {
    setOccasion(selected);
    if (selected !== 'Something else') {
      goToStep(2);
    }
  };

  const handleSelectGroupSize = (selected) => {
    setGroupSize(selected);
    goToStep(3);
  };

  const handleSelectJourney = (selectedTitle) => {
    setJourney(selectedTitle);
    goToStep(4);
  };

  const handleSelectBudget = (selectedBudget) => {
    setWineBudget(selectedBudget);
    goToStep(5);
  };

  const handleProceedToBookingOptions = (e) => {
    e.preventDefault();
    setSubmitError('');

    if (honeypot) {
      return;
    }

    if (!name.trim()) {
      setSubmitError('Please enter your name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setSubmitError('Please enter a valid email address.');
      return;
    }
    if (!location.trim()) {
      setSubmitError('Please enter your suburb or town.');
      return;
    }

    goToStep(6);
  };

  // Cal.com slug and embed configuration based on https://cal.com/help/embedding/prefill-booking-form-embed
  const calLinkSlug = useMemo(() => {
    return CAL_LINK.replace(/^https?:\/\/[^/]+\//, '').replace(/^\//, '');
  }, []);

  const calConfig = useMemo(() => {
    const summaryParts = [
      occasion ? `Occasion: ${occasion === 'Something else' ? occasionOther : occasion}` : '',
      groupSize ? `Guests: ${groupSize}` : '',
      journey ? `Journey: ${journey}` : '',
      wineBudget ? `Budget: ${wineBudget}` : '',
      location ? `Location: ${location.trim()}` : '',
      notes ? `Notes: ${notes.trim()}` : '',
    ].filter(Boolean);

    return {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      notes: summaryParts.join(' | '),
      theme: 'light',
    };
  }, [name, email, phone, location, notes, occasion, occasionOther, groupSize, journey, wineBudget]);

  const buildCalUrl = () => {
    const calParams = new URLSearchParams();
    if (name) calParams.set('name', name.trim());
    if (email) calParams.set('email', email.trim().toLowerCase());
    if (location) calParams.set('location', location.trim());
    if (phone) calParams.set('phone', phone.trim());

    const summaryParts = [
      occasion ? `Occasion: ${occasion === 'Something else' ? occasionOther : occasion}` : '',
      groupSize ? `Guests: ${groupSize}` : '',
      journey ? `Journey: ${journey}` : '',
      wineBudget ? `Budget: ${wineBudget}` : '',
      notes ? `Notes: ${notes.trim()}` : '',
    ].filter(Boolean);

    if (summaryParts.length > 0) {
      calParams.set('notes', summaryParts.join(' | '));
    }

    return `${CAL_LINK}?${calParams.toString()}`;
  };

  // Option A: Book my date via Cal.com + $200 deposit
  const handleSelectOptionA = async () => {
    setOptionSelected('A');
    setSubmitting(true);
    setSubmitError('');

    try {
      await submitPrivateEventEnquiry({
        occasion,
        occasionOther: occasion === 'Something else' ? occasionOther : '',
        groupSize,
        journey,
        location,
        wineBudget,
        name,
        email,
        phone,
        notes,
        bookingPreference: 'Book my date (Cal.com $200 deposit)',
        utm: utmParams,
      });

      if (!hasFiredLeadRef.current) {
        hasFiredLeadRef.current = true;
        trackFbEvent('Lead', { content_name: 'private-tasting-enquiry' });
      }

      const targetUrl = buildCalUrl();
      setCalTargetUrl(targetUrl);
      setIsCalModalOpen(true);
    } catch (err) {
      setSubmitError(
        'Something went wrong saving your booking details. Please try again, or email me directly at marco@marcoswinebar.com.au.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Option B: Send an enquiry (no payment, Marco will be in touch)
  const handleSelectOptionB = async () => {
    setOptionSelected('B');
    setSubmitting(true);
    setSubmitError('');

    try {
      await submitPrivateEventEnquiry({
        occasion,
        occasionOther: occasion === 'Something else' ? occasionOther : '',
        groupSize,
        journey,
        location,
        wineBudget,
        name,
        email,
        phone,
        notes,
        bookingPreference: 'Send an enquiry (no payment)',
        utm: utmParams,
      });

      if (!hasFiredLeadRef.current) {
        hasFiredLeadRef.current = true;
        trackFbEvent('Lead', { content_name: 'private-tasting-enquiry' });
      }

      goToStep(7);
    } catch (err) {
      setSubmitError(
        'Something went wrong saving your enquiry. Please try again, or email me directly at marco@marcoswinebar.com.au.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const firstName = name.trim() ? name.trim().split(/\s+/)[0] : 'there';

  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -14 },
        transition: { duration: 0.28, ease: 'easeOut' },
      };

  const handleNavbarSectionClick = (sectionId) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#121212] font-sans selection:bg-[#c5a059] selection:text-[#0b0b0b] flex flex-col">
      {/* Header */}
      <Navbar
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onScrollToSection={handleNavbarSectionClick}
        theme="light"
      />

      {/* Persistent Desktop Top Info Bar */}
      <div className="hidden md:block pt-20 bg-[#ebe5d8]/80 border-b border-[#c5a059]/20">
        <div className="max-w-4xl mx-auto px-6 py-2.5 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsInfoPanelOpen(true)}
            className="text-xs tracking-wider text-[#282828] hover:text-[#8e6f33] transition-colors py-1 px-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
          >
            <span className="font-semibold text-[#8e6f33]">$500 + wine</span>
            <span className="mx-2 text-[#78716c]">·</span>
            <span className="underline underline-offset-4 decoration-[#c5a059]">FAQs</span>
          </button>
        </div>
      </div>

      {/* Main Wizard Area */}
      <main className="flex-grow pt-24 md:pt-10 pb-28 md:pb-24 px-5 sm:px-8 relative overflow-hidden">
        {/* Subtle warm ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[450px] bg-[#c5a059]/12 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          {/* Progress Bar & Back Button (Steps 1 to 5) */}
          {step >= 1 && step <= 5 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => goToStep(step - 1)}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#4a4a4a] hover:text-[#121212] transition-colors py-1.5 pr-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
                >
                  <ArrowLeft className="w-4 h-4 text-[#8e6f33]" />
                  <span>Back</span>
                </button>
                <span
                  className="text-xs uppercase tracking-[0.2em] text-[#4a4a4a] font-medium"
                  aria-live="polite"
                >
                  Step {step} of 5
                </span>
              </div>
              <div
                className="w-full h-1 bg-[#e5dfd3] rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={step}
                aria-valuemin={1}
                aria-valuemax={5}
                aria-label={`Step ${step} of 5`}
              >
                <div
                  className="h-full bg-[#c5a059] transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* SCREEN 0: WELCOME */}
            {step === 0 && (
              <motion.div key="step-0" {...motionProps} className="space-y-10">
                <div className="text-center space-y-5 pt-2 sm:pt-6">
                  <h1 className="text-4xl sm:text-6xl font-serif font-light text-[#121212] tracking-tight leading-[1.1]">
                    Serious wine. <span className="italic font-normal text-[#8e6f33]">Minus the ego.</span>
                  </h1>
                  <p className="text-xl sm:text-2xl font-serif text-[#333333] font-normal">
                    Bringing destination wine culture to your dining room.
                  </p>

                  {/* Price Callout Box */}
                  <div className="p-5 sm:p-6 bg-[#fbf8f1] border border-[#c5a059]/50 shadow-sm rounded-sm max-w-xl mx-auto text-left sm:text-center">
                    <p className="text-sm sm:text-base text-[#282828] font-light leading-relaxed">
                      <strong className="text-[#8e6f33] font-semibold">$500 + wine</strong> <br></br>I&apos;ll design the tasting and write the wine list. You buy the wine directly. Wine usually runs $300 to $1,000.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleStartWizard}
                      className="w-full sm:w-auto min-w-[240px] px-8 py-4 bg-[#c5a059] hover:bg-[#b08b42] text-[#0b0b0b] text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow inline-flex items-center justify-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                    >
                      <span>Plan your occasion</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Small "About Marco" Card */}
                <div className="p-6 sm:p-8 bg-[#fbf8f1] border border-[#ded7c8] shadow-sm rounded-sm">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="w-24 h-32 sm:w-28 sm:h-36 shrink-0 rounded-sm overflow-hidden border border-[#c5a059]/40 bg-[#f4ecd8]">
                      <img
                        src="/web-20261026-Ripa-001.jpg"
                        alt="Marco Ripa, Visiting Sommelier"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="space-y-2 text-center sm:text-left">
                      <div className="text-xs uppercase tracking-[0.25em] text-[#333333] font-semibold">
                        About Marco
                      </div>
                      <p className="text-sm text-[#3a3a3a] font-light leading-relaxed">
                        I enrolled in a winemaking course in Milan at 20, while I was meant to be studying politics. Wine won. For the next decade I worked harvests and cellars in Barolo, Tuscany, Champagne, Napa Valley, Marlborough and McLaren Vale: more than 12 vintages around the world. These days I&apos;d rather drink wine than make it, and I&apos;d rather share it than lecture about it.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SCREEN 1: WHAT'S THE OCCASION? */}
            {step === 1 && (
              <motion.div key="step-1" {...motionProps} className="space-y-6">
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#121212]">
                  What&apos;s the occasion?
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {OCCASION_OPTIONS.map((opt) => {
                    const isSelected = occasion === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleSelectOccasion(opt)}
                        className={`w-full text-left p-5 rounded-sm border transition-all duration-200 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] ${
                          isSelected
                            ? 'bg-[#f4ecd8] border-[#c5a059] shadow-gold-glow text-[#121212] ring-1 ring-[#c5a059]'
                            : 'bg-[#fbf8f1] border-[#ded7c8] hover:border-[#c5a059] text-[#121212] shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="text-base sm:text-lg font-serif">{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#8e6f33] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {occasion === 'Something else' && (
                  <div className="pt-2 space-y-4">
                    <div>
                      <label
                        htmlFor="occasion-other"
                        className="block text-xs uppercase tracking-widest text-[#333333] mb-2"
                      >
                        Tell me briefly about the occasion
                      </label>
                      <input
                        id="occasion-other"
                        type="text"
                        value={occasionOther}
                        onChange={(e) => setOccasionOther(e.target.value)}
                        autoFocus
                        className="w-full bg-[#ffffff] border border-[#ded7c8] px-4 py-3.5 text-[#121212] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#c5a059] hover:bg-[#b08b42] text-[#0b0b0b] text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow inline-flex items-center justify-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* SCREEN 2: HOW MANY OF YOU? */}
            {step === 2 && (
              <motion.div key="step-2" {...motionProps} className="space-y-6">
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#121212]">
                  How many of you?
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {GROUP_SIZE_OPTIONS.map((opt) => {
                    const isSelected = groupSize === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleSelectGroupSize(opt)}
                        className={`w-full text-left p-5 rounded-sm border transition-all duration-200 flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] ${
                          isSelected
                            ? 'bg-[#f4ecd8] border-[#c5a059] shadow-gold-glow text-[#121212] ring-1 ring-[#c5a059]'
                            : 'bg-[#fbf8f1] border-[#ded7c8] hover:border-[#c5a059] text-[#121212] shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="text-base sm:text-lg font-serif">{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#8e6f33] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs sm:text-sm text-[#4a4a4a] font-light leading-relaxed pt-1">
                  The wine is designed to serve up to 12. Bigger group? We scale the wine, and my fee stays the same.
                </p>
              </motion.div>
            )}

            {/* SCREEN 3: CHOOSE YOUR JOURNEY */}
            {step === 3 && (
              <motion.div key="step-3" {...motionProps} className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#121212]">
                    Choose your journey
                  </h1>
                  <p className="text-sm sm:text-base text-[#4a4a4a] font-light">
                    Every tasting is a trip somewhere. Pick a destination, or I&apos;ll design one around you.
                  </p>
                </div>

                <div className="space-y-3">
                  {JOURNEY_OPTIONS.map((item) => {
                    const isSelected = journey === item.title;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleSelectJourney(item.title)}
                        className={`w-full text-left p-5 rounded-sm border transition-all duration-200 flex items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] ${
                          isSelected
                            ? 'bg-[#f4ecd8] border-[#c5a059] shadow-gold-glow ring-1 ring-[#c5a059]'
                            : 'bg-[#fbf8f1] border-[#ded7c8] hover:border-[#c5a059] shadow-sm hover:shadow'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-lg sm:text-xl font-serif text-[#121212]">
                            {item.title}
                          </div>
                          <p className="text-xs sm:text-sm text-[#4a4a4a] font-light leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#8e6f33] shrink-0 mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* SCREEN 4: YOUR WINE BUDGET (Formerly Step 5) */}
            {step === 4 && (
              <motion.div key="step-4" {...motionProps} className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#121212]">
                    Your wine budget
                  </h1>
                  <p className="text-sm sm:text-base text-[#4a4a4a] font-light">
                    The fee is $500. The wine is extra, and you buy it directly.
                  </p>
                </div>

                <div className="space-y-3">
                  {BUDGET_OPTIONS.map((item) => {
                    const valueLabel = item.description
                      ? `${item.title} (${item.description})`
                      : item.title;
                    const isSelected = wineBudget === valueLabel;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => handleSelectBudget(valueLabel)}
                        className={`w-full text-left p-5 rounded-sm border transition-all duration-200 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] ${
                          isSelected
                            ? 'bg-[#f4ecd8] border-[#c5a059] shadow-gold-glow ring-1 ring-[#c5a059]'
                            : 'bg-[#fbf8f1] border-[#ded7c8] hover:border-[#c5a059] shadow-sm hover:shadow'
                        }`}
                      >
                        <div>
                          <span className="text-lg sm:text-xl font-serif text-[#121212]">
                            {item.title}
                          </span>
                          {item.description && (
                            <span className="text-sm text-[#4a4a4a] font-light ml-2">
                              — {item.description}
                            </span>
                          )}
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#8e6f33] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs sm:text-sm text-[#4a4a4a] font-light leading-relaxed pt-1">
                  Having food? I&apos;ll work with your chef on the pairing.
                </p>
              </motion.div>
            )}

            {/* SCREEN 5: YOUR DETAILS (Formerly Step 6) */}
            {step === 5 && (
              <motion.div key="step-5" {...motionProps} className="space-y-6">
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#121212]">
                  Your details
                </h1>

                {/* Summary of answers with Edit links */}
                <div className="p-5 bg-[#fbf8f1] border border-[#ded7c8] rounded-sm space-y-2.5 text-xs sm:text-sm shadow-sm">
                  <div className="flex items-center justify-between gap-2 border-b border-[#e8e2d5] pb-2">
                    <div>
                      <span className="text-[#555555]">Occasion: </span>
                      <span className="text-[#121212] font-medium">
                        {occasion === 'Something else' && occasionOther
                          ? occasionOther
                          : occasion || 'Not selected'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="text-xs text-[#8e6f33] hover:text-[#5c461d] font-semibold underline underline-offset-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-b border-[#e8e2d5] pb-2">
                    <div>
                      <span className="text-[#555555]">Group size: </span>
                      <span className="text-[#121212] font-medium">{groupSize || 'Not selected'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="text-xs text-[#8e6f33] hover:text-[#5c461d] font-semibold underline underline-offset-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 border-b border-[#e8e2d5] pb-2">
                    <div>
                      <span className="text-[#555555]">Journey: </span>
                      <span className="text-[#121212] font-medium">{journey || 'Not selected'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="text-xs text-[#8e6f33] hover:text-[#5c461d] font-semibold underline underline-offset-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[#555555]">Wine budget: </span>
                      <span className="text-[#121212] font-medium">{wineBudget || 'Not selected'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(4)}
                      className="text-xs text-[#8e6f33] hover:text-[#5c461d] font-semibold underline underline-offset-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Contact Form */}
                <form
                  onSubmit={handleProceedToBookingOptions}
                  className="space-y-5 bg-[#fbf8f1] p-6 sm:p-8 rounded-sm border border-[#ded7c8] shadow-sm"
                  noValidate
                >
                  {submitError && (
                    <div
                      role="alert"
                      className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm flex items-start gap-3 rounded-sm"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Honeypot field for spam protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-url">Website</label>
                    <input
                      id="website-url"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-name"
                      className="block text-xs uppercase tracking-widest text-[#333333] mb-1.5"
                    >
                      Your name <span className="text-[#c5a059] font-bold">*</span>
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-[#ffffff] border border-[#ded7c8] px-4 py-3.5 text-[#121212] placeholder-[#888888] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-email"
                      className="block text-xs uppercase tracking-widest text-[#333333] mb-1.5"
                    >
                      Email <span className="text-[#c5a059] font-bold">*</span>
                    </label>
                    <input
                      id="guest-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-[#ffffff] border border-[#ded7c8] px-4 py-3.5 text-[#121212] placeholder-[#888888] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-phone"
                      className="block text-xs uppercase tracking-widest text-[#333333] mb-1.5"
                    >
                      Phone <span className="text-[#6b7280] normal-case">(optional)</span>
                    </label>
                    <input
                      id="guest-phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-[#ffffff] border border-[#ded7c8] px-4 py-3.5 text-[#121212] placeholder-[#888888] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guest-location"
                      className="block text-xs uppercase tracking-widest text-[#333333] mb-1.5"
                    >
                      Suburb or town (or where you&apos;re staying) <span className="text-[#c5a059] font-bold">*</span>
                    </label>
                    <input
                      id="guest-location"
                      type="text"
                      required
                      placeholder="e.g. Red Hill, Sorrento, Fitzroy..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-[#ffffff] border border-[#ded7c8] px-4 py-3.5 text-[#121212] placeholder-[#888888] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
                    />
                    <p className="text-xs text-[#4a4a4a] font-light mt-1.5">
                      I travel everywhere in Victoria.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="guest-notes"
                      className="block text-xs uppercase tracking-widest text-[#333333] mb-1.5"
                    >
                      Anything I should know?{' '}
                      <span className="text-[#6b7280] normal-case">(optional)</span>
                    </label>
                    <textarea
                      id="guest-notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-[#ffffff] border border-[#ded7c8] px-4 py-3.5 text-[#121212] placeholder-[#888888] text-sm rounded-sm focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#c5a059] hover:bg-[#b08b42] text-[#0b0b0b] text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow flex items-center justify-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                  >
                    <span>Next: Choose booking option</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-center text-xs text-[#6b7280] font-light pt-1">
                    I will only use your details to reply to your enquiry.{' '}
                    <Link
                      href="/privacy"
                      className="underline underline-offset-2 hover:text-[#121212] transition-colors"
                    >
                      Privacy policy
                    </Link>
                  </p>
                </form>
              </motion.div>
            )}

            {/* SCREEN 6: THE LAST PAGE WITH 2 OPTIONS */}
            {step === 6 && (
              <motion.div key="step-6" {...motionProps} className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => goToStep(5)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#4a4a4a] hover:text-[#121212] transition-colors py-1.5 pr-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
                  >
                    <ArrowLeft className="w-4 h-4 text-[#8e6f33]" />
                    <span>Back to your details</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#121212]">
                    How would you like to proceed?
                  </h1>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="p-4 bg-red-50 border border-red-300 text-red-900 text-xs sm:text-sm flex items-start gap-3 rounded-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span>
                      {submitError.split('marco@marcoswinebar.com.au')[0]}
                      {submitError.includes('marco@marcoswinebar.com.au') && (
                        <a
                          href="mailto:marco@marcoswinebar.com.au"
                          className="underline text-[#8e6f33] font-medium hover:text-[#5c461d]"
                        >
                          marco@marcoswinebar.com.au
                        </a>
                      )}
                      {submitError.split('marco@marcoswinebar.com.au')[1]}
                    </span>
                  </div>
                )}

                <div className="space-y-4 pt-2">
                  {/* OPTION A: BOOK MY DATE */}
                  <div className="space-y-1.5">
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleSelectOptionA}
                      className="w-full py-4 bg-[#c5a059] hover:bg-[#b08b42] disabled:opacity-50 disabled:cursor-not-allowed text-[#0b0b0b] text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow flex items-center justify-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                    >
                      {submitting && optionSelected === 'A' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#0b0b0b]" />
                          <span>Opening calendar...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Book my date</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-[#555555] font-light">
                      $200 deposit to secure your date
                    </p>
                  </div>

                  {/* OPTION B: SEND AN ENQUIRY */}
                  <div>
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={handleSelectOptionB}
                      className="w-full py-4 bg-[#fbf8f1] hover:bg-[#f4ecd8] border border-[#ded7c8] hover:border-[#c5a059] disabled:opacity-50 disabled:cursor-not-allowed text-[#121212] text-xs uppercase tracking-widest font-semibold transition-all duration-200 flex items-center justify-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                    >
                      {submitting && optionSelected === 'B' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-[#121212]" />
                          <span>Sending enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Send an enquiry</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-center text-xs text-[#6b7280] font-light pt-2">
                  I will only use your details to reply to your enquiry.{' '}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-2 hover:text-[#121212] transition-colors"
                  >
                    Privacy policy
                  </Link>
                </p>
              </motion.div>
            )}

            {/* SCREEN 7: THANK-YOU SCREEN */}
            {step === 7 && (
              <motion.div
                key="step-7"
                {...motionProps}
                className="p-8 sm:p-12 bg-[#fbf8f1] border border-[#c5a059]/50 shadow-md rounded-sm text-center space-y-6 my-6"
              >
                <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#121212]">
                  Thanks, {firstName}. Let&apos;s make it one to remember.
                </h1>
                <p className="text-base sm:text-lg text-[#333333] font-light max-w-md mx-auto leading-relaxed">
                  I&apos;ll read this myself and come back to you with ideas for your tasting.
                </p>
                <div className="pt-2">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c5a059] hover:bg-[#b08b42] text-[#0b0b0b] text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#121212]"
                  >
                    <span>Back to the homepage</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Cal.com Booking Modal / Embed Viewer */}
      {isCalModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cal-modal-title"
        >
          <div
            className="fixed inset-0 bg-[#0b0b0b]/85 backdrop-blur-sm"
            onClick={() => setIsCalModalOpen(false)}
          />
          <div className="relative w-full max-w-4xl bg-[#f5f5f0] border border-[#c5a059]/40 rounded-sm shadow-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#ded7c8] bg-[#fbf8f1]">
              <div>
                <h3 id="cal-modal-title" className="text-xl sm:text-2xl font-serif text-[#121212]">
                  Book your date &amp; deposit
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={calTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#8e6f33] hover:text-[#5c461d] font-semibold underline underline-offset-2"
                >
                  <span>Open in full tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsCalModalOpen(false)}
                  aria-label="Close calendar"
                  className="p-2 text-[#4a4a4a] hover:text-[#121212] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-auto bg-white relative min-h-[520px] sm:min-h-[580px]">
              <Cal
                calLink={calLinkSlug}
                style={{ width: '100%', height: '100%', minHeight: '560px', overflow: 'auto' }}
                config={calConfig}
              />
            </div>

            <div className="p-3 sm:p-4 border-t border-[#ded7c8] bg-[#fbf8f1] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#4a4a4a]">
              <span>Your details have been saved to Marco&apos;s booking system.</span>
              <a
                href={calTargetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8e6f33] underline hover:text-[#5c461d] font-medium"
              >
                Calendar not loading? Click here to open Cal.com directly ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Mobile Sticky Bottom Pill */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-sm">
        <button
          type="button"
          onClick={() => setIsInfoPanelOpen(true)}
          className="w-full py-3 px-4 bg-[#fbf8f1]/95 backdrop-blur-md border border-[#c5a059] rounded-full shadow-2xl text-xs text-[#121212] flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
        >
          <span className="font-semibold text-[#8e6f33]">$500 + wine</span>
          <span className="text-[#78716c]">·</span>
          <span className="font-medium text-[#121212]">FAQs</span>
        </button>
      </div>

      {/* Info Panel Modal ("$500 + wine · How it works · FAQs") */}
      {isInfoPanelOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-panel-title"
        >
          <div
            className="fixed inset-0 bg-[#121212]/60 backdrop-blur-sm"
            onClick={() => setIsInfoPanelOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-[#f5f5f0] border-t sm:border border-[#c5a059]/40 p-6 sm:p-10 rounded-t-lg sm:rounded-sm shadow-2xl z-10 max-h-[88vh] overflow-y-auto space-y-8 text-[#121212]">
            <div className="flex items-start justify-between gap-4">
              <h2
                id="info-panel-title"
                className="text-2xl sm:text-3xl font-serif font-light text-[#121212]"
              >
                Pricing &amp; FAQs
              </h2>
              <button
                type="button"
                onClick={() => setIsInfoPanelOpen(false)}
                aria-label="Close panel"
                className="p-2 text-[#6b7280] hover:text-[#121212] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pricing Section */}
            <div className="p-5 bg-[#fbf8f1] border border-[#c5a059]/40 rounded-sm shadow-sm">
              <p className="text-sm sm:text-base text-[#282828] font-light leading-relaxed">
                <strong className="text-[#8e6f33] font-semibold">$500 + wine</strong> <br></br>
                I&apos;ll design the tasting and write the wine list. The wine runs from about $300 for an entry-level tasting to about $1,000 for an exclusive one. <br></br>
                It&apos;s designed to serve up to 12 people. More guests? We scale the wine, and my fee stays the same.
              </p>
            </div>

            {/* How it works */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-[#121212]">How it works</h3>
              <ol className="space-y-3 text-sm text-[#333333] font-light leading-relaxed list-decimal list-inside">
                <li>
                  <strong className="text-[#121212] font-medium">Tell me about your occasion.</strong> The occasion, the crowd and your budget.
                </li>
                <li>
                  <strong className="text-[#121212] font-medium">I design the tasting.</strong> I write the wine list. You buy the wine directly.
                </li>
                <li>
                  <strong className="text-[#121212] font-medium">I turn up with everything.</strong> Glasses, wine and my trusted cork-opener, of course. Having food? I&apos;ll work with your chef on the pairing.
                </li>
              </ol>
            </div>

            {/* FAQs */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-[#121212]">FAQs</h3>
              <div className="space-y-4 text-sm font-light leading-relaxed">
                <div className="p-4 bg-[#fbf8f1] border border-[#ded7c8] rounded-sm shadow-sm">
                  <div className="text-[#121212] font-medium mb-1">
                    Do I need to know about wine?
                  </div>
                  <p className="text-[#4a4a4a]">
                    You&apos;re either a wine enthusiast already, or you&apos;re going to be after the tasting. I&apos;ll tailor the experience to your level and taste.
                  </p>
                </div>

                <div className="p-4 bg-[#fbf8f1] border border-[#ded7c8] rounded-sm shadow-sm">
                  <div className="text-[#121212] font-medium mb-1">How many people?</div>
                  <p className="text-[#4a4a4a]">
                    The wine is designed to serve up to 12. For bigger groups we scale the wine accordingly, and my fee stays the same.
                  </p>
                </div>

                <div className="p-4 bg-[#fbf8f1] border border-[#ded7c8] rounded-sm shadow-sm">
                  <div className="text-[#121212] font-medium mb-1">
                    What do I need to provide?
                  </div>
                  <p className="text-[#4a4a4a]">Just yourself and your friends.</p>
                </div>

                <div className="p-4 bg-[#fbf8f1] border border-[#ded7c8] rounded-sm shadow-sm">
                  <div className="text-[#121212] font-medium mb-1">Where do you travel?</div>
                  <p className="text-[#4a4a4a]">Everywhere in Victoria.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer onOpenConsultation={() => setIsConsultationModalOpen(true)} theme="light" />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />
    </div>
  );
}
