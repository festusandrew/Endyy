import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductCategory, DEFAULT_CATEGORIES, Order, TrainingApplication, ContactMessage, Testimonial } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../constants';

interface DataContextType {
  products: Product[];
  categories: ProductCategory[];
  orders: Order[];
  trainingApps: TrainingApplication[];
  contactMessages: ContactMessage[];
  testimonials: Testimonial[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Product) => void;
  removeProduct: (id: string) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
  updateCategory: (oldCategory: string, newCategory: string) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  addTrainingApp: (app: TrainingApplication) => void;
  updateTrainingApp: (id: string, updates: Partial<TrainingApplication>) => void;
  addContactMessage: (msg: ContactMessage) => void;
  updateContactMessage: (id: string, updates: Partial<ContactMessage>) => void;
  addTestimonial: (t: Testimonial) => void;
  removeTestimonial: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<ProductCategory[]>(DEFAULT_CATEGORIES);
  const [orders, setOrders] = useState<Order[]>([]);
  const [trainingApps, setTrainingApps] = useState<TrainingApplication[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS as any);

  // Load from locale storage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('enddy_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    const savedCategories = localStorage.getItem('enddy_categories');
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    const savedOrders = localStorage.getItem('enddy_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    const savedApps = localStorage.getItem('enddy_training');
    if (savedApps) setTrainingApps(JSON.parse(savedApps));
    const savedMsgs = localStorage.getItem('enddy_contact');
    if (savedMsgs) setContactMessages(JSON.parse(savedMsgs));
    const savedTestimonials = localStorage.getItem('enddy_testimonials');
    if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
  }, []);

  // Save to local storage on change
  useEffect(() => { localStorage.setItem('enddy_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('enddy_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('enddy_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('enddy_training', JSON.stringify(trainingApps)); }, [trainingApps]);
  useEffect(() => { localStorage.setItem('enddy_contact', JSON.stringify(contactMessages)); }, [contactMessages]);
  useEffect(() => { localStorage.setItem('enddy_testimonials', JSON.stringify(testimonials)); }, [testimonials]);

  const addProduct = (product: Product) => setProducts([...products, product]);
  
  const updateProduct = (id: string, updatedProduct: Product) => {
    setProducts(products.map(p => p.id === id ? updatedProduct : p));
  };
  
  const removeProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const updateCategory = (oldCategory: string, newCategory: string) => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
       setCategories(categories.map(c => c === oldCategory ? newCategory.trim() : c));
       // Also update products with this category
       setProducts(products.map(p => p.category === oldCategory ? { ...p, category: newCategory.trim() } : p));
    }
  };

  const addOrder = (order: Order) => setOrders([...orders, order]);
  const updateOrder = (id: string, updates: Partial<Order>) => setOrders(orders.map(o => o.id === id ? { ...o, ...updates } : o));

  const addTrainingApp = (app: TrainingApplication) => setTrainingApps([...trainingApps, app]);
  const updateTrainingApp = (id: string, updates: Partial<TrainingApplication>) => setTrainingApps(trainingApps.map(a => a.id === id ? { ...a, ...updates } : a));

  const addContactMessage = (msg: ContactMessage) => setContactMessages([...contactMessages, msg]);
  const updateContactMessage = (id: string, updates: Partial<ContactMessage>) => setContactMessages(contactMessages.map(m => m.id === id ? { ...m, ...updates } : m));

  const addTestimonial = (t: Testimonial) => setTestimonials([...testimonials, t]);
  const removeTestimonial = (id: string) => setTestimonials(testimonials.filter(t => t.id !== id));

  return (
    <DataContext.Provider value={{
      products,
      categories,
      orders,
      trainingApps,
      contactMessages,
      testimonials,
      addProduct,
      updateProduct,
      removeProduct,
      addCategory,
      removeCategory,
      updateCategory,
      addOrder,
      updateOrder,
      addTrainingApp,
      updateTrainingApp,
      addContactMessage,
      updateContactMessage,
      addTestimonial,
      removeTestimonial
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
