import type { MenuItem } from '../types';
import { Clock, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FoodCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function FoodCard({ item, onAddToCart }: FoodCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white px-4 py-2 bg-red-600 rounded-full">
              Unavailable
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-stone-800">{item.name}</h3>
          <span className="text-amber-600">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-stone-600 mb-4 line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-stone-500">
            <Clock className="w-4 h-4 mr-1" />
            {item.preparationTime} min
          </div>
          
          <button
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              item.available
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
