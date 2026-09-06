import React from 'react';
import { Instagram, Youtube, ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface FooterProps {
  onNavigate: (path: string, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-white/10 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/', 'home');
              }}
              className="flex items-center gap-1.5 text-2xl font-black tracking-tighter text-white uppercase mb-3"
            >
              <span>MIDBLEND</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#D4FF00]" />
            </a>

            <p className="text-sm text-gray-400 mb-6 max-w-sm leading-relaxed">
              Building creator communities. Driving real impact. Connecting premium skincare and beauty brands with genuine voices.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 text-zinc-300 hover:text-[#D4FF00] hover:border-[#D4FF00]/50 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 text-zinc-300 hover:text-[#D4FF00] hover:border-[#D4FF00]/50 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', 'home');
                  }}
                  className="hover:text-[#D4FF00] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', 'about');
                  }}
                  className="hover:text-[#D4FF00] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#what-we-do"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', 'what-we-do');
                  }}
                  className="hover:text-[#D4FF00] transition-colors"
                >
                  What We Do
                </a>
              </li>
              <li>
                <a
                  href="#for-brands"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', 'for-brands');
                  }}
                  className="hover:text-[#D4FF00] transition-colors"
                >
                  For Brands
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: For Brands */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">
              For Brands
            </h4>
            <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider">
              <li>
                <a
                  href="#what-we-do"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', 'what-we-do');
                  }}
                  className="hover:text-[#D4FF00] transition-colors"
                >
                  Our Process
                </a>
              </li>
              <li>
                <a
                  href="#creator-categories"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', 'creator-categories');
                  }}
                  className="hover:text-[#D4FF00] transition-colors"
                >
                  Creator Roster
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/', 'contact');
                  }}
                  className="hover:text-[#D4FF00] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <span className="inline-block px-2 py-0.5 rounded bg-[#181d11] text-[#D4FF00] text-[10px] uppercase font-bold tracking-widest border border-[#D4FF00]/30 mb-1">
                  DM to Apply
                </span>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-white hover:text-[#D4FF00] transition-colors break-all font-semibold"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href="tel:+919707992712"
                  className="text-white hover:text-[#D4FF00] transition-colors font-semibold"
                >
                  +91 97079 92712
                </a>
              </li>
              <li>
                <a
                  href="/apply.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/apply.html');
                  }}
                  className="inline-flex items-center gap-1 text-[#D4FF00] hover:underline font-extrabold uppercase text-[10px] tracking-wider"
                >
                  Creator Application Form →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">
          <p id="footer-copyright">© 2025 MIDBLEND. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-6">
            <span className="text-gray-400">WHERE CREATORS MEET BRANDS</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
