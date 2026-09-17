import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  Flame, 
  ArrowUpDown, 
  X, 
  Check, 
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../ToastContext';
import { MenuItem, MenuCategory } from '../../types';

const CATEGORIES: MenuCategory[] = [
  'EVERYTHING',
  'FROM THE HANDI',
  'OVER CHARCOAL',
  'TANDOOR',
  'COLD THINGS'
];

export const MenuManagement: React.FC = () => {
  const { 
    menuItems, 
    addMenuItem, 
    updateMenuItem, 
    deleteMenuItem, 
    toggleMenuItemVisibility 
  } = useRestaurant();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('EVERYTHING');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Delete confirmation state
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<MenuItem | null>(null);

  // Form inputs
  const [formData, setFormData] = useState<{
    name: string;
    bengaliName: string;
    description: string;
    fullThought: string;
    price: number;
    category: MenuCategory[];
    image: string;
    isPopular: boolean;
    isVisible: boolean;
    sortOrder: number;
    accompaniment: string;
    spiciness: 'Mild' | 'Medium' | 'Rich Spiced' | 'Smoky';
  }>({
    name: '',
    bengaliName: '',
    description: '',
    fullThought: '',
    price: 0,
    category: ['FROM THE HANDI'],
    image: '',
    isPopular: false,
    isVisible: true,
    sortOrder: 1,
    accompaniment: '',
    spiciness: 'Medium'
  });

  // Filter items
  const safeMenuItems = menuItems || [];
  const filteredItems = safeMenuItems.filter(item => {
    const matchesSearch = (item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.bengaliName && item.bengaliName.includes(searchQuery)) ||
      (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'EVERYTHING' || (Array.isArray(item.category) && item.category.includes(selectedCategory));

    return matchesSearch && matchesCategory;
  }).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      bengaliName: '',
      description: '',
      fullThought: '',
      price: 350,
      category: [selectedCategory === 'EVERYTHING' ? 'FROM THE HANDI' : selectedCategory],
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
      isPopular: false,
      isVisible: true,
      sortOrder: menuItems.length + 1,
      accompaniment: 'Fresh Naan & Chutney',
      spiciness: 'Medium'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      bengaliName: item.bengaliName || '',
      description: item.description,
      fullThought: item.fullThought || '',
      price: item.price,
      category: item.category.length > 0 ? item.category : ['FROM THE HANDI'],
      image: item.image,
      isPopular: !!item.isPopular,
      isVisible: item.isVisible !== false,
      sortOrder: item.sortOrder || 1,
      accompaniment: item.accompaniment || '',
      spiciness: item.spiciness || 'Medium'
    });
    setIsModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Dish name is required', 'error');
      return;
    }

    if (formData.price <= 0) {
      showToast('Please enter a valid price in ৳', 'error');
      return;
    }

    // Ensure category includes EVERYTHING plus chosen categories
    const categoriesWithEverything = Array.from(new Set(['EVERYTHING', ...formData.category])) as MenuCategory[];

    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name: formData.name.trim(),
        bengaliName: formData.bengaliName.trim(),
        description: formData.description.trim(),
        fullThought: formData.fullThought.trim() || formData.description.trim(),
        price: Number(formData.price),
        category: categoriesWithEverything,
        image: formData.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
        isPopular: formData.isPopular,
        isVisible: formData.isVisible,
        sortOrder: Number(formData.sortOrder),
        accompaniment: formData.accompaniment,
        spiciness: formData.spiciness
      });
      showToast(`Updated "${formData.name}" successfully`, 'success');
    } else {
      addMenuItem({
        name: formData.name.trim(),
        bengaliName: formData.bengaliName.trim(),
        description: formData.description.trim(),
        fullThought: formData.fullThought.trim() || formData.description.trim(),
        price: Number(formData.price),
        category: categoriesWithEverything,
        image: formData.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
        isPopular: formData.isPopular,
        isVisible: formData.isVisible,
        sortOrder: Number(formData.sortOrder),
        accompaniment: formData.accompaniment,
        spiciness: formData.spiciness
      });
      showToast(`Added "${formData.name}" to the menu`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmItem) {
      deleteMenuItem(deleteConfirmItem.id);
      showToast(`Deleted "${deleteConfirmItem.name}"`, 'info');
      setDeleteConfirmItem(null);
    }
  };

  const handleToggleCategory = (cat: MenuCategory) => {
    setFormData(prev => {
      if (prev.category.includes(cat)) {
        if (prev.category.length === 1) return prev; // keep at least one
        return { ...prev, category: prev.category.filter(c => c !== cat) };
      } else {
        return { ...prev, category: [...prev.category, cat] };
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Menu Management
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Configure dishes, pricing, visibility, and category assignments for the public menu.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B5502F] hover:bg-[#9E4226] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium border-b border-gray-200">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-2 rounded-t-lg transition-colors whitespace-nowrap cursor-pointer border-b-2 -mb-[1px] ${
              selectedCategory === cat
                ? 'border-[#B5502F] text-[#B5502F] font-bold bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dish name, Bengali name, or description..."
            className="w-full pl-9 pr-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
          />
        </div>

        <div className="text-xs text-gray-500">
          Showing <span className="font-semibold text-gray-900">{filteredItems.length}</span> of {menuItems.length} items
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50/75 border-b border-gray-200 uppercase tracking-wider text-[11px] text-gray-500 font-semibold">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Seq</th>
                <th className="py-3 px-4 w-16">Photo</th>
                <th className="py-3 px-4">Dish Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Visibility</th>
                <th className="py-3 px-4 text-center">Popular</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    No dishes found matching your criteria. Click "+ Add New Dish" above.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-gray-400 text-[11px]">
                      {item.sortOrder || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-11 h-11 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </div>
                      {item.bengaliName && (
                        <div className="text-[11px] text-gray-500 font-serif">
                          {item.bengaliName}
                        </div>
                      )}
                      <div className="text-[11px] text-gray-400 truncate max-w-xs mt-0.5">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {item.category.filter(c => c !== 'EVERYTHING').map(c => (
                          <span
                            key={c}
                            className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-[10px] font-medium"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900 text-sm font-mono">
                      ৳{item.price}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleMenuItemVisibility(item.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                          item.isVisible !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                        }`}
                        title="Click to toggle visibility on live site"
                      >
                        {item.isVisible !== false ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-600" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-gray-400" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.isPopular ? (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold uppercase">
                          <Flame className="w-3 h-3 text-amber-600 fill-current" />
                          <span>Popular</span>
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                          title="Edit Dish"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmItem(item)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-gray-900">
                {editingItem ? `Edit "${editingItem.name}"` : 'Add New Menu Dish'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Dish Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Nalli Nihari"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Bengali Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bengaliName}
                    onChange={(e) => setFormData({ ...formData, bengaliName: e.target.value })}
                    placeholder="e.g. নল্লী নিহারী"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Price in BDT (৳) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                      ৳
                    </span>
                    <input
                      type="number"
                      required
                      min={10}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="480"
                      className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Display Sequence Order
                  </label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                    placeholder="1"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Menu Section Categories (Select at least one)
                </label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(['FROM THE HANDI', 'OVER CHARCOAL', 'TANDOOR', 'COLD THINGS'] as MenuCategory[]).map(cat => {
                    const active = formData.category.includes(cat);
                    return (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => handleToggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1.5 ${
                          active
                            ? 'bg-[#B5502F] text-white border-[#B5502F]'
                            : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {active && <Check className="w-3.5 h-3.5" />}
                        <span>{cat}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Short One-Line Description (Site Style) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Slow-cooked shank, ginger, green chili, a deep overnight gravy"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Full Story & Culinary Thought (Optional details)
                </label>
                <textarea
                  rows={2}
                  value={formData.fullThought}
                  onChange={(e) => setFormData({ ...formData, fullThought: e.target.value })}
                  placeholder="Simmered patiently in copper degs until the marrow softens into silk..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Photo URL
                  </label>
                  <div className="relative">
                    <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Recommended Accompaniment
                  </label>
                  <input
                    type="text"
                    value={formData.accompaniment}
                    onChange={(e) => setFormData({ ...formData, accompaniment: e.target.value })}
                    placeholder="e.g. Garlic Naan & Special Lacchi"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#B5502F] focus:border-[#B5502F]"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="w-4 h-4 rounded text-[#B5502F] focus:ring-[#B5502F]"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Visible on live customer site
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPopular}
                    onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                    className="w-4 h-4 rounded text-[#B5502F] focus:ring-[#B5502F]"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    Mark as Popular / Signature Dish
                  </span>
                </label>
              </div>

              {/* Modal Footer */}
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
                  {editingItem ? 'Save Changes' : 'Publish Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              Delete "{deleteConfirmItem.name}"?
            </h3>
            <p className="text-xs text-gray-500 mt-1.5">
              Are you sure you want to remove this dish from the menu? This action immediately deletes it from the live customer menu.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmItem(null)}
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
