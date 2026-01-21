import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Implementation Guide for Australian SMEs | The AI Guides',
  description:
    'A practical, step-by-step guide to implementing AI in your Australian SME. From readiness assessment to scaling—real frameworks, no hype.',
  keywords: [
    'AI implementation Australia',
    'SME AI guide',
    'artificial intelligence business Australia',
    'AI strategy SME',
    'AI adoption framework',
  ],
  openGraph: {
    title: 'AI Implementation Guide for Australian SMEs | The AI Guides',
    description:
      'A practical, step-by-step guide to implementing AI in your Australian SME. From readiness assessment to scaling—real frameworks, no hype.',
    type: 'article',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Implementation Guide for Australian SMEs',
    description:
      'A practical, step-by-step guide to implementing AI in your Australian SME. From readiness assessment to scaling.',
  },
};

export default function AIImplementationGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
