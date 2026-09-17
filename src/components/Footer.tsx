import React from 'react';
import { Phone, MapPin, Heart, MessageSquare, ShieldCheck } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const { businessInfo, setCurrentView } = useRestaurant();

  return (
    <footer className="bg-[#140E0A] text-[#F3EBDD] border-t border-[#F3EBDD]/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F3EBDD]/10 items-start">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D9A441] flex items-center justify-center bg-[#1F1611] text-[#D9A441] font-serif text-xl font-bold">
                P
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#F3EBDD]">
                  {businessInfo.name}
                </h3>
                <p className="font-bangla text-base text-[#D9A441]">
                  {businessInfo.bengaliName}
                </p>
              </div>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-[#D9A441] font-semibold">
              PAKISTANI FOOD · DHAKA
            </p>

            <p className="text-sm text-[#F3EBDD]/70 max-w-md font-sans leading-relaxed">
              Serving slow-cooked Nalli Nihari, tandoori grills, and authentic Pakistani hospitality off Rankin Street in Wari. Generous desi food crafted without shortcuts.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D9A441] font-semibold">
              EXPLORE THE TABLE
            </h4>
            <ul className="space-y-2 text-xs tracking-widest uppercase text-[#F3EBDD]/80">
              <li>
                <a href="#feeling" className="hover:text-[#D9A441] transition-colors">
                  OUR TABLE (THE FEELING)
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D9A441] transition-colors">
                  MENU (WHAT TO EAT)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D9A441] transition-colors">
                  THE WORD ON WARI (REVIEWS)
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#D9A441] transition-colors">
                  VISIT US (DIRECTIONS)
                </a>
              </li>
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#D9A441] transition-colors"
                >
                  FACEBOOK
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[11px] text-[#D9A441]/80 hover:text-[#D9A441] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff & Owner Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Footer CTA Column */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D9A441] font-semibold">
              JOIN US TONIGHT
            </h4>
            <p className="text-xs text-[#F3EBDD]/70 leading-relaxed">
              {businessInfo.hoursDetail || 'Open 5 PM on Wednesday. Walk in or let us know you are coming so your naan is pulled hot.'}
            </p>
            <button
              onClick={onOpenReservation}
              id="footer-ask-table-button"
              className="w-full py-3 px-5 rounded-full bg-[#D9A441] text-[#1F1611] text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors cursor-pointer text-center"
            >
              ASK ABOUT A TABLE
            </button>
            <a
              href={`tel:${businessInfo.phone}`}
              className="w-full py-3 px-5 rounded-full border border-[#D9A441]/60 text-[#D9A441] text-xs font-bold tracking-widest uppercase hover:bg-[#D9A441]/10 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{businessInfo.displayPhone}</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal / Neighborhood Homage Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F3EBDD]/50 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {businessInfo.name} ({businessInfo.bengaliName}).</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with warmth for</span>
            <span className="text-[#D9A441]">Wari, Dhaka 1203</span>
            <Heart className="w-3.5 h-3.5 text-[#B5502F] fill-[#B5502F] ml-1 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
