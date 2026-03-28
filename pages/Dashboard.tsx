import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, CreditCard, User, Heart, RefreshCcw, LogOut } from 'lucide-react';
import { apiGetMyOrders, apiCancelOrder, Order } from '../services/orderAPI';
import { apiUpdateMe } from '../services/authAPI';

export const Dashboard: React.FC = () => {
  const { user, loading, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Profile form state
  const [displayName, setDisplayName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: 'Home', street: '', city: '', state: '', zip: '' });
  const [addressMsg, setAddressMsg] = useState('');

  useEffect(() => {
    if (!loading && !user) navigate('/');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
  }, [user]);

  // Fetch orders from MongoDB backend
  useEffect(() => {
    if (activeTab !== 'orders' || !user) return;
    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const { orders: data } = await apiGetMyOrders();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders from backend:', err);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchOrders();
  }, [user, activeTab]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setSaveMsg('');
    try {
      await apiUpdateMe({ displayName });
      await refreshUser(); // refresh user context
      setSaveMsg('Profile updated successfully!');
    } catch (err: any) {
      setSaveMsg(err.message || 'Failed to save profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelOrder = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await apiCancelOrder(id);
      setOrders(orders.map(o => o._id === id ? { ...o, status: 'cancelled' } : o));
    } catch (err: any) {
      alert(err.message || 'Failed to cancel order');
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressMsg('');
    try {
      const currentAddresses = user.addresses || [];
      await apiUpdateMe({ addresses: [...currentAddresses, newAddress] });
      await refreshUser();
      setAddressMsg('Address added successfully!');
      setShowAddressForm(false);
      setNewAddress({ label: 'Home', street: '', city: '', state: '', zip: '' });
    } catch (err: any) {
      setAddressMsg(err.message || 'Failed to add address');
    }
  };

  const tabs = [
    { id: 'orders',    label: 'Orders',           icon: <Package size={18} /> },
    { id: 'addresses', label: 'Addresses',         icon: <MapPin size={18} /> },
    { id: 'payment',   label: 'Payment Methods',   icon: <CreditCard size={18} /> },
    { id: 'profile',   label: 'Profile Details',   icon: <User size={18} /> },
    { id: 'wishlist',  label: 'Wishlist',           icon: <Heart size={18} /> },
    { id: 'returns',   label: 'Returns & Refunds',  icon: <RefreshCcw size={18} /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12 mt-16 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-900 font-bold text-xl">
                {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-bold text-brand-950">
                  {user.displayName || 'User'}
                </h2>
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

            {/* ── Orders ──────────────────────────────────────────────── */}
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
                      <div key={order._id} className="border border-gray-100 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-brand-950">{order.orderId}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                              order.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                              order.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-brand-50 text-brand-800'
                            }`}>
                              {order.status}
                            </span>
                            {order.status === 'pending' && (
                              <button onClick={() => handleCancelOrder(order._id)} className="text-xs text-red-500 hover:text-red-700 font-medium hover:underline">
                                Cancel Order
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, idx) => (
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

            {/* ── Addresses ───────────────────────────────────────────── */}
            {activeTab === 'addresses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-brand-950">Manage Addresses</h2>
                  <button onClick={() => setShowAddressForm(!showAddressForm)} className="text-sm font-bold text-brand-600 hover:text-brand-800">
                    {showAddressForm ? 'Cancel' : 'Add New'}
                  </button>
                </div>
                {addressMsg && <p className={`text-sm mb-4 ${addressMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{addressMsg}</p>}
                
                {showAddressForm && (
                  <form onSubmit={handleAddAddress} className="mb-6 bg-brand-50 p-6 rounded-xl border border-brand-100 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-brand-900 mb-1">Label (e.g. Home)</label>
                        <input required value={newAddress.label} onChange={e => setNewAddress({...newAddress, label: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Home" />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-brand-900 mb-1">City</label>
                        <input required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Keffi" />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-medium text-brand-900 mb-1">Street Address</label>
                        <input required value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="123 Bakery Lane" />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-medium text-brand-900 mb-1">State / Zip</label>
                        <div className="flex gap-2">
                          <input value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Nasarawa" />
                          <input value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} className="w-1/3 px-3 py-2 border rounded-lg text-sm" placeholder="10001" />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="bg-brand-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-brand-800 transition-colors">Save Address</button>
                  </form>
                )}

                {user.addresses?.length ? (
                  <div className="space-y-4">
                    {user.addresses.map((addr: any, i: number) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-4 text-sm text-gray-700">
                        <p className="font-bold mb-1">{addr.label || 'Address'}</p>
                        <p>{addr.street}, {addr.city} {addr.state} {addr.zip}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <MapPin size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No addresses saved.</p>
                  </div>
                )}
              </div>
            )}

            {/* ── Payment ─────────────────────────────────────────────── */}
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

            {/* ── Profile ─────────────────────────────────────────────── */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-brand-950 mb-6">Profile Details</h2>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={e => setDisplayName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      defaultValue={user.email || ''}
                      disabled
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  {saveMsg && (
                    <p className={`text-sm ${saveMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
                      {saveMsg}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                    className="bg-brand-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-800 transition-colors disabled:opacity-50"
                  >
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* ── Wishlist ─────────────────────────────────────────────── */}
            {activeTab === 'wishlist' && (
              <div>
                <h2 className="text-2xl font-bold text-brand-950 mb-6">Wishlist</h2>
                <div className="text-center py-12 text-gray-500">
                  <Heart size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Your wishlist is empty.</p>
                </div>
              </div>
            )}

            {/* ── Returns ─────────────────────────────────────────────── */}
            {activeTab === 'returns' && (
              <div>
                <h2 className="text-2xl font-bold text-brand-950 mb-6">Returns & Refunds</h2>
                <div className="text-center py-12 text-gray-500">
                  <RefreshCcw size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No return requests found.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
