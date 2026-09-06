import React from 'react';
import { Users, Eye, ShieldCheck } from 'lucide-react';
import { HERO_STATS } from '../data/content';

export const HeroStats: React.FC = () => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'users':
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4ff00]" />;
      case 'eye':
        return <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4ff00]" />;
      case 'shield':
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4ff00]" />;
      default:
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4ff00]" />;
    }
  };

  return (
    <section id="hero-statistics-section" className="relative z-20 -mt-6 sm:-mt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl bg-[#111111] border border-white/5 shadow-2xl shadow-black/90 p-6 sm:p-8 md:py-10 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.id}
                id={`hero-stat-card-${index + 1}`}
                className={`flex flex-col items-center text-center ${
                  index === 0
                    ? 'md:pr-8'
                    : index === 1
                    ? 'pt-6 md:pt-0 md:px-8'
                    : 'pt-6 md:pt-0 md:pl-8'
                }`}
              >
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#D4FF00] tracking-tighter leading-none mb-2">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
