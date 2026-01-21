import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

interface CtaBandProps {
  title: string;
  subtitle?: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  variant?: 'primary' | 'light';
}

export function CtaBand({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = 'primary',
}: CtaBandProps) {
  // Use a dark slate background for better contrast with white text
  const bgClass = variant === 'primary' ? 'bg-slate-800' : 'bg-[var(--color-bg-secondary)]';
  const textClass = variant === 'primary' ? 'text-white' : 'text-[var(--color-text-primary)]';
  const subtitleClass = variant === 'primary' ? 'text-slate-300' : 'text-[var(--color-text-secondary)]';

  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className={`mb-4 ${textClass}`}>{title}</h2>
          {subtitle && <p className={`text-lg mb-8 ${subtitleClass}`}>{subtitle}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={primaryCta.href}
              variant="primary"
              size="lg"
            >
              {primaryCta.text}
            </Button>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="outline"
                size="lg"
                className={variant === 'primary' ? 'border-white text-white hover:bg-white/10' : ''}
              >
                {secondaryCta.text}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
