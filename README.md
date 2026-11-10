# Marco — Sommelier & Wine Strategist | Marco's Wine Bar

A high-performance React & Tailwind website tailored for a dual-purpose hospitality enterprise in the **Mornington Peninsula, Victoria, Australia**.

Designed with a **1920s Italian speakeasy meets modern minimalism** aesthetic: deep charcoal/black (#121212), muted gold/copper accents (#C5A059), and warm off-white typography.

---

## Live Production URLs

- **Live Website**: [https://marcos-wine-bar-vic.web.app](https://marcos-wine-bar-vic.web.app)
- **Firebase Console**: [https://console.firebase.google.com/project/marcos-wine-bar-vic/overview](https://console.firebase.google.com/project/marcos-wine-bar-vic/overview)
- **Hosting CDN**: Global Google Edge / Fastly CDN (Melbourne `MEL` Edge)

---

## Business Objectives

1. **Primary Immediate Goal — The Visiting Sommelier**:
   - Sell freelance floor takeover services to regional Mornington cafes and restaurants on traditionally quiet mid-week nights (Tuesdays/Wednesdays).
   - Leverage winemaking pedigree (G.D. Vajra Barolo, Domaine Chandon, Champagne, Cloudy Bay, Milan Oenology Degree) to curate high-margin wine flights with zero upfront capital risk for venues (revenue-share model).
   - Offer Pop-Up Masterclasses and Beverage Margin Consulting.
   - Direct CTA: **"Book a Consultation"** (triggers an interactive modal and dedicated lead form mapped to Google Cloud Firestore).

2. **Secondary Hype Goal — Marco's Wine Bar**:
   - Build anticipation for an intimate 24-seat speakeasy opening in **February 2027** in Mornington Peninsula.
   - Highlights 80+ curated labels (Barolo crus, Burgundy Premier Crus, and local Peninsula icons) with Coravin rare pours.
   - Direct CTA: **"Join the Guestlist"** (email capture mapped to Google Cloud Firestore).

---

## Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router) configured with `output: 'export'` for purely static HTML/CSS/JS export.
- **Styling**: Tailwind CSS with custom palette (`charcoal`, `gold`, `copper`, `cream`) and typography (`Cormorant Garamond` serif & `Plus Jakarta Sans`).
- **Animations**: Framer Motion for scroll reveals, glowing atmospheric effects, and responsive transitions.
- **Backend / Lead Capture**: Google Cloud Firestore (`australia-southeast1` Sydney/Melbourne region) via Firebase Web SDK.
- **Deployment**: Firebase Hosting with single-page application routing rules in [`firebase.json`](./firebase.json).

---

## Modular Component Structure

```
frontend/src/
├── app/
│   ├── globals.css           # Speakeasy custom styles, gold gradients & scrollbars
│   ├── layout.jsx            # Cormorant Garamond & Plus Jakarta Sans typography
│   └── page.jsx              # Main dual-purpose single-page scroll layout
├── components/
│   ├── Navbar.jsx            # Fixed blurred header, mobile drawer & quick CTAs
│   ├── Hero.jsx              # Split-focus dynamic hero introducing Marco & 2027 Bar
│   ├── Pedigree.jsx          # Credentials (Milan, Vajra, Champagne, Chandon, Tech)
│   ├── SommelierPitch.jsx    # Section 1: Mid-week takeover economics & services
│   ├── WineBarTeaser.jsx     # Section 2: Speakeasy teaser, sample cellar, & Guestlist
│   ├── LeadForm.jsx          # Validated venue consultation form with loading states
│   ├── ConsultationModal.jsx # Accessible modal dialog for instant booking
│   └── Footer.jsx            # Location coordinates, Instagram & contact email
└── lib/
    └── firebase.js           # Firestore write handlers (`submitConsultationInquiry`, `joinWineBarGuestlist`)
```

---

## Local Development & Builds

```bash
# Run local development server
npm run dev

# Build purely static export to frontend/out
npm run build

# Deploy updates to Firebase Hosting & Firestore rules
firebase deploy --project marcos-wine-bar-vic
```
