import React, { useState } from 'react';
import { X, Phone, Calendar, Users, Utensils, CheckCircle2, MapPin } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose
}) => {
  const { businessInfo, addTableRequest } = useRestaurant();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    partySize: '2-4 Guests',
    orderType: 'Dine-in Table',
    preferredTime: 'Evening (7:00 PM - 9:00 PM)',
    dishNotes: 'Nalli Nihari & Special Lacchi'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse guest count
    let guestCount = 2;
    if (formData.partySize.startsWith('1-2')) guestCount = 2;
    else if (formData.partySize.startsWith('2-4')) guestCount = 4;
    else if (formData.partySize.startsWith('5-8')) guestCount = 6;
    else if (formData.partySize.startsWith('9+')) guestCount = 10;

    // Save to admin inbox
    addTableRequest({
      name: formData.name,
      contact: formData.phone,
      partySize: formData.partySize,
      serviceType: formData.orderType,
      requestedDateTime: formData.preferredTime,
      message: formData.dishNotes
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF5ED] text-[#1F1611] rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D9A441] animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#1F1611] text-[#F3EBDD] p-6 flex items-center justify-between border-b border-[#D9A441]/30">
          <div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#D9A441] font-semibold block">
              WARI · DHAKA
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#F3EBDD] mt-0.5">
              Ask About a Table
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B5502F] flex items-center justify-center text-[#F3EBDD] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1E3A34] text-[#D9A441] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#1F1611]">
                We look forward to welcoming you!
              </h4>
              <p className="text-sm text-[#1F1611]/80 leading-relaxed max-w-sm mx-auto">
                Thank you, <strong>{formData.name || 'Friend'}</strong>. The kitchen has noted your request for a {formData.partySize.toLowerCase()} table. If you are arriving right at opening ({businessInfo.hoursDetail || '5 PM'}), feel free to walk right in or call us.
              </p>

              <div className="pt-4 border-t border-[#1F1611]/10 flex flex-col gap-3">
                <a
                  href={`tel:${businessInfo.phone}`}
                  className="w-full py-3 px-4 rounded-full bg-[#1F1611] text-[#F3EBDD] text-xs font-semibold tracking-wider uppercase hover:bg-[#B5502F] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#D9A441]" />
                  <span>Call Us If You're On The Way ({businessInfo.displayPhone})</span>
                </a>
                <button
                  onClick={handleReset}
                  className="text-xs text-[#1F1611]/60 hover:text-[#1F1611] underline uppercase tracking-wider py-1 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#1F1611]/5 p-3.5 rounded-xl border border-[#1F1611]/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#1F1611]/80">
                  <Calendar className="w-4 h-4 text-[#B5502F]" />
                  <span>Schedule: <strong>{businessInfo.hoursDetail || 'Opens 5 PM'}</strong></span>
                </div>
                <span className="font-bold text-[#B5502F]">{businessInfo.typicalSpend || '৳400–600'}</span>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1611]/70 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mus'ab"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#1F1611]/20 bg-white focus:outline-none focus:border-[#B5502F] text-sm text-[#1F1611]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1611]/70 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#1F1611]/20 bg-white focus:outline-none focus:border-[#B5502F] text-sm text-[#1F1611]"
                  />
                </div>
              </div>

              {/* Party Size & Order Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1611]/70 mb-1.5">
                    Party Size
                  </label>
                  <select
                    value={formData.partySize}
                    onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#1F1611]/20 bg-white focus:outline-none focus:border-[#B5502F] text-sm text-[#1F1611]"
                  >
                    <option value="1-2 Guests">1-2 Guests</option>
                    <option value="2-4 Guests">2-4 Guests</option>
                    <option value="5-8 Guests (Family Table)">5-8 Guests (Family Table)</option>
                    <option value="9+ Guests (Large Gathering)">9+ Guests (Large Gathering)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1611]/70 mb-1.5">
                    Service Type
                  </label>
                  <select
                    value={formData.orderType}
                    onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#1F1611]/20 bg-white focus:outline-none focus:border-[#B5502F] text-sm text-[#1F1611]"
                  >
                    <option value="Dine-in Table">Dine-in Table</option>
                    <option value="Takeaway Pickup">Takeaway Pickup</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1F1611]/70 mb-1.5">
                  Dishes you want kept warm (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 Nalli Nihari, Garlic Naan & Special Lassi"
                  value={formData.dishNotes}
                  onChange={(e) => setFormData({ ...formData, dishNotes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#1F1611]/20 bg-white focus:outline-none focus:border-[#B5502F] text-sm text-[#1F1611]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#D9A441] text-[#1F1611] text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-[#c89433] transition-colors shadow-sm cursor-pointer"
                >
                  Send Table Inquiry
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-[#1F1611]/60">Or call the host directly: </span>
                  <a
                    href={`tel:${businessInfo.phone}`}
                    className="text-xs font-bold text-[#B5502F] hover:underline"
                  >
                    {businessInfo.displayPhone}
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

