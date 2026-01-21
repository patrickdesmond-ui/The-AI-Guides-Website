'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Section navigation data
const sections = [
  { id: 'landscape', title: 'Current Landscape', number: 1 },
  { id: 'framework', title: 'Implementation Framework', number: 2 },
  { id: 'assess', title: 'Phase 1: Assess', number: 3 },
  { id: 'identify', title: 'Phase 2: Identify', number: 4 },
  { id: 'pilot', title: 'Phase 3: Pilot', number: 5 },
  { id: 'scale', title: 'Phase 4: Scale', number: 6 },
  { id: 'pitfalls', title: 'Pitfalls to Avoid', number: 7 },
  { id: 'next-steps', title: 'Next Steps', number: 8 },
];

// Stat cards data
const landscapeStats = [
  {
    stat: '83%',
    label: 'expect AI to significantly impact their business within 12 months',
    context: 'Yet 76% have no formal strategy',
  },
  {
    stat: '92%',
    label: 'are using ChatGPT, Copilot or similar tools',
    context: 'But only 19% have adopted advanced systems that drive real business outcomes',
  },
  {
    stat: '42%',
    label: 'of SMEs have no plans to adopt AI at all',
    context: 'Often citing knowledge gaps, not rejection of the technology',
  },
];

// Assessment dimensions - aligned with AI Readiness Checklist
const assessmentDimensions = [
  {
    id: 'strategy',
    title: '1. Strategy & Ambition',
    items: [
      'Leadership is aligned on why AI matters and which business goals it supports.',
      "We've identified 2–3 priority AI use-cases to start with.",
      'A named sponsor (CEO/GM/COO) is accountable for AI direction.',
      "We've defined success metrics for our first AI initiatives (e.g., time saved, NPS, error reduction).",
    ],
  },
  {
    id: 'people',
    title: '2. People & Capability',
    items: [
      'Executives and managers understand AI basics and our approach.',
      'Staff know which approved AI tools they can use for work.',
      "We've delivered at least one structured training session (not just ad-hoc experimenting).",
      'Someone owns AI capability (ops/strategy/L&D) and answers day-to-day questions.',
    ],
  },
  {
    id: 'processes',
    title: '3. Processes & Ways of Working',
    items: [
      "We've identified workflows where AI could save time (service, finance, ops).",
      'We have a process for testing and approving new AI workflows.',
      'Teams have bandwidth to adopt a new, AI-enabled way of working.',
      "We've chosen at least one function to pilot first (services, finance, ops).",
    ],
  },
  {
    id: 'data',
    title: '4. Data & Tools',
    items: [
      'We have an approved AI tools list (e.g., Copilot, Gemini, ChatGPT Plus).',
      'Business documents and data are organized enough for AI tools to use.',
      "We've defined what data must not be pasted into public AI tools (red/amber/green or R/A/G rules).",
      'Core platforms (Microsoft/Google/CRM) are up to date to support AI features.',
    ],
  },
  {
    id: 'governance',
    title: '5. Governance & Risk',
    items: [
      "We have a one-page AI policy that's published and easy to find.",
      'Human review is required for material outputs (customer comms, board papers, finance content).',
      'We track AI usage via approved tools or a simple log.',
      'We review tools/policy quarterly and share examples of good AI use.',
    ],
  },
];

// Common use cases for SMEs
const commonUseCases = [
  {
    useCase: 'Email & communication drafting',
    description: 'Generate first drafts, summarise threads, respond to routine inquiries',
    tools: 'ChatGPT, Claude, Copilot',
  },
  {
    useCase: 'Document processing',
    description: 'Extract data from invoices, contracts, forms',
    tools: 'ChatGPT, specialist OCR tools',
  },
  {
    useCase: 'Customer support triage',
    description: 'Categorise inquiries, draft responses, escalate complex cases',
    tools: 'Intercom, Zendesk AI, custom GPTs',
  },
  {
    useCase: 'Meeting summaries',
    description: 'Transcribe, summarise, extract action items',
    tools: 'Fireflies, Otter, Copilot',
  },
  {
    useCase: 'Content creation',
    description: 'Draft marketing copy, social posts, proposals',
    tools: 'Claude, ChatGPT, Jasper',
  },
  {
    useCase: 'Data analysis',
    description: 'Summarise trends, create visualisations, answer questions about data',
    tools: 'ChatGPT Advanced Data Analysis, Claude',
  },
];

// Pilot pitfalls
const pilotPitfalls = [
  {
    pitfall: 'Scope creep',
    why: 'Enthusiasm leads to adding features mid-pilot',
    avoid: 'Lock scope at the start; save ideas for later',
  },
  {
    pitfall: 'Insufficient training',
    why: 'Assuming tools are intuitive',
    avoid: 'Invest upfront in hands-on training',
  },
  {
    pitfall: 'No baseline',
    why: "Can't measure improvement",
    avoid: 'Capture current-state metrics before starting',
  },
  {
    pitfall: 'Declaring success too early',
    why: 'First week goes well',
    avoid: 'Wait for full duration; check if results hold',
  },
  {
    pitfall: 'Ignoring qualitative feedback',
    why: 'Metrics look good but staff hate it',
    avoid: 'Balance quantitative and qualitative',
  },
];

// Common implementation pitfalls
const implementationPitfalls = [
  {
    title: 'Solving for the tool, not the problem',
    happens: 'Organisation buys an AI platform, then hunts for ways to use it.',
    bad: "Leads to forced implementations that don't address real needs.",
    better: 'Start with business problems, then find tools that fit.',
  },
  {
    title: 'Expecting immediate transformation',
    happens: 'Leadership expects AI to revolutionise operations within weeks.',
    bad: 'Creates pressure that leads to shortcuts and disappointment.',
    better: 'Set realistic timelines; expect learning curves; celebrate incremental wins.',
  },
  {
    title: 'Underinvesting in change management',
    happens: "Great tool, poor adoption. Staff don't use it or use it wrong.",
    bad: 'Technology only delivers value if people use it effectively.',
    better: 'Invest as much in training and support as in the tool itself.',
  },
  {
    title: 'No data strategy',
    happens: 'AI implementation reveals that underlying data is messy, siloed, or inaccessible.',
    bad: 'AI outputs are only as good as inputs; garbage in, garbage out.',
    better: 'Assess and address data quality before or alongside AI implementation.',
  },
  {
    title: "Going it alone when you shouldn't",
    happens: "SME tries to implement complex AI without expertise, wastes months.",
    bad: 'Some implementations genuinely require specialist help.',
    better: 'Know when to bring in external support—especially for high-stakes use cases.',
  },
  {
    title: 'Security and privacy afterthoughts',
    happens: 'Data is fed into AI tools without considering confidentiality or compliance.',
    bad: 'Potential regulatory breaches, competitive exposure, or customer trust issues.',
    better: 'Establish data classification and AI usage policies before you start.',
  },
];

// Helper Components
function StatCallout({ stat, label, source }: { stat: string; label: string; source: string }) {
  return (
    <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl p-5">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">{stat}</span>
        <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      </div>
      <div className="text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border)]">
        <span className="font-medium">Source:</span> {source}
      </div>
    </div>
  );
}

function LandscapeStatCard({ stat, label, context }: { stat: string; label: string; context: string }) {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 text-center">
      <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">{stat}</div>
      <div className="text-sm text-[var(--color-text-secondary)] mb-3">{label}</div>
      <div className="text-xs text-[var(--color-text-muted)] bg-amber-50 rounded-lg px-3 py-2">
        {context}
      </div>
    </div>
  );
}

function CaseStudyCard({
  company,
  description,
  details,
  source,
  showHeader = true,
}: {
  company: string;
  description: string;
  details: string;
  source: string;
  showHeader?: boolean;
}) {
  return (
    <div className="bg-blue-50 border-l-4 border-[var(--color-primary)] rounded-r-xl p-5">
      {showHeader && (
        <div className="text-xs font-medium text-[var(--color-primary)] uppercase tracking-wide mb-2">
          Real SME Example
        </div>
      )}
      <div className="font-semibold text-[var(--color-text-primary)] mb-2">{company}</div>
      <div className="text-sm text-[var(--color-text-muted)] mb-2">{description}</div>
      <div className="text-sm text-[var(--color-text-secondary)] mb-3">{details}</div>
      <div className="text-xs text-[var(--color-text-muted)] italic">Source: {source}</div>
    </div>
  );
}

function PhaseCard({
  number,
  title,
  description,
  isActive,
}: {
  number: number;
  title: string;
  description: string;
  isActive?: boolean;
}) {
  const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'];
  return (
    <div
      className={`relative p-5 rounded-xl border-2 transition-all ${
        isActive
          ? 'border-[var(--color-primary)] bg-blue-50'
          : 'border-[var(--color-border)] bg-white'
      }`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`${colors[number - 1]} text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center`}
        >
          {number}
        </span>
        <span className="font-semibold text-[var(--color-text-primary)]">{title}</span>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] ml-11">{description}</p>
    </div>
  );
}

function Accordion({
  title,
  children,
  defaultOpen = false,
  number,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  number?: number;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-[var(--color-border)] rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-[var(--color-bg-secondary)] transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          {number !== undefined && (
            <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              {number}
            </span>
          )}
          <span className="font-semibold text-[var(--color-text-primary)]">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-5 pt-0 bg-white">{children}</div>
      </div>
    </div>
  );
}

function InteractiveChecklist({
  items,
  sectionId,
  checkedItems,
  onToggle,
}: {
  items: string[];
  sectionId: string;
  checkedItems: Set<string>;
  onToggle: (itemKey: string) => void;
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const itemKey = `${sectionId}-${index}`;
        const isChecked = checkedItems.has(itemKey);

        return (
          <label key={index} className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onToggle(itemKey)}
              className="mt-1 w-5 h-5 rounded border-2 border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-0 cursor-pointer flex-shrink-0 accent-[var(--color-primary)]"
            />
            <span
              className={`leading-relaxed text-sm transition-colors ${
                isChecked
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
              }`}
            >
              {item}
            </span>
          </label>
        );
      })}
    </div>
  );
}

function ValueFeasibilityMatrix() {
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
      <div className="flex gap-4">
        {/* Y-axis label */}
        <div className="flex items-center justify-center w-6 flex-shrink-0">
          <div className="-rotate-90 text-xs text-[var(--color-text-muted)] font-medium whitespace-nowrap flex items-center gap-1">
            <span>VALUE</span>
            <svg className="w-3 h-3 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3">
            {/* Top row - High Value */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <div className="font-semibold text-green-800 mb-1">Quick Wins</div>
              <div className="text-xs text-green-700 mb-2">High value, high feasibility</div>
              <div className="text-xs text-green-600 font-medium">→ Start here</div>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="font-semibold text-blue-800 mb-1">Strategic Bets</div>
              <div className="text-xs text-blue-700 mb-2">High value, lower feasibility</div>
              <div className="text-xs text-blue-600 font-medium">→ Plan carefully</div>
            </div>

            {/* Bottom row - Low Value */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-700 mb-1">Low Priority</div>
              <div className="text-xs text-gray-600 mb-2">Lower value, high feasibility</div>
              <div className="text-xs text-gray-500 font-medium">→ Maybe automate</div>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
              <div className="font-semibold text-amber-800 mb-1">Consider Later</div>
              <div className="text-xs text-amber-700 mb-2">Lower value, lower feasibility</div>
              <div className="text-xs text-amber-600 font-medium">→ Deprioritise</div>
            </div>
          </div>

          {/* X-axis label */}
          <div className="text-center text-xs text-[var(--color-text-muted)] font-medium mt-3 flex items-center justify-center gap-1">
            <span>FEASIBILITY</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function StakeholderTable() {
  const stakeholders = [
    {
      role: 'Executive Sponsor',
      who: 'Owner, GM, or senior leader',
      concern: 'ROI, strategic alignment, risk',
    },
    {
      role: 'Process Owner',
      who: 'Team lead or department head',
      concern: 'Workflow disruption, team adoption',
    },
    {
      role: 'Technical Resource',
      who: 'IT staff, external consultant, or vendor',
      concern: 'Integration, security, maintenance',
    },
    {
      role: 'End Users',
      who: "Staff who'll work with AI daily",
      concern: 'Usability, job impact, training needs',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">
              Role
            </th>
            <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">
              Who
            </th>
            <th className="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">
              Their Concern
            </th>
          </tr>
        </thead>
        <tbody>
          {stakeholders.map((s, i) => (
            <tr key={i} className="border-b border-[var(--color-border)] last:border-0">
              <td className="py-3 px-4 font-medium text-[var(--color-primary)]">{s.role}</td>
              <td className="py-3 px-4 text-[var(--color-text-secondary)]">{s.who}</td>
              <td className="py-3 px-4 text-[var(--color-text-muted)]">{s.concern}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScaleDecisionTable() {
  const decisions = [
    {
      outcome: 'Scale',
      criteria: 'Met or exceeded success metrics; user adoption was strong; issues are manageable',
      action: 'Proceed to organisation-wide rollout',
      color: 'bg-green-100 text-green-800',
    },
    {
      outcome: 'Iterate',
      criteria: "Showed promise but didn't fully meet criteria; clear path to improvement",
      action: 'Run another pilot phase with adjustments',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      outcome: 'Pivot',
      criteria: "Original use case isn't working but learnings suggest a better application",
      action: 'Redirect to a more viable use case',
      color: 'bg-amber-100 text-amber-800',
    },
    {
      outcome: 'Stop',
      criteria: "Didn't meet criteria; no clear path to value; effort isn't justified",
      action: 'Document learnings, reallocate resources',
      color: 'bg-red-100 text-red-800',
    },
  ];

  return (
    <div className="space-y-3">
      {decisions.map((d, i) => (
        <div key={i} className={`${d.color} rounded-lg p-4`}>
          <div className="font-semibold mb-1">{d.outcome}</div>
          <div className="text-sm opacity-80 mb-2">{d.criteria}</div>
          <div className="text-sm font-medium">→ {d.action}</div>
        </div>
      ))}
    </div>
  );
}

function CalloutBox({
  children,
  variant = 'info',
}: {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'principle';
}) {
  const styles = {
    info: 'bg-blue-50 border-blue-500 text-blue-900',
    warning: 'bg-amber-50 border-amber-500 text-amber-900',
    success: 'bg-green-50 border-green-500 text-green-900',
    principle: 'bg-[var(--color-bg-secondary)] border-[var(--color-primary)] text-[var(--color-text-primary)]',
  };

  return <div className={`p-5 rounded-lg border-l-4 ${styles[variant]}`}>{children}</div>;
}

// Main Page Component
export default function AIImplementationGuidePage() {
  const [activeSection, setActiveSection] = useState('');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  // Track scroll position for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-sm font-medium text-[var(--color-primary)] bg-blue-50 px-3 py-1 rounded-full mb-4">
              Practical Guide for Australian SMEs
            </span>
            <h1 className="mb-6">Your Practical Roadmap to AI Implementation</h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-4">
              From first experiments to operational AI—a step-by-step guide built for Australian
              SMEs ready to move beyond the hype.
            </p>
            <p className="text-[var(--color-text-muted)]">
              Most Australian SMEs know AI matters. What&apos;s harder is knowing{' '}
              <em>where to start</em>—and how to avoid expensive missteps along the way. This guide
              walks you through a proven implementation approach: assess your readiness, identify
              the right opportunities, run disciplined pilots, and scale what works.
            </p>
          </div>

          {/* Key stat callout */}
          <div className="max-w-2xl mx-auto">
            <StatCallout
              stat="40%"
              label="of Australian SMEs are now actively adopting AI—up from 35% just two quarters ago. But 76% still lack a formal AI strategy—meaning most are experimenting without a roadmap."
              source="NAIC AI Adoption Tracker, Q4 2024 & Decidr National AI Readiness Index 2025"
            />
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              Want to know where you stand? Get a personalised score and recommendations in 5 minutes.
            </p>
            <Button href="/ai-readiness-survey" size="lg">
              Take the Free AI Readiness Survey
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-text-muted)] flex-shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="font-medium">Jump to:</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
              <svg className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'
                  }`}
                >
                  {section.title}
                </button>
              ))}
              <svg className="w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Section 2: Current Landscape */}
      <Section background="white" id="landscape">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6">Where Australian SMEs Stand Today</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            The gap between AI interest and AI execution remains wide. While adoption is
            climbing—40% of SMEs are now using AI in some capacity—the reality is that most
            businesses are stuck in what researchers call &quot;the shallow end&quot; of adoption:
            using basic tools like ChatGPT for quick tasks, but without strategic direction or
            measurable impact.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {landscapeStats.map((item, i) => (
              <LandscapeStatCard key={i} {...item} />
            ))}
          </div>

          <div className="space-y-6 mb-10">
            <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                The Challenge
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                The barriers are consistent: skills gaps (34% of SMEs cite this as their top
                challenge), budget constraints (28%), and security concerns (29%). Regional SMEs
                face additional headwinds—they&apos;re 11% less likely to implement AI than metro
                counterparts, often due to limited access to expertise and local implementation
                support.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-semibold text-green-900 mb-3">The Opportunity</h3>
              <p className="text-green-800">
                SMEs that approach AI strategically are seeing real results. Those in the
                &quot;Trailblazers&quot; category—the 17% with clear strategies focused on growth
                rather than cost-cutting—report they&apos;d immediately implement integrated AI
                solutions if they could access them. The opportunity isn&apos;t about whether AI
                will matter; it&apos;s about whether you&apos;ll be ready when it does.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
            Australian SMEs making it work
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <CaseStudyCard
              company="Nakie (recycled products e-commerce)"
              description="Uses AI to track stock levels and optimise back-end logistics"
              details="Plus generative AI to analyse customer reviews for actionable insights. This operational efficiency lets them focus resources on growth rather than manual analysis."
              source="Inside Small Business / 2024 Online Retailer Conference"
            />
            <CaseStudyCard
              company="CMY Cubes (Sydney STEAM toy business)"
              description="Created a custom GPT trained on their brand voice"
              details="Generates SEO-friendly blog posts—automating a task not core to daily operations. They also use AI to analyse which social platforms drive the most sales, allowing smarter marketing spend without a dedicated data team."
              source="Inside Small Business / 2024 Online Retailer Conference"
            />
          </div>
        </div>
      </Section>

      {/* Section 3: Implementation Framework Overview */}
      <Section background="light" id="framework">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6">The Four Phases of AI Implementation</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Successful AI implementation isn&apos;t a single project—it&apos;s an iterative process.
            The framework below has been refined through dozens of SME engagements and aligns with
            the Australian Government&apos;s National AI Centre guidance. Each phase builds on the
            last.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <PhaseCard
              number={1}
              title="Assess"
              description="Understand your current state, capabilities, and opportunities"
            />
            <PhaseCard
              number={2}
              title="Identify"
              description="Find the right use cases that balance value with feasibility"
            />
            <PhaseCard
              number={3}
              title="Pilot"
              description="Run controlled experiments with clear success criteria"
            />
            <PhaseCard
              number={4}
              title="Scale"
              description="Expand what works, retire what doesn't, build organisational capability"
            />
          </div>

          <CalloutBox variant="principle">
            <p className="font-semibold mb-2">Start narrow, learn fast, expand deliberately.</p>
            <p className="text-sm opacity-80">
              The biggest mistake we see is trying to transform everything at once. Successful SMEs
              pick one or two high-potential use cases, nail them, then build from there.
            </p>
          </CalloutBox>
        </div>
      </Section>

      {/* Section 4: Phase 1 — Assess */}
      <Section background="white" id="assess">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              1
            </span>
            <h2 className="mb-0">Phase 1: Assess Your AI Readiness</h2>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Before you can implement AI effectively, you need an honest picture of where you stand.
            This isn&apos;t about whether you&apos;re &quot;ready&quot; in some binary sense—it&apos;s
            about understanding your starting point so you can chart a realistic path forward.
          </p>

          {/* Action Block 1 */}
          <Accordion
            title="Action 1: Conduct an Internal Assessment"
            defaultOpen={true}
            number={1}
          >
            <p className="text-[var(--color-text-secondary)] mb-4">
              Complete an AI readiness assessment covering these five dimensions:
            </p>
            <div className="space-y-4">
              {assessmentDimensions.map((dimension) => (
                <div
                  key={dimension.id}
                  className="bg-[var(--color-bg-secondary)] rounded-lg p-4"
                >
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">
                    {dimension.title}
                  </h4>
                  <InteractiveChecklist
                    items={dimension.items}
                    sectionId={dimension.id}
                    checkedItems={checkedItems}
                    onToggle={handleToggle}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <CaseStudyCard
                company="Fifth Quadrant (Sydney market research firm)"
                description="As a small business themselves, they use AI for:"
                details="Natural language processing to analyse open-ended survey responses (reducing manual analysis time), automated reporting systems that generate initial findings reports (freeing analysts for deeper work), and generative AI to assist in questionnaire design. They didn't need a data warehouse—they started with the data they already had."
                source="Fifth Quadrant / NAIC partnership research"
              />
            </div>
          </Accordion>

          {/* Action Block 2 */}
          <Accordion title="Action 2: Map Your Stakeholders" number={2}>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Identify your AI implementation stakeholders and their roles:
            </p>
            <div className="bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden">
              <StakeholderTable />
            </div>
            <CalloutBox variant="warning">
              <p className="text-sm">
                <strong>Key insight:</strong> Implementation projects fail most often due to
                stakeholder alignment issues, not technical problems. Get the right people engaged
                early.
              </p>
            </CalloutBox>
          </Accordion>
        </div>
      </Section>

      {/* Section 5: Phase 2 — Identify */}
      <Section background="light" id="identify">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
              2
            </span>
            <h2 className="mb-0">Phase 2: Find the Right Use Cases</h2>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Not all AI opportunities are created equal. The goal in this phase is to identify use
            cases that sit in the sweet spot: high enough value to matter, feasible enough to
            implement, and low enough risk to serve as a learning opportunity.
          </p>

          {/* Action Block 3 */}
          <Accordion title="Action 3: Generate Your Use Case Long List" defaultOpen={true} number={3}>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Run a structured brainstorm to identify potential AI applications across your
              business:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  For Operations
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• Where do staff spend time on repetitive data entry or document processing?</li>
                  <li>• Which processes have consistent bottlenecks?</li>
                  <li>• Where do you rely on manual handoffs between systems?</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  For Customer-Facing Work
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• Where do customers wait for responses?</li>
                  <li>• Which inquiries are repetitive and could be templated?</li>
                  <li>• Where could faster response times improve customer experience?</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  For Decision-Making
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• Which decisions rely on pulling together info from multiple sources?</li>
                  <li>• Where do you wish you had better forecasting or trend analysis?</li>
                  <li>• What reports take too long to produce?</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  For Knowledge Management
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
                  <li>• Where does institutional knowledge live in people&apos;s heads?</li>
                  <li>• How much time is spent searching for information?</li>
                  <li>• Where do new employees struggle to get up to speed?</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">
              Common use cases we see work well for SMEs
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-lg overflow-hidden">
                <thead className="bg-[var(--color-bg-secondary)]">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Use Case</th>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                    <th className="text-left py-3 px-4 font-semibold">Typical Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {commonUseCases.map((uc, i) => (
                    <tr key={i} className="border-t border-[var(--color-border)]">
                      <td className="py-3 px-4 font-medium text-[var(--color-primary)]">
                        {uc.useCase}
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-secondary)]">
                        {uc.description}
                      </td>
                      <td className="py-3 px-4 text-[var(--color-text-muted)] text-xs">
                        {uc.tools}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Accordion>

          {/* Action Block 4 */}
          <Accordion title="Action 4: Prioritise Using a Value-Feasibility Matrix" number={4}>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Score each use case on two dimensions and plot them on a 2x2 matrix:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  Value Criteria (score 1-5)
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Time savings potential (hours per week)</li>
                  <li>• Revenue or cost impact</li>
                  <li>• Customer experience improvement</li>
                  <li>• Strategic importance</li>
                  <li>• Staff frustration level with current process</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  Feasibility Criteria (score 1-5)
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Data availability and quality</li>
                  <li>• Technical complexity</li>
                  <li>• Integration requirements</li>
                  <li>• Change management difficulty</li>
                  <li>• Regulatory/compliance risk</li>
                </ul>
              </div>
            </div>

            <ValueFeasibilityMatrix />

            <div className="mt-6">
              <CaseStudyCard
                company="Cropify (Adelaide agtech)"
                description="Fifth-generation farmer Anna Falkiner and co-founder Andrew Hannon identified a specific pain point"
                details='Grain grading was time-consuming and labour-intensive. They worked with the Australian Institute for Machine Learning to develop a working AI prototype in just 6-8 weeks. They started narrow (small red lentils) before expanding to other crops. Falkiner&apos;s advice: "Look at what your problem is, and ask if AI is the solution. Don&apos;t look at AI for the sake of having AI. It has to be the right fit for your business."'
                source="AIML Case Studies / AAP"
              />
            </div>
          </Accordion>
        </div>
      </Section>

      {/* Section 6: Phase 3 — Pilot */}
      <Section background="white" id="pilot">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
              3
            </span>
            <h2 className="mb-0">Phase 3: Run a Disciplined Pilot</h2>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Pilots are where theory meets reality. The goal isn&apos;t to build a perfect
            solution—it&apos;s to learn quickly whether a use case delivers value, what the
            real-world complications are, and whether to scale, iterate, or stop.
          </p>

          {/* Action Block 5 */}
          <Accordion title="Action 5: Design Your Pilot" defaultOpen={true} number={5}>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Define your pilot parameters before you start:
            </p>

            <div className="space-y-4">
              <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  1. Scope Definition
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• What specific process or workflow will you test?</li>
                  <li>• Who are the pilot participants? (Keep it small: 3-10 people)</li>
                  <li>• What&apos;s in scope vs. explicitly out of scope?</li>
                  <li>• Duration: 4-8 weeks is typical for a first pilot</li>
                </ul>
              </div>

              <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  2. Success Criteria
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>
                    • What metrics will you track? (Be specific: &quot;reduce email response time
                    from 2 hours to 30 minutes&quot;)
                  </li>
                  <li>• What&apos;s the minimum threshold for success?</li>
                  <li>• What qualitative feedback will you gather?</li>
                </ul>
              </div>

              <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  3. Resource Allocation
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Who owns the pilot day-to-day?</li>
                  <li>• How much time per week will participants spend?</li>
                  <li>• What&apos;s the budget for tools or subscriptions?</li>
                  <li>• Who provides technical support?</li>
                </ul>
              </div>

              <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  4. Risk Mitigation
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• What could go wrong?</li>
                  <li>• Where are the sensitive data considerations?</li>
                  <li>• What&apos;s the fallback if the pilot fails?</li>
                  <li>• How will you handle errors or poor outputs?</li>
                </ul>
              </div>

              <div className="bg-[var(--color-bg-secondary)] rounded-lg p-4">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  5. Learning Capture
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• How will you document what works and what doesn&apos;t?</li>
                  <li>• When are the check-in points?</li>
                  <li>• What&apos;s the go/no-go decision process at the end?</li>
                </ul>
              </div>
            </div>
          </Accordion>

          {/* Action Block 6 */}
          <Accordion title="Action 6: Execute With Rigour" number={6}>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Follow these pilot execution principles:
            </p>

            <div className="space-y-4 mb-6">
              {[
                {
                  title: 'Brief participants thoroughly',
                  desc: "Everyone needs to understand the goal, their role, how to use the tools, and how to report issues. Don't assume familiarity.",
                },
                {
                  title: 'Start with human oversight',
                  desc: 'Keep humans in the loop for all outputs initially. Review AI-generated content before it reaches customers. Gradually reduce oversight as confidence builds.',
                },
                {
                  title: 'Track everything',
                  desc: "Log time spent, outputs generated, errors caught, and workarounds needed. You'll need this data to evaluate success.",
                },
                {
                  title: 'Hold weekly check-ins',
                  desc: 'Brief, structured reviews to surface problems early. Adjust approach if needed—pilots should be adaptive.',
                },
                {
                  title: 'Document failures as carefully as successes',
                  desc: "Understanding why something didn't work is as valuable as celebrating what did.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-4 bg-white rounded-lg border border-[var(--color-border)]"
                >
                  <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)] mb-1">
                      {item.title}
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="font-semibold text-[var(--color-text-primary)] mb-4">
              Common pilot pitfalls
            </h4>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm bg-white rounded-lg overflow-hidden">
                <thead className="bg-[var(--color-bg-secondary)]">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Pitfall</th>
                    <th className="text-left py-3 px-4 font-semibold">Why it happens</th>
                    <th className="text-left py-3 px-4 font-semibold">How to avoid</th>
                  </tr>
                </thead>
                <tbody>
                  {pilotPitfalls.map((pp, i) => (
                    <tr key={i} className="border-t border-[var(--color-border)]">
                      <td className="py-3 px-4 font-medium text-red-600">{pp.pitfall}</td>
                      <td className="py-3 px-4 text-[var(--color-text-secondary)]">{pp.why}</td>
                      <td className="py-3 px-4 text-green-700">{pp.avoid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CalloutBox variant="info">
              <p className="font-semibold mb-2">Why patience matters</p>
              <p className="text-sm">
                A common pattern we see in the research: early weeks are often rocky. AI outputs
                may be generic or need heavy editing at first. But businesses that persist—refining
                prompts, establishing style guides, iterating on workflows—often see dramatically
                better results by week four or five. If you stop at week two, you&apos;ll miss the
                value entirely.
              </p>
              <p className="text-sm mt-2">
                Both Nakie and CMY Cubes stress the importance of keeping &apos;human in the
                loop&apos; during pilots—reviewing AI outputs before they reach customers and
                gradually reducing oversight as confidence builds.
              </p>
            </CalloutBox>
          </Accordion>
        </div>
      </Section>

      {/* Section 7: Phase 4 — Scale */}
      <Section background="light" id="scale">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
              4
            </span>
            <h2 className="mb-0">Phase 4: Scale What Works</h2>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Scaling isn&apos;t just &quot;doing more of the pilot.&quot; It requires building the
            organisational infrastructure to support AI at a broader level: updated processes,
            trained teams, clear governance, and ongoing improvement mechanisms.
          </p>

          {/* Action Block 7 */}
          <Accordion title="Action 7: Make the Scale Decision" defaultOpen={true} number={7}>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Evaluate your pilot results against these criteria:
            </p>
            <ScaleDecisionTable />
            <CalloutBox variant="principle">
              <p className="text-sm">
                <strong>Key principle:</strong> Not every pilot should scale. Stopping a use case
                that isn&apos;t working is a success—you&apos;ve learned something valuable and
                avoided wasting more resources.
              </p>
            </CalloutBox>
          </Accordion>

          {/* Action Block 8 */}
          <Accordion title="Action 8: Build Your AI Operating Model" number={8}>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Establish the foundations for ongoing AI operations:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  1. Governance Structure
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Who approves new AI use cases?</li>
                  <li>• How are risks assessed and monitored?</li>
                  <li>• What&apos;s the escalation path for issues?</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  2. Policies and Guidelines
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• AI usage policy (what&apos;s allowed, what&apos;s not)</li>
                  <li>• Data handling requirements for AI tools</li>
                  <li>• Quality review processes for AI outputs</li>
                  <li>• Vendor/tool approval criteria</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  3. Training and Support
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• Onboarding for new users</li>
                  <li>• Ongoing skill development</li>
                  <li>• Internal champions or super-users</li>
                  <li>• External support arrangements</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4 border border-[var(--color-border)]">
                <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                  4. Measurement and Improvement
                </h4>
                <ul className="text-sm text-[var(--color-text-secondary)] space-y-1">
                  <li>• How do you track value delivered?</li>
                  <li>• Regular review cadence (quarterly?)</li>
                  <li>• Process for identifying new use cases</li>
                  <li>• Feedback loops from end users</li>
                </ul>
              </div>
            </div>

            <CaseStudyCard
              company="The research confirms this"
              description="According to the Responsible AI Index"
              details='SMEs in the leading category of responsible AI practices are more likely to have business leaders driving AI strategy. These organisations show "greater appreciation of the competitive benefits that responsible AI practices offer, including reputation, innovation, operational efficiency and talent acquisition." The ones that stall tend to approach AI as a one-time experiment rather than an evolving capability.'
              source="Fifth Quadrant / NAIC Responsible AI Index 2024"
              showHeader={false}
            />
          </Accordion>
        </div>
      </Section>

      {/* Section 8: Common Pitfalls */}
      <Section background="white" id="pitfalls">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-4">Implementation Pitfalls We&apos;ve Seen (And How to Avoid Them)</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            After working with dozens of SMEs on AI implementation, patterns emerge. Here are the
            most common ways projects go wrong—and how to steer clear.
          </p>

          <div className="space-y-4">
            {implementationPitfalls.map((pitfall, i) => (
              <Accordion key={i} title={`Pitfall ${i + 1}: ${pitfall.title}`}>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-[var(--color-text-primary)]">
                      What happens:
                    </span>
                    <span className="text-[var(--color-text-secondary)]"> {pitfall.happens}</span>
                  </div>
                  <div>
                    <span className="font-medium text-red-600">Why it&apos;s bad:</span>
                    <span className="text-[var(--color-text-secondary)]"> {pitfall.bad}</span>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <span className="font-medium text-green-700">Better approach:</span>
                    <span className="text-green-800"> {pitfall.better}</span>
                  </div>
                </div>
              </Accordion>
            ))}
          </div>
        </div>
      </Section>

      {/* Section 9: Next Steps */}
      <Section background="light" id="next-steps">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-4">Your Next Steps</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Implementation doesn&apos;t start with technology—it starts with clarity. Here&apos;s
            how to move forward.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                  ✓
                </span>
                Immediate Actions (This Week)
              </h3>
              <div className="space-y-3">
                {[
                  'Complete an AI readiness assessment — Get a baseline understanding of where you stand',
                  'Identify one or two potential use cases — Think about where you have repetitive, time-consuming, or frustrating processes',
                  "Talk to your team — Find out who's already experimenting with AI and what they've learned",
                  'Review your data — Take stock of what information you have access to and how clean it is',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded accent-[var(--color-primary)]"
                    />
                    <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs">
                  30
                </span>
                Short-Term Actions (Next 30 Days)
              </h3>
              <div className="space-y-3">
                {[
                  'Prioritise your use cases — Apply the value-feasibility matrix',
                  'Design a pilot — Define scope, success criteria, and timeline',
                  'Get stakeholder buy-in — Brief leadership and secure resources',
                  'Select your tools — Choose fit-for-purpose solutions for your pilot',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 rounded accent-[var(--color-primary)]"
                    />
                    <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card hover={false} className="bg-white">
            <CardTitle className="text-lg mb-3">Ongoing Practices</CardTitle>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'Build AI literacy across your team',
                'Stay current on developments (without chasing every new tool)',
                'Connect with peers to share learnings',
                'Review and refine your approach quarterly',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <svg
                    className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Resources Section */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-8">Continue Your AI Journey</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                From The AI Guides
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'AI Readiness Survey', href: '/ai-readiness-survey', desc: 'Free assessment' },
                  { title: 'Executive Training Program', href: '/executive-training', desc: 'Hands-on workshops for leadership' },
                  {
                    title: 'AI Governance Guide (SME Edition)',
                    href: '/executive-guide-to-ai-governance-sme-edition',
                    desc: 'Establish the foundations',
                  },
                  {
                    title: 'SME AI Upskilling Playbook',
                    href: '/sme-ai-upskilling-playbook-2026',
                    desc: 'Build team capability',
                  },
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center justify-between p-3 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors group"
                  >
                    <div>
                      <div className="font-medium group-hover:text-white">{link.title}</div>
                      <div className="text-xs text-[var(--color-text-muted)] group-hover:text-white/70">
                        {link.desc}
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
                Australian Government Resources
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'NAIC AI Adoption Tracker',
                    href: 'https://www.industry.gov.au/publications/ai-adoption-tracker',
                    desc: 'Benchmarking data',
                  },
                  {
                    title: 'AI Adopt Centres',
                    href: 'https://www.industry.gov.au/science-technology-and-innovation/technology/national-artificial-intelligence-centre/ai-adopt',
                    desc: 'Government-funded support',
                  },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[var(--color-bg-secondary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors group"
                  >
                    <div>
                      <div className="font-medium group-hover:text-white">{link.title}</div>
                      <div className="text-xs text-[var(--color-text-muted)] group-hover:text-white/70">
                        {link.desc}
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ color: 'white' }} className="mb-4">Have Questions? We&apos;re Here to Help.</h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Whether you&apos;re still assessing your readiness or ready to start a pilot, we&apos;re
            happy to answer questions and point you in the right direction—no obligations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/ai-readiness-survey" variant="secondary" size="lg">
              Start with the Free AI Readiness Survey
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Book a 30-Minute Call
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <Card hover={false} className="bg-white">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">
              About The AI Guides
            </h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              The AI Guides is a Sydney-based AI advisory helping Australian SMEs make AI practical
              through strategy, training, and governance. We bring decades of strategy and
              transformation experience, packaged for busy teams: right-sized, clear, and safe.
            </p>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-muted)]">
                <a href="https://theaiguides.co" className="hover:text-[var(--color-primary)]">
                  theaiguides.co
                </a>{' '}
                |{' '}
                <a
                  href="mailto:contact@theaiguides.co"
                  className="hover:text-[var(--color-primary)]"
                >
                  contact@theaiguides.co
                </a>
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
