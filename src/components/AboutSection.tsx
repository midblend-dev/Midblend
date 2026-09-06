import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: About Details */}
          <div className="lg:col-span-7">
            <span
              id="about-label"
              className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max font-bold bg-[#050505]"
            >
              ABOUT MIDBLEND
            </span>

            <h2
              id="about-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-6 uppercase"
            >
              Redefining How Skincare Stories Reach the{' '}
              <span className="text-[#D4FF00] italic">World.</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-6">
              MIDBLEND is a premier beauty, skincare, and creator marketing agency. We bridge the gap between forward-thinking D2C cosmetics brands and a curated community of over <strong className="text-white font-bold">300+ niche creators</strong>.
            </p>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-8">
              In an industry overwhelmed by sponsored noise, our core positioning — <em className="text-white font-semibold">"WHERE CREATORS MEET BRANDS"</em> — guarantees genuine product chemistry. We ensure every campaign is anchored in real skin textures, verified routines, and tangible ROI.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4FF00] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-white mb-0.5">Authentic Community</h4>
                  <p className="text-xs text-gray-400">300+ creators passionate about genuine beauty education.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4FF00] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-white mb-0.5">D2C Conversion Focus</h4>
                  <p className="text-xs text-gray-400">Over 20M+ views generated with proven conversion funnels.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Quote / Stat Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#111111] border border-white/10 p-8 sm:p-10 shadow-2xl overflow-hidden">
              <div
                className="absolute top-0 right-0 w-32 h-32 bg-[#D4FF00]/10 blur-3xl pointer-events-none rounded-full"
                aria-hidden="true"
              />

              <span className="text-5xl font-black text-[#D4FF00] leading-none block mb-4">“</span>

              <p className="text-lg sm:text-xl text-white font-medium leading-relaxed mb-6">
                Skincare marketing isn't about arbitrary views; it's about trusted peer-to-peer recommendations that transform curious scrollers into loyal product advocates.
              </p>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-sm font-black uppercase tracking-tight text-white block">MIDBLEND Agency</span>
                  <span className="text-xs text-gray-400">Beauty & Skincare Collective</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#1b1e15] border border-[#D4FF00]/30 text-[#D4FF00] text-[10px] uppercase font-bold tracking-widest">
                  Est. 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
