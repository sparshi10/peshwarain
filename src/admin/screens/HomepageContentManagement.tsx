import React, { useState } from 'react';
import { 
  Type, 
  Sparkles, 
  Image as ImageIcon, 
  Save, 
  Eye, 
  ExternalLink,
  Volume2,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../ToastContext';
import { HomepageContent } from '../../types';

export const HomepageContentManagement: React.FC = () => {
  const { homepageContent, updateHomepageContent, setCurrentView } = useRestaurant();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<HomepageContent>(homepageContent);
  const [isSaving, setIsSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<'hero' | 'announcement' | 'feeling' | 'drink'>('hero');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateHomepageContent(formData);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Homepage copy and featured blocks updated successfully', 'success');
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Homepage Copy & Brand Blocks
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Update headline wording, ticker text, "The Feeling" narrative, and featured drink card with live preview.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('public')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Preview Live Website</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form (7 Cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Announcement Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Volume2 className="w-4 h-4 text-[#B5502F]" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Top Announcement Bar
              </h3>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Marquee Ticker Text *
              </label>
              <input
                type="text"
                required
                value={formData.announcementText}
                onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
                placeholder="TONIGHT IN WARI — OPEN FROM 5 PM ON WEDNESDAY — CALL THE TABLE"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Displays continuously scrolling across the very top of the customer site.
              </p>
            </div>
          </div>

          {/* Hero Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Type className="w-4 h-4 text-[#B5502F]" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Hero Section Content
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Eyebrow Label
              </label>
              <input
                type="text"
                required
                value={formData.heroLabel}
                onChange={(e) => setFormData({ ...formData, heroLabel: e.target.value })}
                placeholder="A LOVED PAKISTANI TABLE IN WARI"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Headline Plain Part *
                </label>
                <input
                  type="text"
                  required
                  value={formData.heroHeadlinePlain}
                  onChange={(e) => setFormData({ ...formData, heroHeadlinePlain: e.target.value })}
                  placeholder="Come for the"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Headline Highlighted/Italic Word *
                </label>
                <input
                  type="text"
                  required
                  value={formData.heroHeadlineHighlight}
                  onChange={(e) => setFormData({ ...formData, heroHeadlineHighlight: e.target.value })}
                  placeholder="nihari"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] font-serif italic"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Hero Subtext *
              </label>
              <textarea
                rows={2}
                required
                value={formData.heroSubtext}
                onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
                placeholder="Generous desi food, cold lassi and the kind of welcome that makes a neighbourhood feel like home."
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Hero Featured Dish Image URL
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.heroImageUrl}
                  onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>
            </div>
          </div>

          {/* The Feeling Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Sparkles className="w-4 h-4 text-[#B5502F]" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                01 — "The Feeling" Story Section
              </h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Story Headline
              </label>
              <input
                type="text"
                value={formData.feelingHeadline}
                onChange={(e) => setFormData({ ...formData, feelingHeadline: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Story Body Narrative *
              </label>
              <textarea
                rows={4}
                required
                value={formData.feelingBodyCopy}
                onChange={(e) => setFormData({ ...formData, feelingBodyCopy: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Highlighted Side Pull-Quote
              </label>
              <input
                type="text"
                value={formData.feelingSideQuote}
                onChange={(e) => setFormData({ ...formData, feelingSideQuote: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] italic"
              />
            </div>
          </div>

          {/* Featured Drink Card Block */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Coffee className="w-4 h-4 text-[#B5502F]" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Featured Drink Section (Lassi Showcase)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Drink Headline *
                </label>
                <input
                  type="text"
                  required
                  value={formData.drinkFeature.headline}
                  onChange={(e) => setFormData({
                    ...formData,
                    drinkFeature: { ...formData.drinkFeature, headline: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Price in ৳ *
                </label>
                <input
                  type="number"
                  required
                  value={formData.drinkFeature.price}
                  onChange={(e) => setFormData({
                    ...formData,
                    drinkFeature: { ...formData.drinkFeature, price: Number(e.target.value) }
                  })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Drink Description *
              </label>
              <textarea
                rows={2}
                required
                value={formData.drinkFeature.body}
                onChange={(e) => setFormData({
                  ...formData,
                  drinkFeature: { ...formData.drinkFeature, body: e.target.value }
                })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs flex items-center justify-between sticky bottom-4 z-10">
            <span className="text-xs text-gray-500">
              Ready to publish copy updates?
            </span>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#B5502F] hover:bg-[#9E4226] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Updating...' : 'Publish Content'}</span>
            </button>
          </div>
        </form>

        {/* Right Live Preview Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 p-5 shadow-2xs sticky top-20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#B5502F]" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Live Customer Preview
              </h3>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Simulation
            </span>
          </div>

          {/* Preview Navigation Tabs */}
          <div className="flex gap-2 text-xs border-b border-gray-100 pb-2">
            <button
              type="button"
              onClick={() => setPreviewTab('hero')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                previewTab === 'hero' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Hero
            </button>
            <button
              type="button"
              onClick={() => setPreviewTab('announcement')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                previewTab === 'announcement' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Ticker
            </button>
            <button
              type="button"
              onClick={() => setPreviewTab('feeling')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                previewTab === 'feeling' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              The Feeling
            </button>
            <button
              type="button"
              onClick={() => setPreviewTab('drink')}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                previewTab === 'drink' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Lacchi Box
            </button>
          </div>

          {/* Render Preview State */}
          <div className="rounded-xl overflow-hidden border border-gray-200">
            {previewTab === 'announcement' && (
              <div className="bg-[#B5502F] text-[#F3EBDD] p-3 text-[11px] font-mono tracking-widest text-center">
                {formData.announcementText}
              </div>
            )}

            {previewTab === 'hero' && (
              <div className="bg-[#1F1611] text-[#F3EBDD] p-5 space-y-3 font-serif">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D9A441] font-mono font-semibold block">
                  {formData.heroLabel}
                </span>
                <h4 className="text-2xl font-bold leading-tight">
                  {formData.heroHeadlinePlain}{' '}
                  <span className="italic text-[#D9A441] underline decoration-[#D9A441]/40">
                    {formData.heroHeadlineHighlight}
                  </span>
                  .
                  <br />
                  Stay for the stories.
                </h4>
                <p className="font-sans text-xs text-[#E5D7C2] leading-relaxed">
                  {formData.heroSubtext}
                </p>
                {formData.heroImageUrl && (
                  <div className="h-36 rounded-lg overflow-hidden border border-white/10 mt-3">
                    <img
                      src={formData.heroImageUrl}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            )}

            {previewTab === 'feeling' && (
              <div className="bg-[#FAF5ED] text-[#1F1611] p-5 space-y-3">
                <span className="text-[10px] tracking-widest uppercase text-[#B5502F] font-mono font-bold block">
                  01 — THE FEELING
                </span>
                <h4 className="font-serif text-lg font-bold text-[#1F1611]">
                  {formData.feelingHeadline}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {formData.feelingBodyCopy}
                </p>
                <blockquote className="border-l-2 border-[#B5502F] pl-3 italic text-xs text-[#B5502F] font-serif">
                  "{formData.feelingSideQuote}"
                </blockquote>
              </div>
            )}

            {previewTab === 'drink' && (
              <div className="bg-[#B5502F] text-[#FAF5ED] p-5 space-y-3 rounded-lg">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-serif text-lg font-bold">
                    {formData.drinkFeature.headline}
                  </h4>
                  <span className="text-lg font-bold font-mono">
                    ৳{formData.drinkFeature.price}
                  </span>
                </div>
                <p className="text-xs opacity-90 leading-relaxed">
                  {formData.drinkFeature.body}
                </p>
              </div>
            )}
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => setCurrentView('public')}
              className="text-xs text-[#B5502F] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>See full live customer experience</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
