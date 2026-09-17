import React from 'react';
import { GlassWater, Sparkles, CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import pinkLacchiGlass from '../assets/images/pink_lacchi_glass_1788413503233.jpg';

export const DrinksSection: React.FC = () => {
  const { homepageContent } = useRestaurant();
  const { drinkFeature } = homepageContent;

  return (
    <section className="bg-[#B5502F] text-[#F3EBDD] py-20 sm:py-28 relative overflow-hidden">
      {/* Decorative background circle patterns */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-black/10 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-[#D9A441]/10 blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual: Pink Lassi with Condensation and Kebabs background */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer border & image shadow */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#F3EBDD]/20 shadow-2xl aspect-[4/3] bg-[#281C16]">
                <img
                  src={drinkFeature.imageUrl || pinkLacchiGlass}
                  alt="Special Pink Lacchi in frosted glass with pistachios and kebabs at PeshWarain Wari"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Floating pill badge */}
                <div className="absolute top-4 left-4 bg-[#1F1611]/85 backdrop-blur-xs text-[#F3EBDD] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#D9A441]/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-ping"></span>
                  <span>Hand Churned Daily</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#F3EBDD]/90">
                  <span className="font-serif italic text-sm">{drinkFeature.headline}</span>
                  <span className="font-bold text-[#D9A441] bg-[#1F1611]/80 px-2.5 py-1 rounded">৳{drinkFeature.price}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D9A441] font-bold mb-4">
              <GlassWater className="w-4 h-4 text-[#D9A441]" />
              <span>THE TABLE'S COOL SIDE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F3EBDD] font-normal tracking-tight leading-[1.15] mb-6">
              Always order the <span className="italic font-serif text-[#D9A441]">lacchi</span>.
            </h2>

            <p className="text-lg sm:text-xl text-[#F3EBDD]/90 font-serif leading-relaxed mb-8">
              {drinkFeature.body}
            </p>

            {/* Structured Info Rows */}
            <div className="space-y-3 pt-4 border-t border-[#F3EBDD]/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-[#F3EBDD]/15 text-xs sm:text-sm">
                <span className="font-bold tracking-widest uppercase text-[#D9A441]">SPECIAL LASSI</span>
                <span className="text-[#F3EBDD] font-semibold text-base">৳{drinkFeature.price}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-[#F3EBDD]/15 text-xs sm:text-sm">
                <span className="font-bold tracking-widest uppercase text-[#D9A441]">BEST WITH</span>
                <span className="text-[#F3EBDD]">Seekh Kebab & Tandoori Naan</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 text-xs sm:text-sm">
                <span className="font-bold tracking-widest uppercase text-[#D9A441]">VISITOR NOTE</span>
                <span className="text-[#F3EBDD] italic">“Must try item — best lassi in Old Dhaka”</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-[#F3EBDD]/80">
              <CheckCircle2 className="w-4 h-4 text-[#D9A441]" />
              <span>Served in chilled frosted glassware with shaved pistachios and saffron</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
