import React from 'react';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const heroProduct = PRODUCTS[0]; 
  const masterpieces = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-brand-50 min-h-screen">
      
      {/* 
        HERO SECTION - Editorial Style 
        Split screen with massive typography and a high-quality visual.
        Removed "floating blobs" which look generic.
      */}
      <section className="relative pt-32 pb-12 px-4 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[600px]">
            
            {/* Left: Brand Statement */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-brand-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-1.5 mb-8">
                        <Sparkles size={14} className="text-accent-gold" />
                        <span className="text-xs font-bold tracking-widest uppercase">Kaduna's Finest Bakery</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
                        BAKED<br/>
                        <span className="text-brand-400">FRESH</span><br/>
                        DAILY.
                    </h1>
                    <p className="text-lg text-brand-200 max-w-md font-light leading-relaxed">
                        We don't just bake cakes; we craft edible memories. 
                        Premium ingredients, zero preservatives, and 100% love.
                    </p>
                </div>

                <div className="relative z-10 mt-12 flex flex-wrap gap-4">
                    <Link to="/shop" className="bg-white text-brand-950 px-8 py-4 rounded-full font-bold hover:bg-brand-100 transition-colors flex items-center gap-2">
                        Order Now <ArrowRight size={18} />
                    </Link>
                    <Link to="/shop?cat=Cakes" className="border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                        View Cakes
                    </Link>
                </div>

                {/* Abstract decorative element replacing generic blobs */}
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-600 rounded-tl-[100%] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* Right: Featured Product Visual */}
            <div className="lg:col-span-5 relative bg-gray-200 rounded-[2rem] overflow-hidden min-h-[400px]">
                <img 
                    src="https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=1000&auto=format&fit=crop" 
                    alt="Delicious Cake" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-accent-gold text-xs font-bold uppercase tracking-wider mb-1">Trending Now</p>
                                <h3 className="text-2xl font-bold text-white">{heroProduct.name}</h3>
                            </div>
                            <span className="text-xl font-bold text-white">₦{heroProduct.price.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Marquee - Adds Dynamic Movement ("Less Static/Template") */}
      <div className="bg-brand-950 text-brand-200 py-4 overflow-hidden border-y border-brand-900">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-bold text-2xl uppercase tracking-widest opacity-50">
            <span>Fresh Ingredients</span> ✦ <span>Same Day Delivery</span> ✦ <span>Secure Payment</span> ✦ <span>Made in Kaduna</span> ✦ <span>Custom Orders</span> ✦ <span>Fresh Ingredients</span> ✦ <span>Same Day Delivery</span> ✦ <span>Secure Payment</span> ✦
        </div>
      </div>

      {/* 
         DISCOVER CATEGORIES - Minimalist & Clean
      */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-950 tracking-tight">Our Collections</h2>
            <Link to="/shop" className="hidden md:block text-brand-600 font-bold border-b-2 border-brand-600 pb-1 hover:text-brand-900 hover:border-brand-900 transition-all">View Full Menu</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { name: 'Celebration Cakes', price: 'From ₦45,000', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop', link: '/shop?cat=Cakes' },
                { name: 'Gourmet Cupcakes', price: 'From ₦3,500', img: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=800&auto=format&fit=crop', link: '/shop?cat=Cupcakes' },
                { name: 'Healthy Parfaits', price: 'From ₦8,500', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop', link: '/shop?cat=Yogurt' },
            ].map((cat, idx) => (
                <Link to={cat.link} key={idx} className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-3xl font-bold mb-2">{cat.name}</h3>
                        <div className="flex items-center justify-between border-t border-white/30 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            <span className="font-medium">{cat.price}</span>
                            <div className="bg-white text-black rounded-full p-2">
                                <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-brand-950 mb-10">Fresh From The Oven</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {masterpieces.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
            </div>
        </div>
      </section>

      {/* Reviews - Editorial Layout */}
      <section className="py-24 bg-brand-50 border-t border-brand-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center gap-2 mb-6 text-brand-900">
                    <Star size={24} fill="currentColor" />
                    <Star size={24} fill="currentColor" />
                    <Star size={24} fill="currentColor" />
                    <Star size={24} fill="currentColor" />
                    <Star size={24} fill="currentColor" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-brand-950 leading-tight mb-12">
                    "Enddy's isn't just a bakery, it's a lifestyle. The attention to detail in every box is unmatched in the city."
                </h2>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center font-bold text-brand-900">S</div>
                    <div className="text-left">
                        <p className="font-bold text-brand-950">Sarah Jenkins</p>
                        <p className="text-sm text-brand-500 uppercase tracking-widest">Verified Buyer</p>
                    </div>
                </div>
            </div>
          </div>
      </section>

    </div>
  );
};