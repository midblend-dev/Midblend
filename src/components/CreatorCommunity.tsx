import React, { useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CREATOR_HIGHLIGHTS } from '../data/content';

interface CreatorCommunityProps {
  onJoinClick: () => void;
}

export const CreatorCommunity: React.FC<CreatorCommunityProps> = ({ onJoinClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="creators" className="py-24 sm:py-32 relative bg-[#050505] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span
              id="our-creators-label"
              className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max font-bold bg-[#050505]"
            >
              OUR CREATORS
            </span>

            <h2
              id="our-creators-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-4 uppercase"
            >
              A Community of Passionate <span className="text-[#D4FF00] italic">Creators</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
              Beauty. Skincare. Lifestyle. Our creators bring stories to life that audiences trust.
              Over <strong className="text-white font-bold">300+ creators</strong> are driving authentic conversations.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Slider Controls */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                aria-label="Scroll creators left"
                className="w-10 h-10 rounded-full bg-[#111] hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Scroll creators right"
                className="w-10 h-10 rounded-full bg-[#111] hover:bg-white/10 border border-white/10 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <a
              href="/apply.html"
              onClick={(e) => {
                e.preventDefault();
                onJoinClick();
              }}
              id="join-community-cta-btn"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4FF00] text-black font-extrabold uppercase text-xs tracking-widest rounded-sm hover:scale-105 transition-all shadow-xl shadow-[#D4FF00]/20 whitespace-nowrap"
            >
              <span>Join Community →</span>
            </a>
          </div>
        </div>
      </div>

      {/* Horizontal Creator Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory focus:outline-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CREATOR_HIGHLIGHTS.map((creator) => (
            <div
              key={creator.id}
              className="snap-start flex-shrink-0 w-[270px] sm:w-[310px] rounded-2xl bg-[#111111] border border-white/10 overflow-hidden group hover:border-[#D4FF00]/40 transition-all duration-300"
            >
              {/* Creator Image Card */}
              <div className="relative h-72 sm:h-80 overflow-hidden bg-black">
                <img
                  referrerPolicy="no-referrer"
                  src={creator.image}
                  alt={creator.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full">
                  {creator.followers}
                </span>
              </div>

              {/* Creator Details */}
              <div className="p-5 pt-2">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-base font-black text-white uppercase tracking-tight group-hover:text-[#D4FF00] transition-colors">
                    {creator.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-[#D4FF00]">{creator.handle}</span>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-3">{creator.category}</p>
                <p className="text-xs text-gray-400 italic border-l-2 border-white/10 pl-2.5 line-clamp-2">
                  "{creator.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
