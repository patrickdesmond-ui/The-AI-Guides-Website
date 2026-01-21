import type { Metadata } from 'next';
import { Hero, CtaBand } from '@/components/sections';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Executive Training - Executive & Leadership AI Training',
  description:
    'Practical AI training for executives and leadership teams. Give your teams the clarity, guardrails, and skills to use AI in the business.',
};

const trainingFormats = [
  {
    title: '90-minute Executive Briefing',
    price: 'From $4,500 AUD (ex-GST)',
    description:
      'Focused session covering the AI landscape, key SME risks, and actionable next steps for executive decision-makers.',
  },
  {
    title: 'Half-day Leadership Workshop',
    price: 'From $9,500 AUD (ex-GST)',
    description:
      'Interactive workshop to identify top processes, score 6–8 AI opportunities, draft policy, and define your 90-day action plan.',
    featured: true,
  },
  {
    title: '4–12 Week Program',
    price: 'Custom pricing (ex-GST)',
    description:
      'Comprehensive training covering AI foundations, use-case design, governance, and adoption, tailored to your leadership functions.',
  },
];

const benefits = [
  {
    title: 'Shared Understanding',
    description: 'Plain-English explanation of AI, GenAI, and the current tool landscape for leaders and teams.',
    features: ['No technical jargon', 'Covers latest AI trends and tools', 'Builds a common language across leadership'],
  },
  {
    title: 'Resources to Revisit',
    description: "Ongoing access to written 'AI guides' for leaders and teams to reference anytime.",
    features: ['Always-available resources', 'Regularly updated content', 'Practical, easy-to-read guides'],
  },
];

const agenda = [
  'Introduction to AI: Key concepts, terminology, and business relevance.',
  'AI Strategy for Leaders: Aligning AI initiatives with organisational objectives.',
  'Identifying High-Impact Use Cases: Practical frameworks for AI adoption in SMEs.',
  'Navigating AI Governance and Risk: Ensuring responsible and compliant AI deployment.',
  'Interactive Case Studies: Real-world applications and lessons learned from Australian businesses.',
  'Action Planning: Next steps to drive AI readiness and capability within your organisation.',
];

export default function ExecutiveTrainingPage() {
  return (
    <>
      <Hero
        title="Training for AI-ready Teams"
        subtitle="Give your teams the clarity, guardrails, and skills to use AI in the business — not just talk about it."
        primaryCta={{ text: 'Free AI Readiness Survey', href: '/ai-readiness-survey' }}
        secondaryCta={{ text: 'Book a 30-Minute Call', href: '/contact' }}
      />

      {/* Intro Section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Empowering Business Leaders for Confident AI-Driven Decisions</h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            AI is moving fast, but most leadership teams are only seeing fragments — a vendor demo
            here, a new feature there — without a simple plan for their business. Our executive
            training fixes that. We help Australian SMEs understand what AI actually is, where it
            creates value, what to do first, and how to get people using it safely.
          </p>
        </div>
      </Section>

      {/* What You'll Get */}
      <Section background="light">
        <SectionHeader title="What You'll Get" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit) => (
            <Card key={benefit.title} hover={false}>
              <CardTitle className="mb-3">{benefit.title}</CardTitle>
              <CardDescription className="mb-4">{benefit.description}</CardDescription>
              <ul className="space-y-2">
                {benefit.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <svg
                      className="w-5 h-5 text-[var(--color-success)] flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Training Formats */}
      <Section background="white">
        <SectionHeader
          title="AI Training Formats for Leaders"
          subtitle="Choose the format that best fits your team's needs and schedule."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {trainingFormats.map((format) => (
            <Card
              key={format.title}
              hover={false}
              className={`text-center ${format.featured ? 'ring-2 ring-[var(--color-primary)]' : ''}`}
            >
              <CardTitle className="mb-2">{format.title}</CardTitle>
              <p className="text-2xl font-bold text-[var(--color-primary)] mb-4">{format.price}</p>
              <CardDescription>{format.description}</CardDescription>
              <div className="mt-6">
                <Button href="/contact" variant={format.featured ? 'primary' : 'outline'} className="w-full">
                  Enquire Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Sample Agenda */}
      <Section background="light">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6">Sample Half-Day Executive AI Training Agenda</h2>
            <ul className="space-y-4">
              {agenda.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-[var(--color-text-secondary)] pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[var(--color-bg-tertiary)] rounded-xl p-8">
            <div className="aspect-video bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-lg flex items-center justify-center">
              <svg className="w-20 h-20 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <p className="text-center text-sm text-[var(--color-text-muted)] mt-4">
              Executive training session with leadership teams
            </p>
          </div>
        </div>
      </Section>

      {/* Why Do This First */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Why Do This First?</h2>
          <p className="text-lg text-[var(--color-text-secondary)]">
            Strategy without trained people stalls. Training without strategy scatters. This
            executive training brings both together, your leaders get a clear direction for AI and
            the practical guardrails to let teams start using it immediately.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Ready to upskill your leadership team?"
        subtitle="Empower your executives to lead confidently in an AI-driven landscape. Our tailored training sessions equip your team with practical strategies and actionable insights for successful AI adoption."
        primaryCta={{ text: 'Free AI Readiness Survey', href: '/ai-readiness-survey' }}
        secondaryCta={{ text: 'Book a 30-Minute Call', href: '/contact' }}
      />
    </>
  );
}
