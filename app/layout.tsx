import type { Metadata } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';
import GoogleAnalytics from '../components/GoogleAnalytics';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import './globals.css';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  metadataBase: new URL('https://kirtan.askharekrishna.com'),
  title: 'Sri Krishna Kirtan',
  description: 'Official Sri Krishna Kirtan Music Library - Discover divine kirtans, lyrics, and translations.',
  openGraph: {
    type: 'website',
    url: 'https://kirtan.askharekrishna.com/',
    title: 'Sri Krishna Kirtan - Music Library',
    description: 'Discover divine kirtans, lyrics, and translations in multiple languages.',
    images: ['/lord caitanya.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Krishna Kirtan - Music Library',
    description: 'Discover divine kirtans, lyrics, and translations in multiple languages.',
    images: ['/lord caitanya.jpeg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

import { AuthProvider } from '../components/AuthProvider';
import { GoogleAuthProvider } from '../components/providers/GoogleAuthProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-stone-50 text-stone-900">
        <GoogleAuthProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleAuthProvider>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <FloatingWhatsApp />
        <Script 
          async 
          src="https://analytics.askharekrishna.com/script.js" 
          data-website-id="c90221b7-9a4b-415a-97fa-56696659129b" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
