'use client';

import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

const baseStyles =
  'group/btn relative inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg overflow-hidden transition-all duration-200 ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:border-transparent disabled:shadow-none disabled:active:scale-100';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-500 text-primary-700 hover:bg-accent-400 hover:shadow-accent active:bg-accent-600',
  secondary:
    'bg-white text-text-primary border border-border-default hover:bg-neutral-100 hover:border-border-strong hover:shadow-1 active:bg-neutral-200',
  tertiary:
    'bg-transparent text-link-500 hover:bg-link-50 hover:text-link-700 active:bg-neutral-200',
  destructive:
    'bg-error-500 text-white hover:bg-error-600 active:bg-error-700',
};

// Heights step down at `sm` — the taller base keeps every control at a
// comfortable touch target on phones without inflating the desktop chrome.
const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[13px] min-w-[64px] sm:h-7',
  md: 'h-10 px-4 text-[14px] min-w-[80px] sm:h-9',
  lg: 'h-11 px-5 text-[14px] min-w-[96px] sm:px-6 sm:text-[15px]',
};

interface SharedProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
}

export function buttonStyles({
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  className = '',
}: SharedProps & { className?: string }) {
  return cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className);
}

/**
 * Sheen that sweeps across the control on hover. Decorative only; it sits
 * behind the label via z-index so it never intercepts pointer events.
 */
function Sheen() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[750ms] ease-standard group-hover/btn:translate-x-full"
    />
  );
}

/** Icons nudge in the direction they point when the control is hovered. */
const leadingIconMotion =
  'shrink-0 relative transition-transform duration-200 ease-standard group-hover/btn:-translate-x-0.5';
const trailingIconMotion =
  'shrink-0 relative transition-transform duration-200 ease-standard group-hover/btn:translate-x-0.5';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SharedProps {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'secondary',
      size = 'md',
      isLoading,
      fullWidth,
      leadingIcon,
      trailingIcon,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={buttonStyles({ variant, size, fullWidth, className })}
      {...props}
    >
      <Sheen />
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0 relative" />}
      {!isLoading && leadingIcon && (
        <span className={leadingIconMotion}>{leadingIcon}</span>
      )}
      <span className="truncate relative">{children}</span>
      {!isLoading && trailingIcon && (
        <span className={trailingIconMotion}>{trailingIcon}</span>
      )}
    </button>
  )
);

Button.displayName = 'Button';

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    SharedProps {
  href: string;
  children: ReactNode;
}

/**
 * A link that looks like a button.
 *
 * Use this instead of wrapping <Button> in an <a> — nesting a button inside an
 * anchor is invalid HTML and gives screen readers two overlapping controls.
 * Internal hrefs route through next/link for prefetching and client-side
 * navigation; external ones get the usual noopener guard.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      href,
      variant = 'secondary',
      size = 'md',
      fullWidth,
      leadingIcon,
      trailingIcon,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isInternal = href.startsWith('/') || href.startsWith('#');
    const classes = buttonStyles({ variant, size, fullWidth, className });

    const content = (
      <>
        <Sheen />
        {leadingIcon && <span className={leadingIconMotion}>{leadingIcon}</span>}
        <span className="truncate relative">{children}</span>
        {trailingIcon && <span className={trailingIconMotion}>{trailingIcon}</span>}
      </>
    );

    if (isInternal) {
      return (
        <Link ref={ref} href={href} className={classes} {...props}>
          {content}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {content}
      </a>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
