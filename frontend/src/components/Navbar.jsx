'use client';

import React, { useState, useEffect } from 'react';
import { Wine, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenConsultation, onScrollToSection, theme = 'dark' }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About Me', href: '#terroir' },
    { label: 'For Venues', href: '#sommelier' },
    { label: 'Private Events', href: '#private-events' },
    { label: 'Partners', href: '#partners' },
    // { label: "Marco's Wine Bar", href: '#winebar' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onScrollToSection) {
      onScrollToSection(href.replace('#', ''));
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-40 top-0 transition-all duration-300 ${
        isLight
          ? scrolled
            ? 'bg-[#f5f5f0]/95 backdrop-blur-md border-b border-[#c5a059]/30 py-3 shadow-sm'
            : 'bg-[#f5f5f0]/85 backdrop-blur-sm border-b border-[#c5a059]/20 py-5'
          : scrolled
          ? 'bg-charcoal-950/90 backdrop-blur-md border-b border-gold-500/20 py-3 shadow-2xl'
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="group flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
              isLight
                ? 'border-[#c5a059]/50 bg-[#f4ecd8] group-hover:border-[#c5a059]'
                : 'border-gold-500/40 bg-charcoal-900 group-hover:border-gold-500'
            }`}
          >
            <Wine
              className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                isLight ? 'text-[#8e6f33]' : 'text-gold-500'
              }`}
            />
          </div>
          <div>
            <div
              className={`text-xl sm:text-2xl font-serif tracking-[0.2em] uppercase flex items-center ${
                isLight ? 'text-[#121212]' : 'text-cream-50'
              }`}
            >
              Marco<span className="text-gold-500 font-bold">.</span>
            </div>
            <div
              className={`text-[10px] uppercase tracking-[0.25em] font-light hidden sm:block ${
                isLight ? 'text-[#555555]' : 'text-cream-400'
              }`}
            >
              Wine Strategist &amp; Sommelier
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div
          className={`hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium ${
            isLight ? 'text-[#3a3a3a]' : 'text-cream-300'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`${
                isLight ? 'hover:text-[#8e6f33]' : 'hover:text-gold-400'
              } transition-colors relative py-1 flex items-center gap-1.5`}
            >
              {link.label}
              {link.badge && (
                <span className="px-1.5 py-0.5 text-[9px] tracking-normal uppercase bg-gold-500/15 text-gold-400 rounded border border-gold-500/30">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenConsultation}
            className="text-xs uppercase tracking-widest px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold transition-all duration-200 shadow-gold-glow flex items-center gap-2 rounded-sm"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="text-[11px] uppercase tracking-wider px-3 py-1.5 bg-gold-500 text-charcoal-950 font-semibold rounded-sm md:hidden"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 focus:outline-none ${
              isLight ? 'text-[#121212] hover:text-[#8e6f33]' : 'text-cream-200 hover:text-gold-400'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 ${
            isLight
              ? 'bg-[#f5f5f0] border-[#c5a059]/30 text-[#121212]'
              : 'bg-charcoal-950/98 border-gold-500/20 text-cream-200'
          }`}
        >
          <div
            className={`flex flex-col space-y-4 text-sm uppercase tracking-widest font-light ${
              isLight ? 'text-[#282828]' : 'text-cream-200'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`py-2 border-b flex items-center justify-between transition-colors ${
                  isLight
                    ? 'border-black/5 hover:text-[#8e6f33]'
                    : 'border-white/5 hover:text-gold-400'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] bg-gold-500/15 text-gold-400 rounded border border-gold-500/30">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full text-center text-xs uppercase tracking-widest py-3 bg-gold-500 text-charcoal-950 font-semibold rounded-sm"
              >
                Book a Consultation
              </button>
              {/* <a
                href="#winebar"
                onClick={(e) => handleLinkClick(e, '#winebar')}
                className="w-full text-center text-xs uppercase tracking-widest py-3 border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 rounded-sm"
              >
                Join 2027 Wine Bar Waitlist
              </a> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
