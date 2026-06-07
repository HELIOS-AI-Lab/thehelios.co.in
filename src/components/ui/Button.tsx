'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

const baseStyles = 'inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg transition-all duration-150 ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-transparent';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent-500 text-primary-700 hover:bg-accent-400 active:bg-accent-600',
  secondary: 'bg-white text-text-primary border border-border-default hover:bg-neutral-100 hover:border-border-strong active:bg-neutral-200',
  tertiary: 'bg-transparent text-link-500 hover:bg-neutral-100 active:bg-neutral-200',
  destructive: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 text-[13px] min-w-[64px]',
  md: 'h-9 px-4 text-[14px] min-w-[80px]',
  lg: 'h-11 px-6 text-[15px] min-w-[96px]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', isLoading, fullWidth, leadingIcon, trailingIcon, className = '', children, disabled, ...props }, ref) => {
    
    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={combinedClassName}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
        <span className="truncate">{children}</span>
        {!isLoading && trailingIcon && <span className="shrink-0">{trailingIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';