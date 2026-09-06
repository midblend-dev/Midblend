import React, { useState } from 'react';
import { Mail, Instagram, MessageSquare, Copy, Check, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface ContactSectionProps {
  onApplyClick: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onApplyClick }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#050505] border-t border-white/10 overflow-hidden">
      {/* Background neon blur */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-[#D4FF00]/5 blur-[130px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <span
            id="contact-section-label"
            className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max font-bold bg-[#050505]"
          >
            GET IN TOUCH
          </span>

          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-6 uppercase max-w-2xl"
          >
            Let's Build Something Amazing{' '}
            <span className="text-[#D4FF00] italic">Together.</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
            Have a project in mind or want to join our creator community? Let's talk.
          </p>

          <div className="flex items-center justify-center w-full sm:w-auto mb-12">
            <a
              href="/apply.html"
              onClick={(e) => {
                e.preventDefault();
                onApplyClick();
              }}
              id="contact-cta-apply-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4FF00] text-black font-extrabold uppercase text-xs tracking-widest rounded-sm hover:scale-105 transition-all shadow-xl shadow-[#D4FF00]/20"
            >
              <span>Apply as Creator →</span>
            </a>
          </div>

          {/* Official Contact Details Box */}
          <div className="w-full max-w-xl rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8 space-y-4 text-left shadow-2xl">
            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#D4FF00]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-widest">Email</span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-sm font-bold text-white hover:text-[#D4FF00] transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="p-2 rounded-lg bg-[#181818] hover:bg-[#222] text-gray-400 hover:text-white transition-colors"
                aria-label="Copy email address"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-[#D4FF00]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#D4FF00]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-widest">Phone / WhatsApp</span>
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw || '9707992712'}`}
                    className="text-sm font-bold text-white hover:text-[#D4FF00] transition-colors"
                  >
                    {CONTACT_INFO.phoneDisplay || '+91 97079 92712'}
                  </a>
                </div>
              </div>
              <a
                href={`https://wa.me/91${CONTACT_INFO.phoneRaw || '9707992712'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#1f2316] text-[#D4FF00] font-bold border border-[#D4FF00]/30 uppercase tracking-widest hover:bg-[#D4FF00] hover:text-black transition-colors"
              >
                WhatsApp
              </a>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#D4FF00]">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-widest">Instagram</span>
                  <a
                    href={CONTACT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-[#D4FF00] transition-colors"
                  >
                    {CONTACT_INFO.instagram}
                  </a>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#1f2316] text-[#D4FF00] font-bold border border-[#D4FF00]/30 uppercase tracking-widest">
                {CONTACT_INFO.dmCallout}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-9 h-9 rounded-lg bg-[#181818] border border-white/10 flex items-center justify-center text-[#D4FF00]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-widest">Fast Track</span>
                <span className="text-sm font-semibold text-white">
                  {CONTACT_INFO.dmCallout} on Instagram for quick response
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
