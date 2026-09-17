import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Flame, HeartHandshake, Phone, AlertCircle } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuCategory, MenuItem } from '../types';

interface MenuSectionProps {
  onOpenReservation: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onOpenReservation }) => {
  const { menuItems, businessInfo } = useRestaurant();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('EVERYTHING');
  const [selectedPlate, setSelectedPlate] = useState<MenuItem | null>(null);
  const [showFullSpreadModal, setShowFullSpreadModal] = useState(false);

  const categories: MenuCategory[] = [
    'EVERYTHING',
    'TANDOOR',
    'FROM THE HANDI',
    'COLD THINGS',
    'OVER CHARCOAL'
  ];

  // Only display visible items (visibility toggle from admin)
  const safeMenuItems = menuItems || [];
  const availableItems = safeMenuItems.filter(item => item && item.isVisible !== false && item.isAvailable !== false);

  const filteredItems = selectedCategory === 'EVERYTHING'
    ? availableItems
    : availableItems.filter((item) => Array.isArray(item.category) && item.category.includes(selectedCategory));

  return (
    <section id="menu" className="bg-[#FAF5ED] text-[#1F1611] py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-[#B5502F] font-semibold mb-3">
              02 — THE ORDER
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1F1611] font-normal tracking-tight leading-[1.15]">
              Start with <span className="italic font-serif text-[#D9A441]">something slow</span>.
            </h2>
            <p className="mt-4 text-[#1F1611]/75 text-base sm:text-lg">
              A short list of the dishes people come back for. Tap any plate to get the full thought behind it.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#1F1611]/60">
            <Sparkles className="w-4 h-4 text-[#D9A441]" />
            <span>Freshly Ground Masalas · No Shortcuts</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-[0.16em] uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1F1611] text-[#F3EBDD] shadow-sm'
                    : 'bg-white/80 text-[#1F1611]/70 hover:text-[#1F1611] hover:bg-white border border-[#1F1611]/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPlate(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedPlate(item)}
              className={`group bg-white rounded-xl p-4 sm:p-5 border shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-4 text-left ${
                item.isSoldOut
                  ? 'border-gray-200 opacity-75'
                  : 'border-[#1F1611]/10 hover:border-[#D9A441]'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-[#281C16]">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                    item.isSoldOut ? 'grayscale-40' : ''
                  }`}
                  referrerPolicy="no-referrer"
                />
                {item.isSignature && !item.isSoldOut && (
                  <span className="absolute top-1 left-1 bg-[#B5502F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                    Signature
                  </span>
                )}
                {item.isSoldOut && (
                  <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-wider text-center p-1">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Text info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#1F1611] group-hover:text-[#B5502F] transition-colors truncate">
                      {item.name}
                    </h3>
                    {item.bengaliName && (
                      <span className="hidden sm:inline font-bangla text-xs text-[#1F1611]/50">
                        {item.bengaliName}
                      </span>
                    )}
                  </div>
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#B5502F] shrink-0">
                    ৳{item.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#1F1611]/70 line-clamp-2 leading-relaxed mb-2 font-sans">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2 text-[#D9A441] font-medium tracking-wide">
                    <span>Tap for backstory</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  {item.isSoldOut && (
                    <span className="text-rose-600 font-semibold text-[10px] uppercase tracking-wider">
                      Sold out tonight
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Bottom Link: Browse The Whole Spread */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 rounded-2xl bg-[#1F1611] text-[#F3EBDD] gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#D9A441] font-semibold block mb-1">
              FULL TABLE EXPERIENCE
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-[#F3EBDD]">
              Looking for something specific or group platters?
            </h4>
            <p className="text-xs sm:text-sm text-[#F3EBDD]/70 mt-1 max-w-xl">
              From stuffed mushrooms and thali dinners to special family nihari pots, our kitchen accommodates special gatherings.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowFullSpreadModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9A441] text-[#1F1611] text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer"
            >
              <span>BROWSE THE WHOLE SPREAD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Plate Detail Modal: "The thought behind it" */}
      {selectedPlate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedPlate(null)}
        >
          <div 
            className="bg-[#FAF5ED] text-[#1F1611] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D9A441]/40 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-56 sm:h-64 w-full bg-[#1F1611]">
              <img
                src={selectedPlate.image}
                alt={selectedPlate.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5ED] via-black/30 to-transparent"></div>
              
              <button
                onClick={() => setSelectedPlate(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1F1611]/80 text-[#F3EBDD] flex items-center justify-center hover:bg-[#B5502F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#B5502F] font-bold bg-white/90 px-2.5 py-0.5 rounded">
                    {selectedPlate.category.join(' · ')}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F1611] mt-1">
                    {selectedPlate.name}
                  </h3>
                </div>
                <span className="font-serif text-2xl font-bold text-[#B5502F]">
                  ৳{selectedPlate.price}
                </span>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B5502F] mb-2">
                  THE THOUGHT BEHIND IT
                </h4>
                <p className="font-serif italic text-base sm:text-lg text-[#1F1611]/90 leading-relaxed">
                  "{selectedPlate.fullThought || selectedPlate.description}"
                </p>
              </div>

              {/* Pairing Note */}
              {selectedPlate.accompaniment && (
                <div className="bg-[#1F1611]/5 p-4 rounded-xl border border-[#1F1611]/10 flex items-start gap-3 text-xs sm:text-sm">
                  <Flame className="w-5 h-5 text-[#B5502F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-[#1F1611]">Best Accompaniment: </strong>
                    <span className="text-[#1F1611]/80">{selectedPlate.accompaniment}</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedPlate(null);
                    onOpenReservation();
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#1F1611] text-[#F3EBDD] text-xs font-semibold tracking-wider uppercase hover:bg-[#B5502F] transition-colors text-center cursor-pointer"
                >
                  Reserve For Dinner
                </button>
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="py-3 px-5 rounded-full border border-[#1F1611]/30 text-[#1F1611] text-xs font-semibold tracking-wider uppercase hover:border-[#B5502F] hover:text-[#B5502F] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Kitchen</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Spread Modal */}
      {showFullSpreadModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowFullSpreadModal(false)}
        >
          <div 
            className="bg-[#FAF5ED] text-[#1F1611] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#D9A441]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#1F1611]/15 mb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#B5502F] font-semibold">
                  WARI TABLE SPREAD
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1F1611]">
                  PeshWarain Complete Offerings
                </h3>
              </div>
              <button
                onClick={() => setShowFullSpreadModal(false)}
                className="p-2 text-[#1F1611] hover:text-[#B5502F]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-serif text-lg font-semibold text-[#B5502F] border-b border-[#B5502F]/20 pb-1 mb-3">
                  Handi & Slow Pots (হাঁড়ি)
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Nalli Nihari (Overnight Marrow Shank)</span>
                      <p className="text-xs text-[#1F1611]/70">With ginger julienne, lime, and chilies</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳520</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Butter Chicken Makhani</span>
                      <p className="text-xs text-[#1F1611]/70">Silky tomato makhani with charred chicken</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳480</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Murgh Makkhanwala</span>
                      <p className="text-xs text-[#1F1611]/70">Roasted masala with fresh butter sheen</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳470</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-semibold text-[#B5502F] border-b border-[#B5502F]/20 pb-1 mb-3">
                  Over Charcoal & Tandoor (কয়লার শিক)
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Seekh Kebab (Minced Spiced Meat)</span>
                      <p className="text-xs text-[#1F1611]/70">Skewered and coal-roasted with mint chutney</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳380</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Chicken Tikka Charred Boti</span>
                      <p className="text-xs text-[#1F1611]/70">Marinated in Kashmiri spice curd and lime</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳380</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Tandoori Chicken</span>
                      <p className="text-xs text-[#1F1611]/70">Clay oven roasted succulent bone-in</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳360</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Garlic & Butter Naan</span>
                      <p className="text-xs text-[#1F1611]/70">Freshly blistered in the clay tandoor</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳70</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg font-semibold text-[#B5502F] border-b border-[#B5502F]/20 pb-1 mb-3">
                  Cool Reset & Desserts (ঠাণ্ডা)
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Special Lacchi (The Signature Wari Drink)</span>
                      <p className="text-xs text-[#1F1611]/70">Cold, creamy, with pistachios and saffron</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳180</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-semibold">Shahi Firni / Rice Pudding in Clay</span>
                      <p className="text-xs text-[#1F1611]/70">Slow-simmered basmati milk custard</p>
                    </div>
                    <span className="font-serif font-bold text-[#B5502F]">৳140</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1F1611]/15 flex justify-end">
              <button
                onClick={() => setShowFullSpreadModal(false)}
                className="px-6 py-2 rounded-full bg-[#1F1611] text-[#F3EBDD] text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Close Spread
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
