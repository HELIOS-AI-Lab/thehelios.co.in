import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Native SVGs to replace the removed Lucide brand icons
const LinkedInIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const XIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>;
const GitHubIcon = (props: any) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;

  return (
    <footer className="w-full bg-surface-page border-t border-border-default mt-16 text-[13px] relative overflow-hidden">
      {/* Structural Top Border Highlight */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary-700" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Col (Spans 4 columns) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 font-bold text-[16px] text-text-primary mb-5 tracking-tight">
              <Image 
                src="/assets/helios-ai-logo-v2.png" 
                alt="HELIOS AI Labs Logo" 
                width={1254} 
                height={1254}
                className="object-contain h-7 w-7"
              />
              HELIOS AI Labs
            </Link>
            <p className="text-text-secondary leading-relaxed max-w-[280px] mb-6 text-[14px]">
              Building the next generation of intelligent, explainable, and self-evolving AI agents for Bharat and beyond.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/heliosailabs/" aria-label="LinkedIn" className="w-8 h-8 rounded border border-border-default flex items-center justify-center text-text-secondary hover:text-accent-600 hover:border-accent-500 transition-colors">
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a href="https://x.com" aria-label="X" className="w-8 h-8 rounded border border-border-default flex items-center justify-center text-text-secondary hover:text-accent-600 hover:border-accent-500 transition-colors">
                <XIcon className="w-4 h-4" />
              </a>
              <a href="https://github.com/HELIOS-AI-Lab/" aria-label="GitHub" className="w-8 h-8 rounded border border-border-default flex items-center justify-center text-text-secondary hover:text-accent-600 hover:border-accent-500 transition-colors">
                <GitHubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 (Spans 2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-text-primary uppercase tracking-widest mb-5">Platform</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-text-secondary hover:text-primary-700 hover:underline transition-colors">About Us</Link></li>
              <li><Link href="/product" className="text-text-secondary hover:text-primary-700 hover:underline transition-colors">Helios AI</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-primary-700 hover:underline transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Links Col 2 (Spans 2 cols) */}
          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold text-text-primary uppercase tracking-widest mb-5">Community</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/students" className="text-text-secondary hover:text-primary-700 hover:underline transition-colors">Students</Link></li>
              <li><Link href="/developers" className="text-text-secondary hover:text-primary-700 hover:underline transition-colors">Developers</Link></li>
<li><span className="text-text-secondary">Research Papers</span></li>            </ul>
          </div>

          {/* Newsletter / Waitlist Col (Spans 4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] font-bold text-text-primary uppercase tracking-widest mb-5">Join the Intelligence</h4>
            <p className="text-text-secondary mb-4 text-[13px]">Subscribe to get early access to our financial AI beta and research updates.</p>
            <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="developer@company.com" 
                required
                className="h-9 px-3 flex-1 bg-surface-sunken border border-border-default rounded text-[13px] focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-all placeholder:text-text-tertiary"
              />
              <button 
                type="submit" 
                className="h-9 px-4 bg-primary-700 text-white rounded text-[13px] font-semibold hover:bg-primary-600 active:bg-primary-800 transition-colors flex items-center justify-center"
              >
                Join
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-border-subtle">
              <address className="not-italic text-text-secondary flex flex-col gap-1 text-[12px]">
                <span className="font-semibold text-text-primary">HELIOS AI LABS</span>
                <span>Bejjanki, Telangana</span>
                <a href="mailto:info@thehelios.co.in" className="text-link-500 hover:underline mt-1">info@thehelios.co.in</a>
              </address>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-border-default text-[12px] text-text-tertiary">
          <p>Copyright © {currentYear} HELIOS AI Labs. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 font-medium">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}