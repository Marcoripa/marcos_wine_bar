export const metadata = {
  title: "Private Wine Tastings | Marco's Wine Bar, Visiting Sommelier",
  description:
    'A private wine tasting at your place, hosted by a Visiting Sommelier. $800 + wine, across Victoria. Serious wine, minus the ego.',
  alternates: {
    canonical: 'https://marcoswinebar.com.au/private-tastings/',
  },
  openGraph: {
    title: "Private Wine Tastings | Marco's Wine Bar, Visiting Sommelier",
    description:
      'A private wine tasting at your place, hosted by a Visiting Sommelier. $800 + wine, across Victoria. Serious wine, minus the ego.',
    url: 'https://marcoswinebar.com.au/private-tastings/',
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
    title: "Private Wine Tastings | Marco's Wine Bar, Visiting Sommelier",
    description:
      'A private wine tasting at your place, hosted by a Visiting Sommelier. $800 + wine, across Victoria. Serious wine, minus the ego.',
    images: ['https://marcoswinebar.com.au/og-image.jpg'],
  },
};

export default function PrivateTastingsLayout({ children }) {
  return children;
}
