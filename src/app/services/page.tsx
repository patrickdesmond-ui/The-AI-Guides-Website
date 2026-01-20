import type { Metadata } from 'next';
import { Hero, CtaBand } from '@/components/sections';
import { Section, SectionHeader } from '@/components/ui/section';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Services - AI Advisory for Australian SMEs',
  description:
    'Comprehensive AI advisory services for Australian SMEs including AI strategy, executive training, implementation support, and governance frameworks.',
};

const services = [
  {
    title: 'AI Strategy & Roadmaps',
    challenge: 'Unclear where to begin with AI or which projects matter most.',
    whatWeDo:
      'Assess your business, identify high-impact AI opportunities, and prioritise with a clear, actionable roadmap.',
    outcomes: 'Clarity on AI direction, confident decision-making, and strategic advantage.',
  },
  {
    title: 'Executive & Team Training',
    challenge: 'Skills gaps and uncertainty about AI tools or risks.',
    whatWeDo:
      'Deliver practical, hands-on workshops tailored for leaders and staff, demystifying AI and building capability.',
    outcomes: 'Upskilled teams, empowered leadership, and readiness for AI adoption.',
  },
  {
    title: 'Implementation Support',
    challenge: 'Uncertainty in selecting, integrating, or scaling AI solutions.',
    whatWeDo:
      'Act as your independent partner — guiding technology selection, managing vendors, and supporting rollout.',
    outcomes: 'Reduced risk, successful deployments, and measurable business value.',
  },
  {
    title: 'AI Governance, Risk & Policy',
    challenge: 'Navigating ethical, regulatory, and operational risks with AI.',
    whatWeDo:
      'Develop governance frameworks, policies, and risk controls tailored to your business.',
    outcomes: 'Responsible AI use, regulatory compliance, and trust with stakeholders.',
  },
];

const packages = [
  {
    title: 'AI Foundations Workshop',
    price: 'from $19,500',
    timeline: '2-3 days',
    includes: [
      'Half-day facilitated session with your leadership team',
      'AI landscape overview & priority discussion',
      'One-page AI policy with red/amber/green data rules',
      'Approved tools list & next steps',
      'Follow-up session to lock it in',
    ],
    whatYouGet:
      "Leadership aligned on your top 2-3 priorities, a policy people can actually understand, and clarity on what happens next.",
    bestFor: 'SMEs who need executive buy-in before committing further.',
  },
  {
    title: 'AI Strategy Sprint',
    price: 'from $39,500',
    timeline: '2 weeks',
    includes: [
      'Executive alignment session',
      'Stakeholder interviews (3-5 people)',
      'Use-case workshop to prioritise what matters',
      '90-day roadmap with sequenced initiatives',
      'One-page AI policy + governance framework',
      'Handover with your team',
    ],
    whatYouGet:
      'A strategy document you can actually execute, a prioritized roadmap, and the governance guardrails to keep it safe.',
    bestFor: 'SMEs ready to commit who want the plan before deploying to teams.',
    featured: true,
  },
  {
    title: 'AI Accelerator Program',
    price: 'Custom based on scope',
    timeline: '6-8 weeks',
    includes: [
      "Weeks 1-2: Everything from an 'AI Strategy Sprint'",
      'Weeks 3-4: Executive and manager training, role-based prompt packs, tool setup',
      'Weeks 5-6: Core literacy training for staff, role-based sessions, workflows documented',
      'Weeks 7-8: First AI wins session, workflow refinement, manager coaching, 90-day sustainability plan',
    ],
    whatYouGet:
      "Strategy built, team trained, AI in use, and metrics showing what's working. Your people have the skills, the guardrails, and the confidence to actually use it.",
    bestFor: 'SMEs ready for full AI adoption with hands-on support from start to finish.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="AI Advisory Services for Australian SMEs"
        subtitle="Our services are built for Australian SMEs that want AI to show up in day-to-day operations — not just in a presentation. We start with strategy, enable your people through executive and team training, and support you to implement AI safely with clear governance."
        primaryCta={{ text: 'Book a Session', href: '/contact' }}
        secondaryCta={{ text: 'About The AI Guides', href: '/about' }}
      />

      {/* Services Section */}
      <Section background="white">
        <SectionHeader title="What We Deliver" />
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.title} hover={false} className="bg-[var(--color-bg-secondary)]">
              <CardTitle className="mb-4">{service.title}</CardTitle>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">Challenge</p>
                  <CardDescription>{service.challenge}</CardDescription>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">What we do</p>
                  <CardDescription>{service.whatWeDo}</CardDescription>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">Outcomes</p>
                  <CardDescription>{service.outcomes}</CardDescription>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Packages Section */}
      <Section background="light">
        <SectionHeader
          title="Our Packages"
          subtitle="Choose the engagement level that fits your organisation's needs and readiness."
        />
        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.title}
              hover={false}
              className={`flex flex-col ${pkg.featured ? 'ring-2 ring-[var(--color-primary)] relative' : ''}`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-4">
                <CardTitle className="mb-2">{pkg.title}</CardTitle>
                <p className="text-2xl font-bold text-[var(--color-primary)]">{pkg.price}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{pkg.timeline}</p>
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                  What&apos;s included:
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <svg
                        className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg mb-4">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                    What you get:
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{pkg.whatYouGet}</p>
                </div>

                <p className="text-sm text-[var(--color-text-muted)]">
                  <span className="font-semibold">Best for:</span> {pkg.bestFor}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
                <Button href="/contact" className="w-full" variant={pkg.featured ? 'primary' : 'outline'}>
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Why Section */}
      <Section background="white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Why Choose The AI Guides?</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-6">
            The AI Guides sit in the gap most Australian SMEs actually have: you don&apos;t need a
            6-month transformation, you need someone to tell you which AI moves to make today, how
            to train your people, and how to keep it safe.
          </p>
          <p className="text-lg text-[var(--color-text-secondary)]">
            We&apos;ve spent decades advising executives, we&apos;re bullish on AI but disciplined
            about risk, and we package the work with clear resources your teams can reuse — so what
            we do with you doesn&apos;t disappear after the workshop.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Ready to Get Started?"
        subtitle="Let's discuss how we can help your business navigate AI adoption with confidence."
        primaryCta={{ text: 'Get in Touch', href: '/contact' }}
        secondaryCta={{ text: 'Take the AI Readiness Survey', href: '/ai-readiness-survey' }}
      />
    </>
  );
}
