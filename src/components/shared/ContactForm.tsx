'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/cn';
import { fadeInUp, staggerContainer, EASE_SOFT } from '@/lib/motion';

type ContactFormVariant = 'general' | 'student';

interface ContactFormProps {
  variant?: ContactFormVariant;
}

interface Fields {
  name: string;
  email: string;
  college: string;
  interest: string;
  message: string;
}

const EMPTY: Fields = {
  name: '',
  email: '',
  college: '',
  interest: '',
  message: '',
};

const formStagger = staggerContainer(0.07, 0.05);

export default function ContactForm({ variant = 'general' }: ContactFormProps) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    // Clear the error as soon as the user starts correcting the field
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof Fields, string>> = {};

    if (!fields.name.trim()) next.name = 'Please tell us your name.';
    if (!fields.email.trim()) {
      next.email = 'Please enter an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
      next.email = 'That email address does not look right.';
    }
    if (variant === 'student' && !fields.college.trim()) {
      next.college = 'Please tell us where you study.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // No submission endpoint exists yet — this acknowledges the message
    // locally. Swap for a real POST when the backend lands.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE_SOFT }}
        role="status"
        className="relative overflow-hidden rounded-lg border border-success-500/30 bg-success-50 p-6"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 260, damping: 16 }}
          className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-success-500/15"
        >
          <CheckCircle2 className="h-6 w-6 text-success-500" />
        </motion.div>
        <h3 className="mb-1 text-[16px] font-bold text-text-primary">
          Message sent successfully
        </h3>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          Thank you for reaching out to HELIOS AI Labs. We will get back to you
          shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      variants={formStagger}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-[480px] flex-col gap-3.5 sm:gap-4"
    >
      <Field
        id="name"
        label="Full name"
        required
        placeholder="Jane Doe"
        autoComplete="name"
        value={fields.name}
        onChange={set('name')}
        error={errors.name}
      />

      <Field
        id="email"
        type="email"
        label="Email address"
        required
        placeholder="you@example.com"
        autoComplete="email"
        value={fields.email}
        onChange={set('email')}
        error={errors.email}
      />

      {variant === 'student' && (
        <>
          <Field
            id="college"
            label="College / University"
            required
            placeholder="e.g. NIT Warangal"
            autoComplete="organization"
            value={fields.college}
            onChange={set('college')}
            error={errors.college}
          />
          <Field
            id="interest"
            label="Area of interest"
            placeholder="e.g. Reinforcement Learning, MLOps"
            value={fields.interest}
            onChange={set('interest')}
            error={errors.interest}
          />
        </>
      )}

      <Field
        id="message"
        as="textarea"
        label={
          variant === 'student' ? 'Why do you want to join?' : 'How can we help?'
        }
        placeholder="Add context…"
        value={fields.message}
        onChange={set('message')}
        error={errors.message}
      />

      <motion.div
        variants={fadeInUp}
        className="mt-2 flex justify-stretch border-t border-border-subtle pt-4 sm:justify-end"
      >
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative inline-flex h-11 w-full min-w-[140px] items-center justify-center gap-2 overflow-hidden rounded-lg bg-accent-500 px-5 text-[14px] font-semibold text-primary-700 sm:h-10 sm:w-auto transition-all duration-200 ease-standard hover:bg-accent-400 hover:shadow-accent active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 disabled:shadow-none disabled:active:scale-100"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-standard group-hover:translate-x-full"
          />
          {isSubmitting ? (
            <>
              <Loader2 className="relative h-4 w-4 animate-spin" />
              <span className="relative">Sending…</span>
            </>
          ) : (
            <>
              <span className="relative">Submit details</span>
              <Send className="relative h-3.5 w-3.5 transition-transform duration-200 ease-standard group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </motion.div>
    </motion.form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  as?: 'input' | 'textarea';
}

/**
 * Labelled field with an animated focus ring and inline validation message.
 *
 * Errors are wired with aria-invalid/aria-describedby and announced through a
 * live region, so they are reported to screen readers and not only shown in red.
 */
function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
  error,
  as = 'input',
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const errorId = `${id}-error`;

  const shellClasses = cn(
    'relative flex bg-white border rounded transition-colors duration-200 ease-standard',
    as === 'input' ? 'h-11 items-center px-3 sm:h-10' : 'p-3',
    error
      ? 'border-error-500'
      : focused
        ? 'border-accent-500'
        : 'border-border-default hover:border-border-strong'
  );

  const controlClasses =
    'w-full bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary';

  return (
    <motion.div variants={fadeInUp} className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[13px] font-medium text-text-primary">
        {label}
        {required && (
          <span className="ml-1 font-normal text-text-tertiary">(required)</span>
        )}
      </label>

      <div className={shellClasses}>
        {/* Focus glow, animated rather than toggled, so it eases in */}
        <AnimatePresence>
          {focused && !error && (
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute -inset-px rounded ring-2 ring-accent-500/30"
            />
          )}
        </AnimatePresence>

        {as === 'textarea' ? (
          <textarea
            id={id}
            name={id}
            rows={4}
            required={required}
            placeholder={placeholder}
            value={value}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className={cn(controlClasses, 'min-h-[72px] resize-y')}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            value={value}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className={controlClasses}
          />
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden text-[12px] font-medium text-error-600"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
