import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Cake, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { LoginModal } from './LoginModal';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isHome = location.pathname === '/';

  // Handle scroll for transparent -> solid transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    // Exact match for simple paths
    if (path === location.pathname) {
      return 'text-brand-800 font-bold bg-brand-100 rounded-full px-4 py-1';
    }
    // Handle query params check
    if (path.includes('?') && location.search.includes(path.split('?')[1])) {
      return 'text-brand-800 font-bold bg-brand-100 rounded-full px-4 py-1';
    }
    return 'text-brand-800 hover:text-brand-600 font-medium px-4 py-1';
  };

  const handleUserClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-brand-50/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Logo - Matches the circular badge style in reference 1 roughly */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`p-1 rounded-full border-2 border-brand-200 transform group-hover:rotate-12 transition-transform ${scrolled ? 'bg-white' : 'bg-brand-50'}`}>
            <img src="/logo.png" alt="Enddy's Logo" className="w-10 h-10 object-contain rounded-full" />
          </div>
          {(!isHome || scrolled) && (
             <span className="text-xl font-display font-bold text-brand-800 tracking-wide">Enddy</span>
          )}
        </Link>

        {/* Desktop Nav - Pill Shape */}
        <nav className={`hidden md:flex items-center bg-[#FFFBF7] rounded-full px-2 py-2 shadow-lg border border-brand-100 ${!scrolled && isHome ? 'bg-opacity-90' : ''}`}>
          <Link to="/" className={isActive('/')}>Home</Link>
          <div className="w-px h-4 bg-brand-200 mx-1"></div>
          <Link to="/shop" className={isActive('/shop')}>Menu</Link>
          <div className="w-px h-4 bg-brand-200 mx-1"></div>
          <Link to="/about" className={isActive('/about')}>About Us</Link>
          <div className="w-px h-4 bg-brand-200 mx-1"></div>
          <Link to="/contact" className={isActive('/contact')}>Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleUserClick}
            className={`p-3 rounded-full hover:bg-brand-100 transition-colors group ${scrolled || !isHome ? 'bg-white text-brand-800 shadow-sm border border-brand-100' : 'bg-brand-800 text-white shadow-lg'}`}
          >
            <User size={20} />
          </button>
          <button 
            onClick={onOpenCart}
            className={`relative p-3 rounded-full hover:bg-brand-100 transition-colors group ${scrolled || !isHome ? 'bg-white text-brand-800 shadow-sm border border-brand-100' : 'bg-brand-800 text-white shadow-lg'}`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent-pink text-brand-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-3 rounded-full ${scrolled || !isHome ? 'bg-white text-brand-800 shadow-sm' : 'bg-brand-800 text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-50 border-t border-brand-100 p-4 md:hidden shadow-xl animate-fadeIn">
          <nav className="flex flex-col space-y-4 text-center">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-brand-800">Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-brand-800">Menu</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-brand-800">About Us</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-brand-800">Contact</Link>
          </nav>
        </div>
      )}
    </header>
    <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};