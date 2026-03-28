import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CartItem, DeliveryMethod } from '../types';

import { apiCreateOrder } from '../services/orderAPI';

interface CheckoutProps {
  cartItems: CartItem[];
  deliveryMethod: DeliveryMethod;
  onClearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, deliveryMethod, onClearCart }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState<number>(
    user?.addresses && user.addresses.length > 0 ? 0 : -1
  );

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const subtotal    = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === DeliveryMethod.DELIVERY ? 1500 : 0;
  const total       = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-600 hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const isDelivery = deliveryMethod === DeliveryMethod.DELIVERY;

    let finalAddress = {
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };

    if (isDelivery && selectedAddressIdx >= 0 && user?.addresses?.[selectedAddressIdx]) {
      const addr = user.addresses[selectedAddressIdx];
      finalAddress = {
        street: addr.street,
        city: addr.city,
        state: addr.state || '',
        zip: addr.zip || '',
      };
    }

    const orderPayload = {
      customerEmail: formData.email,
      items: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal,
      deliveryFee,
      total,
      deliveryMethod: isDelivery ? ('Delivery' as const) : ('Pick-Up' as const),
      ...(isDelivery && { shippingAddress: finalAddress }),
    };

    try {
      // ── 1. Save to MongoDB backend ──────────────────────────────────────
      const { order } = await apiCreateOrder(orderPayload);

      onClearCart();
      setPlacedOrderId(order.orderId);
      window.scrollTo(0, 0); // Scroll to top for success message
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (placedOrderId) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center pt-20 px-4 text-center animate-fadeIn">
        <div className="bg-green-50 border-4 border-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-sm">
          <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-display font-bold text-brand-950 mb-4 tracking-tight">Order Successful!</h1>
        <p className="text-lg text-gray-600 mb-3 max-w-md">
          Thank you for choosing Enddy's! Your delicious treats are being prepared with love.
        </p>
        <div className="bg-brand-50 border border-brand-100 px-6 py-3 rounded-xl mb-10 shadow-sm inline-block">
          <p className="text-sm text-gray-500 mb-1">Your Order ID is:</p>
          <p className="font-mono font-bold text-brand-800 text-lg">{placedOrderId}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {user ? (
            <button onClick={() => navigate('/dashboard')} className="bg-brand-900 text-white px-8 py-3 rounded-full font-bold hover:bg-brand-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Track Order in Dashboard
            </button>
          ) : (
            <button onClick={() => navigate('/')} className="bg-brand-900 text-white px-8 py-3 rounded-full font-bold hover:bg-brand-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Return to Home
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 mt-16 min-h-screen max-w-4xl">
      <h1 className="text-3xl font-display font-bold text-brand-950 mb-8">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* ── Form ─────────────────────────────────────────────────────── */}
        <div className="flex-1">
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              {!user && (
                <p className="text-sm text-gray-500 mb-4">
                  Checking out as a guest.{' '}
                  <button type="button" onClick={() => navigate('/')} className="text-brand-600 font-bold hover:underline">
                    Log in
                  </button>{' '}
                  for faster checkout.
                </p>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            {deliveryMethod === DeliveryMethod.DELIVERY && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                
                {user?.addresses && user.addresses.length > 0 && (
                  <div className="mb-6 space-y-3">
                    {user.addresses.map((addr: any, idx: number) => (
                      <label key={idx} className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${selectedAddressIdx === idx ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-brand-300'}`}>
                        <input type="radio" name="address" checked={selectedAddressIdx === idx} onChange={() => setSelectedAddressIdx(idx)} className="mt-1 mr-3 text-brand-600 focus:ring-brand-500" />
                        <div>
                          <p className="font-bold text-sm text-brand-950">{addr.label || 'Saved Address'}</p>
                          <p className="text-sm text-gray-600">{addr.street}, {addr.city} {addr.state} {addr.zip}</p>
                        </div>
                      </label>
                    ))}
                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${selectedAddressIdx === -1 ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-brand-300'}`}>
                       <input type="radio" name="address" checked={selectedAddressIdx === -1} onChange={() => setSelectedAddressIdx(-1)} className="mr-3 text-brand-600 focus:ring-brand-500" />
                       <span className="font-bold text-sm text-brand-950">Use a different address</span>
                    </label>
                  </div>
                )}

                {selectedAddressIdx === -1 && (
                  <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <input type="text" name="street" required value={formData.street} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input type="text" name="zip" required value={formData.zip} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-900 text-white py-4 rounded-xl font-bold hover:bg-brand-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Pay ₦${total.toLocaleString()}`}
            </button>
          </form>
        </div>

        {/* ── Order Summary ─────────────────────────────────────────────── */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{deliveryMethod}</span>
                <span>{deliveryFee === 0 ? 'Free' : `₦${deliveryFee.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-brand-950 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
