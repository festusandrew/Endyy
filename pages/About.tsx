import React from 'react';
import { Heart, Award, Leaf } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-brand-50 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Baking the World a Better Place</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            At Enddy's, we believe every slice of cake should tell a story of quality, passion, and joy.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                It started in a small home kitchen with a single blueberry cheesecake recipe. Enddy, our founder, wanted to create desserts that weren't just sugar-bombs, but balanced, flavorful experiences using real fruit and premium dairy.
              </p>
              <p>
                Today, Enddy's has grown into a beloved local brand, known for our signature blue boxes and the smile that comes with opening them. We bridge the gap between a classic patisserie and a modern, convenient delivery service.
              </p>
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-brand-600 rounded-3xl transform rotate-3 opacity-10"></div>
             <img 
               src="https://picsum.photos/id/404/600/400" 
               alt="Baker working" 
               className="rounded-3xl shadow-xl relative z-10 w-full"
             />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: "Made with Love", text: "We knead passion into every dough and whisk care into every cream." },
            { icon: Leaf, title: "Fresh Ingredients", text: "Locally sourced berries, organic flour, and farm-fresh eggs. No preservatives." },
            { icon: Award, title: "Master Craftsmanship", text: "Our bakers are trained artists who treat every cupcake like a masterpiece." }
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center">
              <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-brand-600">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
