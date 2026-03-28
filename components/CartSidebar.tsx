import React from 'react';
import { X, Minus, Plus, ShoppingBag, Bike, Store, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItem, DeliveryMethod } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (method: DeliveryMethod) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemove,
  deliveryMethod,
  setDeliveryMethod
}) => {
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // Delivery fee ~1500 Naira
  const deliveryFee = deliveryMethod === DeliveryMethod.DELIVERY ? 1500 : 0;
  const total = subtotal + deliveryFee;

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-950/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-brand-950 flex items-center gap-2 uppercase tracking-wide">
            Your Bag ({cartItems.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-brand-950">
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-lg font-medium text-brand-950">Your bag is empty</p>
              <button 
                onClick={onClose} 
                className="text-brand-600 font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-24 object-cover rounded-md bg-gray-100"
                />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-brand-950 leading-tight">{item.name}</h3>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-brand-600 font-medium">₦{item.price.toLocaleString()}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-full px-2 py-1">
                        <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:text-brand-600 transition-colors"
                        >
                        <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold w-6 text-center text-brand-950">{item.quantity}</span>
                        <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-brand-600 transition-colors"
                        >
                        <Plus size={14} />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 p-6 space-y-6">
            
            {/* Delivery Toggle */}
            <div className="flex gap-4">
              <button 
                onClick={() => setDeliveryMethod(DeliveryMethod.DELIVERY)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg text-sm border transition-all ${
                  deliveryMethod === DeliveryMethod.DELIVERY 
                    ? 'bg-white border-brand-600 text-brand-600 shadow-sm' 
                    : 'bg-transparent border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold"><Bike size={16} /> Delivery</div>
                <span className="text-xs opacity-75">+₦1,500</span>
              </button>
              <button 
                onClick={() => setDeliveryMethod(DeliveryMethod.PICKUP)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg text-sm border transition-all ${
                  deliveryMethod === DeliveryMethod.PICKUP 
                    ? 'bg-white border-brand-600 text-brand-600 shadow-sm' 
                    : 'bg-transparent border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold"><Store size={16} /> Pickup</div>
                <span className="text-xs opacity-75">Free</span>
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-brand-950">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-brand-950">{deliveryFee === 0 ? 'Free' : `₦${deliveryFee.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-brand-950 pt-2">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-brand-900 text-white py-4 rounded-full font-bold hover:bg-brand-800 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
