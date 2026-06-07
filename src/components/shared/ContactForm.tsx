'use client';

import { useState } from 'react';

type ContactFormVariant = 'general' | 'student';

interface ContactFormProps {
  variant?: ContactFormVariant;
}

export default function ContactForm({ variant = 'general' }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="p-4 rounded-sm border-l-4 border-success-500 bg-success-50 text-text-primary">
        <h4 className="font-semibold text-[14px] mb-1">Message sent successfully</h4>
        <p className="text-[13px] text-text-secondary">
          Thank you for reaching out to HELIOS AI Labs. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-[480px]">
      
      {/* Name Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-[13px] font-medium text-text-primary">
          Full name <span className="ml-1 text-text-tertiary font-normal">(required)</span>
        </label>
        <div className="flex items-center h-10 px-3 bg-white border border-border-default hover:border-border-strong focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/30 rounded transition-all">
          <input
            type="text"
            id="name"
            required
            placeholder="Jane Doe"
            className="w-full bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-[13px] font-medium text-text-primary">
          Email address <span className="ml-1 text-text-tertiary font-normal">(required)</span>
        </label>
        <div className="flex items-center h-10 px-3 bg-white border border-border-default hover:border-border-strong focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/30 rounded transition-all">
          <input
            type="email"
            id="email"
            required
            placeholder="you@example.com"
            className="w-full bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary"
          />
        </div>
      </div>

      {/* Student-Specific Fields */}
      {variant === 'student' && (
        <>
          <div className="flex flex-col gap-1">
            <label htmlFor="college" className="text-[13px] font-medium text-text-primary">
              College / University <span className="ml-1 text-text-tertiary font-normal">(required)</span>
            </label>
            <div className="flex items-center h-10 px-3 bg-white border border-border-default hover:border-border-strong focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/30 rounded transition-all">
              <input
                type="text"
                id="college"
                required
                placeholder="e.g. NIT Warangal"
                className="w-full bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="interest" className="text-[13px] font-medium text-text-primary">
              Area of interest
            </label>
            <div className="flex items-center h-10 px-3 bg-white border border-border-default hover:border-border-strong focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/30 rounded transition-all">
              <input
                type="text"
                id="interest"
                placeholder="e.g. Reinforcement Learning, MLOps"
                className="w-full bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary"
              />
            </div>
          </div>
        </>
      )}

      {/* Message Field */}
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-[13px] font-medium text-text-primary">
          {variant === 'student' ? 'Why do you want to join?' : 'How can we help?'}
        </label>
        <div className="flex bg-white border border-border-default hover:border-border-strong focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/30 rounded transition-all p-3">
          <textarea
            id="message"
            rows={4}
            className="w-full bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary resize-y min-h-[72px]"
            placeholder="Add context..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-border-subtle mt-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-1.5 h-9 px-4 text-[14px] font-semibold bg-accent-500 text-primary-700 rounded-lg hover:bg-accent-400 active:bg-accent-600 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors duration-150 ease-standard min-w-[120px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-primary-700/25 border-t-primary-700 animate-spin" />
              Sending...
            </span>
          ) : (
            'Submit details'
          )}
        </button>
      </div>
    </form>
  );
}