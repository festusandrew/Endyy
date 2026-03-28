import React, { useState } from 'react';
import { Send, MapPin, User, BookOpen, CheckCircle } from 'lucide-react';

export const Training: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-32 text-center mt-20">
        <div className="max-w-md mx-auto bg-white p-12 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-brand-950 mb-4">Application Sent!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for applying to Enddy's Baking Academy. We will review your application and contact you shortly regarding the next cohort in Kaduna.
          </p>
          <button onClick={() => setSubmitted(false)} className="text-brand-600 font-bold hover:underline">
            Send another application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-50 min-h-screen py-20">
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-brand-200 text-brand-900 text-xs font-bold uppercase tracking-widest mb-4">
              Enddy's Academy
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-950 mb-6">
              Master the Art of <span className="text-brand-500">Baking</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our exclusive, hands-on physical training sessions in Kaduna. 
              Designed specifically for women who want to turn their passion into a profession.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Info Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-brand-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Class Details</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <MapPin size={20} className="text-brand-200" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase text-brand-300">Location</p>
                        <p className="font-medium">Kaduna, Nigeria (Physical Class)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <User size={20} className="text-brand-200" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase text-brand-300">Eligibility</p>
                        <p className="font-medium">Females Only</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <BookOpen size={20} className="text-brand-200" />
                      </div>
                      <div>
                        <p className="font-bold text-sm uppercase text-brand-300">Format</p>
                        <p className="font-medium">100% Practical & Hands-on</p>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-700 rounded-full opacity-50 blur-3xl"></div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-100">
                <h3 className="text-xl font-bold text-brand-950 mb-4">Why Train With Us?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Professional Certification</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Starter Kit Included</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Business Mentorship</li>
                  <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Small Class Sizes</li>
                </ul>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
                <h2 className="text-2xl font-bold text-brand-950 mb-2">Student Registration Form</h2>
                <p className="text-gray-500 mb-8 text-sm">Please fill out the form below to reserve your spot in our next cohort.</p>

                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-brand-900 mb-2">First Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-900 mb-2">Last Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-brand-900 mb-2">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-900 mb-2">Phone Number</label>
                      <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="080 1234 5678" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-900 mb-2">Select Course</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all text-gray-700">
                      <option>Baking Fundamentals (2 Weeks)</option>
                      <option>Advanced Cake Decorating (4 Weeks)</option>
                      <option>Pastry & Parfaits Masterclass (1 Week)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-900 mb-2">Baking Experience</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 flex-1 hover:border-brand-300">
                        <input type="radio" name="experience" className="text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm">Beginner</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 flex-1 hover:border-brand-300">
                        <input type="radio" name="experience" className="text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm">Home Baker</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 flex-1 hover:border-brand-300">
                        <input type="radio" name="experience" className="text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm">Professional</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-brand-900 mb-2">Why do you want to join?</label>
                    <textarea rows={3} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" placeholder="Tell us a bit about your goals..."></textarea>
                  </div>

                  <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 flex items-start gap-3">
                    <div className="min-w-[20px] pt-1">
                      <input required type="checkbox" className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500" />
                    </div>
                    <p className="text-sm text-gray-600 leading-tight">
                      I confirm that I am a female residing in Kaduna (or willing to travel to Kaduna) and can attend physical classes.
                    </p>
                  </div>

                  <button type="submit" className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200 flex items-center justify-center gap-2">
                    Submit Application <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
