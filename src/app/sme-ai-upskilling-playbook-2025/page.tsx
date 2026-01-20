import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SME AI Upskilling Playbook (2025) | The AI Guides',
  description:
    'A 2025-ready playbook for Australian SMEs to upskill their workforce on AI — covering leadership alignment, role-based training, governance, and measurement.',
};

// Section navigation data
const sections = [
  { id: 'why-urgent', title: 'Why Now', icon: '⚡' },
  { id: 'principles', title: 'Principles', icon: '🎯' },
  { id: 'playbook', title: '4-Phase Playbook', icon: '📋' },
  { id: 'content-map', title: 'Content Map', icon: '🗂️' },
  { id: 'trust', title: 'Trust & Shadow AI', icon: '🛡️' },
  { id: 'ownership', title: 'Ownership', icon: '👥' },
  { id: 'next-steps', title: 'Next Steps', icon: '🚀' },
];

// Stats for callout boxes
const keyStats = [
  { stat: '47%', label: 'of employees have received formal AI training' },
  { stat: '41%', label: 'of Australian workers say their workplace is prepared for AI' },
  { stat: '66%', label: 'of employees don\'t evaluate AI outputs for accuracy' },
  { stat: '8 weeks', label: 'to deliver a complete upskilling program' },
];

// Phases data
const phases = [
  {
    number: 1,
    title: 'Align Leadership',
    weeks: 'Weeks 1–2',
    objective: 'Create a shared, business-first view of AI across your executive team.',
    outputs: ['AI position statement', 'Approved tools list', 'R/A/G data rules'],
    color: 'bg-blue-500',
  },
  {
    number: 2,
    title: 'Build Core Literacy',
    weeks: 'Weeks 2–4',
    objective: 'Ensure everybody knows what\'s allowed and how to get a good AI output.',
    outputs: ['45-60 min all-staff session', 'Golden prompt pattern', 'Internal examples'],
    color: 'bg-indigo-500',
  },
  {
    number: 3,
    title: 'Role-Based Enablement',
    weeks: 'Weeks 4–8',
    objective: 'Build practical skills in priority functions with real workflows.',
    outputs: ['Function-specific workshops', 'Role-based prompt packs', 'Documented workflows'],
    color: 'bg-purple-500',
  },
  {
    number: 4,
    title: 'Sustain & Measure',
    weeks: 'Ongoing',
    objective: 'Keep skills fresh and track what\'s working.',
    outputs: ['Monthly AI wins', 'Quarterly refreshes', 'Adoption metrics'],
    color: 'bg-pink-500',
  },
];

// Principles data
const principles = [
  {
    title: 'Make it business-first',
    description: 'Start with the task. Show people how AI helps them do that task better. Then explain the technology.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Train the whole stack',
    description: 'Train leaders first. Get them aligned on priorities and governance. Then cascade to managers and teams.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: 'Keep governance lightweight',
    description: 'One page. Red/amber/green data rules. Human-in-the-loop checks. People need to know what\'s safe before they experiment.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Layer, don\'t flood',
    description: 'Short, repeatable sessions. Refresh quarterly as tools change. Micro-learning formats that fit around actual work.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
  },
];

// Content map items
const contentMapItems = [
  'AI foundations for our business',
  'Approved AI tools and access',
  'One-page AI policy + R/A/G rules',
  'Prompt guide with examples',
  'Services/CX use-case pack',
  'Finance/admin use-case pack',
  'Ops/SOP use-case pack',
  'Reviewing AI outputs checklist',
  'New workflow request form',
  'Quarterly "What\'s new" update',
];

// Ownership roles
const ownershipRoles = [
  {
    role: 'Sponsor',
    title: 'CEO / GM / COO',
    responsibilities: 'Sets direction, signs off the policy, and makes it clear this matters',
    icon: '👔',
  },
  {
    role: 'Owner / Steward',
    title: 'Ops, Strategy, or Digital Lead',
    responsibilities: 'Coordinates sessions, keeps content current, runs quarterly reviews',
    icon: '🎯',
  },
  {
    role: 'Function Champions',
    title: 'Service, Finance, Ops Leads',
    responsibilities: 'Capture and improve actual workflows, coach their teams',
    icon: '⭐',
  },
];

function StatCallout({ stat, label }: { stat: string; label: string }) {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-xl text-white">
      <div className="text-4xl font-bold mb-2">{stat}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  );
}

function CalloutBox({ children, variant = 'info' }: { children: React.ReactNode; variant?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info: 'bg-blue-50 border-blue-500 text-blue-900',
    warning: 'bg-amber-50 border-amber-500 text-amber-900',
    success: 'bg-green-50 border-green-500 text-green-900',
  };

  return (
    <div className={`p-5 rounded-lg border-l-4 ${styles[variant]}`}>
      {children}
    </div>
  );
}

function PhaseCard({ phase }: { phase: typeof phases[0] }) {
  return (
    <div className="relative">
      <div className={`absolute left-0 top-0 w-1 h-full ${phase.color} rounded-full`} />
      <div className="pl-6">
        <div className="flex items-center gap-3 mb-2">
          <span className={`${phase.color} text-white text-sm font-bold px-3 py-1 rounded-full`}>
            Phase {phase.number}
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">{phase.weeks}</span>
        </div>
        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{phase.title}</h4>
        <p className="text-[var(--color-text-secondary)] mb-3">{phase.objective}</p>
        <div className="flex flex-wrap gap-2">
          {phase.outputs.map((output, i) => (
            <span key={i} className="text-xs bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] px-2 py-1 rounded">
              {output}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UpskillingPlaybookPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-sm font-medium text-[var(--color-primary)] bg-blue-50 px-3 py-1 rounded-full mb-4">
              2025 Edition
            </span>
            <h1 className="mb-6">SME AI Upskilling Playbook</h1>
            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8">
              A practical, 8-week approach to building AI capability across your organisation —
              light enough to run alongside business-as-usual, structured enough to create consistent, safe AI use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#playbook" size="lg">
                Jump to the Playbook
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Get Help Implementing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <Section background="white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-8">What&apos;s in this playbook</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {sections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="flex flex-col items-center p-4 rounded-xl bg-[var(--color-bg-secondary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 group text-center"
              >
                <span className="text-2xl mb-2">{section.icon}</span>
                <span className="text-sm font-medium">{section.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Key Stats */}
      <Section background="light">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {keyStats.map((item, i) => (
              <StatCallout key={i} stat={item.stat} label={item.label} />
            ))}
          </div>
        </div>
      </Section>

      {/* Why Urgent */}
      <Section background="white" id="why-urgent">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">⚡</span>
            <h2 className="mb-0">Why AI upskilling is urgent for SMEs</h2>
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            Three forces are converging, and I see them play out in every client conversation:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card hover={false} className="border-t-4 border-t-blue-500">
              <CardTitle className="text-lg mb-3">Employee Pull</CardTitle>
              <CardDescription>
                Your people are already bringing AI into work. More than half use AI tools and hide it from managers. Only 47% have received formal training.
              </CardDescription>
            </Card>
            <Card hover={false} className="border-t-4 border-t-indigo-500">
              <CardTitle className="text-lg mb-3">Capability Gap</CardTitle>
              <CardDescription>
                Only 41% of Australian workers say their workplace is prepared for AI — below the global average. SMEs cite lack of training as the main barrier.
              </CardDescription>
            </Card>
            <Card hover={false} className="border-t-4 border-t-purple-500">
              <CardTitle className="text-lg mb-3">Business Ambition</CardTitle>
              <CardDescription>
                Almost half of technology leaders globally say AI is "fully integrated" into strategy. Your competitors expect AI-level speed. You can&apos;t afford to lag.
              </CardDescription>
            </Card>
          </div>

          <CalloutBox variant="info">
            <p className="font-semibold mb-1">The bottom line</p>
            <p className="text-sm">Employees want AI, leadership needs AI, but training hasn&apos;t caught up. That&apos;s exactly what an SME-level upskilling program should solve.</p>
          </CalloutBox>
        </div>
      </Section>

      {/* Principles */}
      <Section background="light" id="principles">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <h2 className="mb-0">Principles for SME AI upskilling</h2>
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            After working with SMEs across different sectors, here are the principles that actually work:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-[var(--color-border)]">
                <div className="text-[var(--color-primary)] flex-shrink-0">
                  {principle.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">{principle.title}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* The Playbook - 4 Phases */}
      <Section background="white" id="playbook">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">📋</span>
            <h2 className="mb-0">The 4-Phase Playbook</h2>
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-4">
            Here&apos;s the approach I&apos;ve refined over 18 months with Australian SMEs. It&apos;s designed to take <strong className="text-[var(--color-text-primary)]">8 weeks from start to finish</strong>, with most of the heavy lifting in the first month.
          </p>

          <CalloutBox variant="success">
            <p className="text-sm">
              <strong>Why 8 weeks?</strong> Long enough to build real capability. Short enough to maintain momentum. Each phase builds on the last.
            </p>
          </CalloutBox>

          <div className="mt-10 space-y-8">
            {phases.map((phase) => (
              <PhaseCard key={phase.number} phase={phase} />
            ))}
          </div>
        </div>
      </Section>

      {/* Content Map */}
      <Section background="light" id="content-map">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🗂️</span>
            <h2 className="mb-0">The 10-piece content map</h2>
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            You don&apos;t need a giant curriculum. These 10 pieces will get you 80% of the way there — build them over 4–6 weeks and refine as you go.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {contentMapItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[var(--color-border)]">
                <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-[var(--color-text-secondary)]">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CalloutBox variant="warning">
              <p className="font-semibold mb-1">Critical finding</p>
              <p className="text-sm">66% of employees do not evaluate AI outputs for accuracy. Your &quot;reviewing AI outputs&quot; checklist (#8) is critical.</p>
            </CalloutBox>
          </div>
        </div>
      </Section>

      {/* Trust & Shadow AI */}
      <Section background="white" id="trust">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🛡️</span>
            <h2 className="mb-0">Addressing trust, fear, and shadow AI</h2>
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-6">
            Employees want AI training, but many are worried about being left behind or losing their jobs. <strong className="text-[var(--color-text-primary)]">46% express job security concerns.</strong> You have to name this in your training — don&apos;t pretend the fear isn&apos;t real.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-[var(--color-bg-secondary)] rounded-xl">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Be explicit about the goal</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">AI removes low-value work, not people. Frame it as &quot;more time on the parts of your job that actually matter.&quot;</p>
            </div>
            <div className="p-5 bg-[var(--color-bg-secondary)] rounded-xl">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Show the upside</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">Workers who upskill see an 8–12% wage uplift in Australia. People want to know what&apos;s in it for them.</p>
            </div>
            <div className="p-5 bg-[var(--color-bg-secondary)] rounded-xl">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Be transparent</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">Tell people what is and isn&apos;t being automated in the next 6–12 months. Uncertainty is worse than bad news.</p>
            </div>
            <div className="p-5 bg-[var(--color-bg-secondary)] rounded-xl">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">Recognize improvements</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">When someone finds a better way with AI, call it out. Recognition pulls shadow AI into the open.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Ownership */}
      <Section background="light" id="ownership">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">👥</span>
            <h2 className="mb-0">Who should own AI upskilling?</h2>
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            SMEs don&apos;t need a separate AI academy. You don&apos;t need a big team — you need clear ownership.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {ownershipRoles.map((role, i) => (
              <Card key={i} hover={false} className="text-center">
                <div className="text-4xl mb-3">{role.icon}</div>
                <div className="text-sm font-medium text-[var(--color-primary)] mb-1">{role.role}</div>
                <CardTitle className="text-lg mb-2">{role.title}</CardTitle>
                <CardDescription className="text-sm">{role.responsibilities}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Key Takeaways */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-8">Key takeaways</h2>
          <div className="space-y-3">
            {[
              'Employees are ahead of employers on AI, but under-trained — only ~47% report formal training, yet usage is high',
              'Australian SMEs cite lack of internal skills as a leading barrier; upskilling is a growth enabler',
              'A 4-phase approach — align leadership, build literacy, enable by role, sustain and measure — is realistic in 8 weeks',
              'Governance must be taught with the skills, or shadow AI and data risk will rise',
              'Continuous refresh is essential because AI capability and expectations move quickly',
            ].map((takeaway, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[var(--color-bg-secondary)] rounded-lg">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[var(--color-text-secondary)]">{takeaway}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Next Steps */}
      <Section background="light" id="next-steps">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🚀</span>
            <h2 className="mb-0">Next steps</h2>
          </div>

          <p className="text-lg text-[var(--color-text-secondary)] mb-8">
            The SMEs pulling ahead aren&apos;t the ones with the biggest AI budgets — they&apos;re the ones that trained their people early and gave them clear guardrails.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card hover={false} className="border-t-4 border-t-[var(--color-primary)]">
              <CardTitle className="text-lg mb-3">1. Assess your current state</CardTitle>
              <CardDescription className="mb-4">
                Before you design training, figure out where you are. Some people are power users. Others have never touched a generative AI tool.
              </CardDescription>
              <Button href="/ai-readiness-checklist" variant="outline" size="sm">
                Take the AI Readiness Checklist →
              </Button>
            </Card>
            <Card hover={false} className="border-t-4 border-t-[var(--color-primary)]">
              <CardTitle className="text-lg mb-3">2. Get your leadership aligned</CardTitle>
              <CardDescription className="mb-4">
                The biggest barrier to AI success isn&apos;t your team — it&apos;s getting your executive team on the same page about priorities, safety, and training.
              </CardDescription>
              <Button href="/contact" size="sm">
                Talk to The AI Guides →
              </Button>
            </Card>
          </div>
        </div>
      </Section>

      {/* CTA Band */}
      <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-white mb-4">Want help implementing this playbook?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            We can run your Phase 1 executive session, draft your one-page policy, design role-based prompt packs, and set up measurement — then hand it to your team to sustain.
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            Book a Discovery Call
          </Button>
        </div>
      </section>

      {/* Related Resources */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-8">Related resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card href="/building-ai-skills-across-teams">
              <CardTitle className="text-base mb-2">Building AI Skills Across Teams</CardTitle>
              <CardDescription className="text-sm">How to create an AI capability system that scales</CardDescription>
            </Card>
            <Card href="/ai-strategy-essentials-for-smes">
              <CardTitle className="text-base mb-2">AI Strategy Essentials for SMEs</CardTitle>
              <CardDescription className="text-sm">The 5-part strategy framework that actually works</CardDescription>
            </Card>
            <Card href="/ai-skills-gap-australia-2025">
              <CardTitle className="text-base mb-2">The AI Skills Gap Is Real</CardTitle>
              <CardDescription className="text-sm">Why 59% of Australian workers are stuck waiting for training</CardDescription>
            </Card>
          </div>
        </div>
      </Section>

      {/* About */}
      <Section background="light">
        <div className="max-w-3xl mx-auto">
          <Card hover={false} className="bg-white">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">About the Author</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-4">
              Patrick is co-founder of The AI Guides, bringing a decade of strategy consulting experience to help Australian SMEs adopt AI with confidence. Based in Sydney, he specialises in practical AI strategy, executive training, and building team capability.
            </p>
            <div className="pt-4 border-t border-[var(--color-border)]">
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-2 text-sm">About The AI Guides</h4>
              <p className="text-[var(--color-text-secondary)] text-sm">
                The AI Guides helps Australian SMEs navigate AI adoption with confidence. We provide expert AI strategy, executive and team training, and implementation support tailored to your business needs.
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
