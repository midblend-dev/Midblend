import React from 'react';
import { TRUSTED_BRANDS } from '../data/content';

export const TrustedBrands: React.FC = () => {
  // Repeat the list exactly twice to match the 50% translation for a mathematically seamless loop
  const marqueeBrands = [
    ...TRUSTED_BRANDS,
    ...TRUSTED_BRANDS
  ];

  return (
    <section
      id="trusted-brands-section"
      className="py-16 sm:py-20 bg-[#050505] border-t border-b border-white/10 overflow-hidden relative"
    >
      <div className="w-full text-center">
        <h3
          id="trusted-brands-heading"
          className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-gray-500 uppercase mb-10 px-4"
        >
          TRUSTED BY BEAUTY &amp; SKINCARE BRANDS
        </h3>

        {/* Infinite Horizontal Marquee Container with edge fades */}
        <div className="relative w-full overflow-hidden">
          {/* Edge gradient masks for seamless fade-in/fade-out */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#050505] to-transparent z-10" />

          {/* Auto-sliding Marquee Track */}
          <div className="animate-marquee flex items-center gap-14 sm:gap-20 md:gap-24 py-2">
            {marqueeBrands.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="group flex flex-col items-center justify-center shrink-0 px-3 cursor-default transition-all duration-300 hover:scale-105"
              >
                <span className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter text-gray-400 group-hover:text-[#D4FF00] transition-colors">
                  {brand.name}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 opacity-60 group-hover:opacity-100 group-hover:text-gray-300 transition-opacity mt-1">
                  {brand.tagline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

