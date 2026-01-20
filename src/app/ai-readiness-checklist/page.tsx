import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'AI Readiness Checklist for Australian SMEs | The AI Guides',
  description:
    'A practical checklist to help Australian SMEs spot gaps before rolling out AI. Assess your readiness across strategy, people, processes, data, and governance.',
};

const checklistSections = [
  {
    number: 1,
    title: 'Strategy & Ambition',
    items: [
      'Leadership is aligned on why AI matters and which business goals it supports.',
      "We've identified 2–3 priority AI use-cases to start with.",
      'A named sponsor (CEO/GM/COO) is accountable for AI direction.',
      "We've defined success metrics for our first AI initiatives (e.g., time saved, NPS, error reduction).",
    ],
    recommendation: 'Run a 90-minute executive alignment session and identify 2–3 use cases.',
  },
  {
    number: 2,
    title: 'People & Capability',
    items: [
      'Executives and managers understand AI basics and our approach.',
      'Staff know which approved AI tools they can use for work.',
      "We've delivered at least one structured training session (not just ad-hoc experimenting).",
      'Someone owns AI capability (ops/strategy/L&D) and answers day-to-day questions.',
    ],
    recommendation: 'Book executive training and a 60-minute staff session.',
  },
  {
    number: 3,
    title: 'Processes & Ways of Working',
    items: [
      "We've identified workflows where AI could save time (service, finance, ops).",
      'We have a process for testing and approving new AI workflows.',
      'Teams have bandwidth to adopt a new, AI-enabled way of working.',
      "We've chosen at least one function to pilot first (services, finance, ops).",
    ],
    recommendation: 'Pick one team, one workflow, and run a 2-week pilot.',
  },
  {
    number: 4,
    title: 'Data & Tools',
    items: [
      'We have an approved AI tools list (e.g., Copilot, Gemini, ChatGPT Plus).',
      'Business documents and data are organized enough for AI tools to use.',
      "We've defined what data must not be pasted into public AI tools (red/amber/green or R/A/G rules).",
      'Core platforms (Microsoft/Google/CRM) are up to date to support AI features.',
    ],
    recommendation: 'List your approved tools and assess and classify your data.',
  },
  {
    number: 5,
    title: 'Governance & Risk',
    items: [
      "We have a one-page AI policy that's published and easy to find.",
      'Human review is required for material outputs (customer comms, board papers, finance content).',
      'We track AI usage via approved tools or a simple log.',
      'We review tools/policy quarterly and share examples of good AI use.',
    ],
    recommendation: 'Draft your one-page policy and establish governance approach.',
  },
];

const resultsBands = [
  {
    range: '15-20 ticks',
    title: "You're ready to scale",
    description: 'Standardize 2-3 workflows and train managers to review AI outputs.',
    color: 'bg-green-100 border-green-500 text-green-800',
  },
  {
    range: '8-14 ticks',
    title: 'You have foundations to build on',
    description: 'Align leadership, publish your policy, and run staff training.',
    color: 'bg-amber-100 border-amber-500 text-amber-800',
  },
  {
    range: '0-7 ticks',
    title: 'Start with strategy',
    description: 'Begin with executive alignment, pick 2-3 use cases, and set guardrails.',
    color: 'bg-red-100 border-red-500 text-red-800',
  },
];

function ChecklistSection({
  section,
}: {
  section: (typeof checklistSections)[0];
}) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
          {section.number}
        </span>
        {section.title}
      </h3>
      <div className="space-y-3 ml-11">
        {section.items.map((item, index) => (
          <label
            key={index}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 rounded border-2 border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-0 cursor-pointer flex-shrink-0"
            />
            <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors leading-relaxed">
              {item}
            </span>
          </label>
        ))}
      </div>
      <div className="ml-11 mt-4 p-3 bg-[var(--color-bg-secondary)] rounded-lg border-l-3 border-[var(--color-primary)]">
        <p className="text-sm text-[var(--color-text-muted)]">
          <span className="font-medium text-[var(--color-text-secondary)]">If fewer than 3:</span>{' '}
          {section.recommendation}
        </p>
      </div>
    </div>
  );
}

export default function AIReadinessChecklistPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-6">AI Readiness Checklist for Australian SMEs</h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-4">
              A practical checklist to help Australian SMEs spot gaps before rolling out AI.
            </p>
            <p className="text-[var(--color-text-muted)]">
              Time to complete: 5–10 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <Card hover={false} className="bg-[var(--color-bg-secondary)] mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-lg mb-2">How to use this checklist</CardTitle>
                <CardDescription className="text-base">
                  For each section, tick what&apos;s true today. If you tick fewer than 3 items in any section, that&apos;s a priority area to address next.
                </CardDescription>
              </div>
            </div>
          </Card>

          <p className="text-[var(--color-text-secondary)] mb-8">
            Use this checklist solo or alongside our{' '}
            <a href="/ai-readiness-survey" className="text-[var(--color-primary)] hover:underline">
              AI Readiness Survey
            </a>{' '}
            for a deeper assessment.
          </p>
        </div>
      </Section>

      {/* Checklist Sections */}
      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-10">Your AI Readiness Assessment</h2>

          {checklistSections.map((section) => (
            <ChecklistSection key={section.number} section={section} />
          ))}
        </div>
      </Section>

      {/* Results Interpretation */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-8">What Your Results Mean</h2>
          <div className="space-y-4">
            {resultsBands.map((band) => (
              <div
                key={band.range}
                className={`p-5 rounded-lg border-l-4 ${band.color}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="font-bold text-lg">{band.range}:</span>
                  <span className="font-semibold">{band.title}</span>
                </div>
                <p className="mt-2 opacity-90">→ {band.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4">Ready to Take Action?</h2>
          <p className="text-[var(--color-text-secondary)] mb-8 text-lg">
            If this checklist surfaced gaps, book a 30-minute discovery call. We&apos;ll help you prioritize your next 2-3 moves and map a 90-day plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">
              Book a Discovery Call
            </Button>
            <Button href="/ai-readiness-survey" variant="outline" size="lg">
              Take the Full Survey
            </Button>
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <Card hover={false} className="bg-[var(--color-bg-secondary)]">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">About The AI Guides</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              The AI Guides is a Sydney-based AI advisory helping Australian SMEs make AI practical through strategy, training, and governance. We bring decades of strategy and transformation experience, packaged for busy teams: right-sized, clear, and safe.
            </p>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-muted)]">
                <a href="https://theaiguides.co" className="hover:text-[var(--color-primary)]">theaiguides.co</a>
                {' '} | {' '}
                <a href="mailto:contact@theaiguides.co" className="hover:text-[var(--color-primary)]">contact@theaiguides.co</a>
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                © The AI Guides, 2025. All rights reserved.
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
