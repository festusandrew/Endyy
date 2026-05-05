import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { GeminiBaker } from './components/GeminiBaker';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { AuthProvider } from './components/AuthContext';
import { CartItem, Product, DeliveryMethod } from './types';

import { DataProvider } from './context/DataContext';

// ScrollToTop Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LayoutWrapper: React.FC<{ children: React.ReactNode; cartCount: number; isCartOpen: boolean; setIsCartOpen: (v: boolean) => void; cartItems: CartItem[]; handleUpdateQuantity: any; handleRemoveFromCart: any; deliveryMethod: any; setDeliveryMethod: any }> = ({
  children, cartCount, isCartOpen, setIsCartOpen, cartItems, handleUpdateQuantity, handleRemoveFromCart, deliveryMethod, setDeliveryMethod
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname.startsWith('/super-admin');

  if (isAdmin) {
    return (
      <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900">
      <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        {children}
      </main>

      <Footer />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
      />

      <GeminiBaker />
    </div>
  );
};

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(DeliveryMethod.DELIVERY);

  // Cart Logic
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <DataProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <LayoutWrapper
            cartCount={cartCount}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            cartItems={cartItems}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
          >
            <Routes>
              <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
              <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} deliveryMethod={deliveryMethod} setDeliveryMethod={setDeliveryMethod} />} />
              <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/super-admin" element={<SuperAdminDashboard />} />
              <Route path="/checkout" element={<Checkout cartItems={cartItems} deliveryMethod={deliveryMethod} onClearCart={handleClearCart} />} />
            </Routes>
          </LayoutWrapper>
        </Router>
      </AuthProvider>
    </DataProvider>
  );
};

export default App;