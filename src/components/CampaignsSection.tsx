import React from 'react';
import { Eye, ArrowUpRight } from 'lucide-react';
import { CAMPAIGNS } from '../data/content';

interface CampaignsSectionProps {
  onContactClick: () => void;
}

export const CampaignsSection: React.FC<CampaignsSectionProps> = ({ onContactClick }) => {
  return (
    <section id="campaigns-section" className="py-24 sm:py-32 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span
              id="campaigns-label"
              className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max font-bold bg-[#050505]"
            >
              SELECTED WORK
            </span>

            <h2
              id="campaigns-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] uppercase"
            >
              CREATOR <span className="text-[#D4FF00] italic">CAMPAIGNS</span>
            </h2>
          </div>

          {/* Official Stat Pill */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#111111] border border-white/10 shadow-lg">
            <Eye className="w-4 h-4 text-[#D4FF00]" />
            <span className="text-base font-black text-[#D4FF00]">20M+</span>
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Views Generated</span>
          </div>
        </div>

        {/* Campaign Cards Poster Grid */}
        <div
          className={
            CAMPAIGNS.length === 1
              ? 'max-w-4xl mx-auto w-full'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          }
        >
          {CAMPAIGNS.map((camp, idx) => (
            <div
              key={camp.id}
              id={`campaign-card-${camp.id}`}
              className={`group relative rounded-2xl overflow-hidden bg-[#111111] border border-white/10 hover:border-[#D4FF00]/50 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#D4FF00]/5 ${
                CAMPAIGNS.length > 1 && idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Image Preview Container */}
              <div
                className={`relative overflow-hidden ${
                  CAMPAIGNS.length === 1
                    ? 'h-[320px] sm:h-[400px]'
                    : idx === 0
                    ? 'h-[300px] sm:h-[380px]'
                    : 'h-[240px] sm:h-[280px]'
                }`}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={camp.image}
                  alt={`${camp.brand} - ${camp.title}`}
                  onError={(e) => {
                    if (camp.fallbackImage && e.currentTarget.src !== camp.fallbackImage) {
                      e.currentTarget.src = camp.fallbackImage;
                    }
                  }}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/30 to-transparent" />

                {/* Brand Tag Top Left */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/80 backdrop-blur-md border border-white/10 text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg">
                    {camp.brand}
                  </span>
                </div>

                {/* Official View Badge Top Right */}
                <div className="absolute top-4 right-4">
                  <span className="bg-[#D4FF00] text-black font-extrabold uppercase text-[10px] tracking-widest px-2.5 py-1 rounded shadow-md">
                    20M+ Views
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4FF00] font-bold block mb-1.5">
                    {camp.category}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase group-hover:text-[#D4FF00] transition-colors mb-3">
                    {camp.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {camp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Verified Creator Partnership</span>
                  <button
                    type="button"
                    onClick={onContactClick}
                    className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-white group-hover:text-[#D4FF00] transition-colors"
                  >
                    <span>Launch Campaign</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
