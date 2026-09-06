import React from 'react';
import { Search, Layers, BarChart3, ArrowRight } from 'lucide-react';
import { WHAT_WE_DO_CARDS } from '../data/content';

interface WhatWeDoProps {
  onLearnMoreClick: () => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onLearnMoreClick }) => {
  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'search':
        return <Search className="w-5 h-5 text-[#d4ff00]" />;
      case 'layers':
        return <Layers className="w-5 h-5 text-[#d4ff00]" />;
      case 'bar-chart':
        return <BarChart3 className="w-5 h-5 text-[#d4ff00]" />;
      default:
        return <Search className="w-5 h-5 text-[#d4ff00]" />;
    }
  };

  return (
    <section id="what-we-do" className="py-24 sm:py-32 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Section Header */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            <span
              id="what-we-do-label"
              className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max font-bold bg-[#050505]"
            >
              WHAT WE DO
            </span>

            <h2
              id="what-we-do-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-6 uppercase"
            >
              Strategic Creator Collaboration That{' '}
              <span className="text-[#D4FF00] italic">Works.</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-md">
              From finding the right creators to delivering content that converts – we handle it all.
            </p>

            <button
              type="button"
              onClick={onLearnMoreClick}
              id="what-we-do-learn-more-btn"
              className="group inline-flex items-center gap-2 text-white hover:text-[#D4FF00] font-extrabold uppercase text-xs tracking-widest transition-colors"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 text-[#D4FF00] transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Right Column: 3 Bold Typography Cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {WHAT_WE_DO_CARDS.map((card) => (
              <div
                key={card.id}
                id={card.id}
                className="group relative rounded-2xl bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-[#D4FF00]/40 p-7 sm:p-8 transition-all duration-300 ease-out transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D4FF00]/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-[#D4FF00] uppercase">
                    CARD {card.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#181818] border border-white/10 flex items-center justify-center group-hover:border-[#D4FF00]/50 group-hover:bg-[#1f2214] group-hover:scale-110 transition-all duration-300">
                    {getCardIcon(card.iconName)}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 group-hover:text-[#D4FF00] transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {card.description}
                </p>

                {/* Subtle bottom accent line on hover */}
                <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4FF00]/0 to-transparent group-hover:via-[#D4FF00]/50 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
