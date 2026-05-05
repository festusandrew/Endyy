import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, User, Heart, RefreshCcw, LogOut } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user, profile, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        // Mock orders
        setTimeout(() => {
          setOrders([
            {
              id: 'ORD-12345',
              createdAt: new Date(),
              status: 'delivered',
              items: [{ name: 'Chocolate Cake', quantity: 1, price: 15000 }],
              deliveryMethod: 'Delivery',
              total: 16500
            }
          ]);
          setOrdersLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrdersLoading(false);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [user, activeTab]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'orders', label: 'Orders', icon: <Package size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard size={18} /> },
    { id: 'profile', label: 'Profile Details', icon: <User size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'returns', label: 'Returns & Refunds', icon: <RefreshCcw size={18} /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12 mt-16 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 shrink-0 bg-brand-100 border border-brand-200 rounded-full flex items-center justify-center text-brand-900 font-bold text-xl uppercase">
                {profile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-brand-950 truncate">{profile?.displayName || 'User'}</h2>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-brand-50 text-brand-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-brand-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-brand-950 mb-6">Order History</h2>
                {ordersLoading ? (
                  <div className="text-center py-12 text-gray-500">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Package size={48} className="mx-auto mb-4 opacity-20" />
                    <p>You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border border-gray-100 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-brand-950">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">
                              {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleDateString() : order.createdAt?.toLocaleDateString ? order.createdAt.toLocaleDateString() : 'Recent'}
                            </p>
                          </div>
                          <span className="px-3 py-1 bg-brand-50 text-brand-800 text-xs font-bold rounded-full uppercase">
                            {order.status}
                          </span>
                        </div>
                        <div className="space-y-2 mb-4">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.quantity}x {item.name}</span>
                              <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500">{order.deliveryMethod}</span>
                          <span className="font-bold text-brand-950">Total: ₦{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-brand-950">Manage Addresses</h2>
                  <button className="text-sm font-bold text-brand-600 hover:text-brand-800">Add New</button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No addresses saved.</p>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-brand-950">Payment Methods</h2>
                  <button className="text-sm font-bold text-brand-600 hover:text-brand-800">Add New</button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <CreditCard size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No payment methods saved.</p>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-brand-950 mb-6">Profile Details</h2>
                <form className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" defaultValue={profile?.displayName || ''} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue={user.email || ''} disabled className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
                  </div>
                  <button type="button" className="bg-brand-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-800 transition-colors">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-2xl font-bold text-brand-950 mb-6">Wishlist</h2>
                <div className="text-center py-12 text-gray-500">
                  <Heart size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your wishlist is empty.</p>
                </div>
              </div>
            )}

            {activeTab === 'returns' && (
              <div>
                <h2 className="text-2xl font-bold text-brand-950 mb-6">Returns & Refunds</h2>
                
                <div className="bg-brand-50 border border-brand-100 rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-brand-900 mb-2">Refund Policy</h3>
                  <p className="text-brand-800 text-sm mb-4">
                    Due to the perishable nature of our baked goods, we do not accept returns. 
                    However, if your order arrives damaged or incorrect, we are committed to making it right 
                    with a replacement or a full refund.
                  </p>
                  <ul className="list-disc list-inside text-sm text-brand-800 space-y-1">
                    <li>Please report issues within 24 hours of receiving your order.</li>
                    <li>Photos of the damaged or incorrect item may be required.</li>
                    <li>Approved refunds will be processed to the original payment method within 3-5 business days.</li>
                  </ul>
                </div>

                <div className="border border-gray-100 shadow-sm rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Report an Issue</h3>
                  <form className="space-y-4 max-w-lg" onSubmit={(e) => { e.preventDefault(); alert('Your request has been submitted. Our support team will contact you within 24 hours.'); }}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                      <input required type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="e.g. ORD-12345" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo (Optional)</label>
                      <input type="file" accept="image/*" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea required rows={4} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Please describe the issue in detail..."></textarea>
                    </div>
                    <button type="submit" className="bg-brand-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-brand-800 transition-colors shadow-md">
                      Submit Request
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
