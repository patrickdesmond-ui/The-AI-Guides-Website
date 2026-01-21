import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Leadership Essentials | Executive AI Training Curriculum | The AI Guides',
  description:
    'A practical AI curriculum for business leaders. 7 modules covering AI foundations, opportunity identification, tool evaluation, and implementation — from The AI Guides.',
  openGraph: {
    title: 'AI Leadership Essentials | Executive AI Training Curriculum',
    description:
      'A practical AI curriculum for business leaders. 7 modules covering AI foundations, opportunity identification, tool evaluation, and implementation.',
    type: 'website',
  },
};

export default function AILeadershipEssentialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
