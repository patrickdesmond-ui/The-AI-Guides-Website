import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  hover?: boolean;
  target?: '_blank' | '_self';
}

export function Card({ children, className, href, hover = true, target }: CardProps) {
  const baseStyles = cn(
    'bg-white rounded-xl border border-[var(--color-border)] p-6',
    hover && 'transition-all duration-200 hover:shadow-lg hover:border-[var(--color-primary-light)]',
    className
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, 'block')}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Link>
    );
  }

  return <div className={baseStyles}>{children}</div>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Tag = 'h3' }: CardTitleProps) {
  return (
    <Tag className={cn('text-xl font-semibold text-[var(--color-text-primary)]', className)}>
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-[var(--color-text-secondary)] leading-relaxed', className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('', className)}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return <div className={cn('mt-4 pt-4 border-t border-[var(--color-border)]', className)}>{children}</div>;
}
