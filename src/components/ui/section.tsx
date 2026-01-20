import { cn } from '@/lib/utils';
import { Container } from './container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'light' | 'dark' | 'primary';
  containerSize?: 'default' | 'narrow' | 'wide';
  id?: string;
}

export function Section({
  children,
  className,
  background = 'white',
  containerSize = 'default',
  id,
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white',
    light: 'bg-[var(--color-bg-secondary)]',
    dark: 'bg-[var(--color-text-primary)] text-white',
    primary: 'bg-[var(--color-primary)] text-white',
  };

  return (
    <section id={id} className={cn('py-16 md:py-24', backgrounds[background], className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="text-balance">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
