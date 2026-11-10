'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import LeadForm from './LeadForm';

export default function ConsultationModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark overlay backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-charcoal-900 border border-gold-500/40 p-6 sm:p-10 shadow-2xl rounded-sm z-10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-cream-400 hover:text-gold-400 hover:bg-white/5 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-cream-50 font-light">
            Let's talk
          </h2>
          <p className="text-sm text-cream-400 font-light max-w-lg mx-auto">
            Only Marco on the other side. No bots, no assistants, no middlemen.
          </p>
        </div>

        {/* Lead Form */}
        <LeadForm onSuccess={() => {}} />
      </div>
    </div>
  );
}
