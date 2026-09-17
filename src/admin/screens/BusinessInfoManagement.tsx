import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Save, 
  DollarSign, 
  Facebook, 
  Check, 
  Calendar,
  Lock
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../ToastContext';
import { DaySchedule, BusinessInfo } from '../../types';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const BusinessInfoManagement: React.FC = () => {
  const { businessInfo, updateBusinessInfo, currentUser } = useRestaurant();
  const { showToast } = useToast();

  const isStaffReadOnly = currentUser?.role === 'Staff';

  const [formData, setFormData] = useState<BusinessInfo>(() => {
    // Ensure schedule has all 7 days
    const schedule = businessInfo.hoursSchedule && businessInfo.hoursSchedule.length === 7
      ? businessInfo.hoursSchedule
      : DAYS_OF_WEEK.map(d => ({
          day: d,
          isOpen: d === 'Wednesday' || d === 'Thursday' || d === 'Friday' || d === 'Saturday',
          openTime: '5:00 PM',
          closeTime: d === 'Friday' ? '12:00 AM' : '11:30 PM'
        }));

    return {
      ...businessInfo,
      hoursSchedule: schedule
    };
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggleServiceOption = (option: string) => {
    if (isStaffReadOnly) return;
    setFormData(prev => {
      const current = prev.serviceOptions || [];
      if (current.includes(option)) {
        return { ...prev, serviceOptions: current.filter(o => o !== option) };
      } else {
        return { ...prev, serviceOptions: [...current, option] };
      }
    });
  };

  const handleDayToggleOpen = (index: number) => {
    if (isStaffReadOnly) return;
    setFormData(prev => {
      const updated = [...(prev.hoursSchedule || [])];
      updated[index] = { ...updated[index], isOpen: !updated[index].isOpen };
      return { ...prev, hoursSchedule: updated };
    });
  };

  const handleDayTimeChange = (index: number, field: 'openTime' | 'closeTime', value: string) => {
    if (isStaffReadOnly) return;
    setFormData(prev => {
      const updated = [...(prev.hoursSchedule || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, hoursSchedule: updated };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStaffReadOnly) {
      showToast('Staff accounts have read-only access to core business facts', 'error');
      return;
    }

    setIsSaving(true);

    // Compute automatic hours text summary from schedule
    const openDays = (formData.hoursSchedule || []).filter(d => d.isOpen);
    let computedHoursDetail = "Closed most days · Opens 5 PM on Wednesday";
    if (openDays.length > 0) {
      const firstOpen = openDays[0];
      computedHoursDetail = `Opens ${firstOpen.openTime} on ${firstOpen.day} (${openDays.map(d => d.day.slice(0, 3)).join(', ')})`;
    }

    const updatedData: BusinessInfo = {
      ...formData,
      hoursDetail: computedHoursDetail
    };

    updateBusinessInfo(updatedData);

    setTimeout(() => {
      setIsSaving(false);
      showToast('Business information & schedule saved successfully', 'success');
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Business Info & Operating Schedule
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Core restaurant details, contact lines, address, service models, and day-by-day operational hours.
          </p>
        </div>

        {isStaffReadOnly && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Staff view (Admin credentials required to save changes)</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Building2 className="w-4 h-4 text-[#B5502F]" />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Identity & Brand Strings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Restaurant Name (English) *
              </label>
              <input
                type="text"
                required
                disabled={isStaffReadOnly}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Restaurant Name (Bengali) *
              </label>
              <input
                type="text"
                required
                disabled={isStaffReadOnly}
                value={formData.bengaliName}
                onChange={(e) => setFormData({ ...formData, bengaliName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60 font-serif"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Tagline / Subtext
              </label>
              <input
                type="text"
                disabled={isStaffReadOnly}
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="A loved Pakistani table in Wari"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Typical Spend / Price Range
              </label>
              <input
                type="text"
                disabled={isStaffReadOnly}
                value={formData.typicalSpend}
                onChange={(e) => setFormData({ ...formData, typicalSpend: e.target.value })}
                placeholder="৳400–600"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Location & Contact Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <MapPin className="w-4 h-4 text-[#B5502F]" />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Location & Contact Lines
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Full Physical Address *
            </label>
            <input
              type="text"
              required
              disabled={isStaffReadOnly}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="16b, 1 Rankin St, Dhaka 1203"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Display Phone Number *
              </label>
              <input
                type="text"
                required
                disabled={isStaffReadOnly}
                value={formData.displayPhone}
                onChange={(e) => setFormData({ ...formData, displayPhone: e.target.value })}
                placeholder="01756-853532"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Facebook Page Link
              </label>
              <input
                type="url"
                disabled={isStaffReadOnly}
                value={formData.facebookUrl || ''}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                placeholder="https://www.facebook.com/PeshwarainWari"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Google Maps URL
            </label>
            <input
              type="url"
              disabled={isStaffReadOnly}
              value={formData.googleMapsUrl}
              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60"
            />
          </div>
        </div>

        {/* Operating Schedule (Day by Day) */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B5502F]" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                7-Day Operating Schedule
              </h3>
            </div>
            <span className="text-xs text-gray-400">
              Toggle open/closed for each day
            </span>
          </div>

          <p className="text-xs text-gray-500">
            PeshWarain operates Wednesday through Saturday evenings. Toggle days closed for holidays or adjustments:
          </p>

          <div className="divide-y divide-gray-100">
            {(formData.hoursSchedule || []).map((schedule, idx) => (
              <div key={schedule.day} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="w-32 flex items-center gap-2">
                  <span className={`text-xs font-bold ${schedule.isOpen ? 'text-gray-900' : 'text-gray-400'}`}>
                    {schedule.day}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={isStaffReadOnly}
                    onClick={() => handleDayToggleOpen(idx)}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer disabled:opacity-60 ${
                      schedule.isOpen
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}
                  >
                    {schedule.isOpen ? 'Open' : 'Closed'}
                  </button>

                  {schedule.isOpen ? (
                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="text"
                        disabled={isStaffReadOnly}
                        value={schedule.openTime}
                        onChange={(e) => handleDayTimeChange(idx, 'openTime', e.target.value)}
                        placeholder="5:00 PM"
                        className="w-24 px-2 py-1 bg-gray-50 border border-gray-300 rounded text-center text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60"
                      />
                      <span className="text-gray-400">to</span>
                      <input
                        type="text"
                        disabled={isStaffReadOnly}
                        value={schedule.closeTime}
                        onChange={(e) => handleDayTimeChange(idx, 'closeTime', e.target.value)}
                        placeholder="11:30 PM"
                        className="w-24 px-2 py-1 bg-gray-50 border border-gray-300 rounded text-center text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] disabled:opacity-60"
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">
                      Kitchen resting & butchery prep
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Options Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Building2 className="w-4 h-4 text-[#B5502F]" />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Service Models Available
            </h3>
          </div>

          <div className="flex flex-wrap gap-4">
            {['Dine-in', 'Takeaway', 'Home Delivery'].map(option => {
              const checked = (formData.serviceOptions || []).includes(option);
              return (
                <label
                  key={option}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                    checked
                      ? 'bg-amber-50/60 border-[#D9A441] text-gray-900'
                      : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'
                  } ${isStaffReadOnly ? 'cursor-not-allowed opacity-60' : ''}`}
                >
                  <input
                    type="checkbox"
                    disabled={isStaffReadOnly}
                    checked={checked}
                    onChange={() => handleToggleServiceOption(option)}
                    className="w-4 h-4 text-[#B5502F] focus:ring-[#B5502F]"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs flex items-center justify-between sticky bottom-4 z-10">
          <span className="text-xs text-gray-500">
            Click save to push updates to the live site immediately.
          </span>
          <button
            type="submit"
            disabled={isSaving || isStaffReadOnly}
            className="px-6 py-2.5 bg-[#B5502F] hover:bg-[#9E4226] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
