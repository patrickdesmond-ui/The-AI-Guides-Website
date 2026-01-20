import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://theaiguides.co'),
  title: {
    default: 'The AI Guides | AI Strategy, Training & Advisory for Australian SMEs',
    template: '%s | The AI Guides',
  },
  description:
    'Empowering Australian SMEs with trusted AI strategy, training, and resources. Expert guidance to help your organisation adopt AI with confidence and drive measurable results.',
  keywords: [
    'AI strategy',
    'AI training',
    'AI advisory',
    'Australian SME',
    'AI governance',
    'executive AI training',
    'AI implementation',
    'digital transformation',
  ],
  authors: [{ name: 'The AI Guides' }],
  creator: 'The AI Guides',
  publisher: 'The AI Guides',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://theaiguides.co',
    siteName: 'The AI Guides',
    title: 'The AI Guides | AI Strategy, Training & Advisory for Australian SMEs',
    description:
      'Empowering Australian SMEs with trusted AI strategy, training, and resources. Expert guidance to help your organisation adopt AI with confidence.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The AI Guides - Navigate AI Change with Confidence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The AI Guides | AI Strategy & Training for Australian SMEs',
    description:
      'Expert AI guidance, strategy, and training for Australian SMEs. Navigate AI change with confidence.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
