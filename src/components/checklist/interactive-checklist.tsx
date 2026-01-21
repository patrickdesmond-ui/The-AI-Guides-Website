'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const checklistSections = [
  {
    id: 'strategy',
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
    id: 'people',
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
    id: 'processes',
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
    id: 'data',
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
    id: 'governance',
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
    min: 15,
    max: 20,
    range: '15-20 ticks',
    title: "You're ready to scale",
    description: 'Standardize 2-3 workflows and train managers to review AI outputs.',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
    textColor: 'text-green-800',
  },
  {
    min: 8,
    max: 14,
    range: '8-14 ticks',
    title: 'You have foundations to build on',
    description: 'Align leadership, publish your policy, and run staff training.',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-800',
  },
  {
    min: 0,
    max: 7,
    range: '0-7 ticks',
    title: 'Start with strategy',
    description: 'Begin with executive alignment, pick 2-3 use cases, and set guardrails.',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
    textColor: 'text-red-800',
  },
];

function getResultBand(total: number) {
  return resultsBands.find((band) => total >= band.min && total <= band.max) || resultsBands[2];
}

interface ChecklistSectionProps {
  section: (typeof checklistSections)[0];
  checkedItems: Set<string>;
  onToggle: (itemKey: string) => void;
}

function ChecklistSection({ section, checkedItems, onToggle }: ChecklistSectionProps) {
  const sectionCount = section.items.filter((_, index) =>
    checkedItems.has(`${section.id}-${index}`)
  ).length;

  const needsAttention = sectionCount < 3;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
            {section.number}
          </span>
          {section.title}
        </h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          sectionCount === 0
            ? 'bg-gray-100 text-gray-500'
            : needsAttention
              ? 'bg-amber-100 text-amber-700'
              : 'bg-green-100 text-green-700'
        }`}>
          {sectionCount} / {section.items.length}
        </div>
      </div>
      <div className="space-y-3 ml-11">
        {section.items.map((item, index) => {
          const itemKey = `${section.id}-${index}`;
          const isChecked = checkedItems.has(itemKey);

          return (
            <label
              key={index}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(itemKey)}
                className="mt-1 w-5 h-5 rounded border-2 border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-0 cursor-pointer flex-shrink-0 accent-[var(--color-primary)]"
              />
              <span className={`leading-relaxed transition-colors ${
                isChecked
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
              }`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
      <div className={`ml-11 mt-4 p-3 rounded-lg border-l-4 transition-colors ${
        needsAttention
          ? 'bg-amber-50 border-amber-400'
          : 'bg-[var(--color-bg-secondary)] border-[var(--color-primary)]'
      }`}>
        <p className="text-sm text-[var(--color-text-muted)]">
          <span className="font-medium text-[var(--color-text-secondary)]">If fewer than 3:</span>{' '}
          {section.recommendation}
        </p>
      </div>
    </div>
  );
}

function ResultsSummary({ total }: { total: number }) {
  const band = getResultBand(total);
  const maxTotal = 20;
  const percentage = (total / maxTotal) * 100;

  return (
    <div className={`p-6 rounded-xl border-2 ${band.borderColor} ${band.bgColor} mb-8`}>
      <div className="text-center mb-4">
        <div className={`text-5xl font-bold ${band.textColor} mb-2`}>
          {total}
          <span className="text-2xl font-normal opacity-70"> / {maxTotal}</span>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">items checked</p>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/50 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            total >= 15 ? 'bg-green-500' : total >= 8 ? 'bg-amber-500' : 'bg-red-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className={`text-center ${band.textColor}`}>
        <p className="text-xl font-semibold mb-1">{band.title}</p>
        <p className="text-sm opacity-80">→ {band.description}</p>
      </div>
    </div>
  );
}

export function InteractiveChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleToggle = (itemKey: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  const totalChecked = checkedItems.size;

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
            <ChecklistSection
              key={section.number}
              section={section}
              checkedItems={checkedItems}
              onToggle={handleToggle}
            />
          ))}

          {/* Results Summary - shows above "What Your Results Mean" */}
          <div className="mt-12">
            <h2 className="text-center mb-6">Your Score</h2>
            <ResultsSummary total={totalChecked} />
          </div>
        </div>
      </Section>

      {/* Results Interpretation */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-8">What Your Results Mean</h2>
          <div className="space-y-4">
            {resultsBands.map((band) => {
              const isActive = totalChecked >= band.min && totalChecked <= band.max;
              return (
                <div
                  key={band.range}
                  className={`p-5 rounded-lg border-l-4 transition-all duration-300 ${band.bgColor} ${band.borderColor} ${band.textColor} ${
                    isActive ? 'ring-2 ring-offset-2 ring-[var(--color-primary)] scale-[1.02]' : 'opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="font-bold text-lg">{band.range}:</span>
                    <span className="font-semibold">{band.title}</span>
                    {isActive && (
                      <span className="text-xs bg-white/50 px-2 py-1 rounded-full font-medium">
                        ← Your result
                      </span>
                    )}
                  </div>
                  <p className="mt-2 opacity-90">→ {band.description}</p>
                </div>
              );
            })}
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
            <Button href="/ai-readiness-survey" size="lg">
              Free AI Readiness Survey
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Book a 30-Minute Call
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
