import React from 'react';
import { motion } from 'motion/react';
import { CREATOR_CATEGORIES } from '../data/content';

export const CreatorCategories: React.FC = () => {
  return (
    <section id="creator-categories-section" className="py-24 sm:py-32 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span
            id="categories-label"
            className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max font-bold bg-[#050505]"
          >
            CREATOR NICHES
          </span>

          <h2
            id="categories-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-4 uppercase"
          >
            Diverse Beauty & Lifestyle <span className="text-[#D4FF00] italic">Specializations</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            We curate top-tier creators across specialized verticals to guarantee message relevance.
          </p>
        </motion.div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CREATOR_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              id={`category-card-${cat.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{ y: -6 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group relative rounded-2xl overflow-hidden bg-[#111111] border border-white/10 hover:border-[#D4FF00]/60 transition-colors duration-500 shadow-xl hover:shadow-[#D4FF00]/10"
            >
              {/* Visual Card Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-900">
                <img
                  referrerPolicy="no-referrer"
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-black/80 backdrop-blur-md text-[#D4FF00] px-3 py-1 rounded-full border border-[#D4FF00]/30">
                    {cat.creatorCount}
                  </span>
                </div>

                {/* Bottom Content within Image Overlay */}
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#D4FF00] group-hover:scale-150 transition-transform" />
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#D4FF00] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Bottom decorative lime strip */}
              <div className="h-1 w-full bg-transparent group-hover:bg-[#D4FF00] transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
