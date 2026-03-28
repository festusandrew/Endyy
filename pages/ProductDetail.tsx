import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product, DeliveryMethod } from '../types';
import { Minus, Plus, ShoppingBag, ArrowLeft, Check } from 'lucide-react';

interface ProductDetailProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const [qty, setQty] = React.useState(1);
  
  if (!product) {
    return <div className="p-20 text-center mt-20">Product not found. <Link to="/shop" className="text-brand-600">Go back</Link></div>;
  }

  const relatedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 md:py-20 mt-16">
      <Link to="/shop" className="inline-flex items-center text-brand-500 hover:text-brand-800 mb-8 transition-colors font-medium text-sm tracking-wide uppercase">
        <ArrowLeft size={16} className="mr-2" /> Back to Menu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-24">
        {/* Image - Editorial Style */}
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <span className="px-3 py-1 border border-brand-200 text-brand-800 rounded-full text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-950 mb-4 leading-none tracking-tight">{product.name}</h1>
          <p className="text-3xl font-medium text-brand-600 mb-8">₦{product.price.toLocaleString()}</p>
          
          <div className="prose text-gray-600 mb-10 text-lg font-light leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Key Ingredients - Minimalist List */}
          <div className="mb-10">
            <h3 className="font-bold text-brand-950 mb-4 text-xs uppercase tracking-widest">Key Ingredients</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-700">
              {product.ingredients?.map((ing, i) => (
                <li key={i} className="list-disc list-inside marker:text-brand-300">
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-6 border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between">
                <span className="font-bold text-brand-950 text-sm uppercase tracking-widest">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-full h-10 bg-white">
                <button 
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-full flex items-center justify-center hover:text-brand-600 transition-colors"
                >
                    <Minus size={16} />
                </button>
                <div className="w-10 text-center font-bold text-brand-950">{qty}</div>
                <button 
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-full flex items-center justify-center hover:text-brand-600 transition-colors"
                >
                    <Plus size={16} />
                </button>
                </div>
            </div>

            <button 
              onClick={() => onAddToCart(product, qty)}
              className="w-full h-14 bg-brand-900 text-white rounded-full font-bold text-lg hover:bg-brand-800 transition-colors flex items-center justify-center gap-3"
            >
              <ShoppingBag size={20} />
              Add to Bag — ₦{(product.price * qty).toLocaleString()}
            </button>
            
            <div className="flex justify-center items-center gap-2 text-xs text-green-700 font-medium uppercase tracking-wider">
              <Check size={14} /> 
              {product.availableMethods?.includes(DeliveryMethod.DELIVERY) && product.availableMethods?.includes(DeliveryMethod.PICKUP) 
                ? 'Available for Delivery & Pickup' 
                : product.availableMethods?.includes(DeliveryMethod.DELIVERY) 
                  ? 'Available for Delivery Only' 
                  : 'Available for Store Pickup Only'}
            </div>
          </div>
        </div>
      </div>

      {/* Related - Cleaner Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-brand-950">Pair it with</h2>
            <Link to="/shop" className="text-sm font-bold border-b border-brand-950 pb-0.5 hover:text-brand-600 hover:border-brand-600 transition-colors">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <div key={p.id} className="group cursor-pointer">
                <Link to={`/product/${p.id}`}>
                  <div className="aspect-[4/5] overflow-hidden mb-4 bg-gray-100 rounded-sm">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"/>
                  </div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-brand-950 group-hover:text-brand-600 transition-colors">{p.name}</h3>
                    <p className="text-brand-600 font-medium">₦{p.price.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{p.category}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
