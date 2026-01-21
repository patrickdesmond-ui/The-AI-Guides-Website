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
  const bgClass = variant === 'primary' ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-secondary)]';

  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2
            className="mb-4"
            style={{ color: variant === 'primary' ? 'white' : 'var(--color-text-primary)' }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-lg mb-8"
              style={{ color: variant === 'primary' ? 'rgba(219, 234, 254, 1)' : 'var(--color-text-secondary)' }}
            >
              {subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={primaryCta.href}
              variant={variant === 'primary' ? 'secondary' : 'primary'}
              size="lg"
            >
              {primaryCta.text}
            </Button>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant={variant === 'primary' ? 'ghost' : 'outline'}
                size="lg"
                className={variant === 'primary' ? 'text-white hover:bg-white/10' : ''}
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
