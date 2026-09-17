import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Copy, Check, Calendar } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const LocationSection: React.FC = () => {
  const { businessInfo } = useRestaurant();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(businessInfo.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="bg-[#1E3A34] text-[#F3EBDD] py-20 sm:py-28 relative overflow-hidden">
      {/* Decorative ambient lighting glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Details, Hours, Address */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-[0.25em] text-[#D9A441] font-semibold mb-3">
              WARI · DHAKA
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F3EBDD] font-normal tracking-tight leading-[1.15] mb-6">
              Find your way to <span className="italic font-serif text-[#D9A441]">the good table</span>.
            </h2>

            <p className="text-[#F3EBDD]/80 text-base sm:text-lg leading-relaxed mb-8">
              Right in Wari, ready when the evening appetite arrives. Call ahead, walk in, or take a little piece home.
            </p>

            {/* Load-bearing Business Info Rows */}
            <div className="space-y-4 mb-8">
              {/* Address */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#D9A441] shrink-0 mt-1" />
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9A441] font-bold block mb-1">
                      ADDRESS
                    </span>
                    <span className="text-base sm:text-lg font-medium text-[#F3EBDD] block">
                      {businessInfo.address}
                    </span>
                    <span className="text-xs text-[#F3EBDD]/60 mt-0.5 block">
                      Off Rankin Street · Wari, Old Dhaka
                    </span>
                  </div>
                </div>

                <button
                  onClick={copyAddress}
                  aria-label="Copy address"
                  className="p-2 rounded-lg bg-white/10 hover:bg-[#D9A441] hover:text-[#1F1611] transition-colors text-xs text-[#F3EBDD] flex items-center gap-1.5 shrink-0"
                  title="Copy address"
                >
                  {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <Phone className="w-5 h-5 text-[#D9A441] shrink-0" />
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9A441] font-bold block mb-0.5">
                      PHONE
                    </span>
                    <span className="text-base sm:text-lg font-medium text-[#F3EBDD]">
                      {businessInfo.displayPhone}
                    </span>
                  </div>
                </div>
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="text-xs text-[#D9A441] hover:underline uppercase tracking-wider font-semibold"
                >
                  Call Now →
                </a>
              </div>

              {/* Hours with Schedule Breakdown */}
              <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#D9A441] shrink-0 mt-1" />
                <div className="flex-1">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#D9A441] font-bold block mb-1">
                    OPERATING HOURS
                  </span>
                  <span className="text-base font-semibold text-[#F3EBDD] block">
                    {businessInfo.hoursDetail || businessInfo.hours}
                  </span>
                  <div className="mt-2 text-xs text-[#F3EBDD]/75 space-y-1">
                    <div className="font-mono text-[11px] text-[#D9A441]">
                      Weekly Kitchen Times:
                    </div>
                    {(businessInfo.hoursSchedule || []).map(d => (
                      <div key={d.day} className="flex items-center justify-between text-[11px] py-0.5 border-b border-white/5">
                        <span className={d.isOpen ? 'text-[#F3EBDD]' : 'text-[#F3EBDD]/40'}>{d.day}</span>
                        <span className={d.isOpen ? 'text-[#D9A441]' : 'text-[#F3EBDD]/40 italic'}>
                          {d.isOpen ? `${d.openTime} – ${d.closeTime}` : 'Closed'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-[#F3EBDD]/70 mt-2 block">
                    Service options: {(businessInfo.serviceOptions || []).join(' · ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={businessInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="location-get-directions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#D9A441] text-[#1F1611] font-bold text-xs sm:text-sm tracking-[0.16em] uppercase hover:bg-white hover:text-[#1F1611] transition-all duration-200 text-center shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${businessInfo.phone}`}
                id="location-call-now"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#F3EBDD]/50 text-[#F3EBDD] font-bold text-xs sm:text-sm tracking-[0.16em] uppercase hover:bg-white/10 hover:border-[#D9A441] transition-all duration-200 text-center"
              >
                <Phone className="w-4 h-4 text-[#D9A441]" />
                <span>CALL NOW</span>
              </a>
            </div>
          </div>


          {/* Right Column: Stylized Custom Map Graphic */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D9A441]/40 shadow-2xl bg-[#F1ECE3] p-6 sm:p-8 bg-topo-pattern text-[#1F1611]">
              {/* Map header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1F1611]/10 mb-6">
                <div>
                  <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#B5502F]">
                    WARI LOCAL STREET MAP
                  </span>
                  <div className="font-serif text-lg font-bold text-[#1F1611]">
                    Dhaka 1203 Sector Map
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded bg-[#1E3A34] text-[#D9A441] text-[10px] font-bold tracking-widest uppercase">
                  OPEN 5 PM
                </div>
              </div>

              {/* Graphic Illustration of the Streets & Landmarks */}
              <div className="relative h-72 sm:h-80 w-full rounded-xl border border-[#1F1611]/15 bg-[#E8E2D5] overflow-hidden p-4">
                {/* Stylized Street Lines */}
                <svg className="absolute inset-0 w-full h-full stroke-[#1F1611]/25" fill="none">
                  {/* Rankin Street */}
                  <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="18" className="stroke-[#DDD5C5]" />
                  <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="1.5" strokeDasharray="6 6" className="stroke-[#B5502F]/40" />
                  
                  {/* Cross Streets */}
                  <line x1="32%" y1="0" x2="32%" y2="100%" strokeWidth="12" className="stroke-[#DDD5C5]" />
                  <line x1="72%" y1="0" x2="72%" y2="100%" strokeWidth="14" className="stroke-[#DDD5C5]" />

                  {/* Connecting Alleys */}
                  <path d="M 0,20 Q 150,80 300,40 T 600,100" strokeWidth="6" className="stroke-[#DDD5C5]" />
                </svg>

                {/* Street Names Labels */}
                <div className="absolute top-[42%] left-4 text-[11px] font-bold tracking-wider text-[#1F1611]/80 uppercase bg-[#F1ECE3]/90 px-2 py-0.5 rounded shadow-xs">
                  Rankin Street
                </div>

                <div className="absolute top-4 left-[34%] text-[10px] tracking-wider text-[#1F1611]/60 uppercase bg-[#F1ECE3]/80 px-1.5 py-0.5 rounded">
                  Hare Road →
                </div>

                <div className="absolute bottom-4 right-6 text-[10px] tracking-wider text-[#1F1611]/60 uppercase bg-[#F1ECE3]/80 px-1.5 py-0.5 rounded">
                  ← Baldha Garden
                </div>

                {/* Nearby landmark marker */}
                <div className="absolute top-10 right-10 text-center opacity-80 pointer-events-none">
                  <span className="text-[10px] font-medium text-[#1F1611]/60 bg-white/70 px-2 py-0.5 rounded-full">
                    Wari Community Center
                  </span>
                </div>

                {/* Single Pin Marker (PeshWarain ~ Wari) */}
                <div className="absolute top-[48%] left-[52%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="relative group cursor-pointer">
                    {/* Pulsing ring */}
                    <div className="absolute -inset-2 rounded-full bg-[#B5502F]/30 animate-ping"></div>

                    {/* Pin button */}
                    <div className="relative w-11 h-11 rounded-full bg-[#1F1611] border-2 border-[#D9A441] flex items-center justify-center text-[#D9A441] shadow-xl hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 fill-[#D9A441] text-[#1F1611]" />
                    </div>
                  </div>

                  {/* Marker Card Box */}
                  <div className="mt-2 bg-[#1F1611] text-[#F3EBDD] p-3 rounded-lg shadow-xl border border-[#D9A441] text-center min-w-[210px] animate-bounce-short">
                    <div className="font-serif font-bold text-sm text-[#F3EBDD]">
                      {businessInfo.name}
                    </div>
                    <div className="text-[11px] text-[#D9A441] font-medium mt-0.5">
                      {businessInfo.address}
                    </div>
                    <div className="mt-1.5 pt-1.5 border-t border-[#F3EBDD]/15 flex items-center justify-center gap-1 text-[10px] text-[#F3EBDD]/80">
                      <span>Rating {businessInfo.rating}</span>
                      <span>★</span>
                      <span>({businessInfo.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Footer Action link */}
              <div className="mt-5 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#1F1611]/70">
                  Tap to launch full GPS turn-by-turn navigation on your device
                </span>
                <a
                  href={businessInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#B5502F] hover:underline uppercase tracking-wider shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
