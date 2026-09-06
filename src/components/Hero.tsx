import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import heroSkincareImage from '../assets/images/regenerated_image_1788682325206.png';

interface HeroProps {
  onApplyClick: () => void;
  onForBrandsClick: () => void;
}

const PREFIX_TEXT = 'WHERE CREATORS MEET ';
const ROTATING_WORDS = ['NEW BRANDS', 'TOP LABS',];

export const Hero: React.FC<HeroProps> = ({ onApplyClick, onForBrandsClick }) => {
  const [displayedPrefix, setDisplayedPrefix] = React.useState('');
  const [displayedWord, setDisplayedWord] = React.useState('');
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [prefixFinished, setPrefixFinished] = React.useState(false);

  // Typewriter effect for initial prefix
  React.useEffect(() => {
    if (prefixFinished) return;

    if (displayedPrefix.length < PREFIX_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedPrefix(PREFIX_TEXT.slice(0, displayedPrefix.length + 1));
      }, 35);
      return () => clearTimeout(timeout);
    } else {
      setPrefixFinished(true);
    }
  }, [displayedPrefix, prefixFinished]);

  // Typewriter effect for dynamic accent words
  React.useEffect(() => {
    if (!prefixFinished) return;

    const currentTarget = ROTATING_WORDS[wordIndex];

    if (!isDeleting) {
      if (displayedWord.length < currentTarget.length) {
        const timeout = setTimeout(() => {
          setDisplayedWord(currentTarget.slice(0, displayedWord.length + 1));
        }, 65);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedWord.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedWord(displayedWord.slice(0, -1));
        }, 35);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
      }
    }
  }, [displayedWord, isDeleting, prefixFinished, wordIndex]);

  return (
    <section
      id="home"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#050505]"
    >
      {/* Subtle background ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#D4FF00]/5 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left">
            {/* Outlined Badge */}
            <div
              id="hero-community-badge"
              className="inline-block border border-[#D4FF00]/30 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] text-[#D4FF00] mb-6 w-max bg-[#050505]"
            >
              Beauty & Skincare Creator Community
            </div>

            {/* Main Headline with dynamic typing animation */}
            <h1
              id="hero-main-heading"
              aria-label="WHERE CREATORS MEET BRANDS"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black leading-[0.92] tracking-tighter text-white uppercase mb-6 min-h-[2.7em] sm:min-h-[2.4em] lg:min-h-[1.9em]"
            >
              <span>{displayedPrefix}</span>
              <span className="text-[#D4FF00] italic inline-block drop-shadow-[0_0_25px_rgba(212,255,0,0.3)]">
                {displayedWord}
              </span>
              <span
                aria-hidden="true"
                className="inline-block w-[3px] sm:w-[5px] md:w-[7px] h-[0.72em] bg-[#D4FF00] ml-1.5 align-baseline animate-cursor-blink shadow-[0_0_12px_#D4FF00]"
              />
            </h1>

            {/* Supporting Copy */}
            <p
              id="hero-supporting-copy"
              className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-md mb-8"
            >
              We build powerful partnerships between skincare brands and the right creators to drive real impact.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="/apply.html"
                onClick={(e) => {
                  e.preventDefault();
                  onApplyClick();
                }}
                id="hero-apply-btn"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4FF00] text-black font-extrabold uppercase text-xs tracking-widest rounded-sm hover:scale-105 transition-all shadow-xl shadow-[#D4FF00]/20 active:scale-95"
              >
                <span>Apply as Creator →</span>
              </a>

              <button
                type="button"
                onClick={onForBrandsClick}
                id="hero-for-brands-btn"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-extrabold uppercase text-xs tracking-widest rounded-sm hover:bg-white/5 transition-colors"
              >
                <span>For Brands</span>
                <ArrowDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>

            {/* Verified micro-tag */}
            <div className="mt-8 flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-wider">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  referrerPolicy="no-referrer"
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#050505] object-cover"
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=160&q=80"
                  alt="Indian Beauty Creator"
                />
                <img
                  referrerPolicy="no-referrer"
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#050505] object-cover"
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=160&q=80"
                  alt="Indian Skincare Creator"
                />
                <img
                  referrerPolicy="no-referrer"
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#050505] object-cover"
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=160&q=80"
                  alt="Indian Lifestyle Creator"
                />
              </div>
              <span className="text-[10px] tracking-widest">
                <strong className="text-white font-black text-xs">300+</strong> Niche Creators In Community
              </span>
            </div>
          </div>

          {/* Right Column: Premium Collage with Angled Cards & Bold Badge */}
          <div className="lg:col-span-6 xl:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative w-full max-w-[500px] mx-auto">
              {/* Decorative Neon Lime 4-Point Star / Spark Element */}
              <div
                className="absolute -bottom-5 -left-5 z-30 text-[#D4FF00] animate-pulse"
                aria-hidden="true"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>

              {/* Main Collage Container with Subtle Rotation */}
              <div className="relative grid grid-cols-2 gap-4 h-full p-2">
                {/* 1. Large Beauty Creator Portrait */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[320px] sm:h-[360px] transform rotate-[-2deg] flex items-end p-4 group bg-[#111] shadow-2xl transition-transform hover:rotate-0 duration-300">
                  <img
                    referrerPolicy="no-referrer"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"
                    alt="Curated beauty creator"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4FF00] block mb-1">
                      Curated Beauty
                    </span>
                    <p className="text-xs text-white font-extrabold tracking-tight">Authentic Creator Dialogue</p>
                  </div>
                </div>

                {/* Right Stack: 2 Cards */}
                <div className="flex flex-col gap-4">
                  {/* 2. UGC Focus Image */}
                  <div className="relative rounded-2xl overflow-hidden h-[150px] sm:h-[170px] transform rotate-[3deg] border border-[#D4FF00]/30 flex items-end p-4 group bg-[#161616] shadow-xl transition-transform hover:rotate-0 duration-300">
                    <img
                      referrerPolicy="no-referrer"
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=85"
                      alt="UGC Focus skincare"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-[#D4FF00]">
                      UGC
                    </span>
                  </div>

                  {/* 3. Skincare Routine */}
                  <div className="relative rounded-2xl overflow-hidden h-[150px] sm:h-[170px] border border-white/10 flex items-end p-4 group bg-[#111] shadow-xl">
                    <img
                      referrerPolicy="no-referrer"
                      src={heroSkincareImage}
                      alt="Skincare creator routine"
                      className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-white">
                      Skincare
                    </span>
                  </div>
                </div>

                {/* Circular Bold Typography Badge */}
                <div
                  id="circular-midblend-badge"
                  className="absolute -top-6 -right-6 w-24 h-24 border border-[#D4FF00] rounded-full flex items-center justify-center text-[10px] uppercase font-bold text-center leading-tight rotate-12 bg-[#050505] shadow-[0_0_20px_rgba(212,255,0,0.2)] z-30 pointer-events-none"
                >
                  <span className="text-[#D4FF00] tracking-wider font-extrabold">
                    Beauty<br />Experts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
