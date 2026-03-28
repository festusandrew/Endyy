import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        {product.popular && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-brand-900 text-[10px] font-bold px-3 py-1 uppercase tracking-widest border border-white/20">
            Best Seller
          </span>
        )}
        
        {/* Quick Add Overlay - Editorial Style */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 w-10 h-10 bg-white text-brand-900 flex items-center justify-center rounded-full translate-y-14 group-hover:translate-y-0 transition-transform duration-300 hover:bg-brand-900 hover:text-white"
        >
          <Plus size={20} />
        </button>
      </Link>
      
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold text-brand-950 group-hover:text-brand-600 transition-colors leading-tight max-w-[70%]">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
            </h3>
            <span className="text-lg font-medium text-brand-900 whitespace-nowrap">
                ₦{product.price.toLocaleString()}
            </span>
        </div>
        <p className="text-xs text-brand-500 uppercase tracking-widest mb-1">{product.category}</p>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
        </p>
      </div>
    </div>
  );
};
