import './globals.css';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import MetaPixel from '../components/MetaPixel';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://marcoswinebar.com.au'),
  title: "Marco | Wine Strategist & Visiting Sommelier",
  description:
    "Serious wine, minus the ego. Visiting Sommelier services for Victorian venues and private events.",
  keywords: [
    'Wine Strategist Victoria',
    'Visiting Sommelier Regional Victoria',
    'Restaurant Takeover Sommelier',
    'Barolo Winemaker',
    "Marco's Wine Bar",
    'Private Sommelier',
    'Wine List Consultant Victoria',
  ],
  alternates: {
    canonical: 'https://marcoswinebar.com.au/',
  },
  openGraph: {
    title: "Marco | Wine Strategist & Sommelier",
    description:
      "Serious wine, minus the ego. Transforming quiet regional Victorian dining rooms into high-margin destination nights.",
    url: 'https://marcoswinebar.com.au/',
    siteName: "Marco's Wine Bar",
    locale: 'en_AU',
    type: 'website',
    images: [
      {
        url: 'https://marcoswinebar.com.au/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Marco Ripa, Visiting Sommelier',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Marco | Wine Strategist & Sommelier",
    description:
      "Serious wine, minus the ego. Transforming quiet regional Victorian dining rooms into high-margin destination nights.",
    images: ['https://marcoswinebar.com.au/og-image.jpg'],
  },
  verification: {
    other: {
      'facebook-domain-verification': 'napih38qt55zmdkmrg4cvtinobbbrd',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sans.variable} scroll-smooth`}>
      <body className="bg-charcoal-900 text-cream-100 font-sans antialiased selection:bg-gold-500 selection:text-charcoal-950">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
