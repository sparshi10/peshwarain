import React, { useState, useEffect } from 'react';
import { Phone, Menu as MenuIcon, X, MapPin, ShieldCheck } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface NavigationProps {
  onOpenReservation: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenReservation }) => {
  const { businessInfo, homepageContent, setCurrentView } = useRestaurant();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'OUR TABLE', href: '#feeling' },
    { label: 'WHAT TO EAT', href: '#menu' },
    { label: 'THE WORD ON WARI', href: '#reviews' },
    { label: 'FIND US', href: '#location' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Announcement Strip */}
      <div className="bg-[#B5502F] text-[#F3EBDD] text-xs sm:text-[13px] font-medium tracking-wider uppercase py-2 px-4 border-b border-[#B5502F]/40 flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-[#D9A441] animate-pulse shrink-0"></span>
          <span className="truncate">{homepageContent.announcementText}</span>
          <button 
            onClick={onOpenReservation}
            className="hidden sm:inline-flex ml-2 underline underline-offset-4 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            RESERVE SEATS →
          </button>
        </div>

        {/* Discreet Staff Portal Switcher */}
        <button
          onClick={() => setCurrentView('admin')}
          className="shrink-0 flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-black/25 hover:bg-black/40 text-white/90 font-sans normal-case tracking-normal transition-colors cursor-pointer border border-white/20"
          title="Open Staff Back-Office Admin Dashboard"
        >
          <ShieldCheck className="w-3 h-3 text-[#D9A441]" />
          <span className="hidden md:inline">Staff / Admin</span>
        </button>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#1F1611]/95 backdrop-blur-md shadow-2xl py-3 border-b border-[#F3EBDD]/10' 
            : 'bg-[#1F1611] py-4 sm:py-5 border-b border-[#F3EBDD]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a href="#" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D9A441]/60 flex items-center justify-center bg-[#281C16] text-[#D9A441] font-serif text-lg font-bold group-hover:border-[#D9A441] transition-colors">
              P
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#F3EBDD] group-hover:text-[#D9A441] transition-colors font-medium">
                {businessInfo.name.split('~')[0].trim()}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-[#D9A441] font-sans uppercase">
                <span>WARI · DHAKA</span>
                <span className="text-[#F3EBDD]/40">·</span>
                <span className="font-bangla text-[11px] text-[#F3EBDD]/80 tracking-normal normal-case">
                  {businessInfo.bengaliName}
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.18em] font-medium text-[#F3EBDD]/80 hover:text-[#D9A441] transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D9A441] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop Right CTA Phone Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${businessInfo.phone}`}
              id="nav-phone-button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9A441]/50 text-[#D9A441] hover:bg-[#D9A441] hover:text-[#1F1611] transition-all duration-200 text-xs sm:text-sm font-medium tracking-wide"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{businessInfo.displayPhone}</span>
            </a>
            <button
              onClick={onOpenReservation}
              className="px-4 py-2 rounded-full bg-[#D9A441] text-[#1F1611] hover:bg-[#c99534] transition-all duration-200 text-xs font-semibold tracking-wider uppercase cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              ASK ABOUT A TABLE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${businessInfo.phone}`}
              aria-label="Call restaurant"
              className="p-2 rounded-full border border-[#D9A441]/40 text-[#D9A441] hover:bg-[#D9A441]/10"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F3EBDD] hover:text-[#D9A441] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#18110D] border-t border-[#F3EBDD]/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm tracking-[0.15em] font-medium text-[#F3EBDD] hover:text-[#D9A441] py-2 border-b border-[#F3EBDD]/5"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('admin');
                }}
                className="text-left text-sm tracking-[0.15em] font-medium text-[#D9A441] py-2 border-b border-[#F3EBDD]/5 flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>STAFF & ADMIN BACK-OFFICE</span>
              </button>
            </div>
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`tel:${businessInfo.phone}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-md border border-[#D9A441] text-[#D9A441] text-sm font-medium tracking-wider"
              >
                <Phone className="w-4 h-4" />
                <span>Call {businessInfo.displayPhone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-md bg-[#D9A441] text-[#1F1611] text-sm font-semibold tracking-wider uppercase text-center"
              >
                Ask About a Table
              </button>
              <div className="text-center pt-2 text-xs text-[#F3EBDD]/60 flex items-center justify-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B5502F]" />
                <span>{businessInfo.address}</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

