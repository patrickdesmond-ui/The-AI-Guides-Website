import type { Metadata } from 'next';
import { InteractiveChecklist } from '@/components/checklist/interactive-checklist';

export const metadata: Metadata = {
  title: 'AI Readiness Checklist for Australian SMEs | The AI Guides',
  description:
    'A practical checklist to help Australian SMEs spot gaps before rolling out AI. Assess your readiness across strategy, people, processes, data, and governance.',
};

export default function AIReadinessChecklistPage() {
  return <InteractiveChecklist />;
}
