import  { useState } from 'react';
import type { MenuItem } from '../types';
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface AdminMenuProps {
  menuItems: MenuItem[];
  onBack: () => void;
  onToggleAvailability: (itemId: string) => void;
  onUpdateItem: (item: MenuItem) => void;
}

export function AdminMenu({ menuItems, onBack, onToggleAvailability}: AdminMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];
  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleToggleAvailability = (itemId: string) => {
    onToggleAvailability(itemId);
    const item = menuItems.find(i => i.id === itemId);
    toast.success(`${item?.name} is now ${item?.available ? 'unavailable' : 'available'}`);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-stone-600" />
              </button>
              <h1 className="text-stone-800">Menu Management</h1>
            </div>
            <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-5 h-5" />
              Add Item
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm text-stone-600">Item</th>
                  <th className="px-6 py-4 text-left text-sm text-stone-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm text-stone-600">Price</th>
                  <th className="px-6 py-4 text-left text-sm text-stone-600">Prep Time</th>
                  <th className="px-6 py-4 text-left text-sm text-stone-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm text-stone-800">{item.name}</p>
                          <p className="text-xs text-stone-500 line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-600">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-amber-600">${item.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-stone-600">{item.preparationTime} min</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleAvailability(item.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.available ? 'bg-green-500' : 'bg-stone-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            item.available ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4 text-stone-600" />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-stone-600 mb-1">Total Items</p>
            <p className="text-stone-800">{menuItems.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-stone-600 mb-1">Available Items</p>
            <p className="text-green-600">{menuItems.filter(i => i.available).length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-stone-600 mb-1">Unavailable Items</p>
            <p className="text-red-600">{menuItems.filter(i => !i.available).length}</p>
          </div>
        </div>
      </div>

      {/* Edit Modal (simplified) */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="mb-4 text-stone-800">Edit Menu Item</h2>
            <p className="text-sm text-stone-600 mb-6">
              Editing: {editingItem.name}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 px-4 py-2 border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast.success('Item updated successfully');
                  setEditingItem(null);
                }}
                className="flex-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}