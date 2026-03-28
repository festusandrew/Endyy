import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Product, ProductCategory, DeliveryMethod } from '../types';

interface ShopProps {
  onAddToCart: (product: Product) => void;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
}

export const Shop: React.FC<ShopProps> = ({ onAddToCart, deliveryMethod, setDeliveryMethod }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const cat = searchParams.get('cat');
    if (cat) {
      const found = Object.values(ProductCategory).find(c => c.includes(cat)) || 'All';
      setActiveCategory(found as string);
    }
  }, [location]);

  const categories = ['All', ...Object.values(ProductCategory)];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesDelivery = !p.availableMethods || p.availableMethods.includes(deliveryMethod);
    return matchesCategory && matchesDelivery;
  });

  return (
    <div className="container mx-auto px-4 py-20 mt-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-xl">
            <h1 className="text-5xl md:text-7xl font-bold text-brand-950 mb-4 tracking-tight">Our Menu</h1>
            <p className="text-lg text-gray-500 font-light">
                Handcrafted daily in Kaduna. Experience the taste of premium ingredients and artisanal baking.
            </p>
        </div>
        
        {/* Delivery / Pickup Toggle */}
        <div className="flex bg-gray-100 p-1.5 rounded-full w-fit border border-gray-200 shadow-inner">
          <button
            onClick={() => setDeliveryMethod(DeliveryMethod.DELIVERY)}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              deliveryMethod === DeliveryMethod.DELIVERY
                ? 'bg-white text-brand-900 shadow-md'
                : 'text-gray-500 hover:text-brand-900'
            }`}
          >
            Delivery
          </button>
          <button
            onClick={() => setDeliveryMethod(DeliveryMethod.PICKUP)}
            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
              deliveryMethod === DeliveryMethod.PICKUP
                ? 'bg-white text-brand-900 shadow-md'
                : 'text-gray-500 hover:text-brand-900'
            }`}
          >
            Store Pickup
          </button>
        </div>
      </div>

      {/* Categories - Minimalist Tabs */}
      <div className="border-b border-gray-200 mb-12 overflow-x-auto">
        <div className="flex space-x-8 min-w-max pb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                activeCategory === cat 
                  ? 'text-brand-900 border-b-2 border-brand-900 pb-4 -mb-4.5' 
                  : 'text-gray-400 hover:text-brand-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center border-t border-b border-gray-100">
          <p className="text-gray-400 text-lg font-light mb-4">We are sold out of this category today.</p>
          <button onClick={() => setActiveCategory('All')} className="text-brand-600 font-bold border-b border-brand-600 pb-0.5 hover:text-brand-900 hover:border-brand-900 transition-colors">
            View All Treats
          </button>
        </div>
      )}
    </div>
  );
};