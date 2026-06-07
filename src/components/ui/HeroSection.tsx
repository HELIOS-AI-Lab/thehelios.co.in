import { ReactNode } from 'react';

interface HeroSectionProps {
  badge?: string;
  title: ReactNode;
  subtitle: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  theme?: 'light' | 'inverse';
  alignment?: 'left' | 'center';
  className?: string;
}

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  theme = 'light',
  alignment = 'center',
  className = '',
}: HeroSectionProps) {
  
  const isInverse = theme === 'inverse';
  
  // Theme mapping based on Ishdeep UI Kit tokens
  const bgClass = isInverse ? 'bg-primary-700' : 'bg-surface-page';
  const titleClass = isInverse ? 'text-white' : 'text-text-primary';
  const subtitleClass = isInverse ? 'text-white/80' : 'text-text-secondary';
  const badgeClass = isInverse ? 'bg-white/10 text-white' : 'bg-neutral-200 text-primary-700';
  
  const alignClass = alignment === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <section className={`w-full py-16 md:py-24 lg:py-32 border-b ${isInverse ? 'border-white/10' : 'border-border-default'} ${bgClass} ${className}`}>
      <div className={`max-w-[1024px] px-6 mx-auto flex flex-col gap-6 ${alignClass}`}>
        
        {/* Overline Badge */}
        {badge && (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold uppercase tracking-widest ${badgeClass}`}>
            {badge}
          </span>
        )}

        {/* H1 Title */}
        <h1 className={`text-[34px] md:text-[48px] lg:text-[56px] font-bold leading-[1.15] tracking-[-0.02em] ${titleClass}`}>
          {title}
        </h1>

        {/* Subtitle / Lede */}
        <p className={`text-[16px] md:text-[18px] max-w-[720px] leading-relaxed ${subtitleClass}`}>
          {subtitle}
        </p>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className={`flex flex-wrap gap-3 mt-4 ${alignment === 'center' ? 'justify-center' : 'justify-start'}`}>
            {primaryAction}
            {secondaryAction}
          </div>
        )}

      </div>
    </section>
  );
}