import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'AlertIQ — AI-Powered Scam Message Detection & Threat Alert System',
  description:
    'Identify and understand social engineering scam messages, phishing attempts, and deceptive links using AI analysis, verifiable excerpts, and URL reputation heuristics.',
  keywords: [
    'scam detection',
    'phishing detector',
    'AI cybersecurity',
    'social engineering',
    'message risk analyzer',
    'SMS scam checker',
  ],
  authors: [{ name: 'AlertIQ Cybersecurity Intelligence' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#070a12] text-[#f8fafc] tech-grid selection:bg-cyan-500/20 selection:text-cyan-300">
        <div className="radar-glow fixed inset-0 pointer-events-none z-0" />
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
