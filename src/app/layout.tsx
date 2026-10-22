import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'AlertIQ — Enterprise Scam Message Detection & Threat Intelligence Platform',
  description:
    'Identify and dissect sophisticated social engineering, phishing messages, and deceptive links using advanced neural threat reasoning, verbatim evidence verification, and domain reputation telemetry.',
  keywords: [
    'scam detection',
    'phishing intelligence',
    'AI cybersecurity',
    'social engineering defense',
    'threat analysis platform',
  ],
  authors: [{ name: 'AlertIQ Cybersecurity Systems' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#07080f] text-[#f0f4ff] selection:bg-violet-600 selection:text-white relative font-sans">
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
