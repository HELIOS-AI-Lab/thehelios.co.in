'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const hasAccepted = localStorage.getItem('helios_cookie_consent');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('helios_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-[420px] z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-surface-card border border-border-default shadow-8 rounded-sm p-5 flex flex-col gap-4">
        
        <div className="flex flex-col gap-1.5">
          <h4 className="text-[14px] font-semibold text-text-primary">
            This website uses cookies
          </h4>
          <p className="text-[13px] text-text-secondary leading-relaxed">
            We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          {/* We provide a secondary "Decline" button for compliance, though optional */}
          <button
            onClick={() => setIsVisible(false)}
            className="inline-flex items-center justify-center h-8 px-3 text-[13px] font-semibold bg-white text-text-primary border border-border-default rounded-lg hover:bg-neutral-100 hover:border-border-strong transition-colors duration-150 ease-standard"
          >
            Decline
          </button>
          
          <button
            onClick={handleAccept}
            className="inline-flex items-center justify-center h-8 px-4 text-[13px] font-semibold bg-accent-500 text-primary-700 rounded-lg hover:bg-accent-400 active:bg-accent-600 transition-colors duration-150 ease-standard"
          >
            Accept
          </button>
        </div>

      </div>
    </div>
  );
}