// app/layout.tsx
import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { LineWavesColorProvider } from '@/context/LineWavesColorContext';

import WebsiteBackground from '@/components/layout/WebsiteBackground';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
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

export const metadata: Metadata = {
  title: 'Shabab Ahmed',
  description: 'Software Developer & Builder. BBA student at UAP Dhaka turning ideas into real products.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
      className={`${syne.variable} ${dmSans.variable} bg-void dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen text-ink transition-colors duration-300 font-dmSans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
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
