import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Package, ListOrdered, Tag, CreditCard, Plus, Trash2, Edit, GraduationCap, MessageSquare, Star, RefreshCcw, Users } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, categories, orders, contactMessages, testimonials,
    addProduct, updateProduct, removeProduct, addCategory, removeCategory, updateCategory, updateOrder, updateContactMessage, addTestimonial, removeTestimonial 
  } = useData();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'messages' | 'testimonials' | 'returns' | 'customers'>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'admin@enddycakes.com' && loginForm.password === 'EnddySecure2026!') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. (Hint: admin@enddycakes.com / EnddySecure2026!)');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 max-w-sm w-full">
          <div className="text-center mb-8">
             <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h1>
             <p className="text-gray-500">Sign in to manage Enddy's Bakery</p>
          </div>
          {loginError && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-bold">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Username/Email</label>
              <input required type="text" autoComplete="username" value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="admin@enddycakes.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input required type="password" autoComplete="current-password" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Basic Stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-gray-500 hover:text-gray-900 font-bold">Logout</button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'overview' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <CreditCard size={20} /> Overview & Stats
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'products' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <Package size={20} /> Manage Products
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'categories' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <Tag size={20} /> Categories
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'orders' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <ListOrdered size={20} /> Orders & Payments
          </button>
           <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'messages' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <MessageSquare size={20} /> Messages
          </button>
           <button 
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'testimonials' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <Star size={20} /> Testimonials
          </button>
           <button 
            onClick={() => setActiveTab('returns')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'returns' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <RefreshCcw size={20} /> Returns & Refunds
          </button>
           <button 
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${activeTab === 'customers' ? 'bg-brand-600 text-white' : 'hover:bg-gray-100 text-gray-600'}`}
          >
            <Users size={20} /> Customers
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Store Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                 <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100">
                    <p className="text-brand-600 font-bold mb-2">Total Revenue</p>
                    <p className="text-3xl font-bold text-brand-950">₦{totalRevenue.toLocaleString()}</p>
                 </div>
                 <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100">
                    <p className="text-brand-600 font-bold mb-2">Total Orders</p>
                    <p className="text-3xl font-bold text-brand-950">{orders.length}</p>
                 </div>
                 <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100">
                    <p className="text-brand-600 font-bold mb-2">Categories</p>
                    <p className="text-3xl font-bold text-brand-950">{categories.length}</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
                  {orders.slice(-3).reverse().map((o: any) => (
                    <div key={o.id} className="border-b border-gray-100 py-3 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-700">Order #{o.id}</span>
                        <span className="text-brand-600 font-bold">₦{o.total.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-500">{new Date(o.createdAt).toLocaleString()} • {o.items.length} items</p>
                    </div>
                  ))}
                  {orders.length === 0 && <p className="text-gray-500">No recent orders.</p>}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Top Products</h3>
                  {products.slice(0, 3).map((p: any) => (
                    <div key={p.id} className="flex items-center gap-3 py-3 mb-3 border-b border-gray-100">
                      <img src={p.image} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-bold text-gray-900">{p.name}</p>
                        <p className="text-sm text-gray-500">₦{p.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <ProductsManager products={products} addProduct={addProduct} updateProduct={updateProduct} removeProduct={removeProduct} categories={categories} />
          )}

          {activeTab === 'categories' && (
            <CategoriesManager categories={categories} addCategory={addCategory} updateCategory={updateCategory} removeCategory={removeCategory} />
          )}

          {activeTab === 'orders' && (
            <OrdersManager orders={orders} updateOrder={updateOrder} />
          )}

          {activeTab === 'messages' && (
            <MessagesManager contactMessages={contactMessages} updateContactMessage={updateContactMessage} />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsManager testimonials={testimonials} addTestimonial={addTestimonial} removeTestimonial={removeTestimonial} />
          )}

          {activeTab === 'returns' && (
            <ReturnsManager />
          )}

          {activeTab === 'customers' && (
            <CustomersManager orders={orders} />
          )}

        </div>
      </div>
    </div>
  );
};

// --- Sub Components for distinct admin areas --- //

const ProductsManager = ({ products, addProduct, updateProduct, removeProduct, categories }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<any>({ name: '', price: '', category: categories[0] || '', description: '', image: '', images: [] });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isPrimary: boolean) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isPrimary) {
          setNewProduct((prev: any) => ({ ...prev, image: base64String }));
        } else {
          setNewProduct((prev: any) => ({ ...prev, images: [...(prev.images || []), base64String] }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeExtraImage = (index: number) => {
    setNewProduct((prev: any) => {
      const newImages = [...(prev.images || [])];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    if (editingId) {
      updateProduct(editingId, {
        id: editingId,
        ...newProduct,
        images: newProduct.images || [],
        price: Number(newProduct.price)
      });
    } else {
      addProduct({
        id: Math.random().toString(36).substr(2, 9),
        ...newProduct,
        images: newProduct.images || [],
        price: Number(newProduct.price),
        image: newProduct.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop',
        popular: false 
      });
    }

    setIsAdding(false);
    setEditingId(null);
    setNewProduct({ name: '', price: '', category: categories[0] || '', description: '', image: '', images: [] });
  };

  const startEditing = (p: any) => {
    setEditingId(p.id);
    setNewProduct({ ...p, price: p.price.toString(), images: p.images || [] });
    setIsAdding(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
        <button onClick={() => { setIsAdding(!isAdding); setEditingId(null); setNewProduct({ name: '', price: '', category: categories[0] || '', description: '', image: '', images: [] }); }} className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={18} /> {isAdding ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Product Name</label>
                 <input required type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Price (₦)</label>
                 <input required type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                 <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300">
                   {categories.map((c: string) => <option key={c} value={c}>{c}</option>)}
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Primary Image</label>
                 <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                 {newProduct.image && <img src={newProduct.image} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded" />}
              </div>
              <div className="col-span-2">
                 <label className="block text-sm font-bold text-gray-700 mb-1">Additional Images</label>
                 <input type="file" accept="image/*" multiple onChange={(e) => handleImageUpload(e, false)} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
                 <div className="flex gap-2 mt-2 flex-wrap">
                   {newProduct.images?.map((img: string, i: number) => (
                     <div key={i} className="relative">
                       <img src={img} alt={`Extra ${i}`} className="w-20 h-20 object-cover rounded" />
                       <button type="button" onClick={() => removeExtraImage(i)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2 shadow"><Trash2 size={12}/></button>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="col-span-2">
                 <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                 <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300"></textarea>
              </div>
           </div>
           <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">{editingId ? 'Update Product' : 'Save Product'}</button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-4 px-4 font-bold text-gray-600">Product</th>
              <th className="py-4 px-4 font-bold text-gray-600">Category</th>
              <th className="py-4 px-4 font-bold text-gray-600">Price</th>
              <th className="py-4 px-4 font-bold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 flex items-center gap-3">
                   <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                   <span className="font-bold text-gray-900">{p.name}</span>
                </td>
                <td className="py-4 px-4 text-gray-600">{p.category}</td>
                <td className="py-4 px-4 text-gray-900 font-bold">₦{p.price.toLocaleString()}</td>
                <td className="py-4 px-4 text-right flex justify-end gap-2">
                   <button onClick={() => startEditing(p)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition-colors">
                     <Edit size={18} />
                   </button>
                   <button onClick={() => removeProduct(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                     <Trash2 size={18} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CategoriesManager = ({ categories, addCategory, updateCategory, removeCategory }: any) => {
  const [newCat, setNewCat] = useState('');
  const [editingCat, setEditingCat] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCat.trim()) {
      addCategory(newCat.trim());
      setNewCat('');
    }
  };

  const handleEditSave = (oldCat: string) => {
    if (editValue.trim()) {
      updateCategory(oldCat, editValue.trim());
    }
    setEditingCat(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
      
      <form onSubmit={handleAdd} className="flex gap-4 mb-8">
        <input 
          type="text" 
          value={newCat} 
          onChange={e => setNewCat(e.target.value)} 
          placeholder="New category name..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button type="submit" className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-700 transition">Add</button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((c: string) => (
          <div key={c} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
            {editingCat === c ? (
               <div className="flex flex-1 gap-2">
                 <input autoFocus type="text" value={editValue} onChange={e => setEditValue(e.target.value)} className="flex-1 px-3 py-1 rounded border border-gray-300" />
                 <button onClick={() => handleEditSave(c)} className="bg-green-500 text-white px-3 py-1 font-bold rounded">Save</button>
                 <button onClick={() => setEditingCat(null)} className="bg-gray-300 text-gray-700 px-3 py-1 font-bold rounded">Cancel</button>
               </div>
            ) : (
               <>
                 <span className="font-bold text-gray-900">{c}</span>
                 <div className="flex gap-2">
                    <button onClick={() => { setEditingCat(c); setEditValue(c); }} className="text-gray-500 hover:bg-gray-200 p-2 rounded-lg"><Edit size={18} /></button>
                    <button onClick={() => removeCategory(c)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18} /></button>
                 </div>
               </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersManager = ({ orders, updateOrder }: any) => {
  const [filter, setFilter] = useState<'All' | 'Pickup' | 'Delivery'>('All');

  const filteredOrders = orders.filter((o: any) => 
    filter === 'All' ? true : o.deliveryMethod === filter
  );

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Orders & Payments</h2>
        <div className="py-12 text-center text-gray-500">No orders placed yet.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Orders & Payments</h2>
        <div className="flex gap-2 w-full md:w-auto">
           <button onClick={() => setFilter('All')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'All' ? 'bg-brand-600 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>All</button>
           <button onClick={() => setFilter('Delivery')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'Delivery' ? 'bg-brand-600 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>Delivery</button>
           <button onClick={() => setFilter('Pickup')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filter === 'Pickup' ? 'bg-brand-600 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>Pickup</button>
        </div>
      </div>
      
      {filteredOrders.length === 0 ? (
        <div className="py-12 text-center text-gray-500">No {filter.toLowerCase()} orders found.</div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((o: any) => (
          <div key={o.id} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b border-gray-100 gap-4">
               <div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-gray-900">Order #{o.id}</p>
                    <span className={`px-2 py-1 text-xs font-bold rounded-md ${o.deliveryMethod === 'Pickup' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                      {o.deliveryMethod === 'Pickup' ? 'Pickup' : 'Delivery'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{new Date(o.createdAt).toLocaleString()}</p>
                  
                  {o.deliveryMethod === 'Delivery' && o.shippingAddress && (
                    <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <p className="font-bold mb-1">Delivery Details:</p>
                      <p>{o.shippingAddress.firstName} {o.shippingAddress.lastName}</p>
                      <p>{o.shippingAddress.street}</p>
                      <p>{o.shippingAddress.city}, {o.shippingAddress.state} {o.shippingAddress.zip}</p>
                    </div>
                  )}
               </div>
               <div className="flex gap-4 items-start md:items-center flex-col-reverse md:flex-row">
                  <div className="text-left md:text-right w-full md:w-auto">
                     <p className="text-sm font-bold text-gray-500 uppercase">Total</p>
                     <p className="font-bold text-brand-600 text-xl">₦{o.total.toLocaleString()}</p>
                  </div>
                  <select 
                    value={o.status}
                    onChange={(e) => updateOrder(o.id, { status: e.target.value })}
                    className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg font-bold text-sm bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
               </div>
            </div>
            <div>
               <p className="font-bold text-gray-700 text-sm mb-2">Items:</p>
               <ul className="text-sm text-gray-600 space-y-1">
                 {o.items.map((item: any, i: number) => (
                   <li key={i}>{item.quantity}x {item.name}</li>
                 ))}
               </ul>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};


const MessagesManager = ({ contactMessages, updateContactMessage }: any) => {
  if (contactMessages.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h2>
        <div className="py-12 text-center text-gray-500">No messages received yet.</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h2>
      <div className="space-y-4">
        {contactMessages.map((msg: any) => (
          <div key={msg.id} className={`border border-gray-200 rounded-2xl p-6 shadow-sm ${msg.status === 'new' ? 'bg-brand-50' : 'bg-white'}`}>
            <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b border-gray-100 gap-4">
               <div>
                  <p className="font-bold text-gray-900">{msg.firstName} {msg.lastName}</p>
                  <p className="text-sm text-gray-500">{msg.email}</p>
               </div>
               <div className="flex gap-4 items-center">
                  <select 
                    value={msg.status}
                    onChange={(e) => updateContactMessage(msg.id, { status: e.target.value })}
                    className="px-4 py-2 border border-brand-200 rounded-lg font-bold text-sm"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
               </div>
            </div>
            <div>
               <p className="text-sm text-gray-700 whitespace-pre-line">{msg.message}</p>
               <p className="text-xs text-brand-400 mt-4 font-bold tracking-widest uppercase">Sent on {new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TestimonialsManager = ({ testimonials, addTestimonial, removeTestimonial }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', text: '', rating: 5 });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.text) return;
    addTestimonial({
      id: Math.random().toString(36).substr(2, 9),
      name: newTestimonial.name,
      text: newTestimonial.text,
      rating: Number(newTestimonial.rating)
    });
    setIsAdding(false);
    setNewTestimonial({ name: '', text: '', rating: 5 });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Testimonials</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="bg-brand-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8 space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Customer Name</label>
                 <input required type="text" value={newTestimonial.name} onChange={e => setNewTestimonial({...newTestimonial, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">Rating (1-5)</label>
                 <input required type="number" min="1" max="5" value={newTestimonial.rating} onChange={e => setNewTestimonial({...newTestimonial, rating: Number(e.target.value)})} className="w-full px-4 py-2 rounded-lg border border-gray-300" />
              </div>
              <div className="col-span-2">
                 <label className="block text-sm font-bold text-gray-700 mb-1">Review Text</label>
                 <textarea required rows={3} value={newTestimonial.text} onChange={e => setNewTestimonial({...newTestimonial, text: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300"></textarea>
              </div>
           </div>
           <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold">Save Testimonial</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t: any) => (
          <div key={t.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative">
            <button onClick={() => removeTestimonial(t.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
            <div className="flex gap-1 mb-2 text-brand-400">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "" : "text-gray-300"} />
               ))}
            </div>
            <p className="text-gray-700 italic mb-4">"{t.text}"</p>
            <p className="font-bold text-gray-900">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReturnsManager = () => {
  const [returns, setReturns] = useState([
    { id: 'RET-101', orderId: 'ORD-1715423851', date: new Date().toISOString(), reason: 'Item damaged during delivery', status: 'Pending', amount: 45000 },
    { id: 'RET-102', orderId: 'ORD-1715423400', date: new Date(Date.now() - 86400000).toISOString(), reason: 'Wrong item received', status: 'Approved', amount: 8000 },
    { id: 'RET-103', orderId: 'ORD-1715423100', date: new Date(Date.now() - 172800000).toISOString(), reason: 'Item melted', status: 'Rejected', amount: 6000 },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setReturns(returns.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Returns & Refunds</h2>
      <div className="space-y-4">
        {returns.map(r => (
          <div key={r.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-gray-900">Return #{r.id}</span>
                <span className={`px-2 py-1 text-xs font-bold rounded-md ${r.status === 'Pending' ? 'bg-orange-100 text-orange-700' : r.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {r.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">Order: <span className="font-medium text-gray-700">{r.orderId}</span> • {new Date(r.date).toLocaleString()}</p>
              <p className="text-sm bg-gray-50 p-2 rounded border border-gray-100"><span className="font-bold">Reason:</span> {r.reason}</p>
            </div>
            
            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase mb-1">Refund Amount</p>
                <p className="font-bold text-brand-600 text-xl">₦{r.amount.toLocaleString()}</p>
              </div>
              
              <select 
                value={r.status}
                onChange={(e) => updateStatus(r.id, e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold bg-white outline-none w-full md:w-auto"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomersManager = ({ orders }: { orders: any[] }) => {
  // Derive customers from orders
  const customersMap = orders.reduce((acc, order) => {
    let email = order.customerEmail;
    let name = 'Guest User';
    
    // Try to extract from shipping address if available
    if (order.shippingAddress) {
      if (order.shippingAddress.firstName && order.shippingAddress.lastName) {
        name = `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`;
      } else if (order.shippingAddress.name) {
        name = order.shippingAddress.name;
      }
      if (!email && order.shippingAddress.email) {
        email = order.shippingAddress.email;
      }
    }
    
    if (!email) email = `guest-${order.id}@example.com`;

    if (!acc[email]) {
      acc[email] = {
        id: `CUST-${Object.keys(acc).length + 1}`,
        name,
        email,
        totalOrders: 0,
        totalSpent: 0,
        lastActive: order.createdAt
      };
    }
    
    acc[email].totalOrders += 1;
    acc[email].totalSpent += order.total;
    // Update lastActive if this order is more recent
    if (new Date(order.createdAt) > new Date(acc[email].lastActive)) {
      acc[email].lastActive = order.createdAt;
    }
    
    return acc;
  }, {} as Record<string, any>);

  const customers = Object.values(customersMap);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customers</h2>
      
      {customers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No customers found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500 font-bold">
                <th className="px-6 py-4 rounded-tl-xl">Customer</th>
                <th className="px-6 py-4">Total Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4 rounded-tr-xl">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {customers.map((c: any) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.email}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">{c.totalOrders}</td>
                  <td className="px-6 py-4 font-bold text-brand-600">₦{c.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.lastActive).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
