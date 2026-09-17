import React from 'react';
import { Star, ArrowDown, Utensils, MessageSquare } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import copperNihariPot from '../assets/images/copper_nihari_pot_1788413488230.jpg';

interface HeroSectionProps {
  onOpenReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenReservation }) => {
  const { businessInfo, homepageContent } = useRestaurant();

  const tickerItems = [
    'NIHARI',
    'KEBABS',
    'LACCHI',
    'NAAN',
    'A WARM TABLE IN WARI',
    'DINE IN + TAKEAWAY',
    'SLOW-COOKED SHANK',
    'CHARCOAL SIZZLE',
    'SHAHI MAKKHANWALA'
  ];

  return (
    <section className="relative bg-[#1F1611] text-[#F3EBDD] overflow-hidden pt-8 sm:pt-14 pb-0">
      {/* Decorative ambient lighting glow in background */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#B5502F]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#D9A441]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative Copy & Call-To-Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Small letter-spaced label */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold mb-5">
              <span className="w-6 h-[1px] bg-[#D9A441]"></span>
              <span>{homepageContent.heroLabel}</span>
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.12] text-[#F3EBDD] font-normal tracking-tight mb-6">
              {homepageContent.heroHeadlinePlain}{' '}
              <span className="italic text-[#D9A441] font-normal font-serif">
                {homepageContent.heroHeadlineHighlight}
              </span>
              .
              <br />
              Stay for the stories.
            </h1>

            {/* Subtext */}
            <p className="text-[#F3EBDD]/80 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8 font-sans">
              {homepageContent.heroSubtext}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#menu"
                id="hero-see-cooking-button"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#D9A441] text-[#1F1611] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase hover:bg-[#ebbb59] hover:shadow-lg transition-all duration-200 text-center hover:scale-[1.02]"
              >
                <Utensils className="w-4 h-4" />
                <span>SEE WHAT'S COOKING</span>
              </a>

              <button
                onClick={onOpenReservation}
                id="hero-ask-table-button"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#D9A441]/80 text-[#F3EBDD] font-semibold text-xs sm:text-sm tracking-[0.16em] uppercase hover:bg-[#D9A441]/10 hover:border-[#D9A441] transition-all duration-200 text-center cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#D9A441]" />
                <span>ASK ABOUT A TABLE</span>
              </button>
            </div>

            {/* Rating Strip */}
            <div className="pt-6 border-t border-[#F3EBDD]/15 flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-3">
                <span className="font-serif text-3xl font-bold text-[#F3EBDD] tracking-tight">
                  {businessInfo.rating}
                </span>
                <div className="flex flex-col">
                  <div className="flex items-center text-[#D9A441]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(businessInfo.rating) ? 'fill-[#D9A441]' : 'fill-[#D9A441]/40'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#F3EBDD]/70 tracking-wide mt-0.5">
                    {businessInfo.reviewCount.toLocaleString()} Google reviews
                  </span>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-[1px] bg-[#F3EBDD]/20"></div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-[#F3EBDD]/90 bg-[#281C16]/80 px-3.5 py-1.5 rounded-full border border-[#D9A441]/20">
                <span className="text-[#D9A441] font-semibold">“</span>
                <span className="italic">Best Lacchi — Must try item</span>
                <span className="text-[#D9A441] font-semibold">”</span>
                <span className="text-[11px] text-[#F3EBDD]/50 ml-1">· Verified diner</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Circular Badge Overlay */}
          <div className="lg:col-span-5 relative flex justify-center mt-4 lg:mt-0">
            <div className="relative w-full max-w-[440px] sm:max-w-[480px]">
              {/* Outer soft shadow frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#D9A441]/30 shadow-2xl bg-[#281C16] aspect-[4/3] sm:aspect-square">
                <img
                  src={homepageContent.heroImageUrl || copperNihariPot}
                  alt="Traditional Pakistani Nalli Nihari slow-cooked in a rustic hammered copper pot at PeshWarain Wari"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1611]/80 via-transparent to-transparent"></div>

                {/* Subtle caption */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#F3EBDD]/80">
                  <span className="font-serif italic text-sm text-[#F3EBDD]">The Nalli Nihari handi</span>
                  <span className="tracking-wider uppercase text-[11px] text-[#D9A441] bg-[#1F1611]/80 px-2.5 py-1 rounded">Simmered Overnight</span>
                </div>
              </div>

              {/* Circular Badge Callout Overlay ("SLOW & SOULFUL IN WARI") */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-7 sm:-left-6 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#B5502F] text-[#F3EBDD] p-2 flex flex-col items-center justify-center text-center shadow-xl border-2 border-[#D9A441] transform hover:rotate-6 transition-transform duration-300 select-none">
                <div className="w-full h-full rounded-full border border-dashed border-[#F3EBDD]/40 flex flex-col items-center justify-center p-1">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-semibold uppercase text-[#D9A441]">ESTD WARI</span>
                  <span className="font-serif text-xs sm:text-sm font-bold uppercase leading-tight my-0.5 tracking-wide text-white">
                    SLOW &<br />SOULFUL
                  </span>
                  <span className="text-[9px] tracking-[0.16em] uppercase text-[#F3EBDD]/80">IN WARI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="flex justify-center mt-12 mb-6">
        <a 
          href="#feeling" 
          aria-label="Scroll to The Feeling"
          className="text-[#D9A441] hover:text-white transition-colors flex flex-col items-center gap-1 opacity-70 hover:opacity-100"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>

      {/* Thin Scrolling Ticker Line Beneath Hero (Rust Background #B5502F) */}
      <div className="w-full bg-[#B5502F] text-[#F3EBDD] py-3 overflow-hidden border-y border-[#B5502F]/60">
        <div className="animate-marquee flex items-center whitespace-nowrap text-xs sm:text-sm tracking-[0.22em] font-medium uppercase">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="flex items-center">
              <span className="mx-4">{item}</span>
              <span className="text-[#D9A441] text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
