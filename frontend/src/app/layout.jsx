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
  title: "Marco | Wine Strategist & Visiting Sommelier",
  description:
    "Serious wine, minus the ego. Visiting Sommelier services for Victorian venues and private events).",
  keywords: [
    'Wine Strategist Victoria',
    'Visiting Sommelier Regional Victoria',
    'Restaurant Takeover Sommelier',
    'Barolo Winemaker',
    "Marco's Wine Bar",
    'Private Sommelier',
    'Wine List Consultant Victoria',
  ],
  openGraph: {
    title: "Marco | Wine Strategist & Sommelier",
    description:
      "Serious wine, minus the ego. Transforming quiet regional Victorian dining rooms into high-margin destination nights.",
    type: 'website',
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
