import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  UploadCloud, 
  X, 
  Check, 
  Image as ImageIcon, 
  AlertTriangle,
  Layers,
  Filter
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../ToastContext';
import { PhotoItem } from '../../types';

const PHOTO_TAGS: Array<'Food' | 'Vibe' | 'Drinks' | 'Exterior'> = ['Food', 'Vibe', 'Drinks', 'Exterior'];

export const PhotoGalleryManagement: React.FC = () => {
  const { photos, addPhoto, deletePhoto, bulkDeletePhotos } = useRestaurant();
  const { showToast } = useToast();

  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteConfirmPhoto, setDeleteConfirmPhoto] = useState<PhotoItem | null>(null);

  // Form states
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [tagInput, setTagInput] = useState<'Food' | 'Vibe' | 'Drinks' | 'Exterior'>('Food');
  const [isDragging, setIsDragging] = useState(false);

  const safePhotos = photos || [];
  const filteredPhotos = selectedTag === 'ALL'
    ? safePhotos
    : safePhotos.filter(p => p.tag === selectedTag);

  const handleSelectAll = () => {
    if (selectedPhotoIds.length === filteredPhotos.length) {
      setSelectedPhotoIds([]);
    } else {
      setSelectedPhotoIds(filteredPhotos.map(p => p.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedPhotoIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedPhotoIds.length === 0) return;
    const count = selectedPhotoIds.length;
    bulkDeletePhotos(selectedPhotoIds);
    setSelectedPhotoIds([]);
    showToast(`Deleted ${count} photos from gallery`, 'info');
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      showToast('Image URL is required', 'error');
      return;
    }

    addPhoto({
      url: urlInput.trim(),
      title: titleInput.trim() || 'PeshWarain Photo',
      tag: tagInput
    });

    setUrlInput('');
    setTitleInput('');
    setIsUploadModalOpen(false);
    showToast('Photo added to gallery', 'success');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // If text/URL dropped
    const textData = e.dataTransfer.getData('text');
    if (textData && (textData.startsWith('http') || textData.startsWith('data:'))) {
      setUrlInput(textData);
      setIsUploadModalOpen(true);
      showToast('Image link detected', 'info');
      return;
    }

    // If local file dropped, use FileReader
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUrlInput(event.target.result as string);
          setTitleInput(file.name.replace(/\.[^/.]+$/, ''));
          setIsUploadModalOpen(true);
          showToast(`File "${file.name}" loaded for upload`, 'info');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="space-y-6"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Photo & Atmosphere Gallery
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage food photography, kitchen scenes, customer vibe, and Rankin Street exterior shots.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {selectedPhotoIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedPhotoIds.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B5502F] hover:bg-[#9E4226] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Drag & Drop Hint Banner */}
      <div className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left ${
        isDragging
          ? 'border-[#B5502F] bg-orange-50/75 text-[#B5502F]'
          : 'border-gray-200 bg-white text-gray-500'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-800">
              Drag & Drop Image Files or Web URLs Here
            </div>
            <div className="text-[11px] text-gray-400">
              Instant preview and tagging across Food, Vibe, Drinks, or Exterior.
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Paste Image URL
        </button>
      </div>

      {/* Filter Tabs & Bulk Selection */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedTag('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
              selectedTag === 'ALL'
                ? 'bg-gray-900 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Photos ({photos.length})
          </button>
          {PHOTO_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                selectedTag === tag
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tag} ({safePhotos.filter(p => p.tag === tag).length})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button
            onClick={handleSelectAll}
            className="hover:text-gray-900 cursor-pointer underline"
          >
            {selectedPhotoIds.length === filteredPhotos.length ? 'Deselect All' : 'Select All Filtered'}
          </button>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredPhotos.map(photo => {
          const isSelected = selectedPhotoIds.includes(photo.id);
          return (
            <div
              key={photo.id}
              className={`group relative bg-white rounded-xl border overflow-hidden shadow-2xs transition-all ${
                isSelected ? 'border-[#B5502F] ring-2 ring-[#B5502F]/20' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Image Preview Container */}
              <div className="aspect-square bg-gray-100 overflow-hidden relative">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Top Overlay Bar */}
                <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                  <span className="pointer-events-auto px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase">
                    {photo.tag}
                  </span>

                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleSelect(photo.id)}
                    className="pointer-events-auto w-4 h-4 rounded text-[#B5502F] focus:ring-[#B5502F] cursor-pointer"
                  />
                </div>

                {/* Hover Delete Action */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => setDeleteConfirmPhoto(photo)}
                    className="p-2 rounded-full bg-white/90 hover:bg-red-600 hover:text-white text-gray-700 transition-colors shadow-md cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Caption Footer */}
              <div className="p-3">
                <div className="text-xs font-semibold text-gray-800 truncate" title={photo.title}>
                  {photo.title}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  Added {photo.uploadedAt}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-900">
                Add Gallery Photo
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Image URL or Data URI *
                </label>
                <input
                  type="text"
                  required
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Photo Title / Description
                </label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="e.g. Copper Deg Simmering at Dusk"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Category Tag *
                </label>
                <select
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F]"
                >
                  {PHOTO_TAGS.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {urlInput && (
                <div className="h-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <img
                    src={urlInput}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#B5502F] hover:bg-[#9E4226] text-white rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Upload & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              Delete "{deleteConfirmPhoto.title}"?
            </h3>
            <p className="text-xs text-gray-500 mt-1.5">
              This photo will be removed from the gallery and site.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmPhoto(null)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deletePhoto(deleteConfirmPhoto.id);
                  showToast('Photo removed', 'info');
                  setDeleteConfirmPhoto(null);
                }}
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
