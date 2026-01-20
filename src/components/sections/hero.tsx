import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  centered?: boolean;
}

export function Hero({ title, subtitle, primaryCta, secondaryCta, centered = true }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[var(--color-bg-secondary)] to-white py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)] rounded-full opacity-5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-accent)] rounded-full opacity-5 blur-3xl" />
      </div>

      <Container className="relative">
        <div className={centered ? 'text-center max-w-4xl mx-auto' : 'max-w-3xl'}>
          <h1 className="text-balance mb-6">{title}</h1>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8">
            {subtitle}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className={`flex flex-col sm:flex-row gap-4 ${centered ? 'justify-center' : ''}`}>
              {primaryCta && (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="outline" size="lg">
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
