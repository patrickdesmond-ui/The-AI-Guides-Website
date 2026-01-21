import { Section, SectionHeader } from '@/components/ui/section';

const steps = [
  {
    number: 1,
    title: 'Assess Readiness',
    description:
      'We evaluate your current state, digital capabilities, and AI opportunities to identify where you stand and what is possible.',
    color: 'bg-blue-400',
  },
  {
    number: 2,
    title: 'Prioritise Initiatives',
    description:
      'Together, we identify and sequence high-impact AI projects aligned to your strategic goals and available resources.',
    color: 'bg-blue-500',
  },
  {
    number: 3,
    title: 'Implement Solutions',
    description:
      'Our team guides you through selecting, piloting, and integrating AI solutions that drive real business outcomes.',
    color: 'bg-blue-600',
  },
  {
    number: 4,
    title: 'Upskill Teams',
    description:
      'We deliver targeted training and executive education to build AI literacy and empower confident adoption across your organisation.',
    color: 'bg-blue-700',
  },
  {
    number: 5,
    title: 'Govern Responsibly',
    description:
      'We help you establish robust governance frameworks, ensuring your AI initiatives are ethical, secure, and compliant.',
    color: 'bg-blue-800',
  },
];

export function Process() {
  return (
    <Section background="light" id="how-we-work">
      <SectionHeader
        title="How We Work"
        subtitle="We collaborate to get AI in your business in 90 days."
      />

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--color-border)]" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex items-start gap-6 mb-8 last:mb-0"
            >
              {/* Step number circle - always on left */}
              <div
                className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center font-bold text-lg shadow-lg`}
              >
                {step.number}
              </div>

              {/* Content - always on right */}
              <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">{step.title}</h3>
                <p className="text-[var(--color-text-secondary)]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
