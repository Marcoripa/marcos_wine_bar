export const metadata = {
  title: "Privacy Policy | Marco's Wine Bar",
  description:
    "Privacy policy for Marco's Wine Bar and Visiting Sommelier services. Explaining what data is collected and how it is used.",
  alternates: {
    canonical: 'https://marcoswinebar.com.au/privacy/',
  },
  openGraph: {
    title: "Privacy Policy | Marco's Wine Bar",
    description:
      "Privacy policy for Marco's Wine Bar and Visiting Sommelier services.",
    url: 'https://marcoswinebar.com.au/privacy/',
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
    title: "Privacy Policy | Marco's Wine Bar",
    description:
      "Privacy policy for Marco's Wine Bar and Visiting Sommelier services.",
    images: ['https://marcoswinebar.com.au/og-image.jpg'],
  },
};

export default function PrivacyLayout({ children }) {
  return children;
}
