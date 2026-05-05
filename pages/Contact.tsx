import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ContactMessage } from '../types';

export const Contact: React.FC = () => {
  const { addContactMessage } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: ContactMessage = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message,
      status: 'new'
    };
    addContactMessage(newMsg);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600">We'd love to hear from you. Whether it's a custom cake order or just to say hi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info Card */}
          <div className="bg-brand-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="text-brand-400 mt-1" />
                <div>
                  <p className="font-bold text-brand-200 text-sm uppercase">Phone</p>
                  <p className="text-lg">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-brand-400 mt-1" />
                <div>
                  <p className="font-bold text-brand-200 text-sm uppercase">Email</p>
                  <p className="text-lg">orders@endyys.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-brand-400 mt-1" />
                <div>
                  <p className="font-bold text-brand-200 text-sm uppercase">Bakery Location</p>
                  <p className="text-lg">123 Baker Street,<br/>Sweet Town, CA 90210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-brand-400 mt-1" />
                <div>
                  <p className="font-bold text-brand-200 text-sm uppercase">Opening Hours</p>
                  <p className="text-lg">Mon-Sat: 8:00 AM - 8:00 PM</p>
                  <p className="text-lg">Sun: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-brand-700">
               <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                 <MessageSquare size={20} /> Chat on WhatsApp
               </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-full flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-8">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                 <p className="text-gray-600 mb-6">We'll get back to you as soon as possible.</p>
                 <button onClick={() => setSubmitted(false)} className="text-brand-600 font-bold hover:underline">
                   Send another message
                 </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="john@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="I need a custom cake for..."></textarea>
                  </div>

                  <button className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
