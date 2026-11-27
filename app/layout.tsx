// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { Syne, DM_Sans, Instrument_Serif } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { LineWavesColorProvider } from '@/context/LineWavesColorContext';

import WebsiteBackground from '@/components/layout/WebsiteBackground';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import AdaptiveFavicon from '@/components/layout/AdaptiveFavicon';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// The single serif voice: Instrument Serif italic, used only for the hero
// name ("Ahmed") — the one maximalist twist in an otherwise minimal site.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic', 'normal'],
  variable: '--font-serif-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shabab Ahmed',
  description: 'Software Developer & Builder. BBA student at UAP Dhaka turning ideas into real products.',
  icons: {
    icon: [
      { url: '/favicon-dark-32x32.png?v=5', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-dark.png?v=5', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=5',
    apple: '/apple-touch-icon.png?v=5',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="adaptive-favicon-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var link = document.createElement('link');
                  link.rel = 'icon';
                  link.type = 'image/png';
                  link.sizes = '32x32';
                  link.href = isDark ? '/favicon-dark-32x32.png?v=5' : '/favicon-light-32x32.png?v=5';
                  document.head.appendChild(link);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-void text-ink transition-colors duration-300 font-dmSans antialiased">
        <AdaptiveFavicon />
        {/*
          Real theme now: dark is the default look, but the visitor's system
          preference is respected and the toggle in the navbar actually works.
          Previously forcedTheme="dark" made the toggle dead.
        */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScrollProvider>
            <LineWavesColorProvider>
              <WebsiteBackground />
              {children}
            </LineWavesColorProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
