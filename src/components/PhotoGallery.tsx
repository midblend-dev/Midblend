import React from 'react';
import { Camera } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/content';

export const PhotoGallery: React.FC = () => {
  return (
    <section id="photo-gallery-section" className="py-24 sm:py-32 relative bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            id="gallery-label"
            className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max font-bold bg-[#050505]"
          >
            CURATED VISUALS
          </span>

          <h2
            id="gallery-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-4 uppercase"
          >
            Aesthetic Content That <span className="text-[#D4FF00] italic">Resonates</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            Real textures, natural lighting, and authentic creator moments capturing skincare innovation.
          </p>
        </div>

        {/* Masonry-Style Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {GALLERY_PHOTOS.map((photo, index) => {
            const isTall = index === 0 || index === 4 || index === 6;
            return (
              <div
                key={photo.id}
                id={`gallery-item-${photo.id}`}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] hover:border-[#D4FF00]/50 transition-colors ${
                  isTall ? 'sm:row-span-2' : ''
                }`}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={photo.image}
                  alt={photo.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    isTall ? 'h-[440px] sm:h-full min-h-[380px]' : 'h-[260px]'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Hover Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4FF00] font-bold block mb-1">
                    {photo.category}
                  </span>
                  <p className="text-sm font-black uppercase tracking-tight text-white truncate">
                    {photo.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
