import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white';
}

export function Logo({ className, variant = 'default' }: LogoProps) {
  const textColor = variant === 'white' ? 'text-white' : 'text-[var(--color-text-primary)]';
  const accentColor = variant === 'white' ? 'text-blue-300' : 'text-[var(--color-primary)]';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Logo Icon */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-8 w-8 md:h-10 md:w-10', accentColor)}
      >
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="8"
          className="fill-current opacity-10"
        />
        <path
          d="M20 10L28 26H12L20 10Z"
          className="fill-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="22" r="3" className="fill-current opacity-50" />
      </svg>
      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className={cn('text-lg md:text-xl font-bold tracking-tight', textColor)}>
          The AI Guides
        </span>
      </div>
    </div>
  );
}
