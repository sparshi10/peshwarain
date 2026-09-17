import React, { useState } from 'react';
import { 
  Star, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  Save, 
  X, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../ToastContext';
import { Testimonial } from '../../types';

export const ReviewsManagement: React.FC = () => {
  const { 
    reviews, 
    businessInfo, 
    addReview, 
    updateReview, 
    deleteReview, 
    toggleReviewFeatured, 
    updateAggregateRating 
  } = useRestaurant();
  const { showToast } = useToast();

  // Aggregate rating edit states
  const [ratingInput, setRatingInput] = useState<number>(businessInfo.rating);
  const [reviewCountInput, setReviewCountInput] = useState<number>(businessInfo.reviewCount);
  const [isSavingRating, setIsSavingRating] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
  const [deleteConfirmReview, setDeleteConfirmReview] = useState<Testimonial | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    author: string;
    quote: string;
    role: string;
    rating: number;
    date: string;
    source: 'Google Review' | 'Manual entry';
    isFeatured: boolean;
    itemMentioned: string;
  }>({
    author: '',
    quote: '',
    role: 'Diner',
    rating: 5,
    date: 'Recent',
    source: 'Google Review',
    isFeatured: true,
    itemMentioned: ''
  });

  const handleSaveAggregate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingRating(true);
    updateAggregateRating(Number(ratingInput), Number(reviewCountInput));
    setTimeout(() => {
      setIsSavingRating(false);
      showToast(`Aggregate rating updated to ${ratingInput} (${reviewCountInput.toLocaleString()} reviews)`, 'success');
    }, 250);
  };

  const handleOpenAddModal = () => {
    setEditingReview(null);
    setFormData({
      author: '',
      quote: '',
      role: 'Local Diner',
      rating: 5,
      date: 'Just now',
      source: 'Google Review',
      isFeatured: true,
      itemMentioned: 'Nalli Nihari'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (rev: Testimonial) => {
    setEditingReview(rev);
    setFormData({
      author: rev.author,
      quote: rev.quote,
      role: rev.role || 'Diner',
      rating: rev.rating || 5,
      date: rev.date,
      source: rev.source || 'Google Review',
      isFeatured: !!rev.isFeatured,
      itemMentioned: rev.itemMentioned || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.quote.trim()) {
      showToast('Author and testimonial text are required', 'error');
      return;
    }

    if (editingReview) {
      updateReview({
        ...editingReview,
        author: formData.author.trim(),
        quote: formData.quote.trim(),
        role: formData.role.trim() || 'Diner',
        rating: Number(formData.rating),
        date: formData.date.trim(),
        source: formData.source,
        isFeatured: formData.isFeatured,
        itemMentioned: formData.itemMentioned.trim()
      });
      showToast(`Updated review from ${formData.author}`, 'success');
    } else {
      addReview({
        author: formData.author.trim(),
        quote: formData.quote.trim(),
        role: formData.role.trim() || 'Diner',
        rating: Number(formData.rating),
        date: formData.date.trim(),
        source: formData.source,
        isFeatured: formData.isFeatured,
        itemMentioned: formData.itemMentioned.trim()
      });
      showToast(`Added review from ${formData.author}`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmReview) {
      deleteReview(deleteConfirmReview.id);
      showToast(`Removed review by ${deleteConfirmReview.author}`, 'info');
      setDeleteConfirmReview(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Reviews & Testimonials Management
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage customer quotes, Google reviews, and sync the live aggregate rating across the website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B5502F] hover:bg-[#9E4226] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Aggregate Rating Syncer Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#D9A441] fill-current" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Live Aggregate Rating Sync
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              These values sync directly to the homepage hero badge, the Word on Wari review counter, and the location section.
            </p>
          </div>

          <form onSubmit={handleSaveAggregate} className="flex items-center gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-gray-400 uppercase">
                Rating (out of 5.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                value={ratingInput}
                onChange={(e) => setRatingInput(Number(e.target.value))}
                className="w-20 px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 text-center focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-gray-400 uppercase">
                Total Review Count
              </label>
              <input
                type="number"
                min="0"
                value={reviewCountInput}
                onChange={(e) => setReviewCountInput(Number(e.target.value))}
                className="w-28 px-2.5 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 text-center focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
              />
            </div>

            <button
              type="submit"
              disabled={isSavingRating}
              className="mt-4 px-3.5 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingRating ? 'Saving...' : 'Sync Rating'}</span>
            </button>
          </form>
        </div>

        <div className="pt-3 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Live on site: <strong className="text-gray-800">{businessInfo.rating} ★ ({businessInfo.reviewCount.toLocaleString()} reviews)</strong>
          </span>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50/75 border-b border-gray-200 uppercase tracking-wider text-[11px] text-gray-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Reviewer</th>
                <th className="py-3 px-4">Quote / Testimonial</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-center">Homepage Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900 text-sm">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {rev.role}
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-sm">
                    <p className="text-gray-800 italic line-clamp-2">
                      "{rev.quote}"
                    </p>
                    {rev.itemMentioned && (
                      <span className="inline-block text-[10px] text-[#B5502F] font-medium mt-0.5">
                        Dish: {rev.itemMentioned}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      rev.source === 'Google Review'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      {rev.source || 'Google Review'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-0.5 text-[#D9A441]">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                    {rev.date}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleReviewFeatured(rev.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                        rev.isFeatured
                          ? 'bg-amber-50 text-amber-900 border border-amber-300 font-bold'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                      title="Toggle featured on homepage"
                    >
                      {rev.isFeatured ? (
                        <>
                          <Sparkles className="w-3 h-3 text-[#D9A441]" />
                          <span>Featured (Live)</span>
                        </>
                      ) : (
                        <span>Hidden from top 3</span>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditModal(rev)}
                        className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Edit Review"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmReview(rev)}
                        className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-gray-900">
                {editingReview ? `Edit Review by ${editingReview.author}` : 'Add New Customer Review'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Reviewer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Mus'ab Noor"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Role / Sub-label
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Local Diner / Food Explorer"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Testimonial / Quote *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="The nihari and kebabs are the kind of food you remember on the way home..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★</option>
                    <option value={3}>3 Stars ★★★</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Source
                  </label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                  >
                    <option value="Google Review">Google Review</option>
                    <option value="Manual entry">Manual entry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Date Label
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. 2 weeks ago"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Dish Mentioned (Optional)
                </label>
                <input
                  type="text"
                  value={formData.itemMentioned}
                  onChange={(e) => setFormData({ ...formData, itemMentioned: e.target.value })}
                  placeholder="e.g. Nalli Nihari & Seekh Kebab"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>

              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-[#B5502F] focus:ring-[#B5502F]"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Feature on homepage "Word on Wari" section (3 shown at a time)
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B5502F] hover:bg-[#9E4226] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  {editingReview ? 'Save Review' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              Delete review by {deleteConfirmReview.author}?
            </h3>
            <p className="text-xs text-gray-500 mt-1.5">
              This review will be removed immediately from the database and customer site.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmReview(null)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
