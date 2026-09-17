import React from 'react';
import { Clock, Users, Banknote, Quote } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const FeelingSection: React.FC = () => {
  const { homepageContent, businessInfo } = useRestaurant();

  const stats = [
    {
      value: businessInfo.typicalSpend || '৳400–600',
      label: 'TYPICAL SPEND',
      detail: 'Rich, hearty dinners made accessible'
    },
    {
      value: 'Wed–Sat',
      label: 'DAYS ACTIVE',
      detail: businessInfo.hoursDetail || 'Opens 5 PM on Wednesday'
    },
    {
      value: `${businessInfo.serviceOptions?.join(' · ') || 'Dine-in · Takeaway'}`,
      label: 'SERVICE MODELS',
      detail: 'Warm table service or packaged fresh'
    }
  ];

  return (
    <section id="feeling" className="bg-[#F3EBDD] text-[#1F1611] py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#B5502F] font-semibold mb-4">
            01 — THE FEELING
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F1611] font-normal tracking-tight leading-[1.15]">
            {homepageContent.feelingHeadline}
          </h2>
        </div>

        {/* Narrative & Side Note Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 border-b border-[#1F1611]/15">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7">
            <p className="text-xl sm:text-2xl text-[#1F1611]/90 font-serif leading-relaxed mb-6 font-normal">
              In the middle of Wari, <strong className="font-semibold text-[#1F1611]">{businessInfo.name}</strong> keeps the good things uncomplicated: food with patience, portions with generosity, and a seat you can settle into.
            </p>
            <p className="text-[#1F1611]/75 text-base sm:text-lg leading-relaxed mb-6 whitespace-pre-line">
              {homepageContent.feelingBodyCopy}
            </p>
            <div className="flex items-center gap-3 pt-2 text-sm text-[#1F1611]/80 font-medium">
              <span className="w-8 h-[1px] bg-[#B5502F]"></span>
              <span>Rooted in Old Dhaka hospitality · Honest Pakistani recipes</span>
            </div>
          </div>

          {/* Editorial Side Note Card */}
          <div className="lg:col-span-5 bg-[#FAF7F0] p-8 sm:p-10 rounded-2xl border border-[#1F1611]/10 shadow-sm relative">
            <Quote className="w-8 h-8 text-[#D9A441] mb-4 opacity-70" />
            <blockquote className="space-y-4">
              <p className="text-base sm:text-lg text-[#1F1611] font-serif italic leading-relaxed">
                “{homepageContent.feelingSideQuote}”
              </p>
              <p className="text-sm sm:text-base text-[#1F1611]/80 font-sans leading-relaxed pt-2 border-t border-[#1F1611]/10">
                Come hungry. Leave with the warm, sleepy satisfaction of having found a place you will bring someone else to next time.
              </p>
            </blockquote>
            <div className="mt-6 pt-4 flex items-center justify-between text-xs tracking-wider uppercase text-[#B5502F] font-semibold border-t border-[#1F1611]/10">
              <span>— The Wari Welcome</span>
              <span className="font-bangla text-[#1F1611]/70 font-normal">{businessInfo.bengaliName}</span>
            </div>
          </div>
        </div>

        {/* Three-Column Stat Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          {stats.map((stat, index) => {
            const icons = [
              <Banknote key="0" className="w-5 h-5 text-[#B5502F]" />,
              <Clock key="1" className="w-5 h-5 text-[#B5502F]" />,
              <Users key="2" className="w-5 h-5 text-[#B5502F]" />
            ];

            return (
              <div 
                key={stat.label}
                className="flex flex-col p-6 rounded-xl bg-white/60 border border-[#1F1611]/10 hover:border-[#B5502F]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase tracking-widest text-[#B5502F] font-semibold">
                    0{index + 1}
                  </span>
                  {icons[index]}
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1611] mb-1 truncate">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#B5502F] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[#1F1611]/70">
                  {stat.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

