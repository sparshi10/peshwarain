import React from 'react';
import { Star, Quote, CheckCircle, MessageCircle } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, testimonials, businessInfo } = useRestaurant();
  const allReviews = reviews || testimonials || [];

  // Show reviews marked as featured, or first 3
  const featuredReviews = allReviews.filter(t => t?.isFeatured);
  const displayReviews = featuredReviews.length > 0 ? featuredReviews : allReviews.slice(0, 3);

  return (
    <section id="reviews" className="bg-[#F3EBDD] text-[#1F1611] py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Overall Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#B5502F] font-semibold mb-3">
              03 — THE WORD ON WARI
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F1611] font-normal tracking-tight leading-[1.15]">
              Heard around <span className="italic font-serif text-[#B5502F]">the table</span>.
            </h2>
            <p className="mt-4 text-[#1F1611]/75 text-base sm:text-lg max-w-xl">
              From family dinners to late evening food runs across Old Dhaka, here is what guests leave with.
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="bg-white/80 p-5 rounded-2xl border border-[#1F1611]/10 flex items-center gap-5 shadow-xs shrink-0">
            <div className="text-center pr-5 border-r border-[#1F1611]/10">
              <span className="font-serif text-4xl font-bold text-[#1F1611]">
                {businessInfo.rating}
              </span>
              <div className="flex items-center text-[#D9A441] mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(businessInfo.rating) ? 'fill-[#D9A441]' : 'fill-[#D9A441]/40'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-[#B5502F] font-semibold block">
                OVERALL RATING
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#1F1611] block mt-0.5">
                {businessInfo.reviewCount.toLocaleString()} Verified Reviews
              </span>
              <span className="text-[11px] text-[#1F1611]/60">Google Maps Verified Place</span>
            </div>
          </div>
        </div>

        {/* Three Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayReviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[#1F1611]/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#D9A441]">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D9A441]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#1F1611]/20 group-hover:text-[#B5502F] transition-colors" />
                </div>

                <p className="font-serif text-lg sm:text-xl text-[#1F1611] leading-relaxed mb-6 italic">
                  “{testimonial.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F1611]/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#1F1611] flex items-center gap-1.5">
                      <span>{testimonial.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-[#B5502F]" />
                    </h4>
                    <span className="text-xs text-[#1F1611]/60">{testimonial.role}</span>
                  </div>
                  {testimonial.itemMentioned && (
                    <span className="text-[11px] bg-[#FAF5ED] border border-[#1F1611]/10 px-2.5 py-1 rounded-full text-[#B5502F] font-medium">
                      {testimonial.itemMentioned}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps link callout */}
        <div className="mt-12 text-center">
          <a
            href={businessInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold text-[#B5502F] hover:text-[#1F1611] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Read all {businessInfo.reviewCount.toLocaleString()} stories on Google Maps →</span>
          </a>
        </div>
      </div>
    </section>
  );
};
