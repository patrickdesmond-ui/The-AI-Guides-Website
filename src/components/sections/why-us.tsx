import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';

export function WhyUs() {
  return (
    <Section background="white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div>
          <h2 className="mb-6">Why The AI Guides?</h2>
          <div className="space-y-4 text-[var(--color-text-secondary)]">
            <p>
              At The AI Guides, our name reflects our dual commitment: providing both practical AI
              resources and dedicated advisory support for Australian SMEs. Founded by two Sydney
              based strategy and digital transformation professionals, we serve as your trusted
              guides, offering clear, actionable frameworks and step-by-step guides to help you
              confidently navigate the evolving AI landscape.
            </p>
            <p>
              Whether you are seeking expert advice on AI strategy, hands-on training for your
              leadership team, or reliable resources to support digital transformation, The AI
              Guides delivers proven solutions tailored to your business needs. We empower leaders
              to make informed decisions and drive meaningful progress with AI.
            </p>
          </div>
        </div>

        {/* Visual/Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">Sydney</div>
            <div className="text-sm text-[var(--color-text-muted)]">Based</div>
          </div>
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">SME</div>
            <div className="text-sm text-[var(--color-text-muted)]">Focused</div>
          </div>
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">Practical</div>
            <div className="text-sm text-[var(--color-text-muted)]">AI Solutions</div>
          </div>
          <div className="bg-[var(--color-bg-secondary)] rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-[var(--color-primary)] mb-2">Trusted</div>
            <div className="text-sm text-[var(--color-text-muted)]">Advisors</div>
          </div>
        </div>
      </div>
    </Section>
  );
}
