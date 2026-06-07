import { HTMLAttributes, forwardRef } from 'react';

export type CardVariant = 'flat' | 'raised' | 'interactive';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'flat', className = '', children, ...props }, ref) => {
    
    const base = 'bg-surface-card rounded overflow-hidden text-text-primary';
    
    const variants: Record<CardVariant, string> = {
      flat: 'border border-border-default',
      raised: 'shadow-1 border border-transparent',
      interactive: 'border border-border-default hover:shadow-1 hover:border-border-strong cursor-pointer transition-all duration-150 ease-standard',
    };

    return (
      <div ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 pb-2 ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 pt-2 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-4 border-t border-border-subtle bg-neutral-50 flex items-center gap-2 ${className}`} {...props}>
    {children}
  </div>
);