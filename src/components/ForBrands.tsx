import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { BRAND_CHECKLIST } from '../data/content';

interface ForBrandsProps {
  onWorkWithUsClick: () => void;
}

export const ForBrands: React.FC<ForBrandsProps> = ({ onWorkWithUsClick }) => {
  return (
    <section id="for-brands" className="py-24 sm:py-32 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large beauty/skincare creator image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111] shadow-2xl group">
              <img
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1000&q=85"
                alt="Beauty and skincare creator with product"
                className="w-full h-[400px] sm:h-[520px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Float badge overlay on image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#111111]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4FF00] font-bold block mb-1">
                    Targeted Skincare Campaigns
                  </span>
                  <span className="text-sm font-black text-white uppercase tracking-tight">
                    Verified Creator-Brand Pairing
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-[#D4FF00]">100%</span>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-widest">Fit Metric</span>
                </div>
              </div>
            </div>

            {/* Decorative lime line accent behind image */}
            <div
              className="absolute -bottom-4 -right-4 w-40 h-40 border border-[#D4FF00]/30 rounded-2xl -z-10 hidden sm:block pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Right: Copy + Checklist */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span
              id="for-brands-label"
              className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max font-bold bg-[#050505]"
            >
              FOR BRANDS
            </span>

            <h2
              id="for-brands-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-6 uppercase"
            >
              Real Creators. Real <span className="text-[#D4FF00] italic">Results.</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
              We help D2C skincare brands scale through authentic creator partnerships.
            </p>

            {/* Checklist with thin divider lines */}
            <div
              id="brand-checklist-container"
              className="w-full rounded-2xl bg-[#111111] border border-white/10 mb-8 overflow-hidden divide-y divide-white/10"
            >
              {BRAND_CHECKLIST.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/5"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1e2313] border border-[#D4FF00]/50 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#D4FF00] stroke-[3]" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-zinc-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onWorkWithUsClick}
              id="for-brands-work-with-us-btn"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4FF00] text-black font-extrabold uppercase text-xs tracking-widest rounded-sm hover:scale-105 transition-all shadow-xl shadow-[#D4FF00]/20"
            >
              <span>Work With Us →</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
