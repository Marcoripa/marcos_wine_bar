'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { submitConsultationInquiry } from '../lib/firebase';
import { event as trackFbEvent } from '../lib/fpixel';

export default function LeadForm({ onSuccess, initialService = 'Floor Takeovers & Tuesday Revivals' }) {
  const [formData, setFormData] = useState({
    name: '',
    venueName: '',
    email: '',
    phone: '',
    preferredService: initialService,
    location: 'Regional Victoria',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const hasFiredLeadRef = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!formData.venueName.trim()) {
      setError('Please provide your venue or restaurant name.');
      return;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid business email address.');
      return;
    }

    setLoading(true);
    try {
      await submitConsultationInquiry(formData);
      if (!hasFiredLeadRef.current) {
        hasFiredLeadRef.current = true;
        trackFbEvent('Lead', { content_name: 'venue-consultation-enquiry' });
      }
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 text-center bg-charcoal-900 border border-gold-500/40 rounded-sm">
        <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-gold-500" />
        </div>
        <h3 className="text-3xl font-serif text-cream-50 mb-3">
          Grazie, {formData.name}
        </h3>
        <p className="text-sm sm:text-base text-cream-300 font-light max-w-md mx-auto mb-6 leading-relaxed">
          Your venue consultation request for <strong className="text-gold-400 font-medium">{formData.venueName}</strong> has been received. Marco will review your venue profile and reach out within 24 hours to review dates, wine allocations, and service format.
        </p>
        <button
          onClick={() => {
            hasFiredLeadRef.current = false;
            setSubmitted(false);
            setFormData({
              name: '',
              venueName: '',
              email: '',
              phone: '',
              preferredService: 'Floor Takeovers & Tuesday Revivals',
              location: 'Mornington Peninsula',
              notes: '',
            });
          }}
          className="text-xs uppercase tracking-widest text-gold-400 hover:text-cream-50 underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      {error && (
        <div className="p-4 bg-red-950/70 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-center gap-3 rounded-sm">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] uppercase tracking-widest text-cream-300 mb-1.5 font-medium">
            Your Name <span className="text-gold-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder=""
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
          />
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-cream-300 mb-1.5 font-medium">
            Venue / Restaurant <span className="text-gold-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="venueName"
              required
              placeholder=""
              value={formData.venueName}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
            />
            <Building2 className="w-4 h-4 text-neutral-600 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] uppercase tracking-widest text-cream-300 mb-1.5 font-medium">
            Email Address <span className="text-gold-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
            />
            <Mail className="w-4 h-4 text-neutral-600 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-cream-300 mb-1.5 font-medium">
            Phone Number <span className="text-neutral-500">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder=""
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
            />
            <Phone className="w-4 h-4 text-neutral-600 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] uppercase tracking-widest text-cream-300 mb-1.5 font-medium">
            Collaboration Model
          </label>
          <select
            name="preferredService"
            value={formData.preferredService}
            onChange={handleChange}
            disabled={loading}
            className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
          >
            <option value="Floor Takeovers & Tuesday Revivals">
              Floor Takeover
            </option>
            <option value="Pop-Up Masterclasses & Tasting Dinners">
              Masterclass / Tasting Dinner
            </option>
            <option value="Beverage Margin & Inventory Engineering">
              Cellar Strategist
            </option>
            <option value="Custom Partnership">
              Custom Partnership / Private Event
            </option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] uppercase tracking-widest text-cream-300 mb-1.5 font-medium">
            Postcode / suburb
          </label>
          <div className="relative">
            <input
              type="string"
              name="postcode"
              placeholder=""
              value={formData.postcode}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-gold-500 transition-colors rounded-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[11px] uppercase tracking-widest text-cream-300 mb-1.5 font-medium">
          Details <span className="text-neutral-500">(Optional)</span>
        </label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Tell me about your typical Tuesday covers, current wine list style, or planned event ideas..."
          value={formData.notes}
          onChange={handleChange}
          disabled={loading}
          className="w-full bg-charcoal-950 border border-white/10 px-4 py-3 text-cream-50 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-gold-500 transition-colors rounded-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-charcoal-950 text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-gold-glow flex items-center justify-center gap-2 rounded-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-charcoal-950" />
            <span>Sending Request...</span>
          </>
        ) : (
          <>
            <span>Submit Request</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-cream-400 font-light pt-1">
        I will only use your details to reply to your enquiry.{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-2 hover:text-gold-400 transition-colors"
        >
          Privacy policy
        </Link>
      </p>
    </form>
  );
}
