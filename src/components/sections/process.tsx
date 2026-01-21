import { Section, SectionHeader } from '@/components/ui/section';

const steps = [
  {
    number: 1,
    title: 'Assess Readiness',
    description:
      'We evaluate your current state, digital capabilities, and AI opportunities to identify where you stand and what is possible.',
  },
  {
    number: 2,
    title: 'Prioritise Initiatives',
    description:
      'Together, we identify and sequence high-impact AI projects aligned to your strategic goals and available resources.',
  },
  {
    number: 3,
    title: 'Implement Solutions',
    description:
      'Our team guides you through selecting, piloting, and integrating AI solutions that drive real business outcomes.',
  },
  {
    number: 4,
    title: 'Upskill Teams',
    description:
      'We deliver targeted training and executive education to build AI literacy and empower confident adoption across your organisation.',
  },
  {
    number: 5,
    title: 'Govern Responsibly',
    description:
      'We help you establish robust governance frameworks, ensuring your AI initiatives are ethical, secure, and compliant.',
  },
];

export function Process() {
  return (
    <Section background="light" id="how-we-work">
      <SectionHeader
        title="AI in Your Business in 90 Days"
        subtitle="Not 6 months. Not a year. We help Australian SMEs get practical AI tools deployed — with governance, training, and measurable results — in just 90 days."
      />

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-border)] transform md:-translate-x-1/2" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Step number circle */}
              <div
                className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-lg shadow-lg ${
                  index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                }`}
              >
                {step.number}
              </div>

              {/* Content */}
              <div
                className={`flex-1 bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] ${
                  index % 2 === 0 ? 'md:text-right md:mr-8' : 'md:text-left md:ml-8'
                }`}
              >
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
