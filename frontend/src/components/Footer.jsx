'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer({ onOpenConsultation, theme = 'dark' }) {
  const currentYear = new Date().getFullYear();
  const isLight = theme === 'light';

  return (
    <footer
      id="contact"
      className={`py-20 border-t relative ${
        isLight
          ? 'bg-[#ebe5d8] border-[#c5a059]/30 text-[#4a4a4a]'
          : 'border-white/5 bg-charcoal-950 text-cream-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div
              className={`text-2xl font-serif tracking-[0.2em] uppercase flex items-center ${
                isLight ? 'text-[#121212]' : 'text-cream-50'
              }`}
            >
              Marco<span className="text-gold-500 font-bold">.</span>
            </div>
            <p
              className={`text-xs uppercase tracking-[0.25em] font-light ${
                isLight ? 'text-[#3a3a3a]' : 'text-gold-400'
              }`}
            >
              Wine Strategist &amp; Visiting Sommelier • Marco&apos;s Wine Bar
            </p>
            <p
              className={`text-sm font-light max-w-sm leading-relaxed ${
                isLight ? 'text-[#4a4a4a]' : 'text-cream-400'
              }`}
            >
              Serious wine, minus the ego. Convivial Italian hospitality and commercial cellar strategy across Victoria.
            </p>
            <div
              className={`flex items-center gap-2 text-xs font-light ${
                isLight ? 'text-[#4a4a4a]' : 'text-cream-400'
              }`}
            >
              <MapPin className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#8e6f33]' : 'text-gold-500'}`} />
              <span>Regional Victoria &amp; Mornington Peninsula, Australia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div
              className={`text-xs uppercase tracking-[0.25em] font-semibold mb-4 ${
                isLight ? 'text-[#121212]' : 'text-cream-100'
              }`}
            >
              Navigation
            </div>
            <ul
              className={`space-y-2.5 text-xs uppercase tracking-wider font-light ${
                isLight ? 'text-[#4a4a4a]' : 'text-cream-400'
              }`}
            >
              <li>
                <a
                  href="#terroir"
                  className={`${isLight ? 'hover:text-[#8e6f33]' : 'hover:text-gold-400'} transition-colors`}
                >
                  About me
                </a>
              </li>
              <li>
                <a
                  href="#sommelier"
                  className={`${isLight ? 'hover:text-[#8e6f33]' : 'hover:text-gold-400'} transition-colors`}
                >
                  For venues
                </a>
              </li>
              <li>
                <a
                  href="#private-events"
                  className={`${isLight ? 'hover:text-[#8e6f33]' : 'hover:text-gold-400'} transition-colors`}
                >
                  Private events
                </a>
              </li>
              <li>
                <a
                  href="#partners"
                  className={`${isLight ? 'hover:text-[#8e6f33]' : 'hover:text-gold-400'} transition-colors`}
                >
                  Partners
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className={`${isLight ? 'hover:text-[#8e6f33]' : 'hover:text-gold-400'} transition-colors`}
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="space-y-3">
            <div
              className={`text-xs uppercase tracking-[0.25em] font-semibold mb-4 ${
                isLight ? 'text-[#121212]' : 'text-cream-100'
              }`}
            >
              Contacts
            </div>
            <div className="space-y-3 text-xs">
              <a
                href="tel:+61492979861"
                className={`flex items-center gap-2.5 transition-colors ${
                  isLight ? 'text-[#3a3a3a] hover:text-[#8e6f33]' : 'text-cream-300 hover:text-gold-400'
                }`}
              >
                <Phone className={`w-4 h-4 ${isLight ? 'text-[#8e6f33]' : 'text-gold-500'}`} />
                <span>+61 492 979 861</span>
              </a>

              <a
                href="mailto:marco@marcoswinebar.com.au"
                className={`flex items-center gap-2.5 transition-colors ${
                  isLight ? 'text-[#3a3a3a] hover:text-[#8e6f33]' : 'text-cream-300 hover:text-gold-400'
                }`}
              >
                <Mail className={`w-4 h-4 ${isLight ? 'text-[#8e6f33]' : 'text-gold-500'}`} />
                <span>marco@marcoswinebar.com.au</span>
              </a>

              <a
                href="https://www.instagram.com/marcos.mornington/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 transition-colors ${
                  isLight ? 'text-[#3a3a3a] hover:text-[#8e6f33]' : 'text-cream-300 hover:text-gold-400'
                }`}
              >
                <InstagramIcon className={`w-4 h-4 ${isLight ? 'text-[#8e6f33]' : 'text-gold-500'}`} />
                <span>@marcos.mornington</span>
              </a>

              <div className="pt-2">
                <button
                  onClick={onOpenConsultation}
                  className={`text-xs uppercase tracking-widest hover:underline block ${
                    isLight ? 'text-[#8e6f33] font-medium' : 'text-gold-400'
                  }`}
                >
                  Get in touch →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light ${
            isLight ? 'border-[#ded7c8] text-[#6b7280]' : 'border-white/5 text-cream-400'
          }`}
        >
          <div>
            © {currentYear} Marco&apos;s Wine Bar. All rights reserved.
          </div>
          <div>
            <Link
              href="/privacy"
              className={`${isLight ? 'hover:text-[#8e6f33]' : 'hover:text-gold-400'} underline underline-offset-4 transition-colors`}
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
