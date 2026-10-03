import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import MotionProvider from '@/components/motion/MotionProvider';
import type { Metadata, Viewport } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Benton Estates | Your Trusted Partner in Quality Real Estate',
  description: 'Benton Estates (Benton Homes & Development Limited) provides affordable, litigation-free land sales, residential property development, and real estate consulting in Delta State, Nigeria.',
  keywords: [
    'Benton Estates',
    'Benton Homes and Development Limited',
    'Elevation Estate Ekrerahwe',
    'Real Estate Delta State',
    'Land for sale in Ughelli',
    'Property development Effurun',
    'Warri real estate',
    'Registered Survey Deed of Assignment'
  ],
  authors: [{ name: 'Benton Estates' }],
  metadataBase: new URL('https://bentonhomes.com'),
  openGraph: {
    title: 'Benton Estates | Quality Real Estate in Delta State',
    description: 'Discover verified land developments, Elevation Estate Ekrerahwe, and transparent property services with Benton Estates.',
    url: 'https://bentonhomes.com',
    siteName: 'Benton Estates',
    images: [
      {
        url: '/images/hero-estate.jpg',
        width: 1672,
        height: 941,
        alt: 'Benton Estates Developments'
      }
    ],
    locale: 'en_NG',
    type: 'website'
  },
  icons: {
    icon: '/favicon.png',
    apple: '/images/benton-logo-transparent.png'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0304CE'
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-slate-800">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <MotionProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="site-main flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
