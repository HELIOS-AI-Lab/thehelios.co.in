import { ReactNode } from 'react';

interface FeatureGridProps {
  columns?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

export function FeatureGrid({ columns = 3, children, className = '' }: FeatureGridProps) {
  const colClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid grid-cols-1 ${colClasses[columns]} gap-6 w-full ${className}`}>
      {children}
    </div>
  );
}

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
}

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex flex-col gap-3 p-5 border border-border-default rounded bg-surface-card hover:border-border-strong transition-colors duration-150 ease-standard">
      <div className="w-10 h-10 rounded bg-neutral-100 text-primary-700 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-[16px] font-semibold text-text-primary mb-1.5 leading-tight tracking-tight">
          {title}
        </h4>
        <p className="text-[14px] text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}