import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

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
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
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

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-white text-slate-800">
        <Navbar />
        <main className="flex-1 pt-24 sm:pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
