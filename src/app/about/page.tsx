import type { Metadata } from 'next';
import { Hero, CtaBand } from '@/components/sections';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - Trusted AI Advisors',
  description:
    'Meet The AI Guides - Sydney-based AI strategy and training experts helping Australian SMEs navigate AI adoption with confidence.',
};

const founders = [
  {
    name: 'Patrick',
    role: 'Co-Founder & Principal Advisor',
    bio: "Patrick spent a decade in top-tier strategy firms, working with leadership teams across five continents on growth strategy, digital transformation, and change management. He co-founded The AI Guides to help Australian SMEs cut through the AI hype with practical guidance. When he's not working with clients, Patrick is doing laps at Clovelly and on a mission to find Sydney's best pastries.",
    initials: 'PD',
  },
  {
    name: 'Jarrod',
    role: 'Co-Founder & Principal Advisor',
    bio: "Jarrod has spent over a decade building ventures, shaping strategy for major organisations, and leading high-performing teams across Australia, the UK, and Asia. His background spans fintech, social impact, and innovation. His approach blends strategic thinking with hands-on delivery. He's a keen soccer nut and known to enjoy antiques shopping.",
    initials: 'JW',
  },
];

const howWeWork = [
  {
    step: 1,
    title: 'Assess',
    description:
      'We evaluate your current capabilities, readiness, and business needs to identify AI opportunities that truly matter.',
    href: '/ai-readiness-survey',
    linkText: 'Take the Survey',
  },
  {
    step: 2,
    title: 'Prioritise',
    description:
      'We help you focus on the most valuable and achievable AI projects, aligning actions to your strategic goals.',
    href: '/ai-strategy-essentials-for-smes',
    linkText: 'Read the Guide',
  },
  {
    step: 3,
    title: 'Implement',
    description:
      'We guide you through practical implementation, ensuring solutions are delivered efficiently and with minimal disruption.',
    href: '/10-quick-wins-genai-services-finance-ops',
    linkText: 'Get Quick Wins',
  },
  {
    step: 4,
    title: 'Upskill',
    description:
      "We provide expert-led training to build your team's AI literacy and confidence, empowering lasting capability.",
    href: '/sme-ai-upskilling-playbook-2025',
    linkText: 'Read the Playbook',
  },
  {
    step: 5,
    title: 'Govern',
    description:
      'We help you establish robust AI governance practices, ensuring ongoing compliance, ethics, and risk management.',
    href: '/executive-guide-to-ai-governance-sme-edition',
    linkText: 'Read the Guide',
  },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="Trusted AI Advisors for Australian SMEs"
        subtitle="Empowering Australian businesses with practical AI strategy, training, and guidance for real-world results."
        primaryCta={{ text: 'Free AI Readiness Survey', href: '/ai-readiness-survey' }}
        secondaryCta={{ text: 'Book a 30-Minute Call', href: '/contact' }}
      />

      {/* Who We Are */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-8">Who We Are</h2>
          <div className="space-y-6 text-[var(--color-text-secondary)]">
            <p>
              We use &quot;AI guides&quot; in two ways. First,{' '}
              <strong className="text-[var(--color-text-primary)]">we create practical resources</strong> —
              articles, checklists, and playbooks — to help executives make sense of rapid AI change.
              Second,{' '}
              <strong className="text-[var(--color-text-primary)]">we act as your AI guides</strong> — the
              team you can call to prioritise the right use-cases, design training for your people,
              and put simple guardrails in place so AI is used safely.
            </p>
            <p>
              We started The AI Guides because{' '}
              <strong className="text-[var(--color-text-primary)]">
                we kept seeing the same issue in Australian SMEs
              </strong>
              : AI was moving faster than most teams could absorb, and there wasn&apos;t a trusted,
              business-first partner to translate it into their context. These businesses see the
              potential, but they don&apos;t always have spare strategy or change capacity, so they
              need advice that&apos;s right-sized — fast to understand, affordable to implement, and
              practical for teams that are already busy. That&apos;s the gap we&apos;re here to
              close.
            </p>
          </div>
        </div>
      </Section>

      {/* Founders */}
      <Section background="light">
        <SectionHeader title="Our Founders" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder) => (
            <Card key={founder.name} hover={false}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {founder.initials}
                </div>
                <div>
                  <CardTitle className="mb-1">{founder.name}</CardTitle>
                  <p className="text-sm text-[var(--color-primary)] font-medium mb-3">
                    {founder.role}
                  </p>
                </div>
              </div>
              <CardDescription className="mt-4">{founder.bio}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      {/* How We Work */}
      <Section background="white">
        <SectionHeader
          title="How We Work"
          subtitle="The AI Guides combine deep expertise with a hands-on, SME-focused approach. Our methodology ensures clarity, prioritisation, and measurable outcomes at every stage of your AI journey."
        />
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {howWeWork.map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">{item.description}</p>
              <Link
                href={item.href}
                className="text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-dark)]"
              >
                {item.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      {/* Where We Work */}
      <Section background="light">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Where We Work</h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Based in Sydney, The AI Guides proudly serve businesses across Australia and New
            Zealand. Our team understands the unique challenges and opportunities in this region,
            enabling us to deliver AI strategies and training that are both locally relevant and
            globally informed. Whether your organisation is in a major city or a regional centre, we
            are committed to helping you unlock the full potential of AI.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Want to see where AI fits in your business?"
        primaryCta={{ text: 'Free AI Readiness Survey', href: '/ai-readiness-survey' }}
        secondaryCta={{ text: 'Book a 30-Minute Call', href: '/contact' }}
      />
    </>
  );
}
